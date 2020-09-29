import React from 'react';
import {nanoid} from '@reduxjs/toolkit';
import {shallow} from 'enzyme';

import {RATING_HOT, INDUSTRY_AGRICULTURE} from './constants';
import {Accounts} from './Accounts';

it('should render an account', () => {
  const account = {
    id: nanoid(),
    name: 'New Account',
    address: '102 my street austin, texas',
    industry: INDUSTRY_AGRICULTURE,
    annualRevenue: '$1.2B',
    rating: RATING_HOT,
    establishedDate: new Date().toDateString()
  };

  const wrapper = shallow(<Accounts accounts={[account]} history={{}} />);

  expect(wrapper.find('tbody tr')).toExist();
  expect(wrapper.find('tbody tr td').at(0)).toIncludeText('New Account');
  expect(wrapper.find('tbody tr td').at(1)).toIncludeText('102 my street austin, texas');
  expect(wrapper.find('tbody tr td').at(2)).toIncludeText('Agriculture');
  expect(wrapper.find('tbody tr td').at(3)).toIncludeText('$1.2B');
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
          address: '102 my street austin, texas',
          industry: INDUSTRY_AGRICULTURE,
          annualRevenue: '$1.2B',
          rating: RATING_HOT,
          establishedDate: new Date().toDateString()
        }
      ]}
      history={historyMock}
    />
  );

  wrapper.find('tbody tr').simulate('click');

  expect(historyMock.push).toHaveBeenCalledWith(`/accounts/${accountId}`);
});
