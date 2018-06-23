import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {alertsdataActions} from '../../../actions';
import SearchDropdown from './_SearchDropdown.subcomponent';

export class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSearch: props.showSearch,
            showSearching: false,
            inputValue: '',
            results: props.results,
            alertsdata: props.alertsdata
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            results: newProps.results,
            alertsdata: newProps.alertsdata
        });
    }

    handleSubmit = e => {
        e.stopPropagation();
    };

    clearField = e => {
        this.refs.form.reset();
        this.setState({
            inputValue: ''
        });
    };

    updateInputValue = e => {
        if (e.target.value.length > 2) {
            this.props.dispatchaction_requestSearch(e.target.value);

            this.setState({
                inputValue: e.target.value
            });
        } else {
            this.setState({
                inputValue: ""
            });
        }
    };

    showSearchDropdown = e => {
        if (this.state.showSearching === false) {
            e.stopPropagation();
            this.setState({
                showSearching: true
            })
        }

        else if (this.state.showSearching === true) {
            this.setState({
                showSearching: false
            })
        }
    };

    render() {
        return (
            <div className="search-popup restrict-width" id="search-popups">
                <header className="search-header">
                    <div className="search-container">
                        <form action="#" className="search-form" onSubmit={this.handleSubmit} ref="form">
                            <div className="form-group">
                                <div className="search-bar">
                                    <img src={require("../../../img/search.png")} alt=""/>
                                </div>
                                <input type="text" className="search-input" placeholder="Search here..."
                                       onChange={this.updateInputValue}/>
                                <div className="input-close clear-search-input">
                                    <img src={require("../../../img/input-close.png")} alt=""
                                         onClick={this.clearField.bind(this)}/>
                                </div>
                            </div>
                        </form>
                        <div className="search-close close-search-icon">
                            <img src={require("../../../img/search-close.png")} alt="" onClick={this.state.showSearch}/>
                        </div>
                    </div>
                </header>

                {
                    (this.state.inputValue.length > 2)
                        ? (<SearchDropdown results={this.state.results} alertsdata={this.state.alertsdata}
                                           showSearch={this.state.showSearch}/>)
                        : (<div className="empty"></div>)
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.dashboard.searchresults,
        alertsdata: state.dashboard.alertsdata
    };
};

function mapDispatchToProps(dispatch) {
    let ac_requestSearch = alertsdataActions.requestSearch
    return {
        ...bindActionCreators({
                dispatchaction_requestSearch: ac_requestSearch
            },
            dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
