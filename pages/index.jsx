import { useQuery } from '@apollo/client'
import { initializeApollo } from '../src/apollo'
import { fetchStoriesQuery } from '../src/queries/StoryQueries'
import Preloader from '../components/Preloader'

export default function Home() {

  const { loading, error, data } = useQuery(fetchStoriesQuery);

  if (loading) {
    return <Preloader />
  }

  if(error){
    M.toast({ html: error.message });
  }

  const { stories } = data;

  return (
    <div className='container'>
      <h3>Stories</h3>
      <ul className="collection">
        {stories.map(story => <li className='collection-item' key={story._id}>
          {story.title}
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