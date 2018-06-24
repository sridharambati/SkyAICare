<<<<<<< HEAD
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {find} from 'lodash';
import {CONTEXT_PATH} from "../../constants";

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
    require('./Patients.css'); // eslint-disable-line global-require
}

export class Patients extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    static getMeta(id) {
        return {
            title: `Post Detail Page - Post ${id}`,
            link: [
                {
                    rel: 'canonical',
                    href: `/post/${id}`
                }
            ],
            meta: [
                {
                    charset: 'utf-8'
                },
                {
                    name: 'description', content: 'Put the description here!'
                }
            ]
        };
    }

    componentDidMount() {
        // TODO initialization
    }

    render() {
        // for use inside render
        const head = Patients.getMeta();
        return (<div className="dashbodyclass">
                <div className="content">
                    <div className="nav-container">
                        <ul>
                            <li>
                                <a href={`${CONTEXT_PATH}/dashboard`}>Dashboard</a>
                            </li>
                            <li>
                                <a href={`${CONTEXT_PATH}/patients`}>Patients</a>
                            </li>
                            <li>
                                <a href={`${CONTEXT_PATH}/facilities`}>Facilities</a>
                            </li>
                            <li>
                                <a href={`${CONTEXT_PATH}/reports`}>Reports</a>
                            </li>
                            <li>
                                <a href="#">Help</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(Patients);
=======
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import Meta from 'react-helmet';

import { find } from 'lodash';
import Header from '../Common/Header/Header';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Patients.css'); // eslint-disable-line global-require
}

export class Patients extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  static getMeta(id) {
    return {
      title: `Post Detail Page - Post ${id}`,
      link: [
        {
          rel: 'canonical',
          href: `http://localhost:3000/post/${id}`
        }
      ],
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'description', content: 'Put the description here!'
        }
      ]
    };
  }

  componentDidMount() {
    // TODO initialization 
  }

  render() {
    // for use inside render
    const head = Patients.getMeta();

    return (
      
          <div className="dashbodyclass">
        <div className="content">
          <div className="nav-container">
            <ul>
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              <li>
                <a href="/patients">Patients</a>
              </li>
              <li>
                <a href="/facilities">Facilities</a>
              </li>
              <li>
                <a href="/reports">Reports</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
            </ul>
          </div>
          </div>
          </div>
    );
  }
}

const mapStateToProps = (state) => {
  // 
  return {
  };
};

export default connect(mapStateToProps)(Patients);
>>>>>>> parent of d01f52a... Cleaned old files
