import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Post from './pages/Post.jsx'
import Posts from './pages/Posts.jsx'
import Users from './pages/Users.jsx'
import './App.css'

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/users' element={<Users />} />
        <Route path='/post/:id' element={<Post />} />
      </Routes>
      </main>
      <Footer />
      
    </BrowserRouter>
  )
}

export default App
