import {
  createAccount,
  updateAccount,
  removeAccount,
  addContactToAccount,
  removeContactFromAccount,
  updateContact
} from './accounts';
import * as constants from '../constants';

test('createAccount creates an account payload with a generated id', () => {
  expect(
    createAccount({
      name: 'New Account',
      address: '102 my street austin, texas',
      industry: 'Agriculture',
      annualRevenue: '$1.2B',
      rating: constants.RATING_HOT,
      establishedDate: new Date()
    })
  ).toEqual({
    type: createAccount.type,
    payload: {
      id: expect.anything(),
      name: 'New Account',
      address: '102 my street austin, texas',
      industry: 'Agriculture',
      annualRevenue: '$1.2B',
      rating: constants.RATING_HOT,
      establishedDate: expect.any(Date)
    }
  });
});

test('updateAccount generates an update account action', () => {
  expect(
    updateAccount(1234, {
      name: 'updated name'
    })
  ).toEqual({
    type: updateAccount.type,
    payload: {
      accountId: 1234,
      update: {
        name: 'updated name'
      }
    }
  });
});

test('removeAccount generates a remove account action', () => {
  expect(removeAccount(1234)).toEqual({
    type: removeAccount.type,
    payload: 1234
  });
});

test('addContactToAccount generates an add contact action', () => {
  expect(
    addContactToAccount(1234, {
      name: 'Contact 1',
      phone: '4041124444',
      email: 'contact1@contacts.com',
      leadSource: constants.LEAD_SOURCE_WEB
    })
  ).toEqual({
    type: addContactToAccount.type,
    payload: {
      accountId: 1234,
      contact: {
        id: expect.anything(),
        name: 'Contact 1',
        phone: '4041124444',
        email: 'contact1@contacts.com',
        leadSource: constants.LEAD_SOURCE_WEB
      }
    }
  });
});

test('updateContact generates an update contact action', () => {
  expect(
    updateContact(1234, 5678, {
      name: 'Updated Contact Name'
    })
  ).toEqual({
    type: updateContact.type,
    payload: {
      accountId: 1234,
      contactId: 5678,
      update: {
        name: 'Updated Contact Name'
      }
    }
  });
});

test('removeContactFromAccount generates a remove contact action', () => {
  expect(removeContactFromAccount(1234, 5678)).toEqual({
    type: removeContactFromAccount.type,
    payload: {
      accountId: 1234,
      contactId: 5678
    }
  });
});
