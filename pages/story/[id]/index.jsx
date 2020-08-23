import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import { fetchSingleStoryQuery, fetchStoriesQuery, deleteStoryQuery } from '../../../src/queries/StoryQueries'
import Preloader from '../../../components/Preloader'
import EditStory from '../../../components/EditStory'
import axios from 'axios';
import { server } from '../../../src/server'

const SingleStory = ({ user }) => {

    const router = useRouter();
    const { query: { id } } = router;

    const { loading, error, data } = useQuery(fetchSingleStoryQuery, {
        variables: {
            id
        }
    });

    const [deleteStory, mutationRes] = useMutation(deleteStoryQuery, {
        refetchQueries: [{
            fetchStoriesQuery
        }]
    });

    if (error) {
        console.error(error)
        M.toast({ html: error.message });
    }

    if (loading) {
        return <Preloader />
    }

    const { story, story: { title, description } } = data;

    return (
        <div className='container'>
            <h3>
                {title}
            </h3>
            <p className="flow-text">
                {description}
            </p>

            {user && story && (story.user.toString() === user.getMe._id.toString()) ? <Fragment>
                <EditStory story={data.story} />
            </Fragment> : null}
        </div>
    )
}

export default SingleStory;

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