import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { fetchDrinks } from '../actions/index'

class Drinks extends Component {
  componentWillMount(){
    this.props.fetchDrinks()
  }

  render() {
    return(
      <div>
        {React.Children.map(this.props.children, (child)=>{
          return React.cloneElement({...child, props: {...child.props, drinks: this.props.drinks}})
        })}
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
