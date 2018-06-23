import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {overlaydataActions} from '../../../actions';
import Floors from '../../Dashboard/_Floors.subComponent';
import OverlayAllAlerts from './_OverlayAllAlerts.subComponent';

// Component for the expanding Overlay of the Dashboard Page and displaying the relevant information
export class Overlay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clicked: props.clicked,
            summary: props.summary,
            highlights: props.highlights,
            currentfloor: props.currentfloor,
            className: "floor-popup",
            enterprise: props.enterprise,
            floors: props.floors
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            clicked: newProps.clicked,
            summary: newProps.summary,
            highlights: newProps.highlights,
            currentfloor: newProps.currentfloor,
            floors: newProps.floors
        });
        this.forceUpdate();
    }

    onClick = e => { // For displaying the overlay
        this.props.setOverlayExpansion();
    };

    onClose = e => { // For closing the overlay
        this.props.resetOverlayExpansion();
    };

    showFloors = e => {
        if (this.state.className === "floor-popup") {
            this.setState({
                className: "floor-popup show"
            })
        }
        else if (this.state.className === "floor-popup show") {
            this.setState({
                className: "floor-popup"
            })
        }
    };

    render() {
        // TODO @Srini, need to check whether array is empty, without it you cannot get the name property
        let activeFloor = "";
        if (this.state.floors[(this.state.currentfloor) - 1] !== undefined) {
            activeFloor = this.state.floors[(this.state.currentfloor) - 1].name;
        } else {
            activeFloor = "Floor";
        }
        return <div>
            {
                // Conditional Logic for knowing whether the overlay i open or closed and consequently showing the relevant information
                (this.state.clicked === false)
                    ? (
                        <div className="main-heading-section">
                            <div className="center-image">
                                <img src={require("../../../img/centerimage.png")} alt=""/>
                                <div className="heading-title">{this.state.enterprise.name}</div>
                                <div className="pagination">
                                    <div className="pages">
                                        <div className="page active">{activeFloor}</div>
                                        <div className="page-right-arrow">
                                            <img className="dialogbutton" src={require("../../../img/right-arrow.png")}
                                                 alt="" onClick={this.showFloors}/>
                                            <div className={this.state.className}>
                                                <div className="floor-nos">
                                                    <ul>
                                                        <Floors/>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="heading-labels">
                                <OverlaySummary alerts={this.state.summary} highlights={this.state.highlights}
                                                overlay="open"/>
                                <div className="dropdown-overlay" id="show_alerts_drop_down" onClick={this.onClick}>
                                    <img src={require("../../../img/dropdownicon.png")} alt=""/>
                                </div>
                            </div>
                        </div>
                    )

                    : (
                        <div className="alerts-popup" id="alert_popups">
                            <div className="main-heading-section">
                                <div className="center-image">
                                    <img src={require("../../../img/centerimage.png")} alt=""/>
                                    <div className="heading-title">Epoch Elder Care</div>
                                </div>
                                <div className="heading-labels">
                                    <OverlaySummary alerts={this.state.summary} highlights={this.state.highlights}
                                                    overlay="open"/>
                                    <div className="dropdown-overlay" id="close-icon" onClick={this.onClose}>
                                        <img src={require("../../../img/dropdownicon.png")} alt=""
                                             className="rotated-arrow"/>
                                    </div>
                                </div>
                            </div>
                            <div className="alert-popup-section">
                                <OverlayAllAlerts/>
                            </div>
                        </div>
                    )
            }</div>
    };
}

const mapStateToProps = (state) => {
    return {
        clicked: state.dashboard.isExpanded,
        summary: state.dashboard.summary,
        highlights: state.dashboard.highlightsummary,
        currentfloor: state.dashboard.selection.floor,
        enterprise: state.dashboard.enterprisedata,
        floors: state.dashboard.floorAPIdata
    };
};

function mapDispatchToProps(dispatch) {
    let ac_setOverlayExpansion = overlaydataActions.setOverlayExpansion;
    let ac_resetOverlayExpansion = overlaydataActions.resetOverlayExpansion;

    return {
        ...bindActionCreators({
                setOverlayExpansion: ac_setOverlayExpansion,
                resetOverlayExpansion: ac_resetOverlayExpansion
            },
            dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);

// for displaying the Global Alerts Data for the entire facility
class OverlaySummary extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let index = 0; // Variable for iterating through the styles of priorities for different types of alerts
        const returnSummary = this.props.alerts.map((alert, keyValue) => {
            index++; // Incrementing the variable since the priority levels start at 1
            let divstyle = ("alert-number" + index + " alert-number"); // Variable to decide which style to assign the alert based on the priority of the alert being passed
            let tooltip = "";
            if (index === 1) {
                divstyle = ("alert-number" + index + " alert-numbers"); // Variable to decide which style to assign the alert based on the priority of the alert being passed
                tooltip = "SOS"
            }
            else if (index === 2) {
                tooltip = "HIGH IMPACT"
            }
            else if (index === 3) {
                tooltip = "HIGH NOISE"
            }
            else if (index === 4) {
                tooltip = "MISSING"
            }
            else if (index === 5) {
                tooltip = "POWER ON"
            }
            let animstyle = "";
            if (this.props.highlights[index - 1] > 0) {
                animstyle += "newalert-summary-animation";
            }
            return (
                <div className="alerts tooltip" key={keyValue}>
                    <img className={animstyle} src={require("../../../img/alert" + index + ".png")} alt=""/>
                    <div className={divstyle}>{alert}</div>
                    <span className="tooltiptext">Alert Type:<br/>{tooltip}</span>
                </div>
            );
        });
        return returnSummary;
    }
}

