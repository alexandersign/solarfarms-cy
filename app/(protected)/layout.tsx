import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internal Documents — Lighthief Energy',
  robots: 'noindex, nofollow', // Prevent search engine indexing
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
