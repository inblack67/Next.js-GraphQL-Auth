import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { fetchStoriesQuery, updateStoryQuery } from '../src/queries/StoryQueries'
import Preloader from './Preloader';
import { useRouter } from 'next/router';
import axios from 'axios';
import { server } from '../src/server';


const EditStory = ({ story }) => {

    const router = useRouter();

    const { query: { id } } = router;

    const [submitting, setSubmitting] = useState(false);

    const { handleSubmit, errors, register } = useForm({
        defaultValues: {
            title: story.title,
            description: story.description
        }
    });

    const [updateStory, { loading, data, error }] = useMutation(updateStoryQuery);

    const onStoryUpdate = ({ title, description }) => {
        setSubmitting(true);
        updateStory({
            variables: {
                id,
                title,
                description
            },
            refetchQueries: [{
                query: fetchStoriesQuery
            }],
        }).then(() => {
            M.toast({ html: 'Story updated!' });
            router.push(`/`);
        }).catch(err => {
            M.toast({ html: err });
        });
        setSubmitting(false);
    }

    if (loading) {
        return <Preloader />
    }

    if (error) {
        M.toast({ html: error.message });
    }

    return (
        <div>
            <h3>Edit Story</h3>
            <form onSubmit={handleSubmit(onStoryUpdate)}>
                <div className="input-field">
                    <input type="text" name='title' ref={register({
                        required: 'Required'
                    })} />
                    <label htmlFor="title"></label>
                    {errors.title ? <span className="red-text helper-text">
                        {errors.title.message}
                    </span> : <span className='helper-text'>
                            Title</span>}
                </div>
                <div className="input-field">
                    <input type="text" name='description' ref={register({
                        required: 'Required'
                    })} />
                    <label htmlFor="description"></label>
                    {errors.description ? <span className="red-text helper-text">
                        {errors.description.message}
                    </span> : <span className='helper-text'>
                            Description</span>}
                </div>
                <div className="input-field">
                    <button disabled={submitting} type="submit" className='blue btn'>
                        Update Story
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditStory;