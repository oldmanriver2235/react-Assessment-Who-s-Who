import { fetchArtists, fetchFromSpotify } from '../services/api'
import chooseRandom from '../utils/chooseRandom'
export const SELECT_SONG_NUMBER = 'SELECT_SONG_NUMBER'
export const SELECT_ARTIST_NUMBER = 'SELECT_ARTIST_NUMBER'
export const LOAD_ARTISTS_DONE = 'LOAD_ARTISTS_DONE'
export const LOAD_SONGS_DONE = 'LOAD_SONGS_DONE'
export const LOAD_ARTISTS_FAILURE = 'LOAD_ARTISTS_FAILURE'
export const LOAD_SONGS_FAILURE = 'LOAD_SONGS_FAILURE'

const initialState = {
  artists: [],
  songs: [],
  selectArtist: [],
  errorLoadingArtists: false
}

export default function game (state = initialState, action) {
  switch (action.type) {
    // case LOAD_ARTISTS_DONE:
    //   return {
    //     ...state,
    //     errorLoadingArtists: false,
    //     artists: action.artists
    //   }
    // case LOAD_SONGS_DONE:
    //   return {
    //     ...state,
    //     errorLoadingSongs: false,
    //     songs: action.songs
    //   }
    case LOAD_ARTISTS_AND_SONGS_DONE:
      return {
        ...state,
        errorLoadingArtistsAndSongs: false,
        songs: action.songs,
        artists: action.artists
      }
    case LOAD_ARTISTS_AND_SONGS_FAILURE:
      return {
        ...state,
        errorLoadingArtistsAndSongs: true,
        songs: action.songs,
        artists: action.artists
      }
    // case LOAD_ARTISTS_FAILURE:
    //   return {
    //     ...state,
    //     errorLoadingArtists: true,
    //     artists: action.artists
    //   }
    // case LOAD_SONGS_FAILURE:
    //   return {
    //     ...state,
    //     errorLoadingSongs: true,
    //     songs: action.songs
    //   }
    case SELECT_ARTIST_NUMBER:
      return {
        ...state,
        selectedArtistNumber: action.selectedArtist
      }
    case SELECT_SONG_NUMBER:
      return {
        ...state,
        selectedSongNumber: action.selectedSongNumber
      }
    default:
      return state
  }
}

export const selectSongNumber = songs => ({
  type: SELECT_SONG_NUMBER,
  payload: songs
})

export const selectArtistNumber = artists => ({
  type: SELECT_ARTIST_NUMBER,
  payload: artists
})

export const loadArtistsAndSongs = (genre, numArtists, numSongs) => dispatch =>
  fetchFromSpotify({
    endpoint: 'search',
    params: {
      q: `genre:${genre.split(' ').join('%20')}`,
      type: 'artist',
      limit: 50
    }
  })
    .then(({ artist: { items } }) => {
      const artists = chooseRandom(
        items.map(item => ({
          id: item.id,
          name: item.name,
          images: item.images
        })),
        numArtists
      )
      const selectedArtist = artist[Math.floor(Math.random() * artists.length)]
      dispatch(selectArtist(selectedArtist))
      fetchFromSpotify({
        endpoint: 'search',
        params: {
          q: `artist:${artist.split(' ').join('%20')}`,
          type: 'track',
          limit: 50
        }
      }).then(({ tracks: { items } }) => {
        const songs = chooseRandom(
          items.map(item => ({
            id: item.id,
            name: item.name,
            preview_url: item.preview_url
          })),
          numSongs
        )
        dispatch(loadArtistsAndSongsDone(artist, songs))
      })
    })
    .catch(err => dispatch(loadArtistsAndSongsFailed(err)))
