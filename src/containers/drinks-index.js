import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { fetchDrinks } from '../actions/index'

class Drinks extends Component {
  componentWillMount(){
    this.props.fetchDrinks()
  }

  handleDrinks(){
    return this.props.drinks.map(drink => <li key={drink.id} className="collection-item"><div>{drink.name}<Link to={`/drinks/${drink.id}`} className="secondary-content"><i className="material-icons">send</i></Link></div></li>)
  }

  render() {
    return(
      <div className="row">
        <div className="col s6">
          <ul className="collection with-header">
            {this.handleDrinks()}
          </ul>
        </div>
        <div className="col s6">
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    drinks: state.drinks
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchDrinks }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Drinks)
