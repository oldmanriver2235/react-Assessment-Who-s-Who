import { fetchCategories } from '../services/api'

export const LOAD_CATEGORIES_BEGIN = 'cooksys/whos-who/Home/LOAD_CATEGORIES_BEGIN'
export const LOAD_CATEGORIES_FAILURE = 'cooksys/whos-who/Home/LOAD_CATEGORIES_FAILURE'
export const LOAD_CATEGORIES_DONE = 'cooksys/whos-who/Home/LOAD_CATEGORIES_DONE'
export const LOAD_CATEGORIES_UPDATE = 'cooksys/whos-who/Home/LOAD_CATEGORIES_UPDATE'
export const SELECT_CATEGORY = 'cooksys/whos-who/Home/SELECT_CATEGORY'

const initialState = {
  categories: [],
  errorLoadingCategories: false
}

export default function config (state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES_DONE:
      return {
        ...state,
        errorLoadingCategories: false,
        categories: action.payload
      }
    case LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        errorLoadingCategories: true,
        categories: initialState.categories
      }
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      }
    default:
      return state
  }
}

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  payload: category
})

const loadCategoriesDone = (categories) => ({
  type: LOAD_CATEGORIES_DONE,
  payload: categories
})

const loadCategoriesFailure = () => ({
  type: LOAD_CATEGORIES_FAILURE
})

export const loadCategories = () =>
  (dispatch) =>
    fetchCategories()
      .then(({ categories }) => {
        const categoryNames = categories.items.map(c => c.name)
        return dispatch(loadCategoriesDone(categoryNames))
      })
      .catch(err => dispatch(loadCategoriesFailure(err)))
