import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landowners - Leverage Your Land for Solar Revenue | Lighthief Cyprus',
  description: 'Transform your Cyprus land into profitable solar farms. Free instant assessment, RTB development, €15K-80K annual lease or €200K-2M sale premium. Upload title deed for analysis.',
  keywords: [
    'Cyprus land solar development',
    'solar farm land lease',
    'land for solar Cyprus',
    'solar development Cyprus',
    'RTB ready to build',
    'land assessment solar',
    'Cyprus plot solar potential',
  ],
}

export default function LandownersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
