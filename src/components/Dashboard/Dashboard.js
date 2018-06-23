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
