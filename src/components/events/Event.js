import React, {Component} from "react";
import EventsApi from '../../logics/EventsApi'
import {PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {EventsGrid} from './EventClasses';

class OpenEvent extends Component {

    componentWillMount() {
        this.props.listEventsOptions();
        this.props.listEvents(this.props.events.loading);
    }

    render() {
        return (
            <div>
                <PageHeader>Ocorrencias <small>Abertas</small></PageHeader>
                <EventsGrid data={this.props.events.events} options={this.props.events.options}
                            loading={this.props.events.loading} showModal={this.props.events.showModal}
                            selectedEvent={this.props.events.selectedEvent}
                            selectedEventID={this.props.events.selectedEventID}
                            handleToggleModal={this.props.handleToggleModal}
                            onNestedInputChange={this.props.onNestedInputChange}
                            selectEvent={this.props.selectEvent} onChangeInput={this.props.onChangeInput}
                            addVehicle={this.props.addVehicle} removeVehicle={this.props.removeVehicle}
                            addInvolved={this.props.addInvolved} removeInvolved={this.props.removeInvolved}
                />
            </div>
        );
    }

}

class Event extends Component {

    componentDidMount() {
        this.props.listEventsOptions();
        this.props.listEvents(this.props.events.loading);
    }

    render() {
        return (
            <div>
                <PageHeader>Ocorrencias <small>Gerais</small></PageHeader>
                <EventsGrid data={this.props.events.events} options={this.props.events.options}
                            loading={this.props.events.loading} showModal={this.props.events.showModal}
                            selectedEvent={this.props.events.selectedEvent}
                            selectedEventID={this.props.events.selectedEventID}
                            onNestedInputChange={this.props.onNestedInputChange}
                            handleToggleModal={this.props.handleToggleModal}
                            selectEvent={this.props.selectEvent} onChangeInput={this.props.onChangeInput}
                            addVehicle={this.props.addVehicle} removeVehicle={this.props.removeVehicle}
                            addInvolved={this.props.addInvolved} removeInvolved={this.props.removeInvolved}
                />
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        events: state.events
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listEvents: (loading, type) => {
            dispatch(EventsApi.listOpenEvents(loading, type));
        },
        listEventsOptions: () => {
            dispatch(EventsApi.listEventsOpts());
        },
        handleToggleModal: () => {
            dispatch(EventsApi.handleEventsModal());
        },
        selectEvent: (event) => {
            dispatch(EventsApi.selectEvent(event));
        },
        onChangeInput: (newValue, operator, subMenu) => {
            dispatch(EventsApi.onChangeInput(newValue, operator, subMenu));
        },
        addVehicle: () => {
            dispatch(EventsApi.addVehicle());
        },
        removeVehicle: (vehicle) => {
            dispatch(EventsApi.removeVehicle(vehicle));
        },
        addInvolved: () => {
            dispatch(EventsApi.addInvolved());
        },
        removeInvolved: (involved) => {
            dispatch(EventsApi.removeInvolved(involved));
        },
        onNestedInputChange:(subMenu, operator, input, id, value)=>{
            dispatch(EventsApi.onNestedInputChange(subMenu, operator, input, id, value));
        }

    }
};

export const OpenEvents = connect(mapStateToProps, mapDispatchToProps)(OpenEvent);

export const Events = connect(mapStateToProps, mapDispatchToProps)(Event);


