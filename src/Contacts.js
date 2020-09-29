import React from 'react';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';

import {LEAD_SOURCE_OPTIONS} from './constants';

function renderContacts(history, contacts) {
  return contacts.map((contact) => {
    return (
      <tr
        key={contact.id}
        onClick={() => {
          history.push(`/contacts/${contact.id}`);
        }}
      >
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
        <td>{contact.email}</td>
        <td>{LEAD_SOURCE_OPTIONS[contact.leadSource]}</td>
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
          </tr>
        </thead>
        <tbody>{renderContacts(props.history, props.contacts)}</tbody>
      </table>
    </div>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired
};

export default withRouter(Contacts);
