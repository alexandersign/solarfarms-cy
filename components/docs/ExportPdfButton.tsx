'use client';

interface ExportPdfButtonProps {
  filename?: string;
}

export function ExportPdfButton({ filename }: ExportPdfButtonProps) {
  const handleExport = () => {
    // For HTML documents, open in new window and print
    if (filename?.endsWith('.html')) {
      // Get the iframe element
      const iframe = document.querySelector('iframe') as HTMLIFrameElement;
      if (iframe?.contentWindow) {
        iframe.contentWindow.print();
        return;
      }
    }
    
    // Fallback: print current window
    window.print();
  };

  const handleOpenNewTab = () => {
    if (filename) {
      // Open the raw HTML in a new tab for better printing
      window.open(`/api/internal-docs/${encodeURIComponent(filename)}`, '_blank');
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExport}
        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm rounded transition-colors"
      >
        Print
      </button>
      {filename?.endsWith('.html') && (
        <button
          onClick={handleOpenNewTab}
          className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
        >
          Open Full Page
        </button>
      )}
    </div>
  );
}
