import React, { Component } from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import { Container, Header } from 'semantic-ui-react'
import { loadArtistsAndSongs } from '../../ducks/game.duck'
import { fetchFromSpotify } from '../../services/api'

class Game extends Component {
  componentDidMount () {
    this.props.loadArtistsAndSongs(
      this.props.selectedGenre,
      this.props.numArtists,
      this.props.numSongs
    )
  }

  render () {
    const artists = this.props.artists.map(artist => (
      <option key={artist} value={artist}>
        {artist}
      </option>
    ))

    return (
      <Container>
        <Header as='h1'> Who's Who?</Header>
        <select
          onChange={event => this.props.selectArtists(event.target.value)}
        >
          {artists}
        </select>
      </Container>
    )
  }
}

Game.propTypes = {
  artists: PropTypes.array.isRequired,
  loadArtistsAndSongs: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  artists: state.game.artists,
  selectedGenre: state.config.selectedGenre,
  numArtists: state.config.numArtists,
  numSongs: state.config.numSongs
})

const mapDispatchToProps = dispatch => ({
  loadArtistsAndSongs: (selectedGenre, numArtists, numSongs) =>
    dispatch(loadArtistsAndSongs(selectedGenre, numArtists, numSongs))
})
export default connect(mapStateToProps, mapDispatchToProps)(Game)
