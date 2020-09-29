import {
  createAccount,
  updateAccount,
  removeAccount,
  addContactToAccount,
  updateContact,
  removeContactFromAccount
} from '../actions/accounts';

export default function Accounts(state = getInitialState(), action = {}) {
  switch (action.type) {
    case createAccount.type: {
      const account = action.payload;
      account.contacts = [];

      return state.concat(account);
    }

    case updateAccount.type: {
      const accountIndex = state.findIndex((account) => account.id === action.payload.accountId);
      const account = state[accountIndex];

      const updatedAccount = {
        ...account,
        ...action.payload.update,
        id: account.id,
        contacts: account.contacts
      };

      const updatedState = state.slice();
      updatedState[accountIndex] = updatedAccount;

      return updatedState;
    }

    case removeAccount.type: {
      const accountIndex = state.findIndex((account) => account.id === action.payload);
      const updatedState = state.slice();

      updatedState.splice(accountIndex, 1);

      return updatedState;
    }

    case addContactToAccount.type: {
      const accountIndex = state.findIndex((account) => account.id === action.payload.accountId);
      const account = state[accountIndex];

      const updatedAccount = {
        ...account,
        contacts: [action.payload.contact, ...account.contacts]
      };

      const updatedState = state.slice();
      updatedState[accountIndex] = updatedAccount;

      return updatedState;
    }

    case updateContact.type: {
      const accountIndex = state.findIndex((account) => account.id === action.payload.accountId);
      const account = state[accountIndex];

      const contacts = account.contacts.slice();
      const contactIndex = contacts.findIndex((contact) => contact.id === action.payload.contactId);
      const contact = contacts[contactIndex];

      contacts[contactIndex] = {
        ...contact,
        ...action.payload.update,
        id: contact.id
      };

      const updatedAccount = {
        ...account,
        contacts
      };

      const updatedState = state.slice();
      updatedState[accountIndex] = updatedAccount;

      return updatedState;
    }

    case removeContactFromAccount.type: {
      const accountIndex = state.findIndex((account) => account.id === action.payload.accountId);
      const account = state[accountIndex];

      const contacts = account.contacts.slice();
      const contactIndex = contacts.findIndex((contact) => contact.id === action.payload.contactId);

      contacts.splice(contactIndex, 1);

      const updatedAccount = {
        ...account,
        contacts
      };

      const updatedState = state.slice();
      updatedState[accountIndex] = updatedAccount;

      return updatedState;
    }

    default:
      return state;
  }
}

function getInitialState() {
  return [];
}
