import {createAccount} from './accounts';

test('createAccount creates an account payload with a generated id', () => {
  const accountPayload = createAccount({
    name: 'New Account',
    address: '102 my street austin, texas',
    industry: 'Agriculture',
    annualRevenue: '$1.2B',
    rating: 'hot',
    establishedDate: new Date()
  });

  expect(accountPayload.payload).toEqual({
    id: expect.anything(),
    name: 'New Account',
    address: '102 my street austin, texas',
    industry: 'Agriculture',
    annualRevenue: '$1.2B',
    rating: 'hot',
    establishedDate: expect.any(Date)
  });
});

test('updateAccount generates an update account action', () => {});

test('addContact generates an add contact action', () => {});

test('removeContact generates a remove contact action', () => {});

test('removeAccount generates a remove account action', () => {});