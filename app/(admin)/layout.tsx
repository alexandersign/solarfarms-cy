import { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Admin Dashboard | SolarFarms.cy',
  description: 'Admin dashboard for managing leads and land assessments',
  robots: 'noindex, nofollow'
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
