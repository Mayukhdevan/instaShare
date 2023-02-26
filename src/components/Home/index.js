import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

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
    this.getStories()
    this.getPosts()
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
    const updatedStoris = data.users_stories.map(eachStory => ({
      userId: eachStory.user_id,
      userName: eachStory.user_name,
      storyUrl: eachStory.story_url,
    }))

    this.setState({
      storiesList: updatedStoris,
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
      console.log(data)
    } else {
      this.setState({postsStatus: statusConst.failure})
    }
  }

  onResponsePostsSuccess = data => {
    const updatedPosts = data.posts.map(eachPost => ({
      post_id: eachPost.post_id,
      userId: eachPost.user_id,
      userName: eachPost.user_name,
      profilePic: eachPost.profile_pic,
      postDetails: {
        imageUrl: eachPost.post_details.image_url,
        caption: eachPost.post_details.caption,
      },
      likeCount: eachPost.like_count,
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

  render() {
    return (
      <div className="home-container">
        <div className="home-responsive-container">
          <Header />
          {/* {this.homeView()} */}
        </div>
      </div>
    )
  }
}

export default Home
