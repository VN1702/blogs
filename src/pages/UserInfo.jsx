import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function User() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('User not found')
        return r.json()
      })
      .then(userData => {
        setUser(userData)
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`).then(r => r.json())
          .then(postsData => {
            setPosts(postsData || [])
            // If no posts, no comments on those posts
            if (!postsData || postsData.length === 0) {
              setComments([])
              setLoading(false)
              return
            }
            // Fetch comments for each post and flatten
            return Promise.all(postsData.map(p => fetch(`https://jsonplaceholder.typicode.com/posts/${p.id}/comments`).then(r => r.json())))
              .then(commentsArrays => {
                const flat = (commentsArrays || []).flat()
                setComments(flat)
                setLoading(false)
              })
          })
      })
      .catch(err => {
        setError(err.message || 'Failed to load')
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading user...</p>
  if (error) return <p>Error: {error}</p>
  if (!user) return <p>User not found</p>

  return (
    <div>
      <Link to="/users">&larr; Back to users</Link>
      <h2>{user.name} <small style={{fontWeight: 400}}>(@{user.username})</small></h2>
      <p>Email: {user.email} — Phone: {user.phone}</p>
      <p>Website: <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>

      <section style={{marginTop: 20}}>
        <h3>Posts ({posts.length})</h3>
        {posts.length === 0 ? <p>No posts</p> : (
          <ul className="posts-list">
            {posts.map(p => (
              <li key={p.id} className="post-card">
                <h4><Link to={`/post/${p.id}`}>{p.title}</Link></h4>
                <p>{p.body.slice(0, 120)}...</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{marginTop: 20}}>
        <h3>Comments on posts by {user.name} ({comments.length})</h3>
        {comments.length === 0 ? <p>No comments on their posts</p> : (
          <div>
            {comments.map(c => (
              <div key={c.id} className="comment" style={{marginBottom: 12}}>
                <strong>{c.name}</strong>
                <div style={{whiteSpace: 'pre-wrap'}}>{c.body}</div>
                <small>{c.email}</small>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}