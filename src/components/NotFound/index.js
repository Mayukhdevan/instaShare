import './index.css'

const NotFound = props => {
  const redirectHome = () => {
    const {history} = props
    history.push('/')
  }

  return (
    <div className="page-not-found-container">
      <img
        className="page-not-found-img"
        src="https://res.cloudinary.com/dem9u6dox/image/upload/v1677856047/erroring_1_zczcpp.png"
        alt="page not found"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-not-found-para">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button
        className="goto-home-page-btn"
        type="button"
        onClick={redirectHome}
      >
        Home Page
      </button>
    </div>
  )
}

export default NotFound
