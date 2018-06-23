import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {alertsdataActions} from '../../../actions';
import Search from './_Search.subcomponent';
import {homepageActions} from '../../../actions/homepage';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
    require('./Header.css');
    // eslint-disable-line global-require
}

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            menuClick: false,
            user: props.user
        };
    }

    componentWillReceiveProps(newProps) {
        // TODO, conditionally setState only if changes are necessary
        this.setState({
            user: newProps.user
        });
        this.forceUpdate();
    }

    originaldata = () => {
        this.props.dispatchaction_getdata();
    };

    showSearch = e => {
        if (this.state.clicked === true) {
            this.setState({
                clicked: false
            })
        }

        else if (this.state.clicked === false) {
            this.setState({
                clicked: true
            })
        }
    };

    showBurger = e => {
        if (this.state.menuClick === false) {
            this.setState({
                menuClick: true
            })
        }

        else if (this.state.menuClick === true) {
            this.setState({
                menuClick: false
            })
        }
    };

    render() {
        let username = this.state.user.firstName + " " + this.state.user.lastName;
        return (
            <div>
                <header>
                    <div className="header-wrapper">
                        <a href="#" className="logo">
                            <img src={require("../../../img/logo.png")} alt=""/>
                        </a>
                        <div className="nav-container">
                            <div className="hamburger-menu">
                                <img src={require("../../../img/hamburger.png")} alt="" onClick={this.showBurger}/>
                                <div className="search-bar" id="show-search-drop-down" onClick={this.showSearch}>
                                    <img src={require("../../../img/search.png")} alt=""/>
                                </div>
                            </div>
                            {
                                (this.state.menuClick === true)
                                    ? (<BurgerMenu/>)
                                    : (<div className="empty"></div>)
                            }
                            <ul className="nav-list display">
                                <div className="search-bar" id="show-search-drop-down" onClick={this.showSearch}>
                                    <img src={require("../../../img/search.png")} alt=""/>
                                </div>
                                <li>
                                    <a href="#">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#">Residents</a>
                                </li>
                                <li onClick={this.originaldata}>
                                    <a href="#">Facilities</a>
                                </li>
                                <li>
                                    <a href="#">Reports</a>
                                </li>
                                <li>
                                    <a href="#">Help</a>
                                </li>
                                <li>
                                    <a href="#">|</a>
                                </li>
                                <div className="userbox">
                                    <li className="username">
                                        <a href="#">{username}</a>
                                    </li>
                                    <div className="user-logout">
                                        <div>
                                            <a href="javascript:void(0)" onClick={this.doLogout}>Logout</a>
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </header>
                {
                    (this.state.clicked === true)
                        ? (<Search showSearch={this.showSearch}/>)
                        : (<div className="empty"></div>)
                }

            </div>
        );
    }

    doLogout = e => {
        e.preventDefault();
        this.props.logout();
    };
}

class BurgerMenu extends Component {
    render() {
        return (
            <div className="burger-menu-show">
                <ul>
                    <li>
                        <a href="#">Dashboard</a>
                    </li>
                    <li>
                        <a href="#">Residents</a>
                    </li>
                    <li>
                        <a href="#">Facilities</a>
                    </li>
                    <li>
                        <a href="#">Reports</a>
                    </li>
                    <li>
                        <a href="#">Help</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" onClick={this.doLogout}>Logout</a>
                    </li>
                </ul>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    let ac_requestAlerts = alertsdataActions.requestAlertsData;
    return {
        ...bindActionCreators({
                dispatchaction_getdata: ac_requestAlerts,
                logout: homepageActions.logout
            },
            dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Header);
