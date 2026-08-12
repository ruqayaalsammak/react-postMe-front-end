// src/pages/HootList.jsx

import { Link } from "react-router"

const PostList = (props) => {
  
  return (
    <main className="post-list">
      {props.posts.map((post) => (
        <Link key={post._id} to={`/posts/${post._id}`}>
            <article className="card">
               <header>
                <span className="post-category">
                    {post.category ? post.category.toUpperCase(): "none"}
                </span>
                <h2>{post.title}</h2>
                <p className="post-author">
                    Posted by {post.author?.username || 'Unknown user'}
                </p>
               </header>
               <p className="post-text">{post.text}</p>
               <footer className="post-footer">
               <span>{new Date(post.createdAt).toLocaleDateString()}</span>
               <span>{post.comments?.length || 0} comments</span>
               </footer>
            </article>
        </Link>
      ))}
    </main>
  )
}

export default PostList
