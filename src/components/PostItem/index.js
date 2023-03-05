import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

class PostItem extends Component {
  state = {likeStatus: false}

  updateToggleLikeApi = async () => {
    const {postItem} = this.props
    const {postId} = postItem
    const jwtToken = Cookies.get('jwt_token')
    const {likeStatus} = this.state
    const data = {like_status: likeStatus}

    const likeApi = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    }

    // This returns a dummy response object
    await fetch(likeApi, options)
  }

  toggleLike = () =>
    this.setState(
      prevState => ({likeStatus: !prevState.likeStatus}),
      this.updateToggleLikeApi,
    )

  // Change data-testid to testid
  renderLikeBtn = () => {
    const {likeStatus} = this.state

    if (likeStatus) {
      return (
        <button
          className="like-unlike-btn"
          type="button"
          data-testid="unLikeIcon"
          onClick={this.toggleLike}
        >
          <FcLike className="post-icons" />
        </button>
      )
    }
    return (
      <button
        className="like-unlike-btn"
        type="button"
        data-testid="likeIcon"
        onClick={this.toggleLike}
      >
        <BsHeart className="post-icons" />
      </button>
    )
  }

  render() {
    const {likeStatus} = this.state
    const {postItem} = this.props

    const {
      userId,
      userName,
      profilePic,
      postDetails,
      likesCount,
      comments,
      createdAt,
    } = postItem

    const {imageUrl, caption} = postDetails

    return (
      <li className="post-item">
        <div className="post-avatar-title">
          <img
            className="post-avatar"
            src={profilePic}
            alt="post author profile"
          />
          <Link to={`/users/${userId}`}>
            <p className="post-username">{userName}</p>
          </Link>
        </div>
        <img className="post-img" src={imageUrl} alt="post" />
        <div className="like-cmt-share-container">
          {this.renderLikeBtn()}
          <button type="button" className="share-btn">
            <BiShareAlt className="share-icon" />
          </button>
          <button type="button" className="cmt-btn">
            <FaRegComment className="cmt-icon" />
          </button>
        </div>
        <p className="likes-count">
          {likeStatus ? likesCount + 1 : likesCount} likes
        </p>
        <p className="post-caption">{caption}</p>
        <ul className="cmts-list">
          {comments.map(eachCmt => (
            <li className="cmt-item" key={eachCmt.userId}>
              <p className="cmt-text">
                <span className="cmt-user-name">{eachCmt.userName}</span>
                {eachCmt.comment}
              </p>
            </li>
          ))}
        </ul>
        <p className="created-at">{createdAt}</p>
      </li>
    )
  }
}

export default PostItem
