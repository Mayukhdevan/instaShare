import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
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
  state = {
    storiesList: [],
    storiesStatus: statusConst.initial,
    postsList: [],
    postsStatus: statusConst.initial,
  }

  componentDidMount() {
    const mainFunc = async () => {
      this.getStories()
      this.getPosts()
    }
    mainFunc()
  }

  getStories = async () => {
    this.setState({storiesStatus: statusConst.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const storiesApi = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(storiesApi, options)
    const data = await response.json()

    if (response.ok) {
      this.onResponseStoriesSuccess(data)
    } else {
      this.setState({storiesStatus: statusConst.failure})
    }
  }

  onResponseStoriesSuccess = data => {
    const updatedStories = data.users_stories.map(eachStory => ({
      userId: eachStory.user_id,
      userName: eachStory.user_name,
      storyUrl: eachStory.story_url,
    }))

    this.setState({
      storiesList: updatedStories,
      storiesStatus: statusConst.success,
    })
  }

  getPosts = async () => {
    this.setState({postsStatus: statusConst.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const postsApi = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(postsApi, options)
    const data = await response.json()

    if (response.ok) {
      this.onResponsePostsSuccess(data)
    } else {
      this.setState({postsStatus: statusConst.failure})
    }
  }

  onResponsePostsSuccess = data => {
    const updatedPosts = data.posts.map(eachPost => ({
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
      postsList: updatedPosts,
      postsStatus: statusConst.success,
    })
  }

  // Render the posts based on status if stories api succeeds
  renderPostsView = () => {
    const {postsList, postsStatus} = this.state

    switch (postsStatus) {
      case statusConst.inProgress:
        return this.renderPostsLoader()
      case statusConst.success:
        return <PostsList postsList={postsList} />
      case statusConst.failure:
        return (
          <>
            <img
              className="post-error-img"
              src="https://res.cloudinary.com/dem9u6dox/image/upload/v1677764087/alert-triangle_kppqoh.png"
              alt="failure view"
            />
            <p className="post-went-wrong-text">
              Something went wrong. Please try again.
            </p>
            <button
              className="try-again-btn"
              type="button"
              onClick={this.getPosts}
            >
              Try again
            </button>
          </>
        )
      default:
        return null
    }
  }

  renderPostsLoader = () => (
    // Change data-testid to testid for testing
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  // Render Home page content if stories api succeeds
  renderContent = () => {
    const {storiesList} = this.state

    return (
      <>
        <StoriesList storiesList={storiesList} />
        {this.renderPostsView()}
      </>
    )
  }

  // Render Loader if api is still fetching
  renderStoriesLoader = () => (
    // Change data-testid to testid for testing
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  // Render failure view if stories api fails
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

  // conditional rendering
  renderHomeView = () => {
    const {storiesStatus} = this.state

    switch (storiesStatus) {
      case statusConst.inProgress:
        return this.renderStoriesLoader()
      case statusConst.success:
        return this.renderContent()
      case statusConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="responsive-container">{this.renderHomeView()}</div>
      </div>
    )
  }
}

export default Home
