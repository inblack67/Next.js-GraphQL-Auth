import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { addStoryQuery, fetchStoriesQuery } from '../src/queries/StoryQueries'
import { useMutation } from '@apollo/client'
import Preloader from '../components/Preloader'

const AddStory = () => {

    const [submitting, setSubmitting] = useState(false);

    const { handleSubmit, errors, register } = useForm();

    const [addStory, { loading, error, data }] = useMutation(addStoryQuery);

    const onAdd = ({ title, description }) => {

        setSubmitting(true);

        addStory({
            variables: {
                title,
                description
            },
            refetchQueries: [{
                query: fetchStoriesQuery
            }],
        }).then(() => {
            M.toast({ html: 'Story added!' })
            Router.push('/');
        }).catch(err => console.error(err));

        setSubmitting(false);
    }

    if (loading) {
        return <Preloader />
    }

    if(error){
        M.toast({ html: error.message });
    }

    return (
        <div className='container'>
            <h1>Add Story</h1>
            <form onSubmit={handleSubmit(onAdd)}>
                <div className="input-field">
                    <input type="text" name='title' ref={register({
                        required: 'Required'
                    })} />
                    <label htmlFor="title">Title</label>
                    {errors.title ? <span className="red-text helper-text">
                        {errors.title.message}
                    </span> : null}
                </div>
                <div className="input-field">
                    <input type="text" name='description' ref={register({
                        required: 'Required'
                    })} />
                    <label htmlFor="description">Description</label>
                    {errors.description ? <span className="red-text helper-text">
                        {errors.description.message}
                    </span> : null}
                </div>
                <div className="input-field">
                    <button disabled={submitting} type="submit" className='btn red'>
                        Add Story
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddStory
