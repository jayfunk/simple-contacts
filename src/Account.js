import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import AccountDetails from './AccountDetails';

export class Account extends Component {
  render() {
    return (
      <div>
        <AccountDetails account={this.props.account} />
      </div>
    );
  }
}

Account.propTypes = {
  account: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  createAccount: undefined,
  updateAccount: undefined
};

export default connect(
  null,
  mapDispatchToProps
)(Account);
