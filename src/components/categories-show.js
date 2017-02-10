import React from 'react'
import { Link } from 'react-router'

export default (props) => {
  let category = props.categories.find(category => category.id === parseInt(props.params.id))
  let drinks = category ? category.drinks.map(category => <li key={category.id}><strong>Drink: </strong><Link to={`/drinks/${category.id}`}>{category.name}</Link><ul><li><strong>Description: </strong>{category.description}</li></ul></li>) : "Loading..."
  return(
    <div>
      <h2>Category!</h2>
      <Link to="/categories"> {"<--categories"} </Link>
      <Link to="/drinks"> {"<--drinks"} </Link>
      {category ? (
        <div>
          <p><strong>Name: </strong>{category.name}</p>
          <p><strong>Description: </strong>{category.description}</p>
          <p><strong>Drinks: </strong></p>
          <ul>{drinks}</ul>
        </div>
      ) : (
        <p>Loading...</p>
      )
    }
    </div>
  )
}
