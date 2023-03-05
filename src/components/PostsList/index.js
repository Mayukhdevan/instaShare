import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import PostItem from '../PostItem'

import './index.css'

const statusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PostsList extends Component {
  state = {postsList: [], postsStatus: statusConst.initial}

  componentDidMount() {
    this.getPosts()
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

  renderPostsList = () => {
    const {postsList} = this.state
    return (
      <ul className="posts-list-container">
        {postsList.map(eachPost => (
          <PostItem key={eachPost.postId} postItem={eachPost} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    // Change data-testid to testid for testing
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderView = () => {
    const {postsStatus} = this.state

    switch (postsStatus) {
      case statusConst.inProgress:
        return this.renderLoader()
      case statusConst.success:
        return this.renderPostsList()
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

  render() {
    return <>{this.renderView()}</>
  }
}

export default PostsList
