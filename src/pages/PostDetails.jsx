// src/pages/PostDetails.jsx

import { useParams } from "react-router"
import * as postService from '../services/posts'
import { useState, useEffect } from "react"

const PostDetails = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({});

    console.log('postId: ', postId)
useEffect(() => {
    const fetchPost = async () => {
        const postData = await postService.show(postId)

        setPost(postData)
    }
    fetchPost()
}, [postId])

if (!post) return <main>Loading...</main>
//   console.log('post state:', post)


    return (
    <h1>Post Details</h1>
    

    )
}

export default PostDetails

