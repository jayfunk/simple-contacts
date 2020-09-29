import React from 'react';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {MemoryRouter} from 'react-router-dom';

import App from './App';
import Accounts from './Accounts';
import Account from './Account';

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
      establishedDate: new Date(),
      contacts: []
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

it('should find and render the account when navigating to the account route', () => {
  const accounts = [
    {
      id: 'account-1',
      name: 'New Account',
      address: '102 my street austin, texas',
      industry: 'Agriculture',
      annualRevenue: '$1.2B',
      rating: 'hot',
      establishedDate: new Date(),
      contacts: []
    }
  ];

  const wrapper = mount(
    <MemoryRouter initialEntries={['/accounts/account-1']}>
      <Provider store={mockStore(accounts)}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(wrapper.find(Account)).toHaveProp('account', accounts[0]);
});

it('should render the account component with a null account if the account id is new', () => {
  const accounts = [
    {
      id: 'account-1',
      name: 'New Account',
      address: '102 my street austin, texas',
      industry: 'Agriculture',
      annualRevenue: '$1.2B',
      rating: 'hot',
      establishedDate: new Date(),
      contacts: []
    }
  ];

  const wrapper = mount(
    <MemoryRouter initialEntries={['/accounts/new']}>
      <Provider store={mockStore(accounts)}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(wrapper.find(Account)).toHaveProp('account', null);
});
