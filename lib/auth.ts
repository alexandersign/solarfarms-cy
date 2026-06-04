import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { CRM_USERS } from './crm-users'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Email & Password',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = (credentials?.email as string | undefined)?.toLowerCase().trim()
        const password = credentials?.password as string | undefined
        const crmPassword = process.env.CRM_PASSWORD
        if (!email || !password || !crmPassword) return null
        if (password !== crmPassword) return null
        const user = CRM_USERS.find(u => u.email.toLowerCase() === email)
        if (!user) return null
        // `role` is required by the global next-auth User augmentation
        return { id: user.id, name: user.name, email: user.email, role: 'manager' as const }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        token.name  = user.name
        token.email = user.email
        token.role  = 'manager'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id    = token.id as string
        session.user.email = token.email as string
        session.user.name  = token.name as string
        session.user.role  = 'manager'
      }
      return session
    },
  },
  pages: { signIn: '/crm/login' },
  secret: process.env.NEXTAUTH_SECRET,
})
