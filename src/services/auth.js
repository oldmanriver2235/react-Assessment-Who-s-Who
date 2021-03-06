import request from '../utils/request'

const TOKEN_KEY = 'whos-who-access-token'
const AUTH_ENDPOINT =
  'http://ec2-54-175-146-123.compute-1.amazonaws.com/api/spotify_access_token'

export function fetchAndStoreAccessToken () {
  let isFetching = false

  // To make authenticated requests to Spotify (and benefit from a higher rate-
  // limit), we need to proxy a request for an access token through our server.
  // The first step is to check if we already have it, in localStorage.
  // eslint-disable-next-line no-undef
  const storedTokenString = localStorage.getItem(TOKEN_KEY)

  if (storedTokenString) {
    const storedToken = JSON.parse(storedTokenString)

    // If it's still valid, we don't need to make a server request :)
    if (isTokenStillValid(storedToken)) return
  }

  // Don't allow multiple fetches to occur simultaneously.
  if (isFetching) return
  isFetching = true

  // Make a request to our back-end to generate a token.
  request(AUTH_ENDPOINT)
    .then(response => {
      // The received token will be of type:
      // {
      //  "access_token": "BQCHMB...rDw",
      //  "token_type": "Bearer",
      //  "expires_in": 3600
      // }
      //
      // We want to convert that `expires_in` into a unix timestamp.
      //
      // We're also going to subtract 20s, since the countdown started from
      // when the token was generated, on Spotify's servers.
      const expiresInMs = (response.expires_in - 20) * 1000
      const expirationTimestamp = Date.now() + expiresInMs

      const token = {
        value: response.access_token,
        expiration: expirationTimestamp
      }

      // eslint-disable-next-line no-undef
      localStorage.setItem(TOKEN_KEY, JSON.stringify(token))

      isFetching = false
    })
    .catch(err => console.error('Error fetching token from server', err))
}

export function getAccessTokenFromLocalStorage () {
  // eslint-disable-next-line no-undef
  const accessTokenObject = JSON.parse(localStorage.getItem(TOKEN_KEY))

  // If there isn't a token yet, don't worry about it. Return null.
  if (!accessTokenObject) return null

  // If there is a token, and it's still valid, we can just return it.
  if (isTokenStillValid(accessTokenObject)) return accessTokenObject.value

  // If the token is expired, we want to return `null`.
  // We'll make a request for a new token, but we won't stick around for it.
  // We can get away with this because tokens are _optional_. They increase the
  // rate limit, so they're generally a good idea, but it's better to make the
  // request immediately sans-token, rather than waiting for a new one.
  fetchAndStoreAccessToken()
  return null
}

function isTokenStillValid (token) {
  return Date.now() < token.expiration
}
