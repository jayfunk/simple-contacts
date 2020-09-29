import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './Accounts.css';

function renderAccounts(history, accounts) {
  return accounts.map((account) => {
    return (
      <tr
        key={account.id}
        onClick={() => {
          history.push(`/accounts/${account.id}`);
        }}
      >
        <td>{account.name}</td>
        <td>{account.address}</td>
        <td>{account.industry}</td>
        <td>{account.annualRevenue}</td>
        <td>{account.rating}</td>
        <td>{account.establishedDate.toString()}</td>
      </tr>
    );
  });
}

export function Accounts(props) {
  return (
    <div className="accounts">
      <Link className="btn btn-primary" to="/accounts/new">
        Add Account
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Industry</th>
            <th scope="col">Revenue</th>
            <th scope="col">Rating</th>
            <th scope="col">Est. Date</th>
          </tr>
        </thead>
        <tbody>{renderAccounts(props.history, props.accounts)}</tbody>
      </table>
    </div>
  );
}

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    accounts: state
  };
}

export default withRouter(connect(mapStateToProps)(Accounts));
