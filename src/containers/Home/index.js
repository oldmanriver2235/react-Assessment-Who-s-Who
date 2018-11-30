import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import { Container, Header, Select } from 'semantic-ui-react'

import {
  selectNumArtists,
  selectNumSongs,
  loadGenres,
  selectGenre
} from '../../ducks/config.duck'
import RadioGroup from '../../components/RadioGroup'
import LinkButton from '../../components/LinkButton'

class Home extends Component {
  componentDidMount () {
    this.props.loadGenres()
  }
  render () {
    const {
      genres,
      selected,
      numSongs,
      numArtists,
      selectNumArtists,
      selectNumSongs,
      selectGenre
    } = this.props
    const formattedCorrectlyGenres = genres.map(genre => ({
      key: genre,
      value: genre,
      text: genre
    }))
    return (
      <Container>
        <Header as='h1'>Pick A Genre</Header>
        <Select
          value={selected}
          options={formattedCorrectlyGenres}
          onChange={(e, { value }) => selectGenre(value)}
        />
        <RadioGroup
          title='Number of Artists'
          options={[2, 3, 4]}
          check={numArtists}
          change={(e, { value }) => selectNumArtists(value)}
        />
        <RadioGroup
          title='Number of Songs'
          options={[1, 2, 3]}
          check={numSongs}
          change={(e, { value }) => selectNumSongs(value)}
        />
        <LinkButton link='/Game' buttonText='Play!' />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  genres: state.config.genres,
  selected: state.config.selectedGenre,
  numArtists: state.config.numArtists,
  numSongs: state.config.numSongs
})
const mapDispatchToProps = dispatch => ({
  loadGenres: () => dispatch(loadGenres()),
  selectGenre: value => dispatch(selectGenre(value)),
  selectNumArtists: numArtists => dispatch(selectNumArtists(numArtists)),
  selectNumSongs: numSongs => dispatch(selectNumSongs(numSongs))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
