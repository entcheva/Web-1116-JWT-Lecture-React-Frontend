import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class CategoriesShow extends Component {
  handleCategory(){
    return this.props.categories.find(category => category.id === parseInt(this.props.params.id))
  }

  handleDrink(category){
    return category ? category.drinks.map(drink => <li key={drink.id}><strong>Drink: </strong><Link to={`/drinks/${drink.id}`}>{drink.name}</Link><ul><li><strong>Description: </strong>{drink.description}</li></ul></li>) : "Loading..."
  }

  render(){
    let category = this.handleCategory()
    let drinks = this.handleDrink(category)
    return(
      <div>
        <h2>{category.name}!</h2>
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
}

let mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps)(CategoriesShow)
