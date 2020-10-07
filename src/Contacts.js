import React from 'react';
import PropTypes from 'prop-types';
import {Button, Table} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter, Link, Switch, Route, Redirect} from 'react-router-dom';

import {removeContact, addContact, updateContact} from './actions/accounts';
import {LEAD_SOURCE_OPTIONS} from './constants';
import ContactDetailsModal from './ContactDetailsModal';

function renderContacts(history, accountId, contacts, removeContact) {
  return contacts.map((contact) => {
    return (
      <tr key={contact.id}>
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
        <td>{contact.email}</td>
        <td>{LEAD_SOURCE_OPTIONS[contact.leadSource]}</td>
        <td>
          <Button
            className="edit"
            variant="info"
            size="sm"
            onClick={() => {
              history.push(`/contacts/${contact.id}`);
            }}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-pencil"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
              />
            </svg>
          </Button>
        </td>
        <td>
          <Button
            className="delete"
            variant="danger"
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
        </td>
      </tr>
    );
  });
}

export function Contacts(props) {
  return (
    <React.Fragment>
      <div className="row">
        <Link className="mb-3 btn btn-primary" to="/contacts/new">
          Add Contact
        </Link>
      </div>
      <div className="row">
        <Table striped bordered hover>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Lead Source</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {renderContacts(props.history, props.accountId, props.contacts, props.removeContact)}
          </tbody>
        </Table>
      </div>
      <Switch>
        <Route
          path="/contacts/:contactId"
          render={({match}) => {
            const contactId = match.params.contactId;

            if (contactId === 'new') {
              return (
                <ContactDetailsModal
                  accountId={props.accountId}
                  contact={null}
                  match={props.match}
                  history={props.history}
                  addContact={props.addContact}
                  updateContact={props.updateContact}
                />
              );
            }

            const contact = props.contacts.find((contact) => contact.id === contactId);

            if (!contact) {
              return <Redirect to={props.match.path} />;
            }

            return (
              <ContactDetailsModal
                accountId={props.accountId}
                contact={contact}
                match={props.match}
                history={props.history}
                addContact={props.addContact}
                updateContact={props.updateContact}
              />
            );
          }}
        />
      </Switch>
    </React.Fragment>
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
