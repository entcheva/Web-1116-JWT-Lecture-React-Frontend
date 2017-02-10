import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class DrinksShow extends Component {
  handleDrink(){
    return this.props.drinks.find(drink => drink.id === parseInt(this.props.params.id))
  }

  handleCategory(drink){
    return drink ? drink.categories.map(category => <li key={category.id} className="collection-item"><div><h5>{category.name}</h5><Link to={`/categories/${category.id}`} className="secondary-content"><i className="material-icons">send</i></Link><ul><li className="collection-item"><strong>Description: </strong>{category.description}</li></ul></div></li>) : "Loading..."
  }

  render(){
    let drink = this.handleDrink()
    let categories = this.handleCategory(drink)
    return(
      <div>
        {drink ? (
          <div className="row">
            <div className="">
              <div className="card blue-grey darken-1">
                <div className="card-action">
                  <Link to="/drinks"> {"<--drinks"} </Link>
                  <Link to="/categories"> {"<--categories"} </Link>
                </div>
                <div className="card-content white-text">
                  <span className="card-title">{drink.name}</span>
                  <p><strong>Description: </strong>{drink.description}</p>
                  <p><strong>IBU: </strong>{drink.rating}</p>
                </div>
              </div>
            </div>
            <ul className="collection with-header">
              <li className="collection-header"><h4>Categories</h4></li>
              {categories}
            </ul>
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
