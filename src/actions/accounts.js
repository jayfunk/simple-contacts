import {createAction, nanoid} from '@reduxjs/toolkit';

export const createAccount = createAction('accounts/create', (accountDetails, history) => {
  const id = nanoid();
  history.push(`/accounts/${id}`);

  return {
    payload: {
      ...accountDetails,
      id
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

export const addContact = createAction('accounts/addContact', (accountId, contact) => {
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

export const removeContact = createAction('accounts/removeContact', (accountId, contactId) => {
  return {
    payload: {
      accountId,
      contactId
    }
  };
});
