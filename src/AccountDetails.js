import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Col} from 'react-bootstrap';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import {INDUSTRY_OPTIONS, RATING_OPTIONS} from './constants';
import {createAccount, updateAccount} from './actions/accounts';

export class AccountDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditable: props.account === null,
      account:
        props.account === null
          ? {}
          : {
              name: props.account.name,
              address: props.account.address,
              industry: props.account.industry,
              annualRevenue: props.account.annualRevenue,
              rating: props.account.rating,
              establishedDate: props.account.establishedDate
            }
    };

    this.switchToEditable = this.switchToEditable.bind(this);
    this.switchToUnEditable = this.switchToUnEditable.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  switchToEditable() {
    this.setState({
      isEditable: true
    });
  }

  switchToUnEditable() {
    if (this.props.account === null) {
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

  handleSave() {
    if (this.props.account === null) {
      this.props.createAccount(this.state.account);
    } else {
      this.props.updateAccount(this.props.account.id, this.state.account);
    }
  }

  renderControlButtons() {
    if (this.state.isEditable) {
      return (
        <React.Fragment>
          <Button variant="primary" name="save" onClick={this.handleSave}>
            Save
          </Button>
          <Button variant="secondary" name="cancel" onClick={this.switchToUnEditable}>
            Cancel
          </Button>
        </React.Fragment>
      );
    }

    return (
      <Button variant="secondary" name="edit" onClick={this.switchToEditable}>
        Edit
      </Button>
    );
  }

  render() {
    const account = this.state.account;
    const disabled = this.state.isEditable === false;

    return (
      <div className="col">
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                disabled={disabled}
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
                value={account.establishedDate}
                onChange={this.handleInputChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group>{this.renderControlButtons()}</Form.Group>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

AccountDetails.propTypes = {
  account: PropTypes.object,
  history: PropTypes.object.isRequired,
  createAccount: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  createAccount,
  updateAccount
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(AccountDetails)
);
