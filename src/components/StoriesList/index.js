import Slider from 'react-slick'
import StoryItem from '../StoryItem'

import './index.css'

const StoriesList = props => {
  const {storiesList} = props
  const settings = {
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {storiesList.map(eachStory => (
          <StoryItem key={eachStory.userId} storyItem={eachStory} />
        ))}
      </Slider>
    </div>
  )
}

export default StoriesList
