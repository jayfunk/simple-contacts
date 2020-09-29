import * as constants from '../constants';
import reducer from './accounts';
import {
  createAccount,
  updateAccount,
  removeAccount,
  addContact,
  updateContact,
  removeContact
} from '../actions/accounts';

it('should set its default state to an empty array', () => {
  expect(reducer()).toEqual([]);
});

it('should create a new account', () => {
  expect(
    reducer(
      reducer(),
      createAccount({
        name: 'New Account',
        address: '1234 mini lane boston, ma',
        industry: constants.INDUSTRY_APPAREL
      })
    )
  ).toEqual([
    {
      id: expect.anything(),
      name: 'New Account',
      address: '1234 mini lane boston, ma',
      industry: constants.INDUSTRY_APPAREL,
      contacts: []
    }
  ]);
});

it('should update an existing account', () => {
  const account1Action = createAccount({
    name: 'Account 1',
    address: '1234 mini lane boston, ma',
    industry: constants.INDUSTRY_APPAREL
  });
  const account2Action = createAccount({
    name: 'Account 2',
    address: '1 congress ave austin, tx',
    raiting: constants.RATING_HOT
  });
  const accountId = account1Action.payload.id;
  let state = reducer(reducer(), account1Action);
  state = reducer(state, account2Action);

  expect(
    reducer(
      state,
      updateAccount(accountId, {
        rating: constants.RATING_HOT,
        name: 'Updated Account Name'
      })
    )
  ).toEqual([
    {
      id: accountId,
      name: 'Updated Account Name',
      address: '1234 mini lane boston, ma',
      industry: constants.INDUSTRY_APPAREL,
      rating: constants.RATING_HOT,
      contacts: []
    },
    {
      id: expect.anything(),
      name: 'Account 2',
      address: '1 congress ave austin, tx',
      raiting: constants.RATING_HOT,
      contacts: []
    }
  ]);
});

it('should update an account and ignore an id in the update payload ', () => {
  const account1Action = createAccount({
    name: 'Account 1',
    address: '1234 mini lane boston, ma',
    industry: constants.INDUSTRY_APPAREL
  });
  const account2Action = createAccount({
    name: 'Account 2',
    address: '1 congress ave austin, tx',
    raiting: constants.RATING_HOT
  });
  const accountId = account1Action.payload.id;
  let state = reducer(reducer(), account1Action);
  state = reducer(state, account2Action);

  expect(
    reducer(
      state,
      updateAccount(accountId, {
        id: 1234,
        rating: constants.RATING_HOT,
        name: 'Updated Account Name'
      })
    )
  ).toEqual([
    {
      id: accountId,
      name: 'Updated Account Name',
      address: '1234 mini lane boston, ma',
      industry: constants.INDUSTRY_APPAREL,
      rating: constants.RATING_HOT,
      contacts: []
    },
    {
      id: expect.anything(),
      name: 'Account 2',
      address: '1 congress ave austin, tx',
      raiting: constants.RATING_HOT,
      contacts: []
    }
  ]);
});

it('should update an account and ignore a contacts field in the update payload ', () => {
  const account1Action = createAccount({
    name: 'Account 1',
    address: '1234 mini lane boston, ma',
    industry: constants.INDUSTRY_APPAREL
  });
  const accountId = account1Action.payload.id;
  const state = reducer(reducer(), account1Action);

  expect(
    reducer(
      state,
      updateAccount(accountId, {
        rating: constants.RATING_HOT,
        name: 'Updated Account Name',
        contacts: ['something']
      })
    )
  ).toEqual([
    {
      id: accountId,
      name: 'Updated Account Name',
      address: '1234 mini lane boston, ma',
      industry: constants.INDUSTRY_APPAREL,
      rating: constants.RATING_HOT,
      contacts: []
    }
  ]);
});

it('should delete an account', () => {
  const account1Action = createAccount({
    name: 'Account 1',
    address: '1234 mini lane boston, ma',
    industry: constants.INDUSTRY_APPAREL
  });
  const account2Action = createAccount({
    name: 'Account 2',
    address: '1 congress ave austin, tx',
    raiting: constants.RATING_HOT
  });
  const accountId = account2Action.payload.id;
  let state = reducer(reducer(), account1Action);
  state = reducer(state, account2Action);

  expect(reducer(state, removeAccount(accountId))).toEqual([
    {
      id: expect.anything(),
      name: 'Account 1',
      address: '1234 mini lane boston, ma',
      industry: constants.INDUSTRY_APPAREL,
      contacts: []
    }
  ]);
});

it('should add a contact to an account', () => {
  const account1Action = createAccount({
    name: 'Account 1',
    address: '1234 mini lane boston, ma',
    industry: constants.INDUSTRY_APPAREL
  });
  const accountId = account1Action.payload.id;
  const state = reducer(reducer(), account1Action);

  const addContactAction = addContact(accountId, {
    name: 'Contact 1',
    phone: '5555555555',
    email: 'contact1@contacts.com',
    leadSource: constants.LEAD_SOURCE_PURCHASEDLIST
  });

  expect(reducer(state, addContactAction)).toEqual([
    {
      id: accountId,
      name: 'Account 1',
      address: '1234 mini lane boston, ma',
      industry: constants.INDUSTRY_APPAREL,
      contacts: [
        {
          id: addContactAction.payload.contact.id,
          name: 'Contact 1',
          phone: '5555555555',
          email: 'contact1@contacts.com',
          leadSource: constants.LEAD_SOURCE_PURCHASEDLIST
        }
      ]
    }
  ]);
});

it('should update an accounts contact', () => {
  const account1Action = createAccount({
    name: 'Account 1',
    address: '1234 mini lane boston, ma',
    industry: constants.INDUSTRY_APPAREL
  });
  const accountId = account1Action.payload.id;

  const addContactAction = addContact(accountId, {
    name: 'Contact 1',
    phone: '5555555555',
    email: 'contact1@contacts.com',
    leadSource: constants.LEAD_SOURCE_PURCHASEDLIST
  });
  const contactId = addContactAction.payload.contact.id;

  let state = reducer(reducer(), account1Action);
  state = reducer(state, addContactAction);

  const updateContactAction = updateContact(accountId, contactId, {
    name: 'Updated Contact 1',
    phone: '1234567890'
  });

  expect(reducer(state, updateContactAction)).toEqual([
    {
      id: accountId,
      name: 'Account 1',
      address: '1234 mini lane boston, ma',
      industry: constants.INDUSTRY_APPAREL,
      contacts: [
        {
          id: contactId,
          name: 'Updated Contact 1',
          phone: '1234567890',
          email: 'contact1@contacts.com',
          leadSource: constants.LEAD_SOURCE_PURCHASEDLIST
        }
      ]
    }
  ]);
});

it('should update an accounts contact and ignore an id field in the update', () => {
  const account1Action = createAccount({
    name: 'Account 1',
    address: '1234 mini lane boston, ma',
    industry: constants.INDUSTRY_APPAREL
  });
  const accountId = account1Action.payload.id;

  const addContactAction = addContact(accountId, {
    name: 'Contact 1',
    phone: '5555555555',
    email: 'contact1@contacts.com',
    leadSource: constants.LEAD_SOURCE_PURCHASEDLIST
  });
  const contactId = addContactAction.payload.contact.id;

  let state = reducer(reducer(), account1Action);
  state = reducer(state, addContactAction);

  const updateContactAction = updateContact(accountId, contactId, {
    name: 'Updated Contact 1',
    phone: '1234567890',
    id: 1234
  });

  expect(reducer(state, updateContactAction)).toEqual([
    {
      id: accountId,
      name: 'Account 1',
      address: '1234 mini lane boston, ma',
      industry: constants.INDUSTRY_APPAREL,
      contacts: [
        {
          id: contactId,
          name: 'Updated Contact 1',
          phone: '1234567890',
          email: 'contact1@contacts.com',
          leadSource: constants.LEAD_SOURCE_PURCHASEDLIST
        }
      ]
    }
  ]);
});

it('should remove a contact from an account', () => {
  const account1Action = createAccount({
    name: 'Account 1',
    address: '1234 mini lane boston, ma',
    industry: constants.INDUSTRY_APPAREL
  });
  const accountId = account1Action.payload.id;

  const addContact1Action = addContact(accountId, {
    name: 'Contact 1',
    phone: '5555555555',
    email: 'contact1@contacts.com',
    leadSource: constants.LEAD_SOURCE_PURCHASEDLIST
  });
  const addContact2Action = addContact(accountId, {
    name: 'Contact 2',
    phone: '3333333333',
    email: 'contact2@contacts.com',
    leadSource: constants.LEAD_SOURCE_PHONE
  });
  const contactId = addContact1Action.payload.contact.id;
  const contact2Id = addContact2Action.payload.contact.id;

  let state = reducer(reducer(), account1Action);
  state = reducer(state, addContact1Action);
  state = reducer(state, addContact2Action);

  const removeContactAction = removeContact(accountId, contactId);

  const actual = reducer(state, removeContactAction);
  expect(actual).toEqual([
    {
      id: accountId,
      name: 'Account 1',
      address: '1234 mini lane boston, ma',
      industry: constants.INDUSTRY_APPAREL,
      contacts: [
        {
          id: contact2Id,
          name: 'Contact 2',
          phone: '3333333333',
          email: 'contact2@contacts.com',
          leadSource: constants.LEAD_SOURCE_PHONE
        }
      ]
    }
  ]);
});
