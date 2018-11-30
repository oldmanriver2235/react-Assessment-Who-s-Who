import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LinkButton extends Component {
  render () {
    return (
      <div className='button'>
        <Link to={this.props.link}>
          <button type='button'>
            {this.props.buttonText}
          </button>
        </Link>
      </div>
    )
  }
}
export default LinkButton
