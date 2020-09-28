import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

import './Accounts.css';

class Accounts extends Component {
  render() {
    return (
      <div class="accounts">
        <Link className="btn btn-primary" to="/accounts/new">
          Add Account
        </Link>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Industry</th>
              <th scope="col">Revenue</th>
              <th scope="col">Rating</th>
              <th scope="col">Est. Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Taco Bell</td>
              <td>1 Geln Bell Way Irvine, CA 92618</td>
              <td>Food & Beverage</td>
              <td>$1.339B</td>
              <td>Hot</td>
              <td>03/08/20</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Accounts.propTypes = {};

export default Accounts;
