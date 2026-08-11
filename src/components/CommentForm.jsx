  import { useState } from 'react'

  const CommentForm = (props) => {
    const initialState = {
      text: ''
    }
    const [formData, setFormData] = useState(initialState)

    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
      evt.preventDefault()
      // add handleAddComment
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
