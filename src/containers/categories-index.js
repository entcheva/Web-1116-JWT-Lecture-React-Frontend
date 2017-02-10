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
    return this.props.categories ? this.props.categories.map(category => <li key={category.id} className="collection-item"><div>{category.name}<Link to={`/categories/${category.id}`} className="secondary-content"><i className="material-icons">send</i></Link></div></li>) : "Loading..."
  }

  render() {
    return(
      <div className="row">
        <div className="col s6">
          <ul className="collection with-header">
            {this.handleCategories()}
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
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchCategories }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
