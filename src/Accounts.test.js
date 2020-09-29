import React from 'react';
import {nanoid} from '@reduxjs/toolkit';
import {shallow} from 'enzyme';

import {Accounts} from './Accounts';

it('should render an account', () => {
  const wrapper = shallow(
    <Accounts
      accounts={[
        {
          id: nanoid(),
          name: 'New Account',
          address: '102 my street austin, texas',
          industry: 'Agriculture',
          annualRevenue: '$1.2B',
          rating: 'hot',
          establishedDate: new Date()
        }
      ]}
      history={{}}
    />
  );

  expect(wrapper.find('tbody tr')).toExist();
  expect(wrapper.find('tbody tr td').first()).toIncludeText('New Account');
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
          industry: 'Agriculture',
          annualRevenue: '$1.2B',
          rating: 'hot',
          establishedDate: new Date()
        }
      ]}
      history={historyMock}
    />
  );

  wrapper.find('tbody tr').simulate('click');

  expect(historyMock.push).toHaveBeenCalledWith(`/accounts/${accountId}`);
});
