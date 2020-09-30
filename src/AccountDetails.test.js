import React from 'react';
import {shallow} from 'enzyme';
import {Form, Button} from 'react-bootstrap';

import {RATING_WARM, INDUSTRY_SHIPPING, INDUSTRY_MEDIA, RATING_COLD} from './constants';
import {AccountDetails} from './AccountDetails';

function simulateSubmit(wrapper, preventDefaultMock = jest.fn(), stopPropagationMock = jest.fn()) {
  wrapper.find(Form).simulate('submit', {
    preventDefault: preventDefaultMock,
    stopPropagation: stopPropagationMock
  });
}

function changeFormControlValue(wrapper, name, value) {
  wrapper
    .find(Form.Control)
    .find({name})
    .simulate('change', {target: {value, name}});
}

function getFormControlValue(wrapper, name) {
  return wrapper
    .find(Form.Control)
    .find({name})
    .prop('value');
}

function getFormControlDisabled(wrapper, name) {
  return wrapper
    .find(Form.Control)
    .find({name})
    .prop('disabled');
}

it('should render existing account', () => {
  const wrapper = shallow(
    <AccountDetails
      createAccount={() => {}}
      updateAccount={() => {}}
      removeAccount={() => {}}
      history={{}}
      account={{
        id: 1234,
        name: 'Account Name',
        address: {
          street: '999 Old St',
          city: 'Atlanta',
          state: 'GA'
        },
        industry: INDUSTRY_SHIPPING,
        annualRevenue: 100000000,
        rating: RATING_WARM,
        establishedDate: '2019-12-31',
        contacts: []
      }}
    />
  );

  expect(getFormControlValue(wrapper, 'name')).toEqual('Account Name');
  expect(getFormControlValue(wrapper, 'street')).toEqual('999 Old St');
  expect(getFormControlValue(wrapper, 'city')).toEqual('Atlanta');
  expect(getFormControlValue(wrapper, 'state')).toEqual('GA');
  expect(getFormControlValue(wrapper, 'industry')).toEqual('shipping');
  expect(getFormControlValue(wrapper, 'annualRevenue')).toEqual(100000000);
  expect(getFormControlValue(wrapper, 'rating')).toEqual(RATING_WARM);
  expect(getFormControlValue(wrapper, 'establishedDate')).toEqual('2019-12-31');
});

it('should make the details uneditable when the account exists', () => {
  const wrapper = shallow(
    <AccountDetails
      createAccount={() => {}}
      updateAccount={() => {}}
      removeAccount={() => {}}
      history={{}}
      account={{
        id: 1234,
        name: 'Account Name',
        address: {
          street: '999 Old St',
          city: 'Atlanta',
          state: 'GA'
        },
        industry: INDUSTRY_SHIPPING,
        annualRevenue: 100000000,
        rating: RATING_WARM,
        establishedDate: '2019-12-31',
        contacts: []
      }}
    />
  );

  expect(getFormControlDisabled(wrapper, 'name')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'street')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'city')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'state')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'industry')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'annualRevenue')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'rating')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'establishedDate')).toBe(true);

  expect(wrapper.find(Button).find({name: 'edit'})).toExist();
});

it('should render in edit mode when account is null', () => {
  const wrapper = shallow(
    <AccountDetails
      createAccount={() => {}}
      updateAccount={() => {}}
      removeAccount={() => {}}
      history={{}}
      account={null}
    />
  );

  expect(getFormControlDisabled(wrapper, 'name')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'street')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'city')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'state')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'industry')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'annualRevenue')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'rating')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'establishedDate')).toBe(false);

  expect(wrapper.find(Button).find({name: 'save'})).toExist();

  expect(wrapper.find(Button).find({name: 'cancel'})).toExist();

  expect(wrapper.find(Button).find({name: 'remove'})).not.toExist();
});

it('should switch to edit mode when edit button is pressed', () => {
  const wrapper = shallow(
    <AccountDetails
      createAccount={() => {}}
      updateAccount={() => {}}
      removeAccount={() => {}}
      history={{}}
      account={{
        id: 1234,
        name: 'Account Name',
        address: {
          street: '999 Old St',
          city: 'Atlanta',
          state: 'GA'
        },
        industry: INDUSTRY_SHIPPING,
        annualRevenue: 100000000,
        rating: RATING_WARM,
        establishedDate: '2019-12-31',
        contacts: []
      }}
    />
  );

  wrapper
    .find(Button)
    .find({name: 'edit'})
    .simulate('click', {preventDefault: () => {}});

  expect(getFormControlDisabled(wrapper, 'name')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'street')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'city')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'state')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'industry')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'annualRevenue')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'rating')).toBe(false);
  expect(getFormControlDisabled(wrapper, 'establishedDate')).toBe(false);

  expect(wrapper.find(Button).find({name: 'save'})).toExist();

  expect(wrapper.find(Button).find({name: 'cancel'})).toExist();

  expect(wrapper.find(Button).find({name: 'remove'})).toExist();
});

it('should update fields on user input', () => {
  const wrapper = shallow(
    <AccountDetails
      createAccount={() => {}}
      updateAccount={() => {}}
      removeAccount={() => {}}
      history={{}}
      account={{
        id: 1234,
        name: 'Account Name',
        address: {
          street: '999 Old St',
          city: 'Atlanta',
          state: 'GA'
        },
        industry: INDUSTRY_SHIPPING,
        annualRevenue: 100000000,
        rating: RATING_WARM,
        establishedDate: '2019-12-31',
        contacts: []
      }}
    />
  );

  wrapper
    .find(Button)
    .find({name: 'edit'})
    .simulate('click', {preventDefault: () => {}});

  changeFormControlValue(wrapper, 'name', 'Updated Name');
  changeFormControlValue(wrapper, 'street', '102 Sunset Blvd');
  changeFormControlValue(wrapper, 'city', 'Austin');
  changeFormControlValue(wrapper, 'state', 'TX');
  changeFormControlValue(wrapper, 'industry', INDUSTRY_MEDIA);
  changeFormControlValue(wrapper, 'annualRevenue', 100);
  changeFormControlValue(wrapper, 'rating', RATING_COLD);
  changeFormControlValue(wrapper, 'establishedDate', '2011-01-13');

  expect(getFormControlValue(wrapper, 'name')).toEqual('Updated Name');
  expect(getFormControlValue(wrapper, 'street')).toEqual('102 Sunset Blvd');
  expect(getFormControlValue(wrapper, 'city')).toEqual('Austin');
  expect(getFormControlValue(wrapper, 'state')).toEqual('TX');
  expect(getFormControlValue(wrapper, 'industry')).toEqual(INDUSTRY_MEDIA);
  expect(getFormControlValue(wrapper, 'annualRevenue')).toEqual(100);
  expect(getFormControlValue(wrapper, 'rating')).toEqual(RATING_COLD);
  expect(getFormControlValue(wrapper, 'establishedDate')).toEqual('2011-01-13');
});

it.only('should change back to disabled mode and reset changed fields when cancel is pressed', () => {
  const wrapper = shallow(
    <AccountDetails
      createAccount={() => {}}
      updateAccount={() => {}}
      removeAccount={() => {}}
      history={{}}
      account={{
        id: 1234,
        name: 'Account Name',
        address: {
          street: '999 Old St',
          city: 'Atlanta',
          state: 'GA'
        },
        industry: INDUSTRY_SHIPPING,
        annualRevenue: 100000000,
        rating: RATING_WARM,
        establishedDate: '2019-12-31',
        contacts: []
      }}
    />
  );

  wrapper
    .find(Button)
    .find({name: 'edit'})
    .simulate('click', {preventDefault: () => {}});

  changeFormControlValue(wrapper, 'name', 'Updated Name');
  changeFormControlValue(wrapper, 'street', '102 Sunset Blvd');
  changeFormControlValue(wrapper, 'city', 'Austin');
  changeFormControlValue(wrapper, 'state', 'TX');
  changeFormControlValue(wrapper, 'industry', INDUSTRY_MEDIA);
  changeFormControlValue(wrapper, 'annualRevenue', 100);
  changeFormControlValue(wrapper, 'rating', RATING_COLD);
  changeFormControlValue(wrapper, 'establishedDate', '2011-01-13');

  wrapper
    .find(Button)
    .find({name: 'cancel'})
    .simulate('click', {preventDefault: () => {}});

  expect(getFormControlValue(wrapper, 'name')).toEqual('Account Name');
  expect(getFormControlValue(wrapper, 'street')).toEqual('999 Old St');
  expect(getFormControlValue(wrapper, 'city')).toEqual('Atlanta');
  expect(getFormControlValue(wrapper, 'state')).toEqual('GA');
  expect(getFormControlValue(wrapper, 'industry')).toEqual('shipping');
  expect(getFormControlValue(wrapper, 'annualRevenue')).toEqual(100000000);
  expect(getFormControlValue(wrapper, 'rating')).toEqual(RATING_WARM);
  expect(getFormControlValue(wrapper, 'establishedDate')).toEqual('2019-12-31');

  expect(getFormControlDisabled(wrapper, 'name')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'street')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'city')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'state')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'industry')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'annualRevenue')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'rating')).toBe(true);
  expect(getFormControlDisabled(wrapper, 'establishedDate')).toBe(true);

  expect(wrapper.find(Button).find({name: 'edit'})).toExist('Edit');
});

it('should redirect to the root of the app when cancel is pressed and account was initially null', () => {
  const historyMock = {
    push: jest.fn()
  };

  const wrapper = shallow(
    <AccountDetails
      createAccount={() => {}}
      updateAccount={() => {}}
      removeAccount={() => {}}
      account={null}
      history={historyMock}
    />
  );

  wrapper
    .find(Button)
    .find({name: 'cancel'})
    .simulate('click', {preventDefault: () => {}});

  expect(historyMock.push).toHaveBeenCalledWith('/');
});

it('should call createAccount action creator when save is pressed and account is null', () => {
  const createAccountMock = jest.fn();
  const updateAccountMock = jest.fn();

  const wrapper = shallow(
    <AccountDetails
      createAccount={createAccountMock}
      updateAccount={updateAccountMock}
      removeAccount={() => {}}
      history={{}}
      account={null}
    />
  );

  changeFormControlValue(wrapper, 'name', 'Updated Name');
  changeFormControlValue(wrapper, 'street', '102 Sunset Blvd');
  changeFormControlValue(wrapper, 'city', 'Austin');
  changeFormControlValue(wrapper, 'state', 'TX');
  changeFormControlValue(wrapper, 'industry', INDUSTRY_MEDIA);
  changeFormControlValue(wrapper, 'annualRevenue', 100);
  changeFormControlValue(wrapper, 'rating', RATING_COLD);
  changeFormControlValue(wrapper, 'establishedDate', '2011-01-13');

  simulateSubmit(wrapper);

  expect(createAccountMock).toHaveBeenCalledWith(
    {
      name: 'Updated Name',
      address: {
        street: '102 Sunset Blvd',
        city: 'Austin',
        state: 'TX'
      },
      industry: INDUSTRY_MEDIA,
      annualRevenue: 100,
      rating: RATING_COLD,
      establishedDate: '2011-01-13'
    },
    {}
  );

  expect(updateAccountMock).not.toHaveBeenCalled();

  expect(wrapper.find(Button).find({name: 'edit'})).toExist('Edit');
});

it('should call updateAccount action creator when save is pressed and account is not null', () => {
  const createAccountMock = jest.fn();
  const updateAccountMock = jest.fn();

  const wrapper = shallow(
    <AccountDetails
      createAccount={createAccountMock}
      updateAccount={updateAccountMock}
      removeAccount={() => {}}
      history={{}}
      account={{
        id: 1234,
        name: 'Account Name',
        address: {
          street: '999 Old St',
          city: 'Atlanta',
          state: 'GA'
        },
        industry: INDUSTRY_SHIPPING,
        annualRevenue: 100000000,
        rating: RATING_WARM,
        establishedDate: '2019-12-31',
        contacts: []
      }}
    />
  );

  wrapper
    .find(Button)
    .find({name: 'edit'})
    .simulate('click', {preventDefault: () => {}});

  changeFormControlValue(wrapper, 'name', 'Updated Name');
  changeFormControlValue(wrapper, 'street', '102 Sunset Blvd');
  changeFormControlValue(wrapper, 'city', 'Austin');
  changeFormControlValue(wrapper, 'state', 'TX');
  changeFormControlValue(wrapper, 'industry', INDUSTRY_MEDIA);
  changeFormControlValue(wrapper, 'annualRevenue', 100);
  changeFormControlValue(wrapper, 'rating', RATING_COLD);
  changeFormControlValue(wrapper, 'establishedDate', '2011-01-13');

  expect(getFormControlValue(wrapper, 'name')).toEqual('Updated Name');
  expect(getFormControlValue(wrapper, 'street')).toEqual('102 Sunset Blvd');
  expect(getFormControlValue(wrapper, 'city')).toEqual('Austin');
  expect(getFormControlValue(wrapper, 'state')).toEqual('TX');
  expect(getFormControlValue(wrapper, 'industry')).toEqual(INDUSTRY_MEDIA);
  expect(getFormControlValue(wrapper, 'annualRevenue')).toEqual(100);
  expect(getFormControlValue(wrapper, 'rating')).toEqual(RATING_COLD);
  expect(getFormControlValue(wrapper, 'establishedDate')).toEqual('2011-01-13');

  simulateSubmit(wrapper);

  expect(updateAccountMock).toHaveBeenCalledWith(1234, {
    name: 'Updated Name',
    address: {
      street: '102 Sunset Blvd',
      city: 'Austin',
      state: 'TX'
    },
    industry: INDUSTRY_MEDIA,
    annualRevenue: 100,
    rating: RATING_COLD,
    establishedDate: '2011-01-13'
  });

  expect(createAccountMock).not.toHaveBeenCalled();

  expect(wrapper.find(Button).find({name: 'edit'})).toExist('Edit');
});

it('should call removeAccount action creator when remove is pressed', () => {
  const historyMock = {
    push: jest.fn()
  };
  const removeAccountMock = jest.fn();

  const wrapper = shallow(
    <AccountDetails
      createAccount={() => {}}
      updateAccount={() => {}}
      removeAccount={removeAccountMock}
      history={historyMock}
      account={{
        id: 1234,
        name: 'Account Name',
        address: {
          street: '999 Old St',
          city: 'Atlanta',
          state: 'GA'
        },
        industry: INDUSTRY_SHIPPING,
        annualRevenue: 100000000,
        rating: RATING_WARM,
        establishedDate: '2019-12-31',
        contacts: []
      }}
    />
  );

  wrapper
    .find(Button)
    .find({name: 'edit'})
    .simulate('click', {preventDefault: () => {}});

  wrapper
    .find(Button)
    .find({name: 'remove'})
    .simulate('click', {preventDefault: () => {}});

  expect(removeAccountMock).toHaveBeenCalledWith(1234);
  expect(historyMock.push).toHaveBeenCalledWith('/');
});

it('should not create the account if the form is not valid', () => {
  const createAccountMock = jest.fn();
  const updateAccountMock = jest.fn();
  const preventDefaultMock = jest.fn();
  const stopPropagationMock = jest.fn();

  const wrapper = shallow(
    <AccountDetails
      createAccount={createAccountMock}
      updateAccount={updateAccountMock}
      removeAccount={() => {}}
      history={{}}
      account={null}
    />
  );

  changeFormControlValue(wrapper, 'name', 'Updated Name');

  simulateSubmit(wrapper, preventDefaultMock, stopPropagationMock);

  expect(createAccountMock).not.toHaveBeenCalled();
  expect(updateAccountMock).not.toHaveBeenCalled();
  expect(preventDefaultMock).toHaveBeenCalled();
  expect(stopPropagationMock).toHaveBeenCalled();

  expect(wrapper.find(Form).prop('validated')).toBe(true);
});
