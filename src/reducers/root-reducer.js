import { combineReducers } from 'redux'
import drinksReducer from './drinks-reducer'
import categoriesReducer from './categories-reducer'

export default combineReducers({
  drinks: drinksReducer,
  categories: categoriesReducer,
})
