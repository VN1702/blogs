import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(r => r.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p>Loading users...</p>

  return (
    <div>
      <h2>All Users</h2>
      <input 
        type="text" 
        placeholder="Search users..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <ul className="users-list">
        {filtered.map(u => (
          <li key={u.id} className="user-card">
            <h3>{u.name}</h3>
            <p><strong>@{u.username}</strong></p>
            <p>Email: {u.email}</p>
            <p>Phone: {u.phone}</p>
            <p>Website: <a href={`http://${u.website}`} target="_blank" rel="noreferrer">{u.website}</a></p>
          </li>
        ))}
      </ul>
    </div>
  )
}