import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen } from 'lucide-react'
import type { JournalPost } from '@/lib/marketing/journal-posts'

export function JournalStrip({
  title = 'From our journal',
  subtitle = 'Guides and market analysis from the Lighthief team.',
  posts,
}: {
  title?: string
  subtitle?: string
  posts: JournalPost[]
}) {
  return (
    <section className="section-padding bg-gray-50" aria-labelledby="journal-strip-heading">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <Badge variant="outline" className="mb-3">
              <BookOpen className="w-3.5 h-3.5 mr-1" aria-hidden />
              Insights
            </Badge>
            <h2 id="journal-strip-heading" className="text-2xl md:text-3xl font-heading font-bold text-[#C9A432]">
              {title}
            </h2>
            <p className="text-gray-600 mt-2 max-w-xl">{subtitle}</p>
          </div>
          <Button variant="outline" asChild className="focus-visible:ring-2 focus-visible:ring-[#1A365D]">
            <Link href="/blog">
              All articles
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="hover:shadow-lg transition-shadow border-gray-200 h-full flex flex-col"
            >
              <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit text-xs mb-2">
                  {post.category}
                </Badge>
                <CardTitle className="text-lg leading-snug">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-[#1A365D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A365D] rounded"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-xs text-gray-500">{post.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-gray-600 flex-1">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm font-medium text-[#1A365D] mt-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A365D] rounded"
                >
                  Read article
                  <ArrowRight className="w-3.5 h-3.5 ml-1" aria-hidden />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
