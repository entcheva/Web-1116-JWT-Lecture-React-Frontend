import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { fetchCategories } from '../actions/index'

class Categories extends Component {
  componentWillMount(){
    this.props.fetchCategories()
  }

  handleCategories(){
    return this.props.categories ? this.props.categories.map(category => <li key={category.id}> <Link to={`/categories/${category.id}`}> {category.name} </Link> </li>) : "Loading..."
  }

  render() {
    return(
      <div>
        <div style={{float: 'left', display: 'inline-block'}}>
          {this.handleCategories()}
        </div>
        <div style={{float: 'right', display: 'inline-block', width: '70%'}}>
          {this.props.children}
        </div>
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
