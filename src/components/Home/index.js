import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import StoriesList from '../StoriesList'
import PostsList from '../PostsList'
import Search from '../Search'

import './index.css'

const statusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    responseStatus: statusConst.initial,
    searchResult: [],
    searchView: false,
    searchValue: '',
  }

  onSearchSuccess = data => {
    const updatedPosts = data.map(eachPost => ({
      postId: eachPost.post_id,
      userId: eachPost.user_id,
      userName: eachPost.user_name,
      profilePic: eachPost.profile_pic,
      postDetails: {
        imageUrl: eachPost.post_details.image_url,
        caption: eachPost.post_details.caption,
      },
      likesCount: eachPost.likes_count,
      comments: eachPost.comments.map(eachComment => ({
        userName: eachComment.user_name,
        userId: eachComment.user_id,
        comment: eachComment.comment,
      })),
      createdAt: eachPost.created_at,
    }))
    this.setState({
      searchResult: updatedPosts,
      responseStatus: statusConst.success,
    })
  }

  getSearchResult = async searchValue => {
    if (searchValue !== '') {
      this.setState({responseStatus: statusConst.inProgress, searchValue})

      const jwtToken = Cookies.get('jwt_token')
      const searchApi = `https://apis.ccbp.in/insta-share/posts?search=${searchValue}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      const response = await fetch(searchApi, options)
      const data = await response.json()

      if (response.ok) {
        this.onSearchSuccess(data.posts)
      } else {
        this.setState({responseStatus: statusConst.failure})
      }
    }
    return null
  }

  onToggleSearchScreen = () =>
    this.setState({responseStatus: statusConst.success, searchView: true})

  onShowHomeScreen = () =>
    this.setState({responseStatus: statusConst.initial, searchView: false})

  renderSearchView = () => {
    const {searchResult, responseStatus, searchView} = this.state
    return (
      <Search
        searchResult={searchResult}
        searchView={searchView}
        responseStatus={responseStatus}
      />
    )
  }

  renderPostAndStories = () => (
    <>
      <StoriesList />
      <PostsList />
    </>
  )

  // Change data-testid to testid for testing
  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => {
    const {searchValue} = this.state

    return (
      <div className="failure-container">
        <img
          className="failure-img"
          src="https://res.cloudinary.com/dem9u6dox/image/upload/v1677758755/Group_7522_wrwjzj.png"
          alt="failure view"
        />
        <p className="went-wrong-text">
          Something went wrong. Please try again
        </p>
        <button
          className="try-again-btn"
          type="button"
          onClick={() => this.getSearchResult(searchValue)}
        >
          Try again
        </button>
      </div>
    )
  }

  renderHomeView = () => {
    const {responseStatus} = this.state

    switch (responseStatus) {
      case statusConst.inProgress:
        return this.renderLoader()
      case statusConst.success:
        return this.renderSearchView()
      case statusConst.failure:
        return this.renderFailureView()
      default:
        return this.renderPostAndStories()
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header
          getSearchResult={this.getSearchResult}
          onToggleSearchScreen={this.onToggleSearchScreen}
          onShowHomeScreen={this.onShowHomeScreen}
        />
        <div className="home-responsive-container">{this.renderHomeView()}</div>
      </div>
    )
  }
}

export default Home
