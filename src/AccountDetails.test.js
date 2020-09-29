import React from 'react';
import {shallow} from 'enzyme';

import AccountDetails from './AccountDetails';

it('should render account details', () => {
  const establishedDate = new Date();
  const wrapper = shallow(
    <AccountDetails
      account={{
        id: 1234,
        name: 'New Account',
        address: '102 my street austin, texas',
        industry: 'Agriculture',
        annualRevenue: '$1.2B',
        rating: 'hot',
        establishedDate,
        contacts: [
          {
            name: 'Contact 1',
            phone: '5125555555',
            email: 'contact1@contact.com',
            source: 'web'
          }
        ]
      }}
    />
  );
});

it('should render in edit mode when account is null', () => {
  const wrapper = shallow(<AccountDetails account={null} />);
});

it('should call createAccount action creator when save is pressed and account is null', () => {});

it('should call updateAccount action creator when save is presesd and account is not null', () => {});

it('should switch to edit mode when edit button is pressed', () => {});
