import { useQuery } from '@apollo/client'
import { initializeApollo } from '../src/apollo'
import { fetchStoriesQuery } from '../src/queries/StoryQueries'
import Preloader from '../components/Preloader'
import Link from 'next/link'

export default function Home() {

  const { loading, error, data } = useQuery(fetchStoriesQuery);

  if (loading) {
    return <Preloader />
  }

  if (error) {
    M.toast({ html: error.message });
  }

  const { stories } = data;

  return (
    <div className='container'>
      <h3>Stories</h3>
      <ul className="collection">
        {stories.map(story => <li className='collection-item' key={story._id}>
          <Link as={`/story/${story._id}`} href='/story/[id]'>
            <a>
              {story.title}
            </a>
          </Link>
        </li>)}
      </ul>
    </div>
  )
}



export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: fetchStoriesQuery
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  }
}