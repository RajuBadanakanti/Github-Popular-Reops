// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, onClickLaguageTab, isActiveTab} = props
  const {id, language} = languageFiltersData

  const onClickLaguageButton = () => {
    onClickLaguageTab(id)
  }

  const activeTabClass = isActiveTab ? 'active-language-btn-tab' : ''

  return (
    <li className="language-item-container">
      <button
        type="button"
        className={`language-btn-tab ${activeTabClass}`}
        onClick={onClickLaguageButton}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
