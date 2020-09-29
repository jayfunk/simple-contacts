import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

import {RATING_OPTIONS, INDUSTRY_OPTIONS} from './constants';

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
        <td>{INDUSTRY_OPTIONS[account.industry]}</td>
        <td>{account.annualRevenue}</td>
        <td>{RATING_OPTIONS[account.rating]}</td>
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
        <thead className="thead-dark">
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

export default withRouter(Accounts);
