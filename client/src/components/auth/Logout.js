import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../actions/authActions';
import { NavLink } from 'reactstrap';

class LogOut extends React.Component {
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logOut} href='#'>
          Log Out
        </NavLink>
      </Fragment>
    )
  }
}

export default connect(null, { logOut })(LogOut);