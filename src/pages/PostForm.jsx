import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import * as postService from '../services/posts'

const PostForm = (props) => {
    const { postId } = useParams()
    console.log(postId)
    const initialState = {
        title: '',
        text: '',
        category: 'General'
    }
    
    useEffect(() => {
    const fetchPost = async () => {
      const postData = await postService.show(postId);
      setFormData(postData)
    }
    if (postId) fetchPost()

    // Add a cleanup function
    return () => setFormData(initialState)
  }, [postId])





    const [formData, setFormData] = useState(initialState)
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        // console.log('formData', formData)
        props.handleAddPost(formData)
    }

    return (
        <main className='card'>
        <h1>{postId ? 'Edit Post' : 'New Post'}</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor='title-input'>Title</label>
        <input
        required
        type='text'
        name='title'
        id='title-input'
        value={formData.title}
        onChange={handleChange}
        />
        <label htmlFor='text-input'>Text</label>
        <textarea
        type='text'
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
        />
        <label htmlFor='category-input'>Category</label>
        <select
        required
        name='category'
        id='category-input'
        value={formData.category}
        onChange={handleChange}
        >
          <option value="News">News</option>
          <option value="Educational">Educational</option>
          <option value="Music">Music</option>
          <option value="General">General</option>
        </select>
        <button type="submit">SUBMIT</button>
        </form> 
        </main>
    )
}

export default PostForm;