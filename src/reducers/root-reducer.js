import { combineReducers } from 'redux'
import drinksReducer from './drinks-reducer'
import categoriesReducer from './categories-reducer'
import usersReducer from './users-reducer'

export default combineReducers({
  drinks: drinksReducer,
  categories: categoriesReducer,
  users: usersReducer
})
