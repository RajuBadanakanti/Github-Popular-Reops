import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusOfData = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    gitLanguagesList: [],
    activeTabId: languageFiltersData[0].id,
    apiStatus: apiStatusOfData.initial,
  }

  componentDidMount() {
    this.getLanguagesData()
  }

  getLanguagesData = async () => {
    const {activeTabId} = this.state
    this.setState({apiStatus: apiStatusOfData.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    /* default uses >>>>>>>>const options = {
      method: 'GET',
    } */

    const response = await fetch(apiUrl)
    const data = await response.json()

    if (response.ok === true) {
      const updateData = data.popular_repos.map(eachObj => ({
        id: eachObj.id,
        name: eachObj.name,
        avatarUrl: eachObj.avatar_url,
        issuesCount: eachObj.issues_count,
        forksCount: eachObj.forks_count,
        starsCount: eachObj.stars_count,
      }))
      this.setState({
        gitLanguagesList: updateData,
        apiStatus: apiStatusOfData.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusOfData.failure,
      })
    }
  }

  onClickLanguageTab = id => {
    const languageList = languageFiltersData.find(eachObj => eachObj.id === id)
    this.setState({activeTabId: languageList.id}, this.getLanguagesData)
  }

  renderSuccessView = () => {
    const {gitLanguagesList} = this.state
    return (
      <ul className="repository-ul-container">
        {gitLanguagesList.map(eachData => (
          <RepositoryItem key={eachData.id} repositorysDetails={eachData} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Someting Went Wrong</h1>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderToRepositoryItems = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusOfData.success:
        return this.renderSuccessView()
      case apiStatusOfData.failure:
        return this.renderFailureView()
      case apiStatusOfData.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {activeTabId} = this.state

    return (
      <div className="git-bg-App-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-ul-container">
          {languageFiltersData.map(eachLang => (
            <LanguageFilterItem
              key={eachLang.id}
              languageFiltersData={eachLang}
              onClickLaguageTab={this.onClickLanguageTab}
              isActiveTab={eachLang.id === activeTabId}
            />
          ))}
        </ul>
        {this.renderToRepositoryItems()}
      </div>
    )
  }
}
export default GithubPopularRepos
