'use client'

export function CriticalCSS() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          /* Critical above-the-fold styles */
          html { scroll-behavior: smooth; }
          body { 
            margin: 0; 
            font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            color: hsl(222.2 84% 4.9%);
            background-color: hsl(0 0% 100%);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Critical layout styles */
          .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 0 1rem; 
          }
          
          /* Critical button styles for above-the-fold CTA */
          .btn-primary {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            transition: transform 0.2s ease;
          }
          
          .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
          }
          
          /* Hero section critical styles */
          .hero-section {
            min-height: 80vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
            color: white;
          }
          
          /* Critical heading styles */
          h1 {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 700;
            line-height: 1.2;
            margin: 0 0 1rem 0;
            font-family: var(--font-poppins), sans-serif;
          }
          
          h2 {
            font-size: clamp(1.5rem, 4vw, 2.5rem);
            font-weight: 600;
            line-height: 1.3;
            margin: 0 0 0.75rem 0;
            font-family: var(--font-poppins), sans-serif;
          }
          
          /* Critical navigation styles */
          nav {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            position: sticky;
            top: 0;
            z-index: 50;
            border-bottom: 1px solid rgba(229, 231, 235, 0.8);
          }
          
          /* Critical responsive grid */
          .grid-responsive {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: 1fr;
          }
          
          @media (min-width: 768px) {
            .container { padding: 0 1.5rem; }
            .grid-responsive { grid-template-columns: repeat(2, 1fr); }
          }
          
          @media (min-width: 1024px) {
            .container { padding: 0 2rem; }
            .grid-responsive { grid-template-columns: repeat(3, 1fr); }
          }
          
          /* Prevent layout shift */
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
          
          /* Critical loading states */
          .loading-skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
          
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `,
      }}
    />
  )
}
