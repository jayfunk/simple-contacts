import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

import {RATING_OPTIONS, INDUSTRY_OPTIONS, STATE_OPTIONS} from './constants';
import filterAccounts from './filterAccounts';
import AccountFilters from './AccountFilters';
import AccountDetailsModal from './AccountDetailsModal';
import ContactDetailsModal from './ContactDetailsModal';
import Contacts from './Contacts';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});


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
            {currencyFormatter.format(account.annualRevenue)}
          </div>
          <div className="col-2 col-md-1" onClick={openModal}>
            {RATING_OPTIONS[account.rating]}
          </div>
          <div className="col-3 col-md-2" onClick={openModal}>
            {account.establishedDate.toString()}
          </div>
          <div className="col-md-1">
            <Button
              variant="link"
              size="sm"
              className="add-contact col-md-6 col-2"
              onClick={() => {
                this.props.history.push(`/accounts/${accountId}/contacts/new`);
              }}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-plus"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                />
              </svg>
            </Button>
            <Button
              variant="link"
              size="sm"
              className="expander col-md-6  col-10"
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
          </div>
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
            exact
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
          <Route
            path="/accounts/:accountId/contacts/:contactId"
            render={({match}) => {
              const contactId = match.params.contactId;
              const accountId = match.params.accountId;

              if (contactId === 'new') {
                return <ContactDetailsModal accountId={accountId} contact={null} />;
              }

              const account = this.props.accounts.find((account) => account.id === accountId);
              const contact = account.contacts.find((contact) => contact.id === contactId);

              if (!contact) {
                return <Redirect to="/" />;
              }

              return <ContactDetailsModal accountId={accountId} contact={contact} />;
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
