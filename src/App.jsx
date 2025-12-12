import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Post from './pages/Post.jsx'
import Blogs from './pages/Blogs.jsx'
import UserInfo from './pages/UserInfo.jsx'
import Users from './pages/Users.jsx'
import './App.css'

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<UserInfo />} />
       
      </Routes>
      </main>
      <Footer />
      
    </BrowserRouter>
  )
}

export default App
