import './index.css'

const StoryItem = props => {
  const {storyItem} = props

  return (
    <div className="story-item-container">
      <img className="story-img" src={storyItem.storyUrl} alt="user story" />
      <p className="story-name">{storyItem.userName}</p>
    </div>
  )
}

export default StoryItem
