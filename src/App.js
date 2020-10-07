import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Button} from 'react-bootstrap';

import {RATING_OPTIONS, INDUSTRY_OPTIONS, STATE_OPTIONS} from './constants';
import filterAccounts from './filterAccounts';
import AccountFilters from './AccountFilters';
import AccountDetailsModal from './AccountDetailsModal';
import Contacts from './Contacts';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  toggleExpanded(accountId) {
    this.setState({
      [accountId]: this.state[accountId] === null ? true : !this.state[accountId]
    });
  }

  isAccountExpanded(accountId) {
    return this.state[accountId] === true;
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
      const accountId = account.id;
      const openModal = () => {
        this.props.history.push(`/accounts/${accountId}`);
      };
      const expanded = this.isAccountExpanded(accountId);

      return (
        <div className="account row" key={accountId}>
          <div className="col-6 col-md-2" onClick={openModal}>
            {account.name}
          </div>
          <div className="col-6 col-md-2" onClick={openModal}>
            {this.renderAccountAddress(account.address)}
          </div>
          <div className="col-3 col-md-2" onClick={openModal}>
            {INDUSTRY_OPTIONS[account.industry]}
          </div>
          <div className="col-3 col-md-2" onClick={openModal}>
            {account.annualRevenue}
          </div>
          <div className="col-2 col-md-1" onClick={openModal}>
            {RATING_OPTIONS[account.rating]}
          </div>
          <div className="col-3 col-md-2" onClick={openModal}>
            {account.establishedDate.toString()}
          </div>
          <Button
            variant="link"
            className="expander col-md-1"
            onClick={this.toggleExpanded.bind(this, accountId)}
          >
            {expanded === false ? (
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-chevron-left"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            ) : (
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-chevron-down"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            )}
          </Button>
          {expanded === true && <Contacts accountId={accountId} contacts={account.contacts} />}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="app container">
        <div className="row">
          <AccountFilters accounts={this.props.accounts} onFilterChange={this.handleFilterChange} />
        </div>
        <div className="row">
          <Link className="col-xs-2 mb-3 btn btn-primary" to="/accounts/new">
            Add Account
          </Link>
        </div>
        <div className="accounts row mb-5">
          <div className="col">
            <div className="header row">
              <div className="col-6 col-md-2">Name</div>
              <div className="col-6 col-md-2">Address</div>
              <div className="col-3 col-md-2">Industry</div>
              <div className="col-3 col-md-2">Revenue</div>
              <div className="col-2 col-md-1">Rating</div>
              <div className="col-3 col-md-2">Est. Date</div>
              <div className="col-md-1"></div>
            </div>
            {this.renderAccounts()}
          </div>
        </div>
        <Switch>
          <Route
            path="/accounts/:accountId"
            render={({match}) => {
              const accountId = match.params.accountId;

              if (accountId === 'new') {
                return <AccountDetailsModal account={null} />;
              }

              const account = this.props.accounts.find((account) => account.id === accountId);

              if (!account) {
                return <Redirect to="/" />;
              }

              return <AccountDetailsModal account={account} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  accounts: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    accounts: state
  };
}

export default withRouter(connect(mapStateToProps)(App));
