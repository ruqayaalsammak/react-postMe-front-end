import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route } from "react-router"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import PostList from './pages/PostList';
import * as postService from './services/posts'
import { useState, useEffect } from 'react'
import { Link } from 'react-router';
import PostDetails from './pages/PostDetails';






const App = () => {

  const getUserFromToken = () => {
 const token = localStorage.getItem('token')

 if (!token) return null

 return JSON.parse(atob(token.split('.')[1])).payload
}
  const [user, setUser] = useState(getUserFromToken())

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await postService.index()
  
      // update to set state:
      setPosts(postsData)
    }
    if (user) fetchAllPosts()
  }, [user])

  // return statement code here


// src/App.jsx

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
        <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
        {user ? (
          <>
          <Route path='/posts' element={<PostList posts={posts} />} />
          <Route path='/posts/:postId' element={<PostDetails />} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
            <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
          </>
        )}
      </Routes>
      </main>
    </div>
  )

}

export default App