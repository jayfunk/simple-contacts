import React from 'react';
import {nanoid} from '@reduxjs/toolkit';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import {Accounts} from './Accounts';

test('accounts renders an account', () => {
  const {getByText} = render(
    <BrowserRouter>
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
    </BrowserRouter>
  );
  expect(getByText('New Account')).toBeInTheDocument();
});
