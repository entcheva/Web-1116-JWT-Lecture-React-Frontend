import React from 'react'
import { Link } from 'react-router'

export default (props) => {
  let categories = props.categories.map(category => <li key={category.id}> <Link to={`/categories/${category.id}`}> {category.name} </Link> </li>)
  return(
    <div>
      <h2>Categories!</h2>
      <ul>
        {categories}
      </ul>
    </div>
  )
}
