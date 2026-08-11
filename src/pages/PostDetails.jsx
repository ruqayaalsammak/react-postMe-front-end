// src/pages/PostDetails.jsx

import { Form, useNavigate, useParams } from "react-router"
import * as postService from '../services/posts'
import { useState, useEffect } from "react"
import CommentForm from "../components/CommentForm"

const PostDetails = (props) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({});

    // console.log('postId: ', postId)
useEffect(() => {
    const fetchPost = async () => {
        const postData = await postService.show(postId)

        setPost(postData)
    }
    fetchPost()
}, [postId])

const handleAddComment = async (formData) => {
    console.log('formData: ', formData)
}


if (!post) return <main>Loading...</main>
//   console.log('post state:', post)


    return (
    <article className="card post-card">
        <header className="post-header">
           <span className="post-category">{post.category?.toUpperCase()}</span> 
           <h2>{post.title}</h2>
           <p className="post-author">
            Posted by {post.author?.username || 'Unknown user'} on <span>{new Date(post.createdAt).toLocaleDateString()}</span>
           </p>
           {post.author?._id === props.user?._id && (
            <div className="actions">
            <button onClick={() => navigate(`/posts/${postId}/edit`)}>Edit</button>
            <button onClick={() => props.handleDeletePost(postId)}>Delete</button>
            </div>
           )}
        </header>
        <p className="post-text">{post.text}</p>
        <footer className="post-footer">
        {/* All updates are in the comments section! */}
        <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!post.comments.length && <p>There are no comments.</p>}

        {post.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>{`${comment.author.username} posted on ${new Date(comment.createdAt).toLocaleDateString()}`}</p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
        </footer>
    </article>
    

    )
}

export default PostDetails

