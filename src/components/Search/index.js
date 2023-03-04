import Header from '../Header'
import PostsList from '../PostsList'
import './index.css'

const Search = () => (
  <div className="search-route-container">
    {/* <Header /> */}
    <div className="responsive-container">
      <h1 className="search-result-heading">Search Results</h1>
      {/* <PostsList postsList={searchResultList} /> */}
    </div>
  </div>
)

export default Search
