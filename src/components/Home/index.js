import {Component} from 'react'
import Header from '../Header'
import StoriesList from '../StoriesList'
import PostsList from '../PostsList'

import './index.css'

const statusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {}

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dem9u6dox/image/upload/v1677758755/Group_7522_wrwjzj.png"
        alt="failure view"
      />
      <p className="went-wrong-text">Something went wrong. Please try again</p>
      <button className="try-again-btn" type="button" onClick={this.getStories}>
        Try again
      </button>
    </div>
  )

  // getSearchResult = async searchValue => {
  //   this.setState({searchView: true})

  //   const jwtToken = Cookies.get('jwt_token')
  //   const searchApi = `https://apis.ccbp.in/insta-share/posts?search=${searchValue}`
  //   const options = {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //   }

  //   const response = await fetch(searchApi, options)
  //   const data = await response.json()

  //   if (response.ok) {
  //     this.onSearchSuccess(data)
  //   }

  //   return 'Failed'
  // }

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="home-responsive-container">
          <StoriesList />
          <PostsList />
        </div>
      </div>
    )
  }
}

export default Home
