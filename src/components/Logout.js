import React, { Component, PropTypes } from 'react'

export default class Logout extends Component {
  render() {
    // const { onLogoutClick } = this.props
    return (
      <div>
        <div className="alert alert-danger">
            We're sorry. You may to need to login first to access this page or the requested resource is not found
        </div>
      </div>
    )
  }
}

Logout.propTypes = {
  // onLogoutClick: PropTypes.func.isRequired,
}
