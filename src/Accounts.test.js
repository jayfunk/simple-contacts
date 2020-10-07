import React from 'react';
import {nanoid} from '@reduxjs/toolkit';
import {shallow} from 'enzyme';

import {RATING_HOT, INDUSTRY_AGRICULTURE} from './constants';
import {Accounts} from './Accounts';

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

  const wrapper = shallow(<Accounts accounts={[account]} history={{}} />);

  expect(wrapper.find('tbody tr')).toExist();
  expect(wrapper.find('tbody tr td').at(0)).toIncludeText('New Account');
  expect(wrapper.find('tbody tr td').at(1)).toIncludeText('999 Old St Atlanta, Georgia');
  expect(wrapper.find('tbody tr td').at(2)).toIncludeText('Agriculture');
  expect(wrapper.find('tbody tr td').at(3)).toIncludeText(1000);
  expect(wrapper.find('tbody tr td').at(4)).toIncludeText('Hot');
  expect(wrapper.find('tbody tr td').at(5)).toIncludeText(account.establishedDate);
});

it('should navigate to an account detail page when an account row is clicked', () => {
  const historyMock = {
    push: jest.fn()
  };
  const accountId = nanoid();

  const wrapper = shallow(
    <Accounts
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

  wrapper.find('tbody tr').simulate('click');

  expect(historyMock.push).toHaveBeenCalledWith(`/accounts/${accountId}`);
});
