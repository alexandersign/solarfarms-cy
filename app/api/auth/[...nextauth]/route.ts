import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

// Lighthief CRM users — identity only; password is the shared CRM_PASSWORD env var
export const CRM_USERS = [
  { id: '1', name: 'Zinovia',   email: 'zinovia@lighthief.com' },
  { id: '2', name: 'Alexander', email: 'alexander.papacosta@lighthief.com' },
  { id: '3', name: 'Office',    email: 'office@lighthief.com' },
  { id: '4', name: 'Costas',    email: 'costas@lighthief.com' },
]

const handler = NextAuth({
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
        return user ?? null
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id    = user.id
        token.name  = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string
        session.user.name  = token.name  as string
      }
      return session
    },
  },
  pages: { signIn: '/crm/login' },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
