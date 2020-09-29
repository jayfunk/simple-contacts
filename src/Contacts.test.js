import React from 'react';
import {nanoid} from '@reduxjs/toolkit';
import {shallow} from 'enzyme';
import {Button} from 'react-bootstrap';

import * as constants from './constants';
import {Contacts} from './Contacts';

it('should render a contact', () => {
  const wrapper = shallow(
    <Contacts
      accountId={'account-id'}
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
      removeContactFromAccount={() => {}}
    />
  );

  expect(wrapper.find('tbody tr')).toExist();
  expect(wrapper.find('tbody tr td').first()).toIncludeText('New Contact');
});

it('should render a contacts lead source with display value', () => {
  const wrapper = shallow(
    <Contacts
      accountId={'account-id'}
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
      removeContactFromAccount={() => {}}
    />
  );

  expect(wrapper.find('tbody tr td').at(3)).toIncludeText('Web');
});

it('should navigate to a contact detail page when a contact row is clicked', () => {
  const historyMock = {
    push: jest.fn()
  };
  const contactId = nanoid();

  const wrapper = shallow(
    <Contacts
      accountId={'account-id'}
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
      removeContactFromAccount={() => {}}
    />
  );

  wrapper.find('tbody tr').simulate('click');

  expect(historyMock.push).toHaveBeenCalledWith(`/accounts/account-id/contacts/${contactId}`);
});

it('should delete a contact when the delete icon is clicked', () => {
  const historyMock = {
    push: jest.fn()
  };
  const contactId = nanoid();

  const wrapper = shallow(
    <Contacts
      accountId={'account-id'}
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
      removeContactFromAccount={() => {}}
    />
  );

  wrapper
    .find('tbody tr td')
    .find(Button)
    .simulate('click');
});
