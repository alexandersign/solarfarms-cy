import { redirect } from 'next/navigation'

// Redirect legacy /services/epc to canonical /services/epc-services
export default function EpcRedirect() {
  redirect('/services/epc-services')
}
