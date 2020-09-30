import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {Form, Col, Row, Jumbotron, Table, InputGroup} from 'react-bootstrap';

import {RATING_OPTIONS, INDUSTRY_OPTIONS} from './constants';

import './Accounts.css';

export class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      industry: '',
      rating: '',
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
    this.filterByName = this.filterByName.bind(this);
    this.filterBySelectOption = this.filterBySelectOption.bind(this);
    this.filterByGreaterAnnualRevenue = this.filterByGreaterAnnualRevenue.bind(this);
    this.filterByLessAnnualRevenue = this.filterByLessAnnualRevenue.bind(this);
    this.filterByAfterEstablishedDate = this.filterByAfterEstablishedDate.bind(this);
    this.filterByBeforeEstablishedDate = this.filterByBeforeEstablishedDate.bind(this);
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

  filterByName(account) {
    if (this.state.name) {
      return account.name.toLowerCase().includes(this.state.name.toLowerCase());
    }
    return true;
  }

  filterBySelectOption(fieldKey, account) {
    const filter = this.state[fieldKey];

    if (!filter) {
      return true;
    }

    return account[fieldKey] === filter;
  }

  filterByGreaterAnnualRevenue(account) {
    const greaterAnnualRevenue = Number.parseFloat(this.state.annualRevenue.greaterAnnualRevenue);

    if (Number.isNaN(greaterAnnualRevenue) === false) {
      return account.annualRevenue >= greaterAnnualRevenue;
    }
    return true;
  }

  filterByLessAnnualRevenue(account) {
    const lessAnnualRevenue = Number.parseFloat(this.state.annualRevenue.lessAnnualRevenue);

    if (Number.isNaN(lessAnnualRevenue) === false) {
      return account.annualRevenue <= lessAnnualRevenue;
    }
    return true;
  }

  convertDateStringToDate(dateString) {
    const [year, month, date] = dateString.split('-');
    return new Date(year, Number.parseInt(month) - 1, date);
  }

  filterByAfterEstablishedDate(account) {
    if (this.state.establishedDate.afterEstablishedDate) {
      return (
        this.convertDateStringToDate(account.establishedDate).getTime() >=
        this.convertDateStringToDate(this.state.establishedDate.afterEstablishedDate).getTime()
      );
    }
    return true;
  }

  filterByBeforeEstablishedDate(account) {
    if (this.state.establishedDate.beforeEstablishedDate) {
      return (
        this.convertDateStringToDate(account.establishedDate).getTime() <=
        this.convertDateStringToDate(this.state.establishedDate.beforeEstablishedDate).getTime()
      );
    }
    return true;
  }

  renderFilterForm() {
    return (
      <Jumbotron>
        <h4>Filter Accounts</h4>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="name">
              <Form.Control
                name="name"
                type="text"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleOneDimensionalFilter}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="state">
              <Form.Control
                placeholder="State"
                name="state"
                type="text"
                value={this.state.state}
                onChange={this.handleFilterChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="industry">
              <Form.Control
                name="industry"
                value={this.state.industry}
                as="select"
                onChange={this.handleOneDimensionalFilter}
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
              <Form.Label column>Annual Revenue</Form.Label>
              <InputGroup className="mb-3">
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
              <InputGroup className="mb-3">
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
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                name="rating"
                value={this.state.rating}
                as="select"
                onChange={this.handleOneDimensionalFilter}
              >
                {Object.keys(RATING_OPTIONS).map((optKey) => (
                  <option key={optKey} value={optKey}>
                    {RATING_OPTIONS[optKey]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="industry">
              <Form.Label column sm={2}>
                Industry
              </Form.Label>
              <InputGroup className="mb-3">
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
              <InputGroup className="mb-3">
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
            </Form.Group>
          </Form.Row>
        </Form>
      </Jumbotron>
    );
  }

  renderAccounts() {
    return this.props.accounts
      .filter(this.filterByName)
      .filter(this.filterBySelectOption.bind(this, 'industry'))
      .filter(this.filterBySelectOption.bind(this, 'rating'))
      .filter(this.filterByGreaterAnnualRevenue)
      .filter(this.filterByLessAnnualRevenue)
      .filter(this.filterByAfterEstablishedDate)
      .filter(this.filterByBeforeEstablishedDate)
      .map((account) => {
        return (
          <tr
            key={account.id}
            onClick={() => {
              this.props.history.push(`/accounts/${account.id}`);
            }}
          >
            <td>{account.name}</td>
            <td>{account.address}</td>
            <td>{INDUSTRY_OPTIONS[account.industry]}</td>
            <td>{account.annualRevenue}</td>
            <td>{RATING_OPTIONS[account.rating]}</td>
            <td>{account.establishedDate.toString()}</td>
          </tr>
        );
      });
  }

  render() {
    return (
      <div className="accounts">
        {this.renderFilterForm()}
        <div className="row">
          <Link className="mb-3 btn btn-primary" to="/accounts/new">
            Add Account
          </Link>
        </div>
        <div className="row">
          <Table striped bordered hover>
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Industry</th>
                <th scope="col">Revenue</th>
                <th scope="col">Rating</th>
                <th scope="col">Est. Date</th>
              </tr>
            </thead>
            <tbody>{this.renderAccounts()}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(Accounts);
