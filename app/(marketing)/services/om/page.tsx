import { redirect } from 'next/navigation'

// Redirect legacy /services/om to canonical /services/om-management
export default function OmRedirect() {
  redirect('/services/om-management')
}
