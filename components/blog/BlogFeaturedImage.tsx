import Image from 'next/image'

interface BlogFeaturedImageProps {
  src: string
  alt: string
  caption?: string
}

export function BlogFeaturedImage({ src, alt, caption }: BlogFeaturedImageProps) {
  return (
    <section className="container -mt-4 mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={675}
            className="w-full h-auto"
            priority
          />
        </div>
        {caption ? (
          <p className="text-sm text-gray-500 text-center mt-3">{caption}</p>
        ) : null}
      </div>
    </section>
  )
}
