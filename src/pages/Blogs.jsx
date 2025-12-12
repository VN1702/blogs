import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState({})
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()),
      fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json())
    ])
      .then(([postsData, usersData]) => {
        setPosts(postsData)
        const map = {}
        usersData.forEach(u => (map[u.id] = u))
        setUsers(map)
        setLoading(false)
      })
  }, [])

  const filtered = posts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p>Loading posts...</p>

  return (
    <div>
      <h2>All Posts</h2>
      <input 
        type="text" 
        placeholder="Search posts..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <ul className="posts-list">
        {filtered.map(p => (
          <li key={p.id} className="post-card">
            <h3><Link to={`/post/${p.id}`}>{p.title}</Link></h3>
            <p>{p.body.slice(0, 100)}...</p>
            <small>By: {users[p.userId]?.name || 'Unknown'}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}