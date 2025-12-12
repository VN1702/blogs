import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <h2>Welcome to Blogs</h2>
      <p>Explore amazing blog posts and meet the authors behind them.</p>
      <div className="home-links">
        <Link to="/posts" className="btn">View All Blogs</Link>
        <Link to="/users" className="btn">View All Users</Link>
      </div>
    </div>
  )
}