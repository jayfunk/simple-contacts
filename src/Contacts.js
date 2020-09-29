import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

import {removeContactFromAccount} from './actions/accounts';
import {LEAD_SOURCE_OPTIONS} from './constants';

function renderContacts(history, accountId, contacts, remove) {
  return contacts.map((contact) => {
    return (
      <tr
        key={contact.id}
        onClick={() => {
          history.push(`/accounts/${accountId}/contacts/${contact.id}`);
        }}
      >
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
        <td>{contact.email}</td>
        <td>{LEAD_SOURCE_OPTIONS[contact.leadSource]}</td>
        <td>
          <Button
            onClick={() => {
              remove(accountId, contact.id);
            }}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-trash"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </Button>
        </td>
      </tr>
    );
  });
}

export function Contacts(props) {
  return (
    <div className="col contacts">
      <Link className="btn btn-primary" to="/contacts/new">
        Add Contact
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Lead Source</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {renderContacts(props.history, props.accountId, props.contacts, removeContactFromAccount)}
        </tbody>
      </table>
    </div>
  );
}

Contacts.propTypes = {
  accountId: PropTypes.string.isRequired,
  contacts: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  removeContactFromAccount: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  removeContactFromAccount
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Contacts)
);
