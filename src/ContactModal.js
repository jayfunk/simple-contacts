import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button, Form} from 'react-bootstrap';
import {LEAD_SOURCE_WEB, LEAD_SOURCE_OPTIONS} from './constants';

const REQUIRED_FIELDS = ['name', 'phone', 'email', 'leadSource'];
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

class ContactModal extends Component {
  constructor(props) {
    super(props);

    const contact = props.contact;
    this.state = {
      validated: false,
      contact:
        contact === null
          ? {
              name: '',
              phone: '',
              email: '',
              leadSource: LEAD_SOURCE_WEB
            }
          : REQUIRED_FIELDS.reduce((memo, fieldKey) => {
              memo[fieldKey] = contact[fieldKey];
              return memo;
            }, {})
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValidInput = this.isValidInput.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      contact: {
        ...this.state.contact,
        [name]: target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.isValidInput() === false) {
      this.setState({
        validated: true
      });
    } else if (this.props.contact === null) {
      this.props.addContact(this.props.accountId, this.state.contact);
      this.closeModal();
    } else {
      this.props.updateContact(this.props.accountId, this.props.contact.id, this.state.contact);
      this.closeModal();
    }
  }

  isValidInput() {
    const contact = this.state.contact;
    const contactKeys = Object.keys(contact);

    const allFieldsValid = contactKeys.every((key) => {
      const fieldValue = contact[key];
      if (key === 'email') {
        return EMAIL_REGEX.test(fieldValue);
      }
      if (typeof fieldValue === 'string') {
        return fieldValue.trim() !== '';
      }
      return fieldValue !== -1;
    });
    const hasAllRequiredFields = REQUIRED_FIELDS.every((key) => contactKeys.includes(key));

    return allFieldsValid && hasAllRequiredFields;
  }

  closeModal() {
    this.props.history.push(this.props.match.url);
  }

  render() {
    const contact = this.state.contact;

    return (
      <Modal show>
        <Modal.Header onHide={this.closeModal} closeButton>
          <Modal.Title>Contact</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={this.state.validated}>
            <Form.Row>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  required
                  value={contact.name}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  type="text"
                  required
                  value={contact.phone}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  pattern={EMAIL_REGEX}
                  required
                  value={contact.email}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="leadSource">
                <Form.Label>Lead Source</Form.Label>
                <Form.Control
                  name="leadSource"
                  as="select"
                  required
                  value={contact.leadSource}
                  onChange={this.handleInputChange}
                >
                  {Object.keys(LEAD_SOURCE_OPTIONS).map((optKey) => (
                    <option key={optKey} value={optKey}>
                      {LEAD_SOURCE_OPTIONS[optKey]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" name="save" type="submit" onClick={this.handleSubmit}>
            Save
          </Button>
          <Button variant="secondary" onClick={this.closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ContactModal.propTypes = {
  accountId: PropTypes.string.isRequired,
  contact: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  addContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired
};

export default ContactModal;
