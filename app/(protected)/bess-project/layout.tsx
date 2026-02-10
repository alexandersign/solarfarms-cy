import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BESS Project Timeline — Lighthief Energy',
  robots: 'noindex, nofollow',
};

export default function BessProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
