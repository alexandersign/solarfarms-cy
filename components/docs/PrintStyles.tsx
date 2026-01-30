'use client';

export function PrintStyles() {
  return (
    <style jsx global>{`
      @media print {
        header, footer {
          display: none !important;
        }
        main {
          padding: 0 !important;
          max-width: none !important;
        }
        .bg-gray-900 {
          background: white !important;
        }
      }
    `}</style>
  );
}
