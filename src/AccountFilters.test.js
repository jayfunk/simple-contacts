import React from 'react';
import {shallow} from 'enzyme';
import CurrencyInput from 'react-currency-input-field';

import {INDUSTRY_OPTIONS, STATE_OPTIONS, RATING_OPTIONS} from './constants';
import AccountFilters from './AccountFilters';

const STATE_SHORT_CODES = Object.keys(STATE_OPTIONS);
const STATE_NAMES = STATE_SHORT_CODES.map((code) => STATE_OPTIONS[code]);

const RATING_CODES = Object.keys(RATING_OPTIONS);
const RATING_NAMES = RATING_CODES.map((code) => RATING_OPTIONS[code]);

const INDUSTRY_CODES = Object.keys(INDUSTRY_OPTIONS);
const INDUSTRY_NAMES = INDUSTRY_CODES.map((code) => INDUSTRY_OPTIONS[code]);

it('should render an empty filter form', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  expect(wrapper.find('[name="name"]').prop('value')).toEqual('');
  expect(wrapper.find('[name="state"]').prop('value')).toEqual('');
  expect(wrapper.find('[name="rating"]').prop('value')).toEqual('');
  expect(wrapper.find('[name="industry"]').prop('value')).toEqual('');
  expect(wrapper.find('[name="greaterAnnualRevenue"]').prop('value')).toEqual('');
  expect(wrapper.find('[name="lessAnnualRevenue"]').prop('value')).toEqual('');
  expect(wrapper.find('[name="afterEstablishedDate"]').prop('value')).toEqual('');
  expect(wrapper.find('[name="beforeEstablishedDate"]').prop('value')).toEqual('');
});

it('should update the name field when changed', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  wrapper.find('[name="name"]').simulate('change', {
    target: {
      name: 'name',
      value: 'Some Account Name'
    }
  });

  expect(wrapper.find('[name="name"]').prop('value')).toEqual('Some Account Name');
});

it('should render all of the states as options for the state select control', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  expect(
    wrapper
      .find('[name="state"] option')
      .find({value: ''})
      .key()
  ).toEqual('blank');

  wrapper
    .find('[name="state"] option')
    .not({value: ''})
    .forEach((opt) => {
      expect(STATE_SHORT_CODES).toContain(opt.prop('value'));
      expect(STATE_NAMES).toContain(opt.text());
    });
});

it('should update the state field when changed', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  wrapper.find('[name="state"]').simulate('change', {
    target: {
      name: 'state',
      value: 'AL'
    }
  });

  expect(wrapper.find('[name="state"]').prop('value')).toEqual('AL');
});

it('should render all of the ratings as options for the rating select control', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  expect(
    wrapper
      .find('[name="rating"] option')
      .find({value: ''})
      .key()
  ).toEqual('blank');

  wrapper
    .find('[name="rating"] option')
    .not({value: ''})
    .forEach((opt) => {
      expect(RATING_CODES).toContain(opt.prop('value'));
      expect(RATING_NAMES).toContain(opt.text());
    });
});

it('should update the rating field when changed', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  wrapper.find('[name="rating"]').simulate('change', {
    target: {
      name: 'rating',
      value: 'hot'
    }
  });

  expect(wrapper.find('[name="rating"]').prop('value')).toEqual('hot');
});

it('should render all of the industry options as options for the industry select control', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  expect(
    wrapper
      .find('[name="industry"] option')
      .find({value: ''})
      .key()
  ).toEqual('blank');

  wrapper
    .find('[name="industry"] option')
    .not({value: ''})
    .forEach((opt) => {
      expect(INDUSTRY_CODES).toContain(opt.prop('value'));
      expect(INDUSTRY_NAMES).toContain(opt.text());
    });
});

it('should update the industry field when changed', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  wrapper.find('[name="industry"]').simulate('change', {
    target: {
      name: 'industry',
      value: 'agriculture'
    }
  });

  expect(wrapper.find('[name="industry"]').prop('value')).toEqual('agriculture');
});

it('should render greaterAnnualRevenue revenue field with the CurrencyInput component and pass config props', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);
  const field = wrapper.find('[name="greaterAnnualRevenue"]');

  expect(field.prop('as')).toEqual(CurrencyInput);
  expect(field.prop('allowDecimals')).toEqual(false);
  expect(field.prop('allowNegativeValue')).toEqual(false);
  expect(field.prop('prefix')).toEqual('$');
});

it('should update the greaterAnnualRevenue revenue field when changed', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  wrapper.find('[name="greaterAnnualRevenue"]').simulate('change', '12', 'greaterAnnualRevenue');

  expect(wrapper.find('[name="greaterAnnualRevenue"]').prop('value')).toEqual('12');
});

it('should strip decimals and spaces from the greaterAnnualRevenue revenue field when present in input', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  wrapper
    .find('[name="greaterAnnualRevenue"]')
    .simulate('change', ' 12.02 ', 'greaterAnnualRevenue');

  expect(wrapper.find('[name="greaterAnnualRevenue"]').prop('value')).toEqual('1202');
});

it('should ignore null or undefined values when passed to the greaterAnnualRevenue revenue field', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  wrapper.find('[name="greaterAnnualRevenue"]').simulate('change', null, 'greaterAnnualRevenue');

  expect(wrapper.find('[name="greaterAnnualRevenue"]').prop('value')).toEqual('');

  expect(
    wrapper
      .find('[name="greaterAnnualRevenue"]')
      .simulate('change', undefined, 'greaterAnnualRevenue')
  );

  expect(wrapper.find('[name="greaterAnnualRevenue"]').prop('value')).toEqual('');
});

it('should render lessAnnualRevenue revenue field with the CurrencyInput component and pass config props', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);
  const field = wrapper.find('[name="lessAnnualRevenue"]');

  expect(field.prop('as')).toEqual(CurrencyInput);
  expect(field.prop('allowDecimals')).toEqual(false);
  expect(field.prop('allowNegativeValue')).toEqual(false);
  expect(field.prop('prefix')).toEqual('$');
});

it('should update the lessAnnualRevenue revenue field when changed', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  wrapper.find('[name="lessAnnualRevenue"]').simulate('change', '12', 'lessAnnualRevenue');

  expect(wrapper.find('[name="lessAnnualRevenue"]').prop('value')).toEqual('12');
});

it('should strip decimals and spaces from the lessAnnualRevenue revenue field when present in input', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  wrapper.find('[name="lessAnnualRevenue"]').simulate('change', ' 12.02 ', 'lessAnnualRevenue');

  expect(wrapper.find('[name="lessAnnualRevenue"]').prop('value')).toEqual('1202');
});

it('should ignore null or undefined values when passed to the lessAnnualRevenue revenue field', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  wrapper.find('[name="lessAnnualRevenue"]').simulate('change', null, 'lessAnnualRevenue');

  expect(wrapper.find('[name="lessAnnualRevenue"]').prop('value')).toEqual('');

  wrapper.find('[name="lessAnnualRevenue"]').simulate('change', undefined, 'lessAnnualRevenue');

  expect(wrapper.find('[name="lessAnnualRevenue"]').prop('value')).toEqual('');
});

it('should update the afterEstablishedDate date field when changed', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  wrapper.find('[name="afterEstablishedDate"]').simulate('change', {
    target: {
      name: 'afterEstablishedDate',
      value: '02/01/2020'
    }
  });

  expect(wrapper.find('[name="afterEstablishedDate"]').prop('value')).toEqual('02/01/2020');
});

it('should update the beforeEstablishedDate date field when changed', () => {
  const wrapper = shallow(<AccountFilters onFilterChange={jest.fn()} />);

  wrapper.find('[name="beforeEstablishedDate"]').simulate('change', {
    target: {
      name: 'beforeEstablishedDate',
      value: '02/01/2020'
    }
  });

  expect(wrapper.find('[name="beforeEstablishedDate"]').prop('value')).toEqual('02/01/2020');
});

it('should call onFilterChange when inputs have been changed', () => {
  const onFilterChangeMock = jest.fn();

  const wrapper = shallow(<AccountFilters onFilterChange={onFilterChangeMock} />);

  wrapper.find('[name="name"]').simulate('change', {
    target: {
      name: 'name',
      value: 'Some Account Name'
    }
  });
  wrapper.find('[name="state"]').simulate('change', {
    target: {
      name: 'state',
      value: 'AL'
    }
  });
  wrapper.find('[name="rating"]').simulate('change', {
    target: {
      name: 'rating',
      value: 'hot'
    }
  });
  wrapper.find('[name="industry"]').simulate('change', {
    target: {
      name: 'industry',
      value: 'agriculture'
    }
  });
  wrapper.find('[name="greaterAnnualRevenue"]').simulate('change', '12', 'greaterAnnualRevenue');
  wrapper.find('[name="lessAnnualRevenue"]').simulate('change', '123', 'lessAnnualRevenue');
  wrapper.find('[name="afterEstablishedDate"]').simulate('change', {
    target: {
      name: 'afterEstablishedDate',
      value: '02/02/2020'
    }
  });
  wrapper.find('[name="beforeEstablishedDate"]').simulate('change', {
    target: {
      name: 'beforeEstablishedDate',
      value: '02/01/2020'
    }
  });

  expect(onFilterChangeMock).toHaveBeenCalledWith({
    name: 'Some Account Name',
    state: 'AL',
    rating: 'hot',
    industry: 'agriculture',
    annualRevenue: {
      greaterAnnualRevenue: '12',
      lessAnnualRevenue: '123'
    },
    establishedDate: {
      afterEstablishedDate: '02/02/2020',
      beforeEstablishedDate: '02/01/2020'
    }
  });
});
// it('should call onFilterChange when inputs have been changed', () => {});
