import axios from 'axios'
import {browserHistory} from 'react-router';

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

export const createUser = (user) => {
  let response = axios.post(URL + 'signup', user).then((innerResponse) => {
    sessionStorage.setItem('jwt', innerResponse.data.jwt)
    browserHistory.push(`/drinks`)
    return innerResponse
  })

  return {
    type: "SIGN_UP",
    payload: response
  }
}
