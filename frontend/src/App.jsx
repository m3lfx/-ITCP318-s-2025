import React, {useEffect, useState} from 'react'

import './App.css'
import Title from './Title'
import Nav from './Nav'
import Create from './Create'
import { Link } from 'react-router-dom';

import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([])

  const fetchPosts = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API}posts`)
      .then(response => {
        console.log(response);
        setPosts(response.data);
      })
      .catch(error => alert('Error fetching posts'));
  }

  useEffect(() => {
    fetchPosts();
  }, [])
  console.log(posts)
  return (
   <div className="App">

      {posts.length > 0 ? posts.map((post) => (
        <div className="row" key={post._id} style={{ borderBottom: '1px solid silver' }}>
          <div className="col pt-3 pb-2">
            <Link to={`/post/${post.slug}`}>
              <h2>{post.title}</h2>
            </Link>
            <p className="lead">{post.content.substring(0, 100)}</p>
            <p>
              Author <span className="badge" style={{ color: 'red'}}>{post.user}</span> Published on{' '}
              <span className="badge" style={{ color: 'red'}}>{new Date(post.createdAt).toLocaleString()}</span>
            </p>
           
          </div>
        </div>
      )) : <h1>no posts</h1>}

    </div>
  )
}

export default App
