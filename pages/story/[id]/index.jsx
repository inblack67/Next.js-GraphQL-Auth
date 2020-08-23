import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { fetchSingleStoryQuery, fetchStoriesQuery } from '../../../src/queries/StoryQueries'
import { fetchStoryAndUser } from '../../../src/queries/MultipleQueries'
import { fetchMeQuery } from '../../../src/queries/UserQueries'
import Preloader from '../../../components/Preloader'

const SingleStory = () => {

    const router = useRouter();
    const { query: { id } } = router;

    const { loading, error, data } = useQuery(fetchSingleStoryQuery, {
        variables: {
            id
        }
    });

    if (error) {
        M.toast({ html: error.message });
    }

    if (loading) {
        return <Preloader />
    }

    const onDelete = async e => {
        console.log(`delete me`);
    }

    const { story: { title, description } } = data;

    console.log(data);

    return (
        <div className='container'>
            <h3>
                {title}
            </h3>
            <p className="flow-text">
                {description}
            </p>
            {/* {_id.toString() === '123' ? <button className='btn red' onClick={onDelete}>
                Delete
            </button> : null} */}
        </div>
    )
}

export default SingleStory;