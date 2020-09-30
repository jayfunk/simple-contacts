import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import AccountDetails from './AccountDetails';
import Contacts from './Contacts';

function Account({account}) {
  return (
    <React.Fragment>
      <div className="row">
        <Link to="/">
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            className="bi bi-arrow-left-circle-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z"
            />
          </svg>
        </Link>
      </div>
      <div className="row">
        <AccountDetails account={account} />
      </div>
      {account !== null && <Contacts accountId={account.id} contacts={account.contacts} />}
    </React.Fragment>
  );
}

Account.propTypes = {
  account: PropTypes.object
};

export default Account;
