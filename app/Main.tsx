import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 25

export default function Home({ posts }) {
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach((tag: string) => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {})
  const allTags = Object.keys(tagCounts)
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-1 pb-1">
          <h1 className="text-xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10 md:text-2xl md:leading-14 dark:text-gray-100">
            Matt Du-Feu's TIL
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
          <p>
            Search is provided by the excellent{' '}
            <Link
              className="text-blue-400 hover:underline dark:text-blue-100"
              href="https://github.com/timc1/kbar"
            >
              kbar
            </Link>{' '}
            (press ctrl+k) or browse by tag:
          </p>
          <div className="mt-4">
            {allTags.map((tag, index) => (
              <span key={tag}>
                {index > 0 && ' - '}
                <Link
                  href={`/tags/${tag}`}
                  className="text-blue-400 hover:underline dark:text-blue-100"
                >
                  {tag} ({tagCounts[tag]})
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="pt-4 text-xl leading-8 font-bold tracking-tight">Recent TILs</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-4">
                <article>
                  <div className="space-y-2">
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <div>
                          <h2 className="text-xl leading-8 font-bold tracking-tight">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                            <Link
                              href={`/til/${slug}`}
                              className="text-blue-400 dark:text-blue-100"
                            >
                              {title}
                            </Link>
                            <span>
                              {' '}
                              - <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                            </span>
                          </h2>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/til"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
