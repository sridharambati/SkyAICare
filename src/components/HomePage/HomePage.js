<<<<<<< HEAD
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {homepageActions} from '../../actions';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
    require('./HomePage.css'); // eslint-disable-line global-require
}

/*
  This is the main login/landing page.
*/
export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            signin: props.signin    // Flag for the loader
        }
    }

    // typechecking on the props for this component
    static propTypes = {
        isLoggingIn: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    // defaultProps, props to load before first API call is made
    static defaultProps = {
        isLoggingIn: false,
        isLoginFailed: false
    };

    // lifecycle method
    componentDidMount() {
        const {dispatch} = this.props;
    }

    componentWillReceiveProps(newProps) {
        // TODO, conditionally setState only if changes are necessary
        this.setState({
            signin: newProps.signin
        });
        this.forceUpdate();
    }

    updateUsernameValue = e => {    // Function for updating the state with the string being input into the username field
        if (e.target.value.length > 2) {
            this.setState({
                username: e.target.value
            });
        } else {
            this.setState({
                username: ""
            });
        }
    };

    updatePwdValue = e => {    // Function for updating the state with the string being input into the password field
        if (e.target.value.length > 2) {
            this.setState({
                password: e.target.value
            });
        } else {
            this.setState({
                password: ""
            });
        }
    };

    // the render method
    render() {
        return (
            <div className="bodyclass">
                <div className="content">
                    <div className="ai-care-watermark-logo">

                    </div>
                    <div className="login-credentials-field-box">
                        <img className="bg-container" src={require("../../img/logo.png")}/>
                        <form className="logindetails" ref="form">
                            <p className="loginfailure">{this.props.isLoginFailed ? "Authentication failure!! Please login again." : ""}</p>
                            <div className="information">
                                <img className="login-field-icon" src={require("../../img/email-icon.png")}/>
                                <input className="login-input-field" type="text" placeholder="Username"
                                       onChange={this.updateUsernameValue}/>
                            </div>
                            <div className="information">
                                <img className="login-field-icon" src={require("../../img/password-icon.png")}/>
                                <input className="login-input-field" type="password" placeholder="Password"
                                       onChange={this.updatePwdValue}/>
                            </div>
                            <div className="forgot">
                                <a href="#">Forgot Password?</a>
                            </div>

                            { // Conditionally showing the signin button or the loader
                                (this.state.signin === false)
                                    ? (<div className="signin">
                                        <input type="button" value="Sign In" onClick={this.doLogin}/>
                                    </div>)
                                    : (<div className="loader"></div>)
                            }


                        </form>
                    </div>
                </div>
            </div>
        );
    }

    doLogin = e => {
        this.props.dispatch(homepageActions.login(this.state.username, this.state.password));    // Dispatching the login action after clicking the signin button
        // this.refs.form.reset();
        this.setState({
            isLoginFailed: true
        })
    };
=======
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meta from 'react-helmet';
import { browserHistory } from 'react-router'

import { bindActionCreators } from 'redux';

import { createaction_doLogin, REQUEST_LOGIN } from '../../actions';

// import (  ) from '../../reducers';

import Posts from '../Patients/Patients';
import Header from '../Common/Header/Header';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./HomePage.css'); // eslint-disable-line global-require
}

/*
  This is the main login/landing page. 
*/
export class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  // typechecking on the props for this component
  static propTypes = {
    isLoggingIn: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  // defaultProps, props to load before first API call is made
  static defaultProps = {
    isLoggingIn: false
  }

  // metadata for html
  static getMeta() {
    return {
      title: 'AiCare Monitoring Portal',
      link: [
        {
          rel: 'canonical',
          href: 'http://localhost:3000'
        }
      ],
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'description', 
          content: 'This is the monitoring portal for Ashby Ponds by AiCare'
        }
      ]
    };
  }

  // lifecycle method
  componentDidMount() {
    const { dispatch } = this.props;
  }

  // the render method
  render() {    

    // for use inside render
    const head = HomePage.getMeta();

    return (
      <div className="bodyclass">
      <div className="content">
        <div className="ai-care-watermark-logo" >
             
        </div>
        <div className="login-credentials-field-box">
            <img className="bg-container" src={require("../../img/logo.png")} />
            <form className ="logindetails">
                <div className ="information" >
                    <img className ="login-field-icon" src={require("../../img/email-icon.png")} />
                    <input className ="login-input-field" type="text" placeholder="Email ID" />
                </div>
                <div className ="information">
                    <img className ="login-field-icon" src={require("../../img/password-icon.png")} />
                    <input className ="login-input-field" type="password" placeholder="Password" />
                </div>
                <div className ="forgot">
                    <a href="#">Forgot Password?</a>
                </div>
                <div className ="signin">
                    <input type="button" value="Sign In" onClick = { this.doLogin } />
                </div>
            </form>
        </div>
    </div>
    </div>
    );
  }

  doLogin = (event) => {

    // TODO: remove line below and redirect on state change in Redux
    browserHistory.push('/dashboard');

    // this.props.dispatch_createaction_doLogin("u", "p");
    this.props.dispatch({ type: REQUEST_LOGIN, payload: {username: "username", passcode: "passcode"} });
  }

>>>>>>> parent of d01f52a... Cleaned old files
}

// changes in state are copied onto props here
const mapStateToProps = (state) => {
<<<<<<< HEAD
    // loading default props
    const {isLoggingIn} = state.dashboard;
    const {isLoginFailed} = state.dashboard;

    return {
        isLoggingIn,
        isLoginFailed,
        signin: state.dashboard.signin  // Flag for the loader
    };
};

export default connect(mapStateToProps)(HomePage);
=======
  
  // loading default props
  const { isLoggingIn } = state;

  return {
    isLoggingIn
  };
}

// adding callables to props
const mapDispatchToProps = (dispatch, props) => {

  return Object.assign({dispatch: dispatch}, bindActionCreators({
    dispatch_createaction_doLogin:        
      (userid, passcode) => {
        dispatch(createaction_doLogin(userid, passcode));
      }
  }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

>>>>>>> parent of d01f52a... Cleaned old files
