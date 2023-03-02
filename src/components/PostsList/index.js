import PostItem from '../PostItem'

import './index.css'

const PostsList = props => {
  const {postsList} = props

  return (
    <ul className="posts-list-container">
      {postsList.map(eachPost => (
        <PostItem key={eachPost.postId} postItem={eachPost} />
      ))}
    </ul>
  )
}

export default PostsList
