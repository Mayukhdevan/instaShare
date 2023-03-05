import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileContent from '../ProfileContent'
import './index.css'

const statusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {userDetails: {}, resStatus: statusConst.initial}

  componentDidMount() {
    this.getMyProfile()
  }

  myProfileApiSuccess = data => {
    const updatedData = {
      id: data.id,
      userId: data.user_id,
      userName: data.user_name,
      profilePic: data.profile_pic,
      followersCount: data.followers_count,
      followingCount: data.following_count,
      userBio: data.user_bio,
      postsCount: data.posts_count,
      posts: data.posts.map(eachPost => ({
        id: eachPost.id,
        image: eachPost.image,
      })),
      stories: data.stories.map(eachStory => ({
        id: eachStory.id,
        image: eachStory.image,
      })),
    }

    this.setState({userDetails: updatedData, resStatus: statusConst.success})
  }

  getMyProfile = async () => {
    this.setState({resStatus: statusConst.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const myProfileApi = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(myProfileApi, options)
    const data = await response.json()

    if (response.ok) {
      this.myProfileApiSuccess(data.profile)
    } else {
      this.setState({resStatus: statusConst.failure})
    }
  }

  renderUserProfileView = () => {
    const {userDetails} = this.state

    return (
      <ProfileContent
        userDetails={userDetails}
        profileAlt="my profile"
        storyAlt="my story"
        postAlt="my post"
      />
    )
  }

  // Render failure view if stories api fails
  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dem9u6dox/image/upload/v1677758755/Group_7522_wrwjzj.png"
        alt="failure view"
      />
      <p className="went-wrong-text">Something went wrong. Please try again</p>
      <button
        className="try-again-btn"
        type="button"
        onClick={this.getMyProfile}
      >
        Try again
      </button>
    </div>
  )

  // conditional rendering
  renderContent = () => {
    const {resStatus} = this.state

    switch (resStatus) {
      case statusConst.inProgress:
        return (
          // Change data-testid to testid for testing
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
      case statusConst.success:
        return this.renderUserProfileView()
      case statusConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user-profile-container">
        <Header />
        {this.renderContent()}
      </div>
    )
  }
}

export default MyProfile
