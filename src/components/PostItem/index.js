import './index.css'

const PostItem = props => {
  const {postItem} = props
  const {userName, profile} = postItem

  return (
    <li className="post-item">
      <div className="post-avatar-title">
        <img className="post-avatar" src={} alt="" />
        <p className="post-title">{}</p>
      </div>
    </li>
  )
}

export default PostItem
