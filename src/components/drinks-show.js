import React from 'react'
import { Link } from 'react-router'

export default (props) => {
  let drink = props.drinks.find(drink => drink.id === parseInt(props.params.id))
  let categories = drink ? drink.categories.map(category => <li key={category.id}><strong>Category: </strong><Link to={`/categories/${category.id}`}>{category.name}</Link><ul><li><strong>Description: </strong>{category.description}</li></ul></li>) : "Loading..."
  return(
    <div>
      <h2>Drank!</h2>
      <Link to="/drinks"> {"<--drinks"} </Link>
      <Link to="/categories"> {"<--categories"} </Link>
      {drink ? (
        <div>
          <p><strong>Name: </strong>{drink.name}</p>
          <p><strong>Description: </strong>{drink.description}</p>
          <p><strong>IBU: </strong>{drink.rating}</p>
          <p><strong>Categories: </strong></p>
          <ul>{categories}</ul>
        </div>
        ) : (
          <p>Loading...</p>
        )}
    </div>
  )
}
