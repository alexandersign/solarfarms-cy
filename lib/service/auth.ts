import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'
import type { ServiceUser, UserRole } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iipbxwyvlzxthlblayvw.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function getServiceSupabase() {
  return createClient(supabaseUrl, supabaseServiceKey)
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: UserRole
      client_group?: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: UserRole
    client_group?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: UserRole
    client_group?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/service/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const supabase = getServiceSupabase()
        const { data: user, error } = await supabase
          .from('service_users')
          .select('*')
          .eq('email', credentials.email as string)
          .eq('is_active', true)
          .single()

        if (error || !user) return null

        const passwordValid = await compare(
          credentials.password as string,
          user.password_hash
        )
        if (!passwordValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as UserRole,
          client_group: user.client_group,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.client_group = user.client_group
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      session.user.client_group = token.client_group
      return session
    },
  },
})
