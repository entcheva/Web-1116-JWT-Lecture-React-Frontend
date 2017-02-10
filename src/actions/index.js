import axios from 'axios'

const URL = 'http://localhost:3000/api/v1/'

export const fetchDrinks = () => {
  let request = axios.get(URL + 'drinks')

  return {
    type: "FETCH_DRINKS",
    payload: request
  }
}

export const fetchCategories = () => {
  let request = axios.get(URL + 'categories')
  
  return {
    type: "FETCH_CATEGORIES",
    payload: request
  }
}
