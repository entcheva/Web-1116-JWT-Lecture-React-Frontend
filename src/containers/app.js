import React, { Component } from 'react'

class App extends Component {
  render(){
    return(
      <div>
        <nav>
          <div className="nav-wrapper deep-purple lighten-2">
            <a href="#!" className="brand-logo center"><i className="material-icons">cloud_circle</i></a>
            <ul className="left hide-on-med-and-down">
              <li><a href="/drinks">Drinks</a></li>
              <li><a href="/categories">Categories</a></li>
            </ul>
          </div>
        </nav>
        <div className="container">{this.props.children}</div>
      </div>
    )
  }
}

export default App
