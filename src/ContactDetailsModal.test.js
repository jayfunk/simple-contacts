import React from 'react';
import {shallow} from 'enzyme';
import {Modal, Form, Button} from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input/input';

import {ContactDetailsModal} from './ContactDetailsModal';

function simulateSubmit(wrapper, preventDefaultMock = jest.fn(), stopPropagationMock = jest.fn()) {
  wrapper
    .find(Button)
    .find({name: 'save'})
    .simulate('click', {
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

it('should render with a null contact', () => {
  const wrapper = shallow(
    <ContactDetailsModal
      accountId={'account-1'}
      addContact={() => {}}
      contact={null}
      history={{}}
      updateContact={() => {}}
    />
  );

  expect(getFormControlValue(wrapper, 'name')).toEqual('');
  expect(wrapper.find(PhoneInput).prop('value')).toEqual('');
  expect(getFormControlValue(wrapper, 'email')).toEqual('');
  expect(getFormControlValue(wrapper, 'leadSource')).toEqual('web');
});

it('should not submit when nothing has been input', () => {
  const addContactMock = jest.fn();
  const updateContactMock = jest.fn();

  const wrapper = shallow(
    <ContactDetailsModal
      accountId={'account-1'}
      addContact={addContactMock}
      contact={null}
      history={{}}
      updateContact={updateContactMock}
    />
  );

  simulateSubmit(wrapper);

  expect(addContactMock).not.toHaveBeenCalled();
  expect(updateContactMock).not.toHaveBeenCalled();
});

it('should render existing contact', () => {
  const wrapper = shallow(
    <ContactDetailsModal
      accountId={'account-1'}
      addContact={() => {}}
      contact={{
        id: 'contact-1',
        name: 'Contact 1',
        phone: '+12131110212',
        email: 'test@email.com',
        leadSource: 'phone'
      }}
      history={{}}
      updateContact={() => {}}
    />
  );

  expect(getFormControlValue(wrapper, 'name')).toEqual('Contact 1');
  expect(wrapper.find(PhoneInput).prop('value')).toEqual('+12131110212');
  expect(getFormControlValue(wrapper, 'email')).toEqual('test@email.com');
  expect(getFormControlValue(wrapper, 'leadSource')).toEqual('phone');
});

it('should update the name field when changed', () => {
  const wrapper = shallow(
    <ContactDetailsModal
      accountId={'account-1'}
      addContact={() => {}}
      contact={null}
      history={{}}
      updateContact={() => {}}
    />
  );

  changeFormControlValue(wrapper, 'name', 'New Contact Name');

  expect(getFormControlValue(wrapper, 'name')).toEqual('New Contact Name');
});

it('should update the phone field when changed', () => {
  const wrapper = shallow(
    <ContactDetailsModal
      accountId={'account-1'}
      addContact={() => {}}
      contact={null}
      history={{}}
      updateContact={() => {}}
    />
  );

  wrapper.find(PhoneInput).prop('onChange')('+14249990101');

  expect(wrapper.find(PhoneInput).prop('value')).toEqual('+14249990101');
});

it('should update the email field when changed', () => {
  const wrapper = shallow(
    <ContactDetailsModal
      accountId={'account-1'}
      addContact={() => {}}
      contact={null}
      history={{}}
      updateContact={() => {}}
    />
  );

  changeFormControlValue(wrapper, 'email', 'test@email.com');

  expect(getFormControlValue(wrapper, 'email')).toEqual('test@email.com');
});

it('should update the leadSource field when changed', () => {
  const wrapper = shallow(
    <ContactDetailsModal
      accountId={'account-1'}
      addContact={() => {}}
      contact={null}
      history={{}}
      updateContact={() => {}}
    />
  );

  changeFormControlValue(wrapper, 'leadSource', 'purchasedlist');

  expect(getFormControlValue(wrapper, 'leadSource')).toEqual('purchasedlist');
});

it('should not submit when the email is not a valid email', () => {
  const addContactMock = jest.fn();
  const updateContactMock = jest.fn();

  const wrapper = shallow(
    <ContactDetailsModal
      accountId={'account-1'}
      addContact={addContactMock}
      contact={{
        id: 'contact-1',
        name: 'Contact 1',
        phone: '+12131110212',
        email: 'test@email.com',
        leadSource: 'phone'
      }}
      history={{}}
      updateContact={updateContactMock}
    />
  );

  changeFormControlValue(wrapper, 'email', 'testemail.com');

  simulateSubmit(wrapper);

  expect(addContactMock).not.toHaveBeenCalled();
  expect(updateContactMock).not.toHaveBeenCalled();
});

it('should not submit when the name is empty', () => {
  const addContactMock = jest.fn();
  const updateContactMock = jest.fn();

  const wrapper = shallow(
    <ContactDetailsModal
      accountId={'account-1'}
      addContact={addContactMock}
      contact={{
        id: 'contact-1',
        name: 'Contact 1',
        phone: '+12131110212',
        email: 'test@email.com',
        leadSource: 'phone'
      }}
      history={{}}
      updateContact={updateContactMock}
    />
  );

  changeFormControlValue(wrapper, 'name', ' ');

  simulateSubmit(wrapper);

  expect(addContactMock).not.toHaveBeenCalled();
  expect(updateContactMock).not.toHaveBeenCalled();
});

it('should not submit when the phone number is invalid', () => {
  const addContactMock = jest.fn();
  const updateContactMock = jest.fn();

  const wrapper = shallow(
    <ContactDetailsModal
      accountId={'account-1'}
      addContact={addContactMock}
      contact={{
        id: 'contact-1',
        name: 'Contact 1',
        phone: '+12131110212',
        email: 'test@email.com',
        leadSource: 'phone'
      }}
      history={{}}
      updateContact={updateContactMock}
    />
  );

  wrapper.find(PhoneInput).prop('onChange')('+1424999');

  simulateSubmit(wrapper);

  expect(addContactMock).not.toHaveBeenCalled();
  expect(updateContactMock).not.toHaveBeenCalled();
});

it('should add the contact and close the modal when the form is valid and the contact is new', () => {
  const addContactMock = jest.fn();
  const updateContactMock = jest.fn();
  const historyMock = {
    push: jest.fn()
  };

  const wrapper = shallow(
    <ContactDetailsModal
      accountId={'account-1'}
      addContact={addContactMock}
      contact={null}
      history={historyMock}
      updateContact={updateContactMock}
    />
  );

  wrapper.find(PhoneInput).prop('onChange')('+17654122342');
  changeFormControlValue(wrapper, 'name', 'My Contact');
  changeFormControlValue(wrapper, 'email', 'test@email.com');
  changeFormControlValue(wrapper, 'leadSource', 'purchasedlist');

  simulateSubmit(wrapper);

  expect(addContactMock).toHaveBeenCalledWith('account-1', {
    name: 'My Contact',
    phone: '+17654122342',
    email: 'test@email.com',
    leadSource: 'purchasedlist'
  });
  expect(historyMock.push).toHaveBeenCalledWith('/');
  expect(updateContactMock).not.toHaveBeenCalled();
});

it('should update the contact and close the modal when the form is valid', () => {
  const addContactMock = jest.fn();
  const updateContactMock = jest.fn();
  const historyMock = {
    push: jest.fn()
  };

  const wrapper = shallow(
    <ContactDetailsModal
      accountId={'account-1'}
      addContact={addContactMock}
      contact={{
        id: 'contact-1',
        name: 'Contact 1',
        phone: '+12131110212',
        email: 'test@email.com',
        leadSource: 'purchasedlist'
      }}
      history={historyMock}
      updateContact={updateContactMock}
    />
  );

  wrapper.find(PhoneInput).prop('onChange')('+17654122342');
  changeFormControlValue(wrapper, 'name', 'My Contact');
  changeFormControlValue(wrapper, 'email', 'test@email.com');
  changeFormControlValue(wrapper, 'leadSource', 'phone');

  simulateSubmit(wrapper);

  expect(updateContactMock).toHaveBeenCalledWith('account-1', 'contact-1', {
    name: 'My Contact',
    phone: '+17654122342',
    email: 'test@email.com',
    leadSource: 'phone'
  });
  expect(historyMock.push).toHaveBeenCalledWith('/');
  expect(addContactMock).not.toHaveBeenCalled();
});

it('should navigate to the root route when the close button is clicked', () => {
  const historyMock = {
    push: jest.fn()
  };

  const wrapper = shallow(
    <ContactDetailsModal
      accountId={'account-1'}
      addContact={jest.fn()}
      contact={{
        id: 'contact-1',
        name: 'Contact 1',
        phone: '+12131110212',
        email: 'test@email.com',
        leadSource: 'purchasedlist'
      }}
      history={historyMock}
      updateContact={jest.fn()}
    />
  );

  wrapper
    .find(Modal.Footer)
    .find(Button)
    .find({variant: 'link'})
    .prop('onClick')();

  expect(historyMock.push).toHaveBeenCalledWith('/');
});
