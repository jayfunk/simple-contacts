import {createAction, nanoid} from '@reduxjs/toolkit';

const createAccount = createAction('accounts/create', (accountDetails) => {
  return {
    payload: {
      ...accountDetails,
      id: nanoid()
    }
  };
});

export {createAccount};
