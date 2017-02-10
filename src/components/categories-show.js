import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class CategoriesShow extends Component {
  handleCategory(){
    return this.props.categories.find(category => category.id === parseInt(this.props.params.id))
  }

  handleDrink(category){
    return category ? category.drinks.map(drink => <li key={drink.id} className="collection-item"><div><h5>{drink.name}</h5><Link to={`/drinks/${drink.id}`} className="secondary-content"><i className="material-icons">send</i></Link><ul><li className="collection-item"><strong>Description: </strong>{drink.description}</li></ul></div></li>) : "Loading..."
  }

  render(){
    let category = this.handleCategory()
    let drinks = this.handleDrink(category)
    return(
      <div>
        {category ? (
          <div className="row">
            <div className="">
              <div className="card blue-grey darken-1">
                <div className="card-action">
                  <Link to="/categories">{"<--categories"}</Link>
                  <Link to="/drinks">{"<--drinks"}</Link>
                </div>
                <div className="card-content white-text">
                  <span className="card-title">{category.name}</span>
                  <p><strong>Description: </strong>{category.description}</p>
                </div>
              </div>
            </div>
            <ul className="collection with-header">
              <li className="collection-header"><h4>Drinks</h4></li>
              {drinks}
            </ul>
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
