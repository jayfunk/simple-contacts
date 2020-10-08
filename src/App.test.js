import React from 'react';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {MemoryRouter} from 'react-router-dom';
import {nanoid} from '@reduxjs/toolkit';

import {RATING_HOT, INDUSTRY_AGRICULTURE} from './constants';
import App, {App as AppComponent} from './App';
import AccountDetailsModal from './AccountDetailsModal';

const mockStore = configureStore([]);

it('renders without crashing', () => {
  shallow(
    <Provider store={mockStore([])}>
      <App />
    </Provider>
  );
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

  expect(wrapper.find(AccountDetailsModal)).toHaveProp('account', accounts[0]);
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

  expect(wrapper.find(AccountDetailsModal)).toHaveProp('account', null);
});

it('should render an account', () => {
  const account = {
    id: nanoid(),
    name: 'New Account',
    address: {
      street: '999 Old St',
      city: 'Atlanta',
      state: 'GA'
    },
    industry: INDUSTRY_AGRICULTURE,
    annualRevenue: 1000,
    rating: RATING_HOT,
    establishedDate: '2019-12-31'
  };

  const wrapper = shallow(<AppComponent accounts={[account]} history={{}} />);

  expect(wrapper.find('.accounts')).toExist();
  expect(wrapper.find('.accounts .account > div').at(0)).toIncludeText('New Account');
  expect(wrapper.find('.accounts .account > div').at(1)).toIncludeText(
    '999 Old St Atlanta, Georgia'
  );
  expect(wrapper.find('.accounts .account > div').at(2)).toIncludeText('Agriculture');
  expect(wrapper.find('.accounts .account > div').at(3)).toIncludeText('$1,000.00');
  expect(wrapper.find('.accounts .account > div').at(4)).toIncludeText('Hot');
  expect(wrapper.find('.accounts .account > div').at(5)).toIncludeText(account.establishedDate);
});

it('should navigate to an account detail page when an account row is clicked', () => {
  const historyMock = {
    push: jest.fn()
  };
  const accountId = nanoid();

  const wrapper = shallow(
    <AppComponent
      accounts={[
        {
          id: accountId,
          name: 'New Account',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_AGRICULTURE,
          annualRevenue: 1000,
          rating: RATING_HOT,
          establishedDate: '2012-01-22'
        }
      ]}
      history={historyMock}
    />
  );

  wrapper
    .find('.accounts .account .controls Button')
    .last()
    .simulate('click');

  expect(historyMock.push).toHaveBeenCalledWith(`/accounts/${accountId}`);
});
