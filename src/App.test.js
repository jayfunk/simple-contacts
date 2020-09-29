import React from 'react';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {MemoryRouter} from 'react-router-dom';

import App from './App';
import Accounts from './Accounts';

const mockStore = configureStore([]);

it('renders without crashing', () => {
  shallow(
    <Provider store={mockStore([])}>
      <App />
    </Provider>
  );
});

it('passes accounts to the Accounts component', () => {
  const accounts = [
    {
      id: 'account-1',
      name: 'New Account',
      address: '102 my street austin, texas',
      industry: 'Agriculture',
      annualRevenue: '$1.2B',
      rating: 'hot',
      establishedDate: new Date()
    }
  ];

  const wrapper = mount(
    <MemoryRouter>
      <Provider store={mockStore(accounts)}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(wrapper.find(Accounts)).toHaveProp('accounts', accounts);
});
