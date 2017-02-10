import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/app'
import Categories from './containers/categories'
import CategoriesIndex from './components/categories-index'
import CategoriesShow from './components/categories-show'
import Drinks from './containers/drinks'
import DrinksIndex from './components/drinks-index'
import DrinksShow from './components/drinks-show'

export default (
  <Route path="/" component={App}>
    <Route path="categories" component={Categories} >
      <IndexRoute component={CategoriesIndex} />
      <Route path=":id" component={CategoriesShow} />
    </Route>
    <Route path="drinks" component={Drinks} >
      <IndexRoute component={DrinksIndex} />
      <Route path=":id" component={DrinksShow} />
    </Route>
  </Route>
)
