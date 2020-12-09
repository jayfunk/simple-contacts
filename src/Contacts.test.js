import React from 'react';
import {nanoid} from '@reduxjs/toolkit';
import {shallow} from 'enzyme';
import {Button} from 'react-bootstrap';

import * as constants from './constants';
import {Contacts} from './Contacts';

it('should render an add contact button when there are not any contacts', () => {
  const wrapper = shallow(
    <Contacts
      accountId={'account-id'}
      contacts={[]}
      history={{}}
      match={{
        url: '',
        path: ''
      }}
      addContact={() => {}}
      updateContact={() => {}}
      removeContact={() => {}}
    />
  );

  expect(wrapper.find(Button).text()).toEqual('Add Contact');
});

it('should navigate to the new contacts route when the add contact button is clicked', () => {
  const mockHistory = {
    push: jest.fn()
  };

  const wrapper = shallow(
    <Contacts
      accountId={'account-id'}
      contacts={[]}
      history={mockHistory}
      match={{
        url: '',
        path: ''
      }}
      addContact={() => {}}
      updateContact={() => {}}
      removeContact={() => {}}
    />
  );

  wrapper.find(Button).simulate('click');

  expect(mockHistory.push).toHaveBeenCalledWith('/accounts/account-id/contacts/new');
});

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
      match={{
        url: '',
        path: ''
      }}
      addContact={() => {}}
      updateContact={() => {}}
      removeContact={() => {}}
    />
  );

  expect(wrapper.find('.contact > div').first()).toIncludeText('New Contact');
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
      match={{
        url: '',
        path: ''
      }}
      addContact={() => {}}
      updateContact={() => {}}
      removeContact={() => {}}
    />
  );

  expect(wrapper.find('.contact > div').at(3)).toIncludeText('Web');
});

it('should navigate to a contact detail page when contact detail button is clicked', () => {
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
      match={{
        url: '',
        path: ''
      }}
      addContact={() => {}}
      updateContact={() => {}}
      removeContact={() => {}}
    />
  );

  wrapper
    .find('.contact .controls > Button')
    .last()
    .simulate('click');

  expect(historyMock.push).toHaveBeenCalledWith(`/accounts/account-id/contacts/${contactId}`);
});

it('should delete a contact when the delete icon is clicked', () => {
  const removeContactMock = jest.fn();

  const wrapper = shallow(
    <Contacts
      accountId={'account-1'}
      contacts={[
        {
          id: 'contact-1',
          name: 'New Contact',
          phone: '5555555555',
          email: 'newcontact@contacts.com',
          leadSource: constants.LEAD_SOURCE_WEB
        }
      ]}
      history={{}}
      match={{
        url: '',
        path: ''
      }}
      addContact={() => {}}
      updateContact={() => {}}
      removeContact={removeContactMock}
    />
  );

  wrapper.find('.delete').simulate('click');

  expect(removeContactMock).toHaveBeenCalledWith('account-1', 'contact-1');
});
