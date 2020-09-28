import React from 'react';
import {nanoid} from '@reduxjs/toolkit';
import {shallow} from 'enzyme';

import {Accounts} from './Accounts';

test('accounts renders an account', () => {
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
    />
  );

  expect(wrapper.find('tbody tr')).toExist();
  expect(wrapper.find('tbody tr td').first()).toIncludeText('New Account');
});
