import React from 'react';
import {nanoid} from '@reduxjs/toolkit';
import {shallow} from 'enzyme';

import * as constants from './constants';
import {Contacts} from './Contacts';

it('should render a contact', () => {
  const wrapper = shallow(
    <Contacts
      contacts={[
        {
          id: nanoid(),
          name: 'New Contact',
          phone: '5555555555',
          email: 'newcontact@contacts.com',
          leadSource: constants.LEAD_SOURCE_WEB
        }
      ]}
      history={{}}
    />
  );

  expect(wrapper.find('tbody tr')).toExist();
  expect(wrapper.find('tbody tr td').first()).toIncludeText('New Contact');
});

it('should render a contacts lead source with display value', () => {
  const wrapper = shallow(
    <Contacts
      contacts={[
        {
          id: nanoid(),
          name: 'New Contact',
          phone: '5555555555',
          email: 'newcontact@contacts.com',
          leadSource: constants.LEAD_SOURCE_WEB
        }
      ]}
      history={{}}
    />
  );

  expect(wrapper.find('tbody tr td').last()).toIncludeText('Web');
});

it('should navigate to a contact detail page when a contact row is clicked', () => {
  const historyMock = {
    push: jest.fn()
  };
  const contactId = nanoid();

  const wrapper = shallow(
    <Contacts
      contacts={[
        {
          id: contactId,
          name: 'New Contact',
          phone: '5555555555',
          email: 'newcontact@contacts.com',
          leadSource: constants.LEAD_SOURCE_WEB
        }
      ]}
      history={historyMock}
    />
  );

  wrapper.find('tbody tr').simulate('click');

  expect(historyMock.push).toHaveBeenCalledWith(`/contacts/${contactId}`);
});
