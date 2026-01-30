'use client';

export function ExportPdfButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm rounded transition-colors"
    >
      Export PDF
    </button>
  );
}
