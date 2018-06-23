import React, {Component} from 'react';
import {connect} from 'react-redux';
import AlertItem from './_AlertItem.subComponent';

// Component for the right hand side section of the Dashbord for displaying the relevant floor alerts
export class AlertsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alerts: props.alerts,           // Making a copy of the alerts object for the entire facility for data manipulation
            currentfloor: props.currentfloor,     // global indicator for current floor being viewed
            currentalert: props.currentalert,     // global indicator for current key being expanded
            currentselection: props.currentselection,  // global indicator for current alert being viewed
            scrollId: props.scrollId
        }
    }

    componentWillReceiveProps(newProps) {  // Updating the state on receiving the new props after selecting a different floor
        this.setState({
            alerts: newProps.alerts,
            currentfloor: newProps.currentfloor,
            currentalert: newProps.currentalert,
            currentselection: newProps.currentselection,
            scrollId: newProps.scrollId
        });
        this.forceUpdate();
    }

    render() {
        let reference = '';
        let flag = "next";
        let flagId = '';
        for (var i = 0; i < this.state.alerts.length; ++i) {
            if (this.state.alerts[i].alertStatus === 'INIT' && this.state.alerts[i].audioList && this.state.alerts[i].audioList.length > 0) {
                flagId = this.state.alerts[i].id;
            }
        }

        if (this.state.alerts.length > 0) {
            return this.state.alerts.map((alert, keyValue) => {  // Mapping all the relevant floor alerts on the right section of the page
                if (flagId === alert.id) {
                    flag = "first";
                }
                else {
                    flag = "next";
                }

                if (alert.id === this.state.scrollId) {
                    reference = "scrollalert";
                }
                else  {
                    reference = '';
                }
                return (
                    <AlertItem
                        key={keyValue} keyCopy={keyValue} alert={alert}
                        isExpanded={this.state.currentselection == keyValue} scrollId={this.state.scrollId}
                        reference={reference} flag={flag}/>

                )
            })
        } else {
            return (<div>
                <div className="loader-alert"></div>
                Waiting for new alerts...</div>)
        }
    }
}

const mapStateToProps = (state) => {
    let expansionStatus = false;
    return {
        alerts: state.dashboard.selection.alerts,
        currentfloor: state.dashboard.selection.floor,
        currentalert: state.dashboard.selection.selectedalert,
        currentselection: state.dashboard.selection.selectedalert,
        scrollId: state.dashboard.scrollId
    };
};

export default connect(mapStateToProps)(AlertsList);
