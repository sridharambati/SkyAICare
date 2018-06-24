<<<<<<< HEAD
import React, {Component} from 'react';

import {connect} from 'react-redux';

import Header from '../Common/Header/Header';
import Overlay from '../Common/Overlay/Overlay';
import AlertsList from './_AlertsList.subComponent';
import FloorMap from './_FloorMap.subComponents';

import {homepageActions} from '../../actions';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
    require('./Dashboard.css'); // eslint-disable-line global-require
}

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flooralerts: props.flooralerts,
            user: props.userdata,
            residents: []
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        window.onload = () => {
            if (window.user && window.user.enterpriseId) {
                homepageActions.requestEnterpriseData({enterpriseId: window.user.enterpriseId})
            }
        };
    }

    componentWillReceiveProps(newProps) {
        // TODO, conditionally setState only if changes are necessary
        this.setState({
            flooralerts: newProps.flooralerts,
            user: newProps.userdata,
            residents: newProps.residentsdata
        });
        this.forceUpdate();
    }


    // the render method of this Container
    render() {
        return (
            <div className="content-dash">

                <Header user={this.state.user}/>
                <div className="content-body">
                    <Overlay/>
                    <div>
                        <div className="content-section">
                            <div className="left-section">


                                <FloorMap/>
                            </div>
                        </div>

                        <div className="col-1 right-section">
                            <div><h1 className="alerts-heading">Alerts</h1></div>
                            <div className="right-section-content">

                                <AlertsList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {      //Data for the overlay
        flooralerts: state.dashboard.selection,        // Getting the total alerts in the facility
        userdata: state.dashboard.userdata,            // Getting the userdata of the user logged in
        residentsdata: state.dashboard.residentsdata    // Getting the historic alert data
    }
};

export default connect(mapStateToProps)(Dashboard);
=======
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import Meta from 'react-helmet';

import { bindActionCreators } from 'redux';

import { find } from 'lodash';

import { createaction_requestAlerts, REQUEST_ALERTS, REQUEST_ALERTS_MOCK } from '../../actions';
import Header from '../Common/Header/Header';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Dashboard.css'); // eslint-disable-line global-require
}

export class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  static getMeta(id) {
    return {
      title: `AiCare AshbyPonds Monitoring Portal`,
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
    const { dispatch } = this.props;
    this.props.dispatch({ type: REQUEST_ALERTS, payload: {} });
    // dispatch({ type: REQUEST_ALERTS, payload: {} });
  }

  doFetchMockData = (event) => {

    // this.props.dispatch_createaction_doLogin("u", "p");
    this.props.dispatch({ type: REQUEST_ALERTS_MOCK, payload: {} });
  }

  render() {
    // for use inside render
    const head = Dashboard.getMeta();

    return (
      <div className="content-dash">
          <header>
            
            <div className="logo">
                <img src={require("../../img/logo.png")} alt="logo" className="logo-img" />
                <img className="logo-bg" src={require("../../img/logo-background.png")} alt="" />
            </div>
            <div className="nav-container">
                <ul className="nav-list">
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
                    <div className="user-wrap">
                        {/*
                        <div className="profile-pic">
                            <img src={require("../../img/avatar.png")} alt="" />
                        </div>
                        */}
                    </div>
                </ul>
            </div>
        </header>

         <div className="content-body">
            
            <div className="left-section">
                <img src={require("../../img/bg5.png")} alt="" className="floor-map"/>
                <div className="pagination">
                    <div className="pages">
                        <div className="page active" onClick={ this.doFetchMockData }>1</div>
                        <div className="page">2</div>
                        <div className="page">3</div>
                    </div>
                </div>
                { this.props.mapList }
            </div>

          <div className="col-1 right-section">
                <h1 className="alerts-heading no-margin">Alerts</h1>
                <div className="right-section-content">

            { this.props.alertsList }

            </div>
          </div>
        </div>
        </div>
      
    );
  }
}

const mapStateToProps = (state) => {

  const alertsCopy = state.dashboard.alertsdata;
  const alertsList = alertsCopy.map((alert, keyValue) => { return(
    // <ObjectRow obj={alert} key={keyValue}  />
    
    <div className="description-mod " key={ keyValue }>
      <div className="pt-log pt-detail">
          <img src={ alert.image_url + "" } className="avatar" />
          <div className="side-text detail-1">
              <div className="pt-name list-header">{ alert.resident }</div>
              <div className="pt-suite-no gray-text list-subheader mr-t-5">{ alert.currentlocation }</div>
          </div>
      </div>
      <div className="pt-log pt-loc">
          <div className="side-text detail-2">
              <div className="pt-condition list-header">{ alert.type }</div>
              <div className="curr-location gray-text list-subheader mr-t-5">@{ alert.location.room }</div>
          </div>
      </div>
      <div className="pt-log pt-stat">
          <div>
              <div className="help-stat list-header">
                  { alert.status }
              </div>
              <div className="elapsed-time gray-text side-text list-subheader mr-t-5">{ alert.time } min ago</div>
          </div>
          <div className="drop-down down">
              <div className="dropdown-arrow-dwn"></div>
          </div>
          <div className="drop-down up">
              <div className="dropdown-arrow-up"></div>
          </div>
      </div>
      <div className="list-detail">

          <div className="call-status iBlock-wrap line-wrap">
              <div className="dot iBlock danger"></div>
              <div className="status iBlock list-header">SOS High Noise Alert&nbsp;&nbsp;&nbsp;|</div>
              <div className="time iBlock list-subheader">03/19/2018 11:30 AM</div>
          </div>
          <div className="help-status iBlock-wrap line-wrap">
              <div className="dot iBlock safe"></div>
              <div className="status iBlock list-header">Help Dispatched&nbsp;&nbsp;&nbsp;|</div>
              <div className="time iBlock list-subheader">03/19/2018 11:30 AM</div>
          </div>
          <div className="help-status iBlock-wrap line-wrap">
              <div className="dot iBlock safe"></div>
              <div className="status iBlock list-header">Help Active&nbsp;&nbsp;&nbsp;|</div>
              <div className="time iBlock list-subheader">03/19/2018 11:30 AM</div>
          </div>
      </div>
  </div>
  )});

  const residentsOnMap = alertsCopy.map((alert, keyValue) => { 

    var divStyle = {
      color: 'white',
      top: (alert.location.x)*3.2+'px',
      left: (alert.location.y)*3.2+'px'
    };

    return(
      <img key={ keyValue } style={divStyle} className="person-on-map" src={ alert.image_url + "" }/>
    )
  });

  return {
    alerts: alertsCopy,
    alertsList: alertsList,
    mapList: residentsOnMap
  };
};

// adding callables to props
const mapDispatchToProps = (dispatch, props) => {

  return Object.assign({dispatch: dispatch}, bindActionCreators({
    dispatch_createaction_requestAlerts:  
      () => { 
        dispatch(createaction_requestAlerts());
      }
  }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
>>>>>>> parent of d01f52a... Cleaned old files
