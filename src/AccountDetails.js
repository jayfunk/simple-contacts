import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Col, Jumbotron} from 'react-bootstrap';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import {INDUSTRY_OPTIONS, RATING_OPTIONS, INDUSTRY_AGRICULTURE, RATING_HOT} from './constants';
import {createAccount, updateAccount, removeAccount} from './actions/accounts';

const REQUIRED_FIELDS = [
  'name',
  'address',
  'industry',
  'annualRevenue',
  'rating',
  'establishedDate'
];

export class AccountDetails extends Component {
  constructor(props) {
    super(props);

    const account = props.account;

    this.state = {
      validated: false,
      isEditable: this.isNewAccount(),
      account: this.isNewAccount()
        ? {
            name: '',
            address: '',
            industry: INDUSTRY_AGRICULTURE,
            annualRevenue: '',
            rating: RATING_HOT,
            establishedDate: ''
          }
        : REQUIRED_FIELDS.reduce((memo, fieldKey) => {
            memo[fieldKey] = account[fieldKey];
            return memo;
          }, {})
    };

    this.switchToEditable = this.switchToEditable.bind(this);
    this.switchToUnEditable = this.switchToUnEditable.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValidInput = this.isValidInput.bind(this);
  }

  isNewAccount() {
    return this.props.account === null;
  }

  switchToEditable(event) {
    event.preventDefault();
    this.setState({
      isEditable: true,
      validated: false
    });
  }

  switchToUnEditable(event) {
    event.preventDefault();
    if (this.isNewAccount()) {
      this.props.history.push('/');
    } else {
      this.setState({
        isEditable: false,
        account: {
          ...this.props.account
        }
      });
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
    } else if (this.isNewAccount()) {
      this.props.createAccount(this.state.account, this.props.history);
      this.setState({
        isEditable: false
      });
    } else {
      this.props.updateAccount(this.props.account.id, this.state.account);
      this.setState({
        isEditable: false
      });
    }
  }

  renderControlButtons() {
    if (this.state.isEditable) {
      return (
        <Form.Row>
          <Col xs="auto">
            <Button variant="primary" name="save" type="submit">
              Save
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              variant="secondary"
              name="cancel"
              type="button"
              onClick={this.switchToUnEditable}
            >
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
                  this.props.history.push('/');
                }}
              >
                Delete Account
              </Button>
            </Col>
          )}
        </Form.Row>
      );
    }

    return (
      <Form.Row>
        <Col xs="auto">
          <Button variant="secondary" name="edit" type="button" onClick={this.switchToEditable}>
            Edit
          </Button>
        </Col>
      </Form.Row>
    );
  }

  render() {
    const account = this.state.account;
    const disabled = this.state.isEditable === false;

    return (
      <Jumbotron className="col">
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                disabled={disabled}
                required
                value={account.name}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="address">
              <Form.Label>Physical Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                disabled={disabled}
                required
                value={account.address}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="industry">
              <Form.Label>Industry</Form.Label>
              <Form.Control
                name="industry"
                as="select"
                disabled={disabled}
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
            <Form.Group as={Col} controlId="annualRevenue">
              <Form.Label>Annual Revenue</Form.Label>
              <Form.Control
                name="annualRevenue"
                type="number"
                disabled={disabled}
                required
                value={account.annualRevenue}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                name="rating"
                as="select"
                disabled={disabled}
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
                disabled={disabled}
                required
                value={account.establishedDate}
                onChange={this.handleInputChange}
              />
            </Form.Group>
          </Form.Row>
          {this.renderControlButtons()}
        </Form>
      </Jumbotron>
    );
  }
}

AccountDetails.propTypes = {
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
  )(AccountDetails)
);
