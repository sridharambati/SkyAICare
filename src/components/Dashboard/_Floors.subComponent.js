import React, {Component} from 'react';
import {connect} from 'react-redux';
import {floorsdataActions, alertsdataActions, homepageActions} from '../../actions';

// Component for displaying the floors on the right and highlighting the floor relevant to the current user
export class Floors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentfloor: props.currentfloor,     // Current floor being viewed
            floors: props.floors,           // Floor data for displaying the different floors in the facility
            alertsdata: props.alertsdata
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            currentfloor: newProps.currentfloor,
            floors: newProps.floors,
            alertsdata: newProps.alertsdata
        });
    }

    onSelectFloor = (floorNumber) => { // Function for dispatching the action for changing the data and the active floor depending on which floor was clicked by the user
        this.props.dispatch(floorsdataActions.selectFloor(floorNumber, this.state.alertsdata));
        this.props.dispatch(alertsdataActions.requestSensorData(this.state.floors[floorNumber - 1].id));
        this.props.dispatch(homepageActions.requestSensorAlertData(this.state.floors[floorNumber - 1].id, floorNumber));
        this.props.dispatch(alertsdataActions.resetAlertExpansion());
    };

    render() {
        return this.state.floors.map((floor, keyValue) => {
            if (keyValue + 1 == this.state.currentfloor) { // Conditional logic for deciding which floor is currently being viewed and showing the relevant data
                return (
                    <li className="active" key={keyValue}>{floor.name}</li>
                );
            }
            else {
                return (
                    <li key={keyValue} onClick={() => this.onSelectFloor(keyValue + 1)}>{floor.name}</li>
                );
            }
        });
    }
}

const mapStateToProps = (state) => {

    return {
        currentfloor: state.dashboard.selection.floor,   // Current floor being viewed
        floors: state.dashboard.floorAPIdata,                       // Floor data for displaying the different floors in the facility
        alertsdata: state.dashboard.alertsdata
    };
};
export default connect(mapStateToProps)(Floors);
