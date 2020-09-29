import React from 'react';
import PropTypes from 'prop-types';

import AccountDetails from './AccountDetails';
import Contacts from './Contacts';

function Account({account}) {
  return (
    <div className="container">
      <div className="row">
        <AccountDetails account={account} />
      </div>
      <div className="row">
        <Contacts accountId={account.id} contacts={account.contacts} />
      </div>
    </div>
  );
}

Account.propTypes = {
  account: PropTypes.object.isRequired
};

export default Account;
