import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Accounts from './Accounts';
import Account from './Account';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Accounts />
        </Route>
        <Route
          path="/accounts/:accountName"
          render={({match}) => {
            const accountName = match.params.accountName;
            // this.props.accounts.find()
            const account = null;
            if (!account && accountName !== 'new') {
              return <Redirect to="/" />;
            }
            return <Account account={account} />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
