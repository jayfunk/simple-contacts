import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Col, Row, Jumbotron, InputGroup} from 'react-bootstrap';

import {RATING_OPTIONS, INDUSTRY_OPTIONS, STATE_OPTIONS} from './constants';

import './accountFilters.css';

class AccountFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      industry: '',
      rating: '',
      state: '',
      annualRevenue: {
        greaterAnnualRevenue: '',
        lessAnnualRevenue: ''
      },
      establishedDate: {
        afterEstablishedDate: '',
        beforeEstablishedDate: ''
      }
    };

    this.handleOneDimensionalFilter = this.handleOneDimensionalFilter.bind(this);
    this.handleRevenueChange = this.handleRevenueChange.bind(this);
    this.handleEstablishedDateChange = this.handleEstablishedDateChange.bind(this);
  }

  componentDidUpdate(_, prevState) {
    if (this.state !== prevState) {
      this.props.onFilterChange(this.state);
    }
  }

  handleOneDimensionalFilter(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      ...this.state,
      [name]: target.value
    });
  }

  handleRevenueChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      annualRevenue: {
        ...this.state.annualRevenue,
        [name]: target.value
      }
    });
  }

  handleEstablishedDateChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      establishedDate: {
        ...this.state.establishedDate,
        [name]: target.value
      }
    });
  }

  renderSelectOptions(options) {
    const renderedOptions = Object.keys(options).map((optKey) => (
      <option key={optKey} value={optKey}>
        {options[optKey]}
      </option>
    ));
    renderedOptions.unshift(<option key="blank" value=""></option>);
    return renderedOptions;
  }

  render() {
    return (
      <Jumbotron className="col">
        <h4>Filter Accounts</h4>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                size="sm"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleOneDimensionalFilter}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                size="sm"
                name="state"
                as="select"
                value={this.state.state}
                onChange={this.handleOneDimensionalFilter}
              >
                {this.renderSelectOptions(STATE_OPTIONS)}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                size="sm"
                name="rating"
                value={this.state.rating}
                as="select"
                onChange={this.handleOneDimensionalFilter}
              >
                {this.renderSelectOptions(RATING_OPTIONS)}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="industry">
              <Form.Label>Industry</Form.Label>
              <Form.Control
                size="sm"
                name="industry"
                value={this.state.industry}
                as="select"
                onChange={this.handleOneDimensionalFilter}
              >
                {this.renderSelectOptions(INDUSTRY_OPTIONS)}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="annualRevenue">
              <Form.Label>Annual Revenue Range</Form.Label>
              <Form.Control
                name="lessAnnualRevenue"
                type="number"
                value={this.state.annualRevenue.lessAnnualRevenue}
                onChange={this.handleRevenueChange}
              />
            </Form.Group>
            <div className="col-md-2 form-separator">
              <span>Between</span>
            </div>
            <Form.Group as={Col} controlId="annualRevenue">
              <Form.Label
                style={{
                  visibility: 'hidden'
                }}
              >
                Annual Revenue
              </Form.Label>
              <Form.Control
                name="greaterAnnualRevenue"
                type="number"
                value={this.state.annualRevenue.greaterAnnualRevenue}
                onChange={this.handleRevenueChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="annualRevenue">
              <Form.Label>Established Date Range</Form.Label>
              <Form.Control
                name="afterEstablishedDate"
                type="date"
                value={this.state.establishedDate.afterEstablishedDate}
                onChange={this.handleEstablishedDateChange}
              />
            </Form.Group>
            <div className="col-md-2 form-separator">
              <span>Between</span>
            </div>
            <Form.Group as={Col} controlId="annualRevenue">
              <Form.Label
                style={{
                  visibility: 'hidden'
                }}
              >
                Established Date Range
              </Form.Label>
              <Form.Control
                name="beforeEstablishedDate"
                type="date"
                value={this.state.establishedDate.beforeEstablishedDate}
                onChange={this.handleEstablishedDateChange}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Jumbotron>
    );
  }
}

AccountFilters.propTypes = {
  accounts: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default AccountFilters;
