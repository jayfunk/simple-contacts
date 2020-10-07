import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Col, Row, Jumbotron, InputGroup} from 'react-bootstrap';

import {RATING_OPTIONS, INDUSTRY_OPTIONS, STATE_OPTIONS} from './constants';

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
          <Form.Group as={Row} controlId="annualRevenue">
            <Form.Label column sm={2}>
              Annual Revenue
            </Form.Label>
            <Col>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Less Than</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="lessAnnualRevenue"
                  type="number"
                  value={this.state.annualRevenue.lessAnnualRevenue}
                  onChange={this.handleRevenueChange}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Greater Than</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="greaterAnnualRevenue"
                  type="number"
                  value={this.state.annualRevenue.greaterAnnualRevenue}
                  onChange={this.handleRevenueChange}
                />
              </InputGroup>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="industry">
            <Form.Label column sm={2}>
              Industry
            </Form.Label>
            <Col>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">After</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="afterEstablishedDate"
                  type="date"
                  value={this.state.establishedDate.afterEstablishedDate}
                  onChange={this.handleEstablishedDateChange}
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Before</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="beforeEstablishedDate"
                  type="date"
                  value={this.state.establishedDate.beforeEstablishedDate}
                  onChange={this.handleEstablishedDateChange}
                />
              </InputGroup>
            </Col>
          </Form.Group>
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
