import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {MediaControl} from '../';
import {overlaydataActions} from '../../../actions';

// Component for displaying all the alerts for the entire facility separately inside the overlay and also the relevant media
class OverlayAllAlerts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alerts: props.alerts // Making a copy of the alerts object for the entire facility for data manipulation
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            alerts: newProps.alerts
        });
        this.forceUpdate();
    }

    onNavigate = (floornumber, alertid, allalerts) => { // For displaying the overlay
        this.props.navigateToAlert(floornumber, alertid, allalerts);
    };

    render() {
        return this.state.alerts.map((alert, keyValue) => {
            let priority = 1;
            if (alert.alertType === "SOS") {
                priority = 1;
            }
            else if (alert.alertType === "HIGH_IMPACT") {
                priority = 2;
            }
            else if (alert.alertType === "HIGH NOISE") {
                priority = 3;
            }
            else if (alert.alertType === "MISSING") {
                priority = 4;
            }
            else if (alert.alertType === "POWER_OFF") {
                priority = 5;
            }
            let divstyle = ("type-of-alert alert-number" + priority); // Variable to decide which style to assign the alert based on the priority of the alert being passed

            let classnameToApply = "popup-card";
            "newalert-summary-animation"
            if (alert.alertStatus === "INIT") {
                classnameToApply += " glowanimationstyle";
            }

            // TODO: REMOVE THE HARDCODED STRING
            let alertLocation = "Ai Care Living Center";
            // if (alert.enterprise !== null && alert.enterprise.name !== null) {
            //     alertLocation = alert.enterprise.description;
            // }
            return (
                <div key={keyValue}>
                    <div className={classnameToApply} id="alert_popups">
                        <div className="map-point" onClick={() => this.onNavigate(1, alert.id, this.state.alerts)}>
                            <img src={require("../../../img/location" + priority + ".png")} className="avatar"/>
                        </div>
                        <div className={divstyle}>{alert.alertType}</div>
                        <div className="alert-content-section">
                            <div className="alert-content">
                                <div className="pt-log pt-detail">
                                    <img src={require("../../../img/cardalert" + priority + ".png")}
                                         className="avatar"/>
                                    <div className="side-text detail-1 side-text-padding">
                                        <div className="pt-name list-header">{alert.senior.lastName}</div>
                                        <div
                                            className="pt-suite-no gray-text list-subheader mr-t-5">{alertLocation}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="alert-media">
                                {
                                    (alert.alertStatus === 'INIT' && alert.audioList && alert.audioList.length > 0)
                                        ? <MediaControl alert={alert} type={priority} media="audio"
                                                        source={(navigator.userAgent.indexOf("Safari") > -1) ? `data:audio/mpeg;base64,${alert.audioList[0].content}` : `data:audio/ogg;base64,${alert.audioList[0].content}`}
                                                        flag="overlay"/> : <div className="empty"/>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            )
        });
    }
}

const mapStateToProps = (state) => {

    return {
        alerts: state.dashboard.sensoralertdata
    };
};

function mapDispatchToProps(dispatch) {
    let ac_navigateToAlert = overlaydataActions.navigateToAlertOnMap;
    return {
        ...bindActionCreators({
                navigateToAlert: ac_navigateToAlert
            },
            dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverlayAllAlerts);
