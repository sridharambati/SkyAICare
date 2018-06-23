import React, {Component} from 'react';
import {connect} from 'react-redux';
import {alertsdataActions} from '../../actions';
import {bindActionCreators} from 'redux';
import FloorItem from './_FloorItem.subComponent';

class FloorMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alerts: props.flooralerts,
            isClicked: false,
            residents: props.residentsdata,
            floorplan: props.floorplan,
            sensoralerts: props.sensoralerts
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            alerts: newProps.flooralerts,
            residents: newProps.residentsdata,
            floorplan: newProps.floorplan,
            sensoralerts: newProps.sensoralerts
        });
        this.forceUpdate();
    }

    render() {
        let resident_object = {floorid: undefined, residents: []};
        resident_object.floorid = this.state.alerts.floorid;
        resident_object.residents = []; // re initialize
        for (var i = 0; i < this.state.residents.length; i++) {
            // if (this.state.residents[i].floorId == resident_object.floorid) {
            resident_object.residents.push(this.state.residents[i]);
            // }
        }

        let floorplan_image = this.state.alerts.floormap;
        let alertsCopy = this.state.alerts.alerts;
        let items = alertsCopy.map((alert, keyValue) => {  // Mapping all the relevant floor alerts on the right section of the page
            return (
                <FloorItem key={keyValue} keyCopy={keyValue} alert={alert} selection={alertsCopy.selectedalert}/>
            );
        });

        let residents = resident_object.residents.map((resident, keyValue) => {  // Mapping all the relevant floor alerts on the right section of the page
            return (
                <ResidentItem key={keyValue} resident={resident}/>
            );
        });

        return (
            <div className="floor-image">
                <svg width="800" height="500">
                    <image x="0" y="0" width="800" height="500" className="floor-map" xlinkHref={floorplan_image}>
                    </image>
                </svg>
                {items}
                {residents}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        flooralerts: state.dashboard.selection,        //Getting the count for the total alerts in the facility
        residentsdata: state.dashboard.residentsdata,
        floorplan: state.dashboard.floorAPIdata,
        sensoralerts: state.dashboard.sensoralertdata
    };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(FloorMap);

class ResidentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resident: props.resident
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            resident: newProps.resident
        });
        this.forceUpdate();
    }

    render() {
        console.log(this.state.resident);
        let resident = this.state.resident; // Making a copy of the residents object for the relevant floor for data manipulation
        // Variable to decide which style to assign the resident based on the priority of the resident being passed
        let divStyle = {
            color: 'white',
            position: 'absolute',
            top: (resident.y) + 'px',
            left: (resident.x) + 'px'
        };

        let tipStyle = {
            position: 'absolute',
            top: (resident.y) + 'px',
            left: (resident.x) + 'px'
        };

        return (
            <div className="tooltip1">
                <img style={divStyle} className={'person-on-map'} src={require('../../img/person1.png')}/>
                <span className="tooltiptext" style={tipStyle}>Resident:<br/><i>{resident.name}</i></span>
            </div>
        );
    }
}
