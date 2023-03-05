import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {CgMenu} from 'react-icons/cg'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {searchValue: '', enableSearch: false}

  toggleSearchScreen = () => {
    const {onToggleSearchScreen} = this.props
    this.setState(prevState => ({enableSearch: !prevState.enableSearch}))
    onToggleSearchScreen()
  }

  showHomeScreen = () => {
    const {onShowHomeScreen} = this.props
    onShowHomeScreen()
  }

  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onSearchCaption = () => {
    const {searchValue} = this.state
    const {getSearchResult} = this.props
    getSearchResult(searchValue)
  }

  render() {
    const {searchValue, enableSearch} = this.state

    return (
      <div className="header-container">
        <div className="header-responsive-container">
          <div className="logo-ham-container">
            <div className="logo-container">
              <Link to="/" className="nav-links">
                <img
                  className="header-logo"
                  src="https://res.cloudinary.com/dem9u6dox/image/upload/v1677392496/InstaShareAssets/Login/Standard_Collection_8_sahaye.png"
                  alt="website logo"
                />
              </Link>
              <h1 className="header-logo-text">Insta Share</h1>
            </div>
            <button className="expand-ham-btn display-lg-none" type="button">
              <CgMenu className="ham-icon" />
            </button>
          </div>

          <div className="nav-container">
            <div
              className={`search-field-container ${
                !enableSearch && 'd-hidden'
              }`}
            >
              <input
                type="search"
                className="search-input"
                placeholder="Search Caption"
                value={searchValue}
                onChange={e => this.setState({searchValue: e.target.value})}
              />
              <button
                className="search-btn"
                type="button"
                onClick={this.onSearchCaption}
              >
                <FaSearch className="search-icon" testid="searchIcon" />
              </button>
            </div>
            <ul className="nav-item-list">
              <Link to="/" className="nav-links" onClick={this.showHomeScreen}>
                <li className="nav-item">Home</li>
              </Link>
              <Link
                to="/"
                className="nav-links"
                onClick={this.toggleSearchScreen}
              >
                <li className="nav-item">Search</li>
              </Link>

              <Link to="/my-profile" className="nav-links">
                <li className="nav-item">Profile</li>
              </Link>
            </ul>
            <button
              className="logout-btn"
              type="button"
              onClick={this.onLogout}
            >
              Logout
            </button>
            <button className="close-ham-btn display-lg-none" type="button">
              <AiFillCloseCircle className="close-icon" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
