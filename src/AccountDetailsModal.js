import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Col, Modal} from 'react-bootstrap';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import CurrencyInput from 'react-currency-input-field';
import isNil from 'lodash/isNil';

import {
  INDUSTRY_OPTIONS,
  RATING_OPTIONS,
  INDUSTRY_AGRICULTURE,
  RATING_HOT,
  STATE_OPTIONS
} from './constants';
import {createAccount, updateAccount, removeAccount} from './actions/accounts';

const REQUIRED_FIELDS = [
  'name',
  'street',
  'city',
  'state',
  'industry',
  'annualRevenue',
  'rating',
  'establishedDate'
];

export class AccountDetailsModal extends Component {
  constructor(props) {
    super(props);

    const account = props.account;

    this.state = {
      validated: false,
      account: this.isNewAccount()
        ? {
            name: '',
            street: '',
            city: '',
            state: 'AL',
            industry: INDUSTRY_AGRICULTURE,
            annualRevenue: '',
            rating: RATING_HOT,
            establishedDate: ''
          }
        : this.copyAccountToStateForm(account)
    };

    this.closeModal = this.closeModal.bind(this);
    this.isValidInput = this.isValidInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRevenueChange = this.handleRevenueChange.bind(this);
  }

  isNewAccount() {
    return this.props.account === null;
  }

  copyAccountToStateForm(account) {
    return REQUIRED_FIELDS.reduce((memo, fieldKey) => {
      if (fieldKey === 'street' || fieldKey === 'city' || fieldKey === 'state') {
        memo[fieldKey] = account.address[fieldKey];
      } else {
        memo[fieldKey] = account[fieldKey];
      }
      return memo;
    }, {});
  }

  closeModal() {
    this.props.history.push('/');
  }

  isValidInput() {
    const account = this.state.account;
    const accountKeys = Object.keys(account);

    const allFieldsValid = accountKeys.every((key) => {
      const fieldValue = account[key];
      if (typeof fieldValue === 'string') {
        return fieldValue.trim() !== '';
      }
      return fieldValue !== -1;
    });
    const hasAllRequiredFields = REQUIRED_FIELDS.every((key) => accountKeys.includes(key));

    return allFieldsValid && hasAllRequiredFields;
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.isValidInput() === false) {
      this.setState({
        validated: true
      });
    } else {
      const account = {
        ...this.state.account,
        address: {
          street: this.state.account['street'],
          city: this.state.account['city'],
          state: this.state.account['state']
        }
      };
      delete account.street;
      delete account.city;
      delete account.state;

      if (this.isNewAccount()) {
        this.props.createAccount(account, this.props.history);
      } else {
        this.props.updateAccount(this.props.account.id, account);
      }

      this.closeModal();
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      account: {
        ...this.state.account,
        [name]: target.value
      }
    });
  }

  handleRevenueChange(value) {
    this.setState({
      account: {
        ...this.state.account,
        annualRevenue: isNil(value) ? '' : value.trim().replace(/\D/, '')
      }
    });
  }

  renderControlButtons() {
    return (
      <Form.Row>
        <Col xs="auto">
          <Button variant="primary" name="save" type="submit" onClick={this.handleSubmit}>
            Save
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="secondary" name="cancel" type="button" onClick={this.closeModal}>
            Cancel
          </Button>
        </Col>
        {this.isNewAccount() !== true && (
          <Col xs="auto">
            <Button
              variant="danger"
              name="remove"
              type="button"
              onClick={() => {
                this.props.removeAccount(this.props.account.id);
                this.closeModal();
              }}
            >
              Delete Account
            </Button>
          </Col>
        )}
      </Form.Row>
    );
  }

  render() {
    const account = this.state.account;

    return (
      <Modal show onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={this.state.validated}>
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  required
                  value={account.name}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="industry">
                <Form.Label>Industry</Form.Label>
                <Form.Control
                  name="industry"
                  as="select"
                  required
                  value={account.industry}
                  onChange={this.handleInputChange}
                >
                  {Object.keys(INDUSTRY_OPTIONS).map((optKey) => (
                    <option key={optKey} value={optKey}>
                      {INDUSTRY_OPTIONS[optKey]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="street">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  name="street"
                  type="text"
                  required
                  value={account.street}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  type="text"
                  required
                  value={account.city}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  name="state"
                  as="select"
                  required
                  value={account.state}
                  onChange={this.handleInputChange}
                >
                  {Object.keys(STATE_OPTIONS).map((optKey) => (
                    <option key={optKey} value={optKey}>
                      {STATE_OPTIONS[optKey]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="annualRevenue">
                <Form.Label>Annual Revenue</Form.Label>
                <Form.Control
                  name="annualRevenue"
                  required
                  value={account.annualRevenue}
                  onChange={this.handleRevenueChange}
                  allowDecimals={false}
                  allowNegativeValue={false}
                  prefix="$"
                  as={CurrencyInput}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  name="rating"
                  as="select"
                  required
                  value={account.rating}
                  onChange={this.handleInputChange}
                >
                  {Object.keys(RATING_OPTIONS).map((optKey) => (
                    <option key={optKey} value={optKey}>
                      {RATING_OPTIONS[optKey]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="establishedDate">
                <Form.Label>Establised Date</Form.Label>
                <Form.Control
                  name="establishedDate"
                  type="date"
                  required
                  value={account.establishedDate}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Form.Row>
          </Form>
          <Modal.Footer>{this.renderControlButtons()}</Modal.Footer>
        </Modal.Body>
      </Modal>
    );
  }
}

AccountDetailsModal.propTypes = {
  account: PropTypes.object,
  history: PropTypes.object.isRequired,
  createAccount: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
  removeAccount: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  createAccount,
  updateAccount,
  removeAccount
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(AccountDetailsModal)
);
