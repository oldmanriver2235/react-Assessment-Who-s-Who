import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'

import { loadCategories, selectCategory } from '../../ducks/config.duck'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadCategories()
  }

  render () {
    const categories = this.props.categories.map(
      category => (
        <option
          key={category}
          value={category}>{category}
        </option>
      )
    )

    return (
      <div>
        <select onChange={(event) => this.props.selectCategory(event.target.value)}>
          {categories}
        </select>
      </div>
    )
  }
}

Home.propTypes = {
  loadCategories: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  categories: PropTypes.array
}

const mapStateToProps = (state) => ({
  categories: state.config.categories
})

const mapDispatchToProps = (dispatch) => ({
  loadCategories: () => dispatch(loadCategories()),
  selectCategory: category => dispatch(selectCategory(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
