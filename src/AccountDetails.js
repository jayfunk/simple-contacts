import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Col} from 'react-bootstrap';

import {INDUSTRY_OPTIONS, RATING_OPTIONS} from './constants';

class AccountDetails extends Component {
  render() {
    return (
      <div className="col">
        <Form>
          <Form.Row>
            <Col>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" />
            </Col>
            <Col>
              <Form.Label>Physical Address</Form.Label>
              <Form.Control type="text" />
            </Col>
            <Col>
              <Form.Label>Industry</Form.Label>
              <Form.Control as="select">
                {Object.keys(INDUSTRY_OPTIONS).map((optKey) => (
                  <option value={optKey}>{INDUSTRY_OPTIONS[optKey]}</option>
                ))}
              </Form.Control>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Label>Annual Revenue</Form.Label>
              <Form.Control type="text" />
            </Col>
            <Col>
              <Form.Label>Rating</Form.Label>
              <Form.Control as="select">
                {Object.keys(RATING_OPTIONS).map((optKey) => (
                  <option value={optKey}>{RATING_OPTIONS[optKey]}</option>
                ))}
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Establised Date</Form.Label>
              <Form.Control type="date" />
            </Col>
          </Form.Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

AccountDetails.propTypes = {
  account: PropTypes.object
};

export default AccountDetails;
