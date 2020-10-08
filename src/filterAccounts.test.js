import {RATING_HOT, INDUSTRY_AGRICULTURE, INDUSTRY_MEDIA, RATING_WARM} from './constants';

import filterAccounts from './filterAccounts';

it('should filter by name', () => {
  const accounts = filterAccounts({name: '2'}, [
    {
      id: '1',
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
      id: '2',
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
  ]);

  expect(accounts.length).toEqual(1);
  expect(accounts).toEqual([
    {
      id: '2',
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
  ]);
});

it('should filter by address', () => {
  const accounts = filterAccounts({state: 'TX'}, [
    {
      id: '1',
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
      id: '2',
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
  ]);

  expect(accounts.length).toEqual(1);
  expect(accounts).toEqual([
    {
      id: '2',
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
  ]);
});

it('should filter by industry', () => {
  const accounts = filterAccounts({industry: INDUSTRY_MEDIA}, [
    {
      id: '1',
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
      id: '2',
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
  ]);

  expect(accounts.length).toEqual(1);
  expect(accounts).toEqual([
    {
      id: '1',
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
    }
  ]);
});

it('should filter by annualRevenue when greater than', () => {
  const accounts = filterAccounts({annualRevenue: {greaterAnnualRevenue: 1001}}, [
    {
      id: '1',
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
      id: '2',
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
  ]);

  expect(accounts.length).toEqual(1);
  expect(accounts).toEqual([
    {
      id: '2',
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
  ]);
});

it('should filter by annualRevenue when less than', () => {
  const accounts = filterAccounts({annualRevenue: {lessAnnualRevenue: 1001}}, [
    {
      id: '1',
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
      id: '2',
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
  ]);

  expect(accounts.length).toEqual(1);
  expect(accounts).toEqual([
    {
      id: '1',
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
    }
  ]);
});

it('should filter by annualRevenue when greater than and less than', () => {
  const accounts = filterAccounts(
    {annualRevenue: {greaterAnnualRevenue: 11, lessAnnualRevenue: 2000}},
    [
      {
        id: '1',
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
        id: '2',
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
        id: '3',
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
    ]
  );

  expect(accounts.length).toEqual(1);
  expect(accounts).toEqual([
    {
      id: '2',
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
    }
  ]);
});

it('should filter by rating', () => {
  const accounts = filterAccounts({rating: RATING_HOT}, [
    {
      id: '1',
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
      id: '2',
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
  ]);

  expect(accounts.length).toEqual(1);
  expect(accounts).toEqual([
    {
      id: '2',
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
  ]);
});

it('should filter by establishedDate when after', () => {
  const accounts = filterAccounts({establishedDate: {afterEstablishedDate: '2019-05-15'}}, [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
  ]);

  expect(accounts.length).toEqual(1);
  expect(accounts).toEqual([
    {
      id: '3',
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
  ]);
});

it('should filter by establishedDate when before', () => {
  const accounts = filterAccounts({establishedDate: {beforeEstablishedDate: '2019-05-13'}}, [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
  ]);

  expect(accounts.length).toEqual(1);
  expect(accounts).toEqual([
    {
      id: '1',
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
    }
  ]);
});

it('should filter by establishedDate when before and after', () => {
  const accounts = filterAccounts(
    {establishedDate: {afterEstablishedDate: '2019-04-22', beforeEstablishedDate: '2020-01-01'}},
    [
      {
        id: '1',
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
        id: '2',
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
        id: '3',
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
    ]
  );

  expect(accounts.length).toEqual(1);
  expect(accounts).toEqual([
    {
      id: '2',
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
    }
  ]);
});
