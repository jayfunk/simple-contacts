import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {formatPhoneNumber} from 'react-phone-number-input';

import {removeContact, addContact, updateContact} from './actions/accounts';
import {LEAD_SOURCE_OPTIONS} from './constants';

import './contacts.css';

function renderContacts(history, accountId, contacts, removeContact) {
  return contacts.map((contact) => {
    const openModal = () => {
      history.push(`/accounts/${accountId}/contacts/${contact.id}`);
    };

    return (
      <div key={contact.id} className="contact row">
        <div className="col-6 col-sm-6 col-lg-2">{contact.name}</div>
        <div className="col-6 col-sm-6 col-lg-3">{formatPhoneNumber(contact.phone)}</div>
        <div className="col-6 col-sm-6 col-lg-3">{contact.email}</div>
        <div className="col-6 col-sm-6 col-lg-2">{LEAD_SOURCE_OPTIONS[contact.leadSource]}</div>
        <div className="col-12 col-lg-2">
          <Button
            className="delete"
            variant="link"
            size="sm"
            onClick={() => {
              removeContact(accountId, contact.id);
            }}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-trash"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </Button>
          <Button onClick={openModal} variant="link">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-three-dots-vertical"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
              />
            </svg>
          </Button>
        </div>
      </div>
    );
  });
}

export function Contacts(props) {
  return (
    <div className="contacts container">
      <div className="row">
        <div className="col">
          {props.contacts.length === 0 ? (
            <div>
              <Button
                variant="link"
                onClick={() => {
                  props.history.push(`/accounts/${props.accountId}/contacts/new`);
                }}
              >
                Add Contact
              </Button>
            </div>
          ) : (
            renderContacts(props.history, props.accountId, props.contacts, props.removeContact)
          )}
        </div>
      </div>
    </div>
  );
}

Contacts.propTypes = {
  accountId: PropTypes.string.isRequired,
  contacts: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  removeContact: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  removeContact,
  addContact,
  updateContact
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Contacts)
);
