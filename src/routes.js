import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/app'
import CategoriesIndex from './containers/categories-index'
import CategoriesShow from './components/categories-show'
import DrinksIndex from './containers/drinks-index'
import DrinksShow from './components/drinks-show'

export default (
  <Route path="/" component={App}>
    <Route path="categories" component={CategoriesIndex} >
      <Route path=":id" component={CategoriesShow} />
    </Route>
    <Route path="drinks" component={DrinksIndex} >
      <Route path=":id" component={DrinksShow} />
    </Route>
  </Route>
)
