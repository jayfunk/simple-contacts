import React from 'react';
import {nanoid} from '@reduxjs/toolkit';
import {shallow} from 'enzyme';
import {FormControl} from 'react-bootstrap';

import {RATING_HOT, INDUSTRY_AGRICULTURE, INDUSTRY_MEDIA, RATING_WARM} from './constants';
import {Accounts} from './Accounts';

function changeFormControlValue(wrapper, name, value) {
  wrapper
    .find(FormControl)
    .find({name})
    .simulate('change', {target: {value, name}});
}

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

  const wrapper = shallow(<Accounts accounts={[account]} history={{}} />);

  expect(wrapper.find('tbody tr')).toExist();
  expect(wrapper.find('tbody tr td').at(0)).toIncludeText('New Account');
  expect(wrapper.find('tbody tr td').at(1)).toIncludeText('999 Old St Atlanta, Georgia');
  expect(wrapper.find('tbody tr td').at(2)).toIncludeText('Agriculture');
  expect(wrapper.find('tbody tr td').at(3)).toIncludeText(1000);
  expect(wrapper.find('tbody tr td').at(4)).toIncludeText('Hot');
  expect(wrapper.find('tbody tr td').at(5)).toIncludeText(account.establishedDate);
});

it('should navigate to an account detail page when an account row is clicked', () => {
  const historyMock = {
    push: jest.fn()
  };
  const accountId = nanoid();

  const wrapper = shallow(
    <Accounts
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

  wrapper.find('tbody tr').simulate('click');

  expect(historyMock.push).toHaveBeenCalledWith(`/accounts/${accountId}`);
});

it('should filter by name', () => {
  const wrapper = shallow(
    <Accounts
      accounts={[
        {
          id: nanoid(),
          name: 'Account 1',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 1000,
          rating: RATING_WARM,
          establishedDate: '2010-04-14'
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
          annualRevenue: 100000,
          rating: RATING_HOT,
          establishedDate: '2012-01-22'
        }
      ]}
      history={{}}
    />
  );

  changeFormControlValue(wrapper, 'name', '2');

  expect(wrapper.find('tbody').children().length).toEqual(1);
  expect(
    wrapper
      .find('tbody tr td')
      .first()
      .text()
  ).toEqual('Account 2');
});

it('should filter by address', () => {
  const wrapper = shallow(
    <Accounts
      accounts={[
        {
          id: nanoid(),
          name: 'Account 1',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 1000,
          rating: RATING_WARM,
          establishedDate: '2010-04-14'
        },
        {
          id: nanoid(),
          name: 'Account 2',
          address: {
            street: '1 Congress Ave',
            city: 'Austin',
            state: 'TX'
          },
          industry: INDUSTRY_AGRICULTURE,
          annualRevenue: 100000,
          rating: RATING_HOT,
          establishedDate: '2012-01-22'
        }
      ]}
      history={{}}
    />
  );

  changeFormControlValue(wrapper, 'state', 'TX');

  expect(wrapper.find('tbody').children().length).toEqual(1);
  expect(
    wrapper
      .find('tbody tr td')
      .first()
      .text()
  ).toEqual('Account 2');
  expect(
    wrapper
      .find('tbody tr td')
      .at(1)
      .text()
  ).toEqual('1 Congress Ave Austin, Texas');
});

it('should filter by industry', () => {
  const wrapper = shallow(
    <Accounts
      accounts={[
        {
          id: nanoid(),
          name: 'Account 1',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 1000,
          rating: RATING_WARM,
          establishedDate: '2010-04-14'
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
          annualRevenue: 100000,
          rating: RATING_HOT,
          establishedDate: '2012-01-22'
        }
      ]}
      history={{}}
    />
  );

  changeFormControlValue(wrapper, 'industry', INDUSTRY_MEDIA);

  expect(wrapper.find('tbody').children().length).toEqual(1);
  expect(
    wrapper
      .find('tbody tr td')
      .first()
      .text()
  ).toEqual('Account 1');
  expect(
    wrapper
      .find('tbody tr td')
      .at(2)
      .text()
  ).toEqual('Media');
});

it('should filter by annualRevenue when greater than', () => {
  const wrapper = shallow(
    <Accounts
      accounts={[
        {
          id: nanoid(),
          name: 'Account 1',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 1000,
          rating: RATING_WARM,
          establishedDate: '2010-04-14'
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
          annualRevenue: 100000,
          rating: RATING_HOT,
          establishedDate: '2012-01-22'
        }
      ]}
      history={{}}
    />
  );

  changeFormControlValue(wrapper, 'greaterAnnualRevenue', 1001);

  expect(wrapper.find('tbody').children().length).toEqual(1);
  expect(
    wrapper
      .find('tbody tr td')
      .first()
      .text()
  ).toEqual('Account 2');

  expect(
    wrapper
      .find('tbody tr td')
      .at(3)
      .text()
  ).toEqual('100000');
});

it('should filter by annualRevenue when less than', () => {
  const wrapper = shallow(
    <Accounts
      accounts={[
        {
          id: nanoid(),
          name: 'Account 1',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 1000,
          rating: RATING_WARM,
          establishedDate: '2010-04-14'
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
          annualRevenue: 100000,
          rating: RATING_HOT,
          establishedDate: '2012-01-22'
        }
      ]}
      history={{}}
    />
  );

  changeFormControlValue(wrapper, 'lessAnnualRevenue', 1001);

  expect(wrapper.find('tbody').children().length).toEqual(1);
  expect(
    wrapper
      .find('tbody tr td')
      .first()
      .text()
  ).toEqual('Account 1');

  expect(
    wrapper
      .find('tbody tr td')
      .at(3)
      .text()
  ).toEqual('1000');
});

it('should filter by annualRevenue when greater than and less than', () => {
  const wrapper = shallow(
    <Accounts
      accounts={[
        {
          id: nanoid(),
          name: 'Account 1',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 10,
          rating: RATING_WARM,
          establishedDate: '2010-04-14'
        },
        {
          id: nanoid(),
          name: 'Account 2',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 1000,
          rating: RATING_WARM,
          establishedDate: '2010-04-14'
        },
        {
          id: nanoid(),
          name: 'Account 3',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_AGRICULTURE,
          annualRevenue: 100000,
          rating: RATING_HOT,
          establishedDate: '2012-01-22'
        }
      ]}
      history={{}}
    />
  );

  changeFormControlValue(wrapper, 'greaterAnnualRevenue', 11);
  changeFormControlValue(wrapper, 'lessAnnualRevenue', 2000);

  expect(wrapper.find('tbody').children().length).toEqual(1);
  expect(
    wrapper
      .find('tbody tr td')
      .first()
      .text()
  ).toEqual('Account 2');

  expect(
    wrapper
      .find('tbody tr td')
      .at(3)
      .text()
  ).toEqual('1000');
});

it('should filter by rating', () => {
  const wrapper = shallow(
    <Accounts
      accounts={[
        {
          id: nanoid(),
          name: 'Account 1',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 1000,
          rating: RATING_WARM,
          establishedDate: '2010-04-14'
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
          annualRevenue: 100000,
          rating: RATING_HOT,
          establishedDate: '2012-01-22'
        }
      ]}
      history={{}}
    />
  );

  changeFormControlValue(wrapper, 'rating', RATING_HOT);

  expect(wrapper.find('tbody').children().length).toEqual(1);
  expect(
    wrapper
      .find('tbody tr td')
      .first()
      .text()
  ).toEqual('Account 2');
  expect(
    wrapper
      .find('tbody tr td')
      .at(4)
      .text()
  ).toEqual('Hot');
});

it('should filter by establishedDate when after', () => {
  const wrapper = shallow(
    <Accounts
      accounts={[
        {
          id: nanoid(),
          name: 'Account 1',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 1000,
          rating: RATING_WARM,
          establishedDate: '2019-04-14'
        },
        {
          id: nanoid(),
          name: 'Account 2',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 1000,
          rating: RATING_WARM,
          establishedDate: '2019-05-14'
        },
        {
          id: nanoid(),
          name: 'Account 3',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_AGRICULTURE,
          annualRevenue: 100000,
          rating: RATING_HOT,
          establishedDate: '2020-01-22'
        }
      ]}
      history={{}}
    />
  );

  changeFormControlValue(wrapper, 'afterEstablishedDate', '2019-05-15');

  expect(wrapper.find('tbody').children().length).toEqual(1);
  expect(
    wrapper
      .find('tbody tr td')
      .first()
      .text()
  ).toEqual('Account 3');

  expect(
    wrapper
      .find('tbody tr td')
      .at(5)
      .text()
  ).toEqual('2020-01-22');
});

it('should filter by establishedDate when before', () => {
  const wrapper = shallow(
    <Accounts
      accounts={[
        {
          id: nanoid(),
          name: 'Account 1',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 1000,
          rating: RATING_WARM,
          establishedDate: '2019-04-14'
        },
        {
          id: nanoid(),
          name: 'Account 2',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 1000,
          rating: RATING_WARM,
          establishedDate: '2019-05-14'
        },
        {
          id: nanoid(),
          name: 'Account 3',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_AGRICULTURE,
          annualRevenue: 100000,
          rating: RATING_HOT,
          establishedDate: '2020-01-22'
        }
      ]}
      history={{}}
    />
  );

  changeFormControlValue(wrapper, 'beforeEstablishedDate', '2019-05-13');

  expect(wrapper.find('tbody').children().length).toEqual(1);
  expect(
    wrapper
      .find('tbody tr td')
      .first()
      .text()
  ).toEqual('Account 1');

  expect(
    wrapper
      .find('tbody tr td')
      .at(5)
      .text()
  ).toEqual('2019-04-14');
});

it('should filter by establishedDate when before and after', () => {
  const wrapper = shallow(
    <Accounts
      accounts={[
        {
          id: nanoid(),
          name: 'Account 1',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 1000,
          rating: RATING_WARM,
          establishedDate: '2019-04-14'
        },
        {
          id: nanoid(),
          name: 'Account 2',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_MEDIA,
          annualRevenue: 1000,
          rating: RATING_WARM,
          establishedDate: '2019-05-14'
        },
        {
          id: nanoid(),
          name: 'Account 3',
          address: {
            street: '999 Old St',
            city: 'Atlanta',
            state: 'GA'
          },
          industry: INDUSTRY_AGRICULTURE,
          annualRevenue: 100000,
          rating: RATING_HOT,
          establishedDate: '2020-01-22'
        }
      ]}
      history={{}}
    />
  );

  changeFormControlValue(wrapper, 'afterEstablishedDate', '2019-04-22');
  changeFormControlValue(wrapper, 'beforeEstablishedDate', '2020-01-01');

  expect(wrapper.find('tbody').children().length).toEqual(1);
  expect(
    wrapper
      .find('tbody tr td')
      .first()
      .text()
  ).toEqual('Account 2');

  expect(
    wrapper
      .find('tbody tr td')
      .at(5)
      .text()
  ).toEqual('2019-05-14');
});
