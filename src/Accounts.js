import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {Table} from 'react-bootstrap';

import filterAccounts from './filterAccounts';
import AccountFilters from './AccountFilters';
import {RATING_OPTIONS, INDUSTRY_OPTIONS, STATE_OPTIONS} from './constants';

import './Accounts.css';

export class Accounts extends Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(filters) {
    this.setState({
      ...filters
    });
  }

  renderAccountAddress(address) {
    return `${address.street} ${address.city}, ${STATE_OPTIONS[address.state]}`;
  }

  renderAccounts() {
    return filterAccounts(this.state, this.props.accounts).map((account) => {
      return (
        <tr
          key={account.id}
          onClick={() => {
            this.props.history.push(`/accounts/${account.id}`);
          }}
        >
          <td>{account.name}</td>
          <td>{this.renderAccountAddress(account.address)}</td>
          <td>{INDUSTRY_OPTIONS[account.industry]}</td>
          <td>{account.annualRevenue}</td>
          <td>{RATING_OPTIONS[account.rating]}</td>
          <td>{account.establishedDate.toString()}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="accounts">
        <AccountFilters accounts={this.props.accounts} onFilterChange={this.handleFilterChange} />
        <div className="row">
          <Link className="mb-3 btn btn-primary" to="/accounts/new">
            Add Account
          </Link>
        </div>
        <div className="row">
          <Table striped bordered hover>
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
            <tbody>{this.renderAccounts()}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(Accounts);
