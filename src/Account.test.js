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

