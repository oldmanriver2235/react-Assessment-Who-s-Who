import React from 'react'
import { Route } from 'react-router-dom'

import Header from '../../components/Header'
import SubmitButton from '../../components/SubmitButton'
import connect from 'react-redux'
import mapStateToProps from 'react-redux/es/connect/mapStateToProps'
import { loadArtistsAndSongs } from '../../ducks/game.duck'

class GamePage extends Component {
  componentDdidMount () {
    this.props.loadArtistsAndSongs(this.props.config)
  }

  render () {
    const { config: { numArtists, numSongs, selectedGenre } } = this.props
    return <Header as='h1'>Game</Header>
  }
}

const mapStateToProps = state => ({
  config: state.config
})
const mapDispatchToProps = dispatch => ({
  loadArtistsAndSongs: ({ selectedGenre, numArtists }) =>
    dispatch(loadArtistsAndSongs(selectedGenre, numArtists))
})

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)
