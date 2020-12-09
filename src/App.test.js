import React from 'react';
import {mount, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {MemoryRouter} from 'react-router-dom';
import {nanoid} from '@reduxjs/toolkit';

import {RATING_HOT, INDUSTRY_AGRICULTURE} from './constants';
import App, {App as AppComponent} from './App';
import AccountDetailsModal from './AccountDetailsModal';
import AccountFilters from './AccountFilters';
import Contacts from './Contacts';
import ContactDetailsModal from './ContactDetailsModal';

const mockStore = configureStore([]);

it('should render an account', () => {
  const account = {
    id: nanoid(),
    name: 'New Account',
    address: {
      street: '999 Old St',
      city: 'Atlanta',
      state: 'GA'
    },
    industry: INDUSTRY_AGRICULTURE,
    annualRevenue: 1000,
    rating: RATING_HOT,
    establishedDate: '2019-12-31'
  };

  const wrapper = shallow(<AppComponent accounts={[account]} history={{}} />);

  expect(wrapper.find('.accounts')).toExist();
  expect(wrapper.find('.accounts .account > div').at(0)).toIncludeText('New Account');
  expect(wrapper.find('.accounts .account > div').at(1)).toIncludeText(
    '999 Old St Atlanta, Georgia'
  );
  expect(wrapper.find('.accounts .account > div').at(2)).toIncludeText('Agriculture');
  expect(wrapper.find('.accounts .account > div').at(3)).toIncludeText('$1,000.00');
  expect(wrapper.find('.accounts .account > div').at(4)).toIncludeText('Hot');
  expect(wrapper.find('.accounts .account > div').at(5)).toIncludeText(account.establishedDate);
});

it('should render contacts when an account cell is clicked', () => {
  const account = {
    id: nanoid(),
    name: 'New Account',
    address: {
      street: '999 Old St',
      city: 'Atlanta',
      state: 'GA'
    },
    industry: INDUSTRY_AGRICULTURE,
    annualRevenue: 1000,
    rating: RATING_HOT,
    establishedDate: '2019-12-31',
    contacts: [
      {
        id: 'contact-1',
        name: 'Contact 1',
        phone: '7702420101',
        email: 'contact@contacts.com',
        leadSource: 'Web'
      }
    ]
  };

  const wrapper = shallow(<AppComponent accounts={[account]} history={{}} />);

  expect(wrapper.find(Contacts)).not.toExist();

  wrapper
    .find('.accounts .account > div')
    .at(0)
    .simulate('click');

  const contactsComp = wrapper.find(Contacts);

  expect(contactsComp).toExist();

  expect(contactsComp.prop('contacts')).toEqual([
    {
      id: 'contact-1',
      name: 'Contact 1',
      phone: '7702420101',
      email: 'contact@contacts.com',
      leadSource: 'Web'
    }
  ]);
});

it('should hide contacts when the account cell is clicked again', () => {
  const account = {
    id: nanoid(),
    name: 'New Account',
    address: {
      street: '999 Old St',
      city: 'Atlanta',
      state: 'GA'
    },
    industry: INDUSTRY_AGRICULTURE,
    annualRevenue: 1000,
    rating: RATING_HOT,
    establishedDate: '2019-12-31',
    contacts: [
      {
        id: 'contact-1',
        name: 'Contact 1',
        phone: '7702420101',
        email: 'contact@contacts.com',
        leadSource: 'Web'
      }
    ]
  };

  const wrapper = shallow(<AppComponent accounts={[account]} history={{}} />);

  expect(wrapper.find(Contacts)).not.toExist();

  wrapper
    .find('.accounts .account > div')
    .at(0)
    .simulate('click');

  wrapper
    .find('.accounts .account > div')
    .at(0)
    .simulate('click');

  expect(wrapper.find(Contacts)).not.toExist();
});

it('should filter accounts when accounts filters change', () => {
  const wrapper = shallow(
    <AppComponent
      accounts={[
        {
          id: nanoid(),
          name: 'Account 1',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_AGRICULTURE,
          annualRevenue: 1000,
          rating: RATING_HOT,
          establishedDate: '2019-12-31'
        },
        {
          id: nanoid(),
          name: 'Account 2',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_AGRICULTURE,
          annualRevenue: 1000,
          rating: RATING_HOT,
          establishedDate: '2019-12-31'
        }
      ]}
      history={{}}
    />
  );

  wrapper.find(AccountFilters).prop('onFilterChange')({
    name: 'Account 2',
    industry: '',
    rating: '',
    state: '',
    annualRevenue: {
      greaterAnnualRevenue: '',
      lessAnnualRevenue: ''
    },
    establishedDate: {
      afterEstablishedDate: '',
      beforeEstablishedDate: ''
    }
  });

  expect(wrapper.find('.accounts').length).toEqual(1);
  expect(wrapper.find('.accounts .account > div').at(0)).toIncludeText('Account 2');
});

it('should navigate to an account detail page when an account row is clicked', () => {
  const historyMock = {
    push: jest.fn()
  };
  const accountId = nanoid();

  const wrapper = shallow(
    <AppComponent
      accounts={[
        {
          id: accountId,
          name: 'New Account',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_AGRICULTURE,
          annualRevenue: 1000,
          rating: RATING_HOT,
          establishedDate: '2012-01-22'
        }
      ]}
      history={historyMock}
    />
  );

  wrapper
    .find('.accounts .account .controls Button')
    .last()
    .simulate('click');

  expect(historyMock.push).toHaveBeenCalledWith(`/accounts/${accountId}`);
});

it('should navigate to new contacts route when add contact button is pressed', () => {
  const historyMock = {
    push: jest.fn()
  };
  const accountId = nanoid();

  const wrapper = shallow(
    <AppComponent
      accounts={[
        {
          id: accountId,
          name: 'New Account',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_AGRICULTURE,
          annualRevenue: 1000,
          rating: RATING_HOT,
          establishedDate: '2012-01-22',
          contacts: []
        }
      ]}
      history={historyMock}
    />
  );

  wrapper.find('.accounts .add-contact').simulate('click');

  expect(historyMock.push).toHaveBeenCalledWith(`/accounts/${accountId}/contacts/new`);
});

it('should render the account modal with a null account if the account id is new', () => {
  const accounts = [
    {
      id: 'account-1',
      name: 'New Account',
      address: '102 my street austin, texas',
      industry: 'Agriculture',
      annualRevenue: '$1.2B',
      rating: 'hot',
      establishedDate: new Date(),
      contacts: []
    }
  ];

  const wrapper = mount(
    <MemoryRouter initialEntries={['/accounts/new']}>
      <Provider store={mockStore(accounts)}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(wrapper.find(AccountDetailsModal)).toHaveProp('account', null);
});

it('should render the account modal based on the account id from the route', () => {
  const accounts = [
    {
      id: 'account-1',
      name: 'New Account',
      address: '102 my street austin, texas',
      industry: 'Agriculture',
      annualRevenue: '$1.2B',
      rating: 'hot',
      establishedDate: new Date(),
      contacts: []
    }
  ];

  const wrapper = mount(
    <MemoryRouter initialEntries={['/accounts/account-1']}>
      <Provider store={mockStore(accounts)}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(wrapper.find(AccountDetailsModal)).toHaveProp('account', {
    id: 'account-1',
    name: 'New Account',
    address: '102 my street austin, texas',
    industry: 'Agriculture',
    annualRevenue: '$1.2B',
    rating: 'hot',
    establishedDate: expect.any(Date),
    contacts: []
  });
});

it('should not render the account modal if the account is not found', () => {
  const accounts = [
    {
      id: 'account-1',
      name: 'New Account',
      address: '102 my street austin, texas',
      industry: 'Agriculture',
      annualRevenue: '$1.2B',
      rating: 'hot',
      establishedDate: new Date(),
      contacts: []
    }
  ];

  const wrapper = mount(
    <MemoryRouter initialEntries={['/accounts/account-2']}>
      <Provider store={mockStore(accounts)}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(wrapper.find(AccountDetailsModal)).not.toExist();
});

it('should render the contact modal with a null contact if the contact id is new', () => {
  const accounts = [
    {
      id: 'account-1',
      name: 'New Account',
      address: '102 my street austin, texas',
      industry: 'Agriculture',
      annualRevenue: '$1.2B',
      rating: 'hot',
      establishedDate: new Date(),
      contacts: []
    }
  ];

  const wrapper = mount(
    <MemoryRouter initialEntries={['/accounts/account-1/contacts/new']}>
      <Provider store={mockStore(accounts)}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(wrapper.find(ContactDetailsModal)).toHaveProp('contact', null);
});

it('should render the contact modal with the contact id from the route', () => {
  const accounts = [
    {
      id: 'account-1',
      name: 'New Account',
      address: '102 my street austin, texas',
      industry: 'Agriculture',
      annualRevenue: '$1.2B',
      rating: 'hot',
      establishedDate: new Date(),
      contacts: [
        {
          id: 'contact-1',
          name: 'Contact 1',
          phone: '7702420101',
          email: 'contact@contacts.com',
          leadSource: 'Web'
        }
      ]
    }
  ];

  const wrapper = mount(
    <MemoryRouter initialEntries={['/accounts/account-1/contacts/contact-1']}>
      <Provider store={mockStore(accounts)}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(wrapper.find(ContactDetailsModal)).toHaveProp('contact', {
    id: 'contact-1',
    name: 'Contact 1',
    phone: '7702420101',
    email: 'contact@contacts.com',
    leadSource: 'Web'
  });
});

it('should not render the contact modal if the account is not found', () => {
  const accounts = [
    {
      id: 'account-1',
      name: 'New Account',
      address: '102 my street austin, texas',
      industry: 'Agriculture',
      annualRevenue: '$1.2B',
      rating: 'hot',
      establishedDate: new Date(),
      contacts: [
        {
          id: 'contact-1',
          name: 'Contact 1',
          phone: '7702420101',
          email: 'contact@contacts.com',
          leadSource: 'Web'
        }
      ]
    }
  ];

  const wrapper = mount(
    <MemoryRouter initialEntries={['/accounts/account-2/contacts/contact-1']}>
      <Provider store={mockStore(accounts)}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(wrapper.find(ContactDetailsModal)).not.toExist();
});

it('should not render the contact modal if the contact is not found', () => {
  const accounts = [
    {
      id: 'account-1',
      name: 'New Account',
      address: '102 my street austin, texas',
      industry: 'Agriculture',
      annualRevenue: '$1.2B',
      rating: 'hot',
      establishedDate: new Date(),
      contacts: [
        {
          id: 'contact-1',
          name: 'Contact 1',
          phone: '7702420101',
          email: 'contact@contacts.com',
          leadSource: 'Web'
        }
      ]
    }
  ];

  const wrapper = mount(
    <MemoryRouter initialEntries={['/accounts/account-1/contacts/contact-2']}>
      <Provider store={mockStore(accounts)}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(wrapper.find(ContactDetailsModal)).not.toExist();
});
