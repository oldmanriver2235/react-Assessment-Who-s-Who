import { fetchCategories, fetchFromSpotify } from '../services/api'
// this whole page seems jank

const initialState = {
  answers: [],
  errorloadingAnswers: false
}

export default function config (state = initialState, action) {
  switch (action.type) {
    case LOAD_ANSWERS_DONE:
      return {
        ...state,
        errorLoadingAnswers: false,
        answers: action.payload
      }
    case LOAD_ANSWERS_FAILURE:
      return {
        ...state,
        errorLoadingAnswers: true,
        answers: initialState.answers
      }
    case SELECT_ANSWER:
      return {
        ...state,
        selectedAnswer: action.payload
      }
    default:
      return state
  }
}
export const selectAnswer = answer => ({
  type: SELECT_ANSWER,
  payload: answer
})
const loadAnswerDone = answer => ({
  type: LOAD_ANSWERS_DONE,
  payload: answer
})
const loadAnswerFailure = answer => ({
  type: LOAD_ANSWERS_FAILURE
})
export const loadAnswer = () => dispatch =>
  fetchAnswer()
    .then(({ answer }) => {
      const answerName = answers.items.map(c => c.name)
      return dispatch(loadAnswerDone(answerName))
    })
    .catch(err => dispatch(loadAnswerFailure(err)))
