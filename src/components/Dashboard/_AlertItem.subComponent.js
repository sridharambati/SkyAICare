import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MediaControl} from '../Common';
import UpdateStatus from '../Common/UpdateStatus/UpdateStatus';
import {alertsdataActions} from '../../actions';
import {bindActionCreators} from 'redux';
import ReactDOM from 'react-dom';

//Component for isolating each element of the Alerts List
class AlertItem extends Component {

    constructor(props) {
        super(props);
        let styleToApply = props.isExpanded ? "description-mod-active" : "description-mod";
        if (props.alert.alertStatus === "INIT") {
            styleToApply += " glowanimationstyle";
        }
        this.state = {
            alert: props.alert,        // Making a copy of the alerts object for the entire facility for data manipulation
            indexKey: props.keyCopy,
            isClicked: props.isExpanded,   // Variable for keeping tracking whether an item has been clicked or not
            style: styleToApply,        // Variable for Setting the style onClick so that it expands and collapses
            scrollId: props.scrollId,
            reference: props.reference,
            flag: props.flag
        }
    }

    componentWillReceiveProps(newProps) {
        let newStyleToApply = ((newProps.isExpanded == undefined) || (newProps.isExpanded == false)) ? "description-mod" : "description-mod-active";
        if (newProps.alert.alertStatus === "INIT") {
            newStyleToApply += " glowanimationstyle";
        }
        this.setState({
            alert: newProps.alert,
            indexKey: (newProps.keyCopy == undefined ? 0 : newProps.keyCopy),
            isClicked: (newProps.isExpanded == undefined ? false : newProps.isExpanded),
            style: newStyleToApply,
            scrollId: newProps.scrollId,
            reference: newProps.reference,
            flag: newProps.flag
        });
        this.forceUpdate();
        if (this.state.alert.id === this.state.scrollId) {
            this.handleScrollToElement();
        }
    }

    onFocus = e => {  // Function for changing the state and expanding or collapsing the Alert
        if (this.state.isClicked === false) {  // If the Alert is collapsed then expand
            this.props.setAlertExpansion(this.state.indexKey);
        }
        else { // If the Alert is expanded then collapse
            this.props.resetAlertExpansion();
        }
    };

    handleScrollToElement() {
        const tesNode = ReactDOM.findDOMNode(this.refs.scrollalert);
        console.log(tesNode);
        if (this.state.alert.id === this.state.scrollId) {
            window.scrollTo(0, tesNode.offsetTop);
        }
    }

    render() {
        let priority = 1;
        if (this.state.alert.alertType === "SOS") {
            priority = 1;
        }
        else if (this.state.alert.alertType === "HIGH_IMPACT") {
            priority = 2;
        }
        else if (this.state.alert.alertType === "HIGH NOISE") {
            priority = 3;
        }
        else if (this.state.alert.alertType === "MISSING") {
            priority = 4;
        }
        else if (this.state.alert.alertType === "POWER_OFF") {
            priority = 5;
        }

        let boxStyle = this.state.style;  // Variable for deciding the style of the expanded or collapsed Alert
        let divstyle = ("type-of-alert alert-number" + priority); // Variable to decide which style to assign the alert based on the priority of the alert being passed
        let alert_description = this.state.alert.description.slice(0, 10);

        return (
            <div className={boxStyle} onClick={this.onFocus} ref={this.state.reference}>
                <div className={divstyle}>{this.state.alert.alertType}</div>
                <div className="alert-content-section">
                    <div className="alert-content">
                        <div className="pt-log pt-detail">
                            <img src={require("../../img/cardalert" + priority + ".png")} className="avatar1"/>
                            <div className="side-text detail-1 side-text-padding">
                                <div className="pt-name list-header">{this.state.alert.senior.lastName}</div>
                                <div className="pt-suite-no gray-text list-subheader mr-t-5"></div>
                            </div>
                        </div>

                        <div className="pt-log pt-stat pt-stat-text">
                            <div>
                                <div className="help-stat list-header">
                                    {alert_description}
                                </div>
                                <div
                                    className="elapsed-time gray-text side-text list-subheader mr-t-5">{this.state.alert.createUtc} min
                                    ago
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="alert-media">
                        {
                            // (this.state.alert.media.video == undefined)   // Conditional logic for selecting whether the alert has attached video or audio
                            //     ? ((this.state.alert.media.audio == undefined)   // Conditional logic for selecting whether the alert has attached video or audio
                            //         ? <div></div>
                            //         : <MediaControl alert={this.state.alert} type={priority} media="audio" source={ `data:audio/ogg;base64,${this.state.alert.audioList[0].content}` } alertStatus={ this.state.alert.alertStatus==undefined? false: true } />
                            //     )
                            //     : <MediaControl type={priority} media="video" source={ this.state.alert.media.video } alertStatus={ this.state.alert.alertStatus==undefined? false: true } />
                            (this.state.alert.alertStatus === 'INIT' && this.state.alert.audioList && this.state.alert.audioList.length > 0)
                                ? <MediaControl alert={this.state.alert} type={priority} media="audio"
                                                source={(navigator.userAgent.indexOf("Safari") > -1) ? `data:audio/mpeg;base64,${this.state.alert.audioList[0].content}` : `data:audio/ogg;base64,${this.state.alert.audioList[0].content}`}
                                                flag={this.state.flag}/> : <div className="empty"/>
                        }
                    </div>
                    <UpdateStatus alert={this.state.alert}/>
                </div>
                {
                    // (this.state.alert.alertStatus === "INIT" && (this.state.alert.media.audio === undefined))   // Conditional logic for selecting whether beep has to play for the new alert
                    //     ? <audio autoPlay src="http://k003.kiwi6.com/hotlink/5bqgf29jwj/alert.mp3" />
                    //     : <div className="empty"></div>
                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    let ac_setAlertExpansion = alertsdataActions.setAlertExpansion;
    let ac_resetAlertExpansion = alertsdataActions.resetAlertExpansion;
    return {
        ...bindActionCreators({
                setAlertExpansion: ac_setAlertExpansion,
                resetAlertExpansion: ac_resetAlertExpansion
            },
            dispatch)
    }
}

export default connect(null, mapDispatchToProps)(AlertItem);

// Function for adding the history of alerts of a patient to the AlertsList Section
function AlertHistory(props) {
    return props.alerts.map((alert, keyValue) => {
        let divstyle = "dot iBlock type" + alert.priority; // Variable to decide which style to assign the alert based on the priority of the alert being passed

        return (
            <div className="list-detail" key={keyValue}>
                <div className="call-status iBlock-wrap line-wrap">
                    <div className={divstyle}></div>
                    <div className="status iBlock list-header">{alert.type}&nbsp;&nbsp;&nbsp;|</div>
                    <div className="time iBlock list-subheader">{alert.timestamp}</div>
                </div>
            </div>
        )
    });
}
