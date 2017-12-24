import React, { Component, PropTypes } from 'react'

export default class Logout extends Component {
  
  render() {
    const { onLogoutClick } = this.props
    
    return (
      <input type="button" className="btn btn-primary" value="Logout" onClick={()=>onLogoutClick()}/>
  )
  }
  
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
}