import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { fetchCategories } from '../actions/index'

class Categories extends Component {
  componentWillMount(){
    this.props.fetchCategories()
  }

  render() {
    return(
      <div>
        {React.Children.map(this.props.children, (child)=>{
          return React.cloneElement({...child, props: {...child.props, categories: this.props.categories}})
        })}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchCategories }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
