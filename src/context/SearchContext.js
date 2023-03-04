import React from 'react'

const SearchContext = React.createContext({
  searchResultsList: [],
  updateSearchData: () => {},
})

export default SearchContext
