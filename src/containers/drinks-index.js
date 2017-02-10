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
    return this.props.drinks.map(drink => <li key={drink.id}> <Link to={`/drinks/${drink.id}`}> {drink.name} </Link> </li>)
  }

  render() {
    return(
      <div>
        <div style={{float: 'left', display: 'inline-block'}}>
          {this.handleDrinks()}
        </div>
        <div style={{float: 'right', display: 'inline-block', width: '57%'}}>
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
