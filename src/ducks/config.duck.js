import { fetchGenres } from '../services/api'
import { bindActionCreators } from 'redux'

export const LOAD_GENRES_DONE = 'LOAD_GENRES_DONE'
export const LOAD_GENRES_FAILED = 'LOAD_GENRES_FAILED'
export const SELECT_GENRE = 'SELECT_GENRE'
export const SELECT_NUM_ARTISTS = 'SELECT_NUM_ARTISTS'
export const SELECT_NUM_SONGS = 'SELECT_NUM_SONGS'

const initialState = {
  genres: [],
  selectedGenre: 'Select Genre',
  numArtists: 2,
  numSongs: 1,
  errorLoadingGenres: {}
}

const config = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_NUM_ARTISTS:
      return {
        ...state,
        numArtists: action.numArtists
      }
    case SELECT_NUM_SONGS:
      return {
        ...state,
        numSongs: action.numSongs
      }
    case LOAD_GENRES_DONE:
      return {
        ...state,
        errorLoadingGenres: false,
        genres: action.genres
      }
    case LOAD_GENRES_FAILED:
      return {
        ...state,
        errorLoadingGenres: true,
        genres: []
      }
    case SELECT_GENRE:
      return {
        ...state,
        selectedGenre: action.genre
      }
    default:
      return state
  }
}
export const selectNumArtists = numArtists => ({
  type: SELECT_NUM_ARTISTS,
  numArtists
})
export const selectNumSongs = numSongs => ({
  type: SELECT_NUM_SONGS,
  numSongs
})

const loadingGenresDone = genres => ({
  type: LOAD_GENRES_DONE,
  genres
})

const loadingGenresFailed = error => ({
  type: LOAD_GENRES_FAILED,
  error
})

export const selectGenre = genre => ({
  type: SELECT_GENRE,
  genre
})
// asynchronous load genres
export const loadGenres = () => dispatch =>
  fetchGenres()
    .then(({ genres }) => dispatch(loadingGenresDone(genres)))
    .catch(err => dispatch(loadingGenresFailed(err)))

export default config
