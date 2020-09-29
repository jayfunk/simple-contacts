import React from 'react';
import PropTypes from 'prop-types';

import AccountDetails from './AccountDetails';
import Contacts from './Contacts';

function Account(props) {
  return (
    <div className="container">
      <div className="row">
        <AccountDetails account={props.account} />
      </div>
      <div className="row">
        <Contacts contacts={props.account.contacts} />
      </div>
    </div>
  );
}

Account.propTypes = {
  account: PropTypes.object.isRequired
};

export default Account;
