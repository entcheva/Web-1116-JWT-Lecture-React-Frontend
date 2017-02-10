import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class DrinksShow extends Component {
  handleDrink(){
    return this.props.drinks.find(drink => drink.id === parseInt(this.props.params.id))
  }

  handleCategory(drink){
    return drink ? drink.categories.map(category => <li key={category.id}><strong>Category: </strong><Link to={`/categories/${category.id}`}>{category.name}</Link><ul><li><strong>Description: </strong>{category.description}</li></ul></li>) : "Loading..."
  }

  render(){
    let drink = this.handleDrink()
    let categories = this.handleCategory(drink)
    return(
      <div>
        <Link to="/drinks"> {"<--drinks"} </Link>
        <Link to="/categories"> {"<--categories"} </Link>
        {drink ? (
          <div>
            <h2>{drink.name}!</h2>
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
}

let mapStateToProps = (state, ownProps) => {
  return {
    drinks: state.drinks
  }
}

export default connect(mapStateToProps)(DrinksShow)
