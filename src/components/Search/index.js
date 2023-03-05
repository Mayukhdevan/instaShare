import SearchList from '../SearchList'
import './index.css'

const Search = props => {
  const {searchResult, searchView} = props

  if (searchResult.length === 0 && searchView) {
    return (
      <div className="responsive-container">
        <img
          className="search-img"
          src="https://res.cloudinary.com/dem9u6dox/image/upload/v1678002895/Frame_1473_ytf8m2.png"
          alt="search icon"
        />
        <p className="no-search-text">Search Results will be appear here</p>
      </div>
    )
  }
  if (searchResult.length === 0) {
    return (
      <div className="responsive-container">
        <img
          className="search-not-found-img"
          src="https://res.cloudinary.com/dem9u6dox/image/upload/v1678003497/Group_iftyiu.png"
          alt="search not found"
        />
        <h1 className="search-not-found-text">Search Not Found</h1>
        <p className="search-not-found-para">
          Try different keyword or search again
        </p>
      </div>
    )
  }
  return (
    <div className="search-route-container">
      <div className="responsive-container">
        <h1 className="search-result-heading">Search Results</h1>
        <SearchList searchList={searchResult} />
      </div>
    </div>
  )
}

export default Search
