import React from 'react'
import { Link } from 'react-router'

export default (props) => {
  let drinks = props.drinks.map(drink => <li key={drink.id}> <Link to={`/drinks/${drink.id}`}> {drink.name} </Link> </li>)
  return(
    <div>
      <h2>Draaanks!</h2>
      <ul>
        {drinks}
      </ul>
    </div>
  )
}
