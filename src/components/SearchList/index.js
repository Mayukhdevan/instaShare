import PostItem from '../PostItem'
import './index.css'

const SearchList = props => {
  const {searchList} = props
  return (
    <ul className="posts-list-container">
      {searchList.map(eachPost => (
        <PostItem key={eachPost.postId} postItem={eachPost} />
      ))}
    </ul>
  )
}

export default SearchList
