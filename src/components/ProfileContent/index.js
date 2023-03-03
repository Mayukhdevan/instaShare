import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const ProfileContent = props => {
  const {userDetails, profileAlt, storyAlt, postAlt} = props

  const {
    userId,
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    postsCount,
    posts,
    stories,
  } = userDetails

  const renderUserPosts = () => {
    if (posts.length === 0) {
      return (
        <div className="empty-posts-view">
          <BiCamera className="camera-icon" />
          <h1 className="no-posts-text">No Posts</h1>
        </div>
      )
    }

    return (
      <ul className="profile-posts-list-container">
        {posts.map(eachPost => (
          <li className="profile-post-item" key={eachPost.id}>
            <img
              className="profile-post-img"
              src={eachPost.image}
              alt={postAlt}
            />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="responsive-container">
      <div className="profile-section">
        <img className="user-profile-img" src={profilePic} alt={profileAlt} />

        <div className="profile-details-container">
          <h1 className="profile-name">{userName}</h1>
          <div className="post-follow-container">
            <p className="posts-count">
              <span>{postsCount}</span> posts
            </p>
            <p className="followers-count">
              <span>{followersCount}</span> followers
            </p>
            <p className="following-count">
              <span>{followingCount}</span> following
            </p>
          </div>
        </div>

        <p className="user-id">{userId}</p>
        <p className="user-bio">{userBio}</p>

        <ul className="stories-list-container">
          {stories.map(eachStory => (
            <li key={eachStory.id} className="story-item">
              <img className="story-img" src={eachStory.image} alt={storyAlt} />
            </li>
          ))}
        </ul>

        <hr />

        <div className="posts-text-icon-container">
          <BsGrid3X3 className="grid-icon" />
          <h1 className="posts-text">Posts</h1>
        </div>

        {renderUserPosts()}
      </div>
    </div>
  )
}

export default ProfileContent
