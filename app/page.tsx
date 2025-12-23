import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allTils } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allTils)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
