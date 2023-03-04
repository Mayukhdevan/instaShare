import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import StoryItem from '../StoryItem'

import './index.css'

const statusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class StoriesList extends Component {
  state = {storiesList: [], storiesStatus: statusConst.initial}

  componentDidMount() {
    this.getStories()
  }

  getStories = async () => {
    this.setState({storiesStatus: statusConst.inProgress, searchView: false})

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

  renderStoriesView = () => {
    const {storiesList} = this.state
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

  renderStoriesLoader = () => (
    // Change data-testid to testid for testing
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderViews = () => {
    const {storiesStatus} = this.state

    switch (storiesStatus) {
      case statusConst.inProgress:
        return this.renderStoriesLoader()
      case statusConst.success:
        return this.renderStoriesView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderStoriesView()}</>
  }
}

export default StoriesList
