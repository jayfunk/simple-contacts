import {createAction, nanoid} from '@reduxjs/toolkit';

export const createAccount = createAction('accounts/create', (accountDetails) => {
  return {
    payload: {
      ...accountDetails,
      id: nanoid()
    }
  };
});

export const updateAccount = createAction('accounts/update', (accountId, accountDetails) => {
  return {
    payload: {
      accountId,
      update: {
        ...accountDetails
      }
    }
  };
});

export const removeAccount = createAction('accounts/remove');

export const addContactToAccount = createAction('accounts/addContact', (accountId, contact) => {
  return {
    payload: {
      accountId,
      contact: {
        ...contact,
        id: nanoid()
      }
    }
  };
});

export const updateContact = createAction(
  'accounts/updateContact',
  (accountId, contactId, contactDetails) => {
    return {
      payload: {
        accountId,
        contactId,
        update: {
          ...contactDetails
        }
      }
    };
  }
);

export const removeContactFromAccount = createAction(
  'accounts/removeContact',
  (accountId, contactId) => {
    return {
      payload: {
        accountId,
        contactId
      }
    };
  }
);
