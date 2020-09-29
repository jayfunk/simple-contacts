import React from 'react';
import {shallow} from 'enzyme';

import Account from './Account';
import AccountDetails from './AccountDetails';
import Contacts from './Contacts';

it('should render account details', () => {
  const account = {id: 'account-1'};
  const wrapper = shallow(<Account account={account} />);

  expect(wrapper.find(AccountDetails)).toExist();
  expect(wrapper.find(AccountDetails)).toHaveProp('account', account);
});

it('should render contacts', () => {
  const account = {id: 'account-1', contacts: [{id: 'contact-1'}]};
  const wrapper = shallow(<Account account={account} />);

  expect(wrapper.find(Contacts)).toExist();
  expect(wrapper.find(Contacts)).toHaveProp('contacts', account.contacts);
  expect(wrapper.find(Contacts)).toHaveProp('accountId', account.id);
});
