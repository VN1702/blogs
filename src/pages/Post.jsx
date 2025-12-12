import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function Post() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [author, setAuthor] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(r => r.json())
      .then(postData => {
        setPost(postData)
        return Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`).then(r => r.json()),
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(r => r.json())
        ])
      })
      .then(([userData, commentsData]) => {
        setAuthor(userData)
        setComments(commentsData)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!post) return <p>Post not found</p>

  return (
    <article className="post-detail">
      <h2>{post.title}</h2>
      <p className="author">By: <strong>{author?.name}</strong> ({author?.email})</p>
      <p className="body">{post.body}</p>
      
      <section className="comments">
        <h3>Comments ({comments.length})</h3>
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
            <small>{comment.email}</small>
          </div>
        ))}
      </section>
      
      <Link to="/posts">Back to Posts</Link>
    </article>
  )
}