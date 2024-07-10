// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repositorysDetails} = props
  const {name, avatarUrl} = repositorysDetails
  const {issuesCount, forksCount, starsCount} = repositorysDetails

  return (
    <li className="repository-li-container">
      <img src={avatarUrl} className="repo-avathars" alt={name} />
      <h1 className="name-text">{name}</h1>
      <div className="counts-img-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="stars-img"
          alt="stars"
        />
        <p className="counts">{starsCount} stars</p>
      </div>
      <div className="counts-img-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="stars-img"
          alt="forks"
        />
        <p className="counts">{forksCount} forks</p>
      </div>
      <div className="counts-img-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          className="stars-img"
          alt="open issues"
        />
        <p className="counts">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
