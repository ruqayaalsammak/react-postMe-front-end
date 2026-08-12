  import { useState, useEffect } from 'react'
  import { useParams, useNavigate } from 'react-router'
  import * as postService from '../services/posts'
  import * as commentsService from '../services/comments'

  const CommentForm = (props) => {
  const navigate = useNavigate()
    const { postId, commentId} = useParams();
    console.log(postId, commentId);
    const initialState = {
      text: ''
    }
    const [formData, setFormData] = useState(initialState)

    useEffect(() => {
     const fetchPost = async () => {
         const postData = await postService.show(postId)
         console.log(postData)
         const foundComment = postData.comments.find((comment) => {
             return comment._id === commentId
         })
         setFormData(foundComment)
     }
     if (postId && commentId) fetchPost()
 }, [postId, commentId])

    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

   const handleSubmit = (evt) => {
     evt.preventDefault()
     if (postId && commentId) {
         commentsService.updat(postId, commentId, formData)
         navigate(`/posts/${postId}`)
     } else {
         props.handleAddComment(formData)
     }
     setFormData(initialState)
 }

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor='text-input'>Your comment:</label>
        <textarea
          required
          type='text'
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        <button type='submit'>SUBMIT COMMENT</button>
      </form>
    )
  }

  export default CommentForm
