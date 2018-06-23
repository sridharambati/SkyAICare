import React, {Component} from 'react';
import Dialog from 'rc-dialog';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {alertsdataActions} from '../../../actions';

// Component for the Media Dialog
class UpdateStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            width: 400,
            destroyOnClose: true,
            center: false,
            mousePosition: {},
            alert: props.alert,
            status: "",
            alertsdata: props.alertsdata,
            description: ""
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            alertsdata: newProps.alertsdata,
        });
    }

    onClick = e => {
        this.setState({
            mousePosition: {
                x: e.pageX,
                y: e.pageY,
            },
            visible: true,
        });
    };

    onClose = e => {
        this.setState({
            visible: false,
        });
    };

    onDestroyOnCloseChange = e => {
        this.setState({
            destroyOnClose: e.target.checked,
        });
    };

    center = e => {
        this.setState({
            center: e.target.checked,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.status.length > 0) {
            this.props.dispatchaction_updateAlertData(this.state.alert.id, this.state.status, this.state.alert.enterpriseId, this.state.description);
        }
        this.onClose(e);
        this.forceUpdate();
    };

    handleCheck = e => {
        e.stopPropagation();

        if (e.target.value == "CLOSE") {
            this.setState({
                status: e.target.value,
                description: ""
            });
        }
        else if (e.target.value != undefined && e.target.value != "CLOSE") {
            this.setState({
                status: "UPDATE",
                description: e.target.value
            });
        }
    };

    stopEventPropagation = e => {
        e.stopPropagation();
    };

    render() {
        const style = {
            width: this.state.width,
        };
        let wrapClassName = '';
        if (this.state.center) {
            wrapClassName = 'center';
        }
        const dialog = (  //Contents of the dialog being displayed
            <Dialog
                visible={this.state.visible}
                wrapClassName={wrapClassName}
                animation="zoom"
                maskAnimation="fade"
                onClose={this.onClose}
                style={style}
                mousePosition={this.state.mousePosition}
                destroyOnClose={this.state.destroyOnClose}
            >
                <div onClick={this.stopEventPropagation}>
                    <h1 className="rc-dialog-header">{this.state.alert.senior.lastName}</h1>
                    <h2 className="rc-dialog-title">
                        <span>Current&nbsp;Status:&nbsp;&nbsp;</span>{this.state.alert.description}</h2><br/>
                    <form ref="form">
                        <div className="textaligner">
                            <input type="radio" name="status" value="ASSISTANCE REQUIRED"
                                   onClick={this.handleCheck}/><label htmlFor="ASSISTANCE REQUIRED">&nbsp;ASSISTANCE
                            REQUIRED&nbsp;</label><br/><br/>
                            <input type="radio" name="status" value="HELP DISPATCHED" onClick={this.handleCheck}/><label
                            htmlFor="HELP DISPATCHED">&nbsp;HELP DISPATCHED&nbsp;</label><br/><br/>
                            <input type="radio" name="status" value="HELP ACTIVE" onClick={this.handleCheck}/><label
                            htmlFor="HELP ACTIVE">&nbsp;HELP ACTIVE&nbsp;</label><br/><br/>
                            <input type="radio" name="status" value="CLOSE" onClick={this.handleCheck}/><label
                            htmlFor="CLOSE">&nbsp;CLOSE&nbsp;</label><br/><br/>
                        </div>
                        <div className="textaligner2">
                            <button type="submit" onClick={this.handleSubmit}>Update Status</button>
                        </div>
                    </form>
                </div>
            </Dialog>
        );
        return (
            <div>
                <img src={require("../../../img/response1.png")} className="avatar2" onClick={this.onClick}/>
                {dialog}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        alertsdata: state.dashboard.alertsdata
    };
};

function mapDispatchToProps(dispatch) {
    let ac_updateAlertData = alertsdataActions.updateAlertData;
    return {
        ...bindActionCreators({
                dispatchaction_updateAlertData: ac_updateAlertData
            },
            dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStatus);
