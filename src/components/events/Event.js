import React, {Component} from "react";
import EventsApi from '../../logics/EventsApi'
import {PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {EventsGrid} from './EventClasses';
import {BounceLoader} from "react-spinners";
import {EventsForm} from "./EventClasses";
import {Col, Grid, Row} from 'react-bootstrap';

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
                            municipios={this.props.events.municipio}
                            ruas={this.props.events.rua}
                            loading={this.props.events.loading} showModal={this.props.events.showModal}
                            selectedEvent={this.props.events.selectedEvent}
                            selectedEventID={this.props.events.selectedEventID}
                            onChangeDropdown={this.props.onChangeDropdown}
                            handleToggleModal={this.props.handleToggleModal}
                            onNestedInputChange={this.props.onNestedInputChange}
                            selectEvent={this.props.selectEvent} onChangeInput={this.props.onChangeInput}
                            addVehicle={this.props.addVehicle} removeVehicle={this.props.removeVehicle}
                            addInvolved={this.props.addInvolved} removeInvolved={this.props.removeInvolved}
                            addVia={this.props.addVia} removeVia={this.props.removeVia}
                            updateEvent={this.props.updateEvent}
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
                            onChangeDropdown={this.props.onChangeDropdown}
                            onNestedInputChange={this.props.onNestedInputChange}
                            handleToggleModal={this.props.handleToggleModal}
                            selectEvent={this.props.selectEvent} onChangeInput={this.props.onChangeInput}
                            addVehicle={this.props.addVehicle} removeVehicle={this.props.removeVehicle}
                            addInvolved={this.props.addInvolved} removeInvolved={this.props.removeInvolved}
                            addVia={this.props.addVia} removeVia={this.props.removeVia}
                            updateEvent={this.props.updateEvent}
                />
            </div>
        );
    }
}

class EventFormContainer extends Component{

    componentWillMount(){
        this.props.listEventsOptions();
        this.props.initializeEvent();
    }

    render(){
        return(
            <Grid>
                <Row>
                {
                    this.props.events.options?(
                        <Col md={12} style={{minHeight:"80vh"}}>
                            <EventsForm selectedEvent={this.props.events.selectedEvent}
                                        selectedEventID={this.props.events.selectedEventID}
                                        options={this.props.events.options}
                                        municipios={this.props.events.municipio}
                                        ruas={this.props.events.rua}
                                        municipioIsLoading={this.props.events.municipioIsLoading}
                                        ruaIsLoading={this.props.events.ruaIsLoading}
                                        onChangeDropdown={this.props.onChangeDropdown}
                                        onNestedInputChange={this.props.onNestedInputChange}
                                        onChangeInput={this.props.onChangeInput}
                                        asyncTypeaheadQuery={this.props.asyncTypeaheadQuery}
                                        addVehicle={this.props.addVehicle} removeVehicle={this.props.removeVehicle}
                                        addInvolved={this.props.addInvolved} removeInvolved={this.props.removeInvolved}
                                        addVia={this.props.addVia} removeVia={this.props.removeVia}
                            />
                        </Col>
                    ):(
                        <Col xs={6} md={6} lg={6}
                             xsOffset={4} lgOffset={6} mdOffset={6}>
                            <BounceLoader
                                color={'#123abc'}
                                loading={true}
                            />
                        </Col>
                    )
                }
                </Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initializeEvent:() => {
            dispatch(EventsApi.initializeEvent());
        },
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
        addVehicle: () => {
            dispatch(EventsApi.addVehicle());
        },
        removeVehicle: (vehicle) => {
            dispatch(EventsApi.removeVehicle(vehicle));
        },
        updateEvent:(event) => {
            dispatch(EventsApi.updateEvent(event));
        },
        addInvolved: () => {
            dispatch(EventsApi.addInvolved());
        },
        removeInvolved: (involved) => {
            dispatch(EventsApi.removeInvolved(involved));
        },
        addVia:()=>{
            dispatch(EventsApi.addVia());
        },
        removeVia:(via)=>{
            dispatch(EventsApi.removeVia(via));
        },
        onNestedInputChange:(subMenu, operator, input, id, value, dropdown)=>{
            dispatch(EventsApi.onNestedInputChange(subMenu, operator, input, id, value, dropdown));
        },
        onChangeDropdown:(newValue, operator, subMenu) => {
            dispatch(EventsApi.onChangeDropdown(newValue, operator, subMenu));
        },
        onChangeInput: (newValue, operator, subMenu) => {
            dispatch(EventsApi.onChangeInput(newValue, operator, subMenu));
        },
        asyncTypeaheadQuery: (query, option) => {
            dispatch(EventsApi.asyncTypeaheadQuery(query, option))
        }

    }
};

export const OpenEvents = connect(mapStateToProps, mapDispatchToProps)(OpenEvent);

export const Events = connect(mapStateToProps, mapDispatchToProps)(Event);

export const CreateEvent = connect(mapStateToProps, mapDispatchToProps)(EventFormContainer);




