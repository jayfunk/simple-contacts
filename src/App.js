import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Accounts from './Accounts';
import Account from './Account';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Accounts accounts={props.accounts} />
        </Route>
        <Route
          path="/accounts/:accountId"
          render={({match}) => {
            const accountId = match.params.accountId;
            const account = props.accounts.find((account) => account.id === accountId);

            if (!account && accountId !== 'new') {
              return <Redirect to="/" />;
            }
            return <Account account={account} />;
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
