import React from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import { fetchSingleStoryQuery, deleteStoryQuery, fetchStoriesQuery } from '../../../src/queries/Story'
import Preloader from '../../../components/Preloader'
import DisplayError from '../../../components/DisplayError'
import EditStory from '../../../components/EditStory'

const SingleStory = () => {

    const router = useRouter();

    const { data, loading, error } = useQuery(fetchSingleStoryQuery, {
        variables: {
            id: router.query.id
        }
    });

    const [deleteStory, mutationResponse] = useMutation(deleteStoryQuery);

    if (loading) {
        return <Preloader />
    }

    if (error) {
        M.toast({ html: error.message });
        return <DisplayError message={error.message} />
    }

    const { story, story: { title, description, _id } } = data;

    const onDelete = async e => {
        deleteStory({
            refetchQueries: [{
                query: fetchStoriesQuery
            }],
            variables: {
                id: _id
            }
        }).catch(err => M.toast({ html: err }));
    }

    if(mutationResponse.data){
        M.toast({ html: 'Story deleted' })
        router.push('/');
    }

    return (
        <div className='container'>
            <h3>
                {title}
            </h3>
            <p className="flow-text">
                {description}
            </p>
            <button className="btn red" onClick={onDelete}>
                <i className="material-icons left">delete</i> Delete
            </button>
            <EditStory story={story} />
        </div>
    )
}

export default SingleStory;


