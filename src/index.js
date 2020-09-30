import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import './index.css';

import * as serviceWorker from './serviceWorker';

import App from './App';
import {
  LEAD_SOURCE_PHONE,
  INDUSTRY_UTILITIES,
  RATING_COLD,
  INDUSTRY_MANUFACTURING,
  INDUSTRY_EDUCATION,
  RATING_HOT,
  RATING_WARM
} from './constants';

import accounts from './reducers/accounts';

const store = configureStore({
  reducer: accounts,
  preloadedState: [
    {
      id: 'account-1',
      name: 'Apple inc.',
      address: {
        street: '999 Old St',
        city: 'Atlanta',
        state: 'GA'
      },
      industry: INDUSTRY_UTILITIES,
      annualRevenue: 1000000000,
      rating: RATING_COLD,
      establishedDate: '2010-04-07',
      contacts: [
        {
          id: 'contact-1',
          name: 'New Contact',
          phone: '55555555555',
          email: 'contact1@contacts.com',
          leadSource: LEAD_SOURCE_PHONE
        }
      ]
    },
    {
      id: 'account-2',
      name: 'ABC Construction',
      address: {
        street: '999 Old St',
        city: 'Atlanta',
        state: 'GA'
      },
      industry: INDUSTRY_MANUFACTURING,
      annualRevenue: 10,
      rating: RATING_HOT,
      establishedDate: '2011-01-13',
      contacts: [
        {
          id: 'contact-2',
          name: 'New Contact',
          phone: '55555555555',
          email: 'contact1@contacts.com',
          leadSource: LEAD_SOURCE_PHONE
        }
      ]
    },
    {
      id: 'account-3',
      name: 'Big Town Realty',
      address: {
        street: '999 Old St',
        city: 'Atlanta',
        state: 'GA'
      },
      industry: INDUSTRY_EDUCATION,
      annualRevenue: 941,
      rating: RATING_WARM,
      establishedDate: '2012-02-13',
      contacts: [
        {
          id: 'contact-3',
          name: 'New Contact',
          phone: '55555555555',
          email: 'contact1@contacts.com',
          leadSource: LEAD_SOURCE_PHONE
        }
      ]
    }
  ]
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
