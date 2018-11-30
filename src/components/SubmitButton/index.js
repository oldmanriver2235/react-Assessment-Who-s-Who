import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SubmitButton extends Component {
  render () {
    return (
      <form>
        <label>
          {this.props.buttonText}
          <input type='submit' name='{this.props.buttonText}' />
        </label>
        {/* <input type='submit' value='Submit' /> */}
      </form>
    )
  }
}
export default SubmitButton

// this seems jank
