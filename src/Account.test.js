import React from 'react';
import {shallow} from 'enzyme';

import {Account} from './Account';
import AccountDetails from './AccountDetails';

it('should render account details', () => {
  const account = {some: 'detail'};
  const wrapper = shallow(<Account account={account} />);

  expect(wrapper.find(AccountDetails)).toExist();
  expect(wrapper.find(AccountDetails)).toHaveProp('account', account);
});

it('should open contact modal when add contact button is pressed', () => {});

it('should open contact modal with contact details when a contact is selected in the table', () => {});

it('should not update the account when cancel is pressed while in edit mode', () => {});
