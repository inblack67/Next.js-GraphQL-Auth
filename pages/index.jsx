import { useQuery } from '@apollo/client'
import { initializeApollo } from '../src/apollo'
import { fetchStoriesQuery } from '../src/queries/StoryQueries'
import { fetchMeQuery } from '../src/queries/UserQueries'
import Preloader from '../components/Preloader'
import Link from 'next/link'
import { createApolloFetch } from 'apollo-fetch';
import { server } from '../src/server';
import axios from 'axios';

export default function Home({ user }) {

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

          {user && (user.getMe._id.toString() === story.user.toString()) && <Link as={`/story/${story._id}`} href='/story/[id]'>
            <a className='secondary-content'>
              <i className="material-icons">edit</i>
            </a>
          </Link>}

        </li>)}
      </ul>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {

  const cookie = ctx.req.headers.cookie;
  const config = {
    headers: {
      cookie: cookie ?? null
    }
  }

  const query = `
  {
    getMe{
      name,
      email,
      _id
    }
  }
  `;

  const data = JSON.stringify({ query })

  try {
    const res = await axios.post(`${server}/api/graphql`, data, config);
    console.log(res);
    return { props: { user: res.data.data } };
  } catch (err) {
    console.error(err);
    return { props: { user: null } };
  }

}


// export const getStaticProps = async () => {
//   const apolloClient = initializeApollo();
//   await apolloClient.query({
//     query: fetchStoriesQuery
//   });
//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract()
//     }
//   }
// }