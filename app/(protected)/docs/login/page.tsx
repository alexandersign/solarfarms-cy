'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect deprecated /docs/login to /internal-docs/login
export default function DocsLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/internal-docs/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-gray-400 text-sm">Redirecting...</p>
    </div>
  );
}
