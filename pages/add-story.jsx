import React from 'react'

const add = () => {
    return (
        <div>
            
        </div>
    )
}

export default add


// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useRouter } from 'next/router'
// import { addStoryQuery, fetchStoriesQuery } from '../utils/queries/Story'
// import { useMutation } from '@apollo/client'
// import Preloader from '../components/Preloader'
// import DisplayError from '../components/DisplayError'

// const AddStory = () => {

//     const router = useRouter();

//     const [submitting, setSubmitting] = useState(false);

//     const { handleSubmit, errors, register } = useForm();

//     const [addStory, { loading, error, data }] = useMutation(addStoryQuery);

//     const onAdd = ({ title, description }) => {

//         setSubmitting(true);

//         addStory({
//             variables: {
//                 title,
//                 description
//             },
//             refetchQueries: [{
//                 query: fetchStoriesQuery
//             }],
//         }).catch(err => M.toast({ html: err }));

//         setSubmitting(false);
//     }

//     if (loading) {
//         return <Preloader />
//     }

//     if (data) {
//         M.toast({ html: 'Story added!' });
//         router.push('/');
//     }

//     return (
//         <div className='container'>
//             <h1>Add Story</h1>
//             <form onSubmit={handleSubmit(onAdd)}>
//                 <div className="input-field">
//                     <input type="text" name='title' ref={register({
//                         required: 'Required'
//                     })} />
//                     <label htmlFor="title">Title</label>
//                     {errors.title ? <span className="red-text helper-text">
//                         {errors.title.message}
//                     </span> : null}
//                 </div>
//                 <div className="input-field">
//                     <input type="text" name='description' ref={register({
//                         required: 'Required'
//                     })} />
//                     <label htmlFor="description">Description</label>
//                     {errors.description ? <span className="red-text helper-text">
//                         {errors.description.message}
//                     </span> : null}
//                 </div>
//                 <div className="input-field">
//                     <button disabled={submitting} type="submit" className='btn red'>
//                         Add Story
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default AddStory
