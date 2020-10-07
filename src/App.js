import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Accounts from './Accounts';
import AccountDetailsModal from './AccountDetailsModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App(props) {
  return (
    <div className="App container">
      <Accounts accounts={props.accounts} />
      <Switch>
        <Route
          path="/accounts/:accountId"
          render={({match}) => {
            const accountId = match.params.accountId;

            if (accountId === 'new') {
              return <AccountDetailsModal account={null} />;
            }

            const account = props.accounts.find((account) => account.id === accountId);

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

function mapStateToProps(state, ownProps) {
  return {
    accounts: state
  };
}

export default connect(mapStateToProps)(App);
