import React, {Component} from 'react';
import {connect} from 'react-redux';
import {alertsdataActions} from '../../actions';
import {bindActionCreators} from 'redux';

class FloorItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: props.alert,
            isClicked: false,
            selection: props.selection,
            indexKey: props.keyCopy
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            alert: newProps.alert,
            selection: newProps.selection,
            indexKey: newProps.keyCopy
        });
        this.forceUpdate();
    }

    onFocus = e => {  // Function for changing the state and expanding or collapsing the Alert
        if (this.state.isClicked === false) {  // If the Alert is collapsed then expand
            this.props.setAlertExpansion(this.state.indexKey);
            this.setState({
                isClicked: true
            });
        }

        else if (this.state.isClicked === true) { // If the Alert is expanded then collapse
            this.props.resetAlertExpansion();
            this.setState({
                isClicked: false
            });
        }
    };

    render() {
        let alert = this.state.alert; // Making a copy of the alerts object for the relevant floor for data manipulation
        // Variable to decide which style to assign the alert based on the priority of the alert being passed
        let divStyle = {
            position: 'absolute',
            color: 'white',
            top: (alert.sensor.y) + 'px',
            left: (alert.sensor.x) + 'px'
        };

        let tipStyle = {
            position: 'absolute',
            top: (alert.sensor.y) + 'px',
            left: (alert.sensor.x) + 'px'
        };

        let priority = 1;
        if (alert.alertType === 'SOS') {
            priority = 1;
        }
        else if (alert.alertType === 'HIGH_IMPACT') {
            priority = 2;
        }
        else if (alert.alertType === 'HIGH NOISE') {
            priority = 3;
        }
        else if (alert.alertType === 'MISSING') {
            priority = 4;
        }
        else if (alert.alertType === 'POWER_OFF') {
            priority = 5;
        }

        return (
            <div className="tooltip1">
                <span className="tooltiptext" style={tipStyle}>Alert:<br/><i>{alert.senior.lastName}</i></span>
                <div onClick={this.onFocus}>

                    {
                        (this.state.selection == this.state.indexKey)
                            ?
                            (alert.alertStatus === 'INIT')
                                ?
                                <div>
                                    <img style={divStyle} className={'person-on-map-selected'}
                                         src={require('../../img/alertpositionpointer' + priority + '.png')}/>
                                    <img style={divStyle} className={'person-on-map-blink person-on-map-selected'}
                                         src={require('../../img/cardalert' + priority + '.png')}/>
                                </div>
                                :
                                <div>

                                    <img style={divStyle} className={'person-on-map-selected'}
                                         src={require('../../img/cardalert' + priority + '.png')}/>
                                </div>
                            :
                            (alert.alertStatus === 'INIT')
                                ?
                                <div>
                                    <img style={divStyle} className={'person-on-map'}
                                         src={require('../../img/alertpositionpointer' + priority + '.png')}/>
                                    <img style={divStyle} className={'person-on-map-blink person-on-map'}
                                         src={require('../../img/cardalert' + priority + '.png')}/>
                                </div>
                                :
                                <div>
                                    <img style={divStyle} className={'person-on-map'}
                                         src={require('../../img/cardalert' + priority + '.png')}/>
                                </div>
                    }
                </div>
            </div>
        );
    };
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
    };
}

export default connect(null, mapDispatchToProps)(FloorItem);
