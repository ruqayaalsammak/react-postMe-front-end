const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts`

const create = async (postId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const deleteComment = async (postId, commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}/comments`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const update = async (postId, commentId, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}


export {
    create,
    deleteComment,
    update,
}