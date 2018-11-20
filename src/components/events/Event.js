import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button as Submit, Col, Grid, PageHeader, Row,} from 'react-bootstrap';
import {EventsForm, EventsGrid} from './EventClasses';
import EventsApi from '../../logics/EventsApi';
import DeathApi from '../../logics/DeathApi';

class OpenEvent extends Component {
  componentWillMount() {
    this.props.listEventsOptions();
    this.props.listEvents(this.props.events.loading);
  }

  render() {
    return (
      <div>
        <PageHeader>
          Ocorrencias
          {' '}
          <small>
            Abertas
          </small>
        </PageHeader>
        <EventsGrid
          data={this.props.events.events}
          options={this.props.events.options}
          municipios={this.props.events.municipio}
          ruas={this.props.events.rua}
          cruzamentos={this.props.events.cruzamento}
          loading={this.props.events.loading}
          showModal={this.props.events.showModal}
          selectedEvent={this.props.events.selectedEvent}
          selectedEventID={this.props.events.selectedEventID}
          onChangeDropdown={this.props.onChangeDropdown}
          handleToggleModal={this.props.handleToggleModal}
          onNestedInputChange={this.props.onNestedInputChange}
          selectEvent={this.props.selectEvent}
          onChangeInput={this.props.onChangeInput}
          addVehicle={this.props.addVehicle}
          removeVehicle={this.props.removeVehicle}
          addInvolved={this.props.addInvolved}
          removeInvolved={this.props.removeInvolved}
          addVia={this.props.addVia}
          removeVia={this.props.removeVia}
          updateEvent={this.props.updateEvent}
          asyncTypeaheadQuery={this.props.asyncTypeaheadQuery}
          fetchDependentOptions={this.props.fetchDependentOptions}
          ruaIsLoading={this.props.events.ruaIsLoading}
        />
      </div>
    );
  }
}

class DeathEvent extends Component {
  componentWillMount() {
    this.props.listEventsOptions();
    this.props.listEvents(this.props.events.loading, 'obitos');
    this.props.getFCGA("2018")
  }

  render() {
    return (
      <div>
        <PageHeader>
          Ocorrencias
          {' '}
          <small>
            Fatais
          </small>
        </PageHeader>
        <EventsGrid
          data={this.props.events.events}
          options={this.props.events.options}
          municipios={this.props.events.municipio}
          ruas={this.props.events.rua}
          cruzamentos={this.props.events.cruzamento}
          loading={this.props.events.loading}
          showModal={this.props.events.showModal}
          selectedEvent={this.props.events.selectedEvent}
          selectedEventID={this.props.events.selectedEventID}
          onChangeDropdown={this.props.onChangeDropdown}
          handleToggleModal={this.props.handleToggleModal}
          onNestedInputChange={this.props.onNestedInputChange}
          selectEvent={this.props.selectEvent}
          onChangeInput={this.props.onChangeInput}
          addVehicle={this.props.addVehicle}
          removeVehicle={this.props.removeVehicle}
          addInvolved={this.props.addInvolved}
          removeInvolved={this.props.removeInvolved}
          addVia={this.props.addVia}
          removeVia={this.props.removeVia}
          updateEvent={this.props.updateEvent}
          asyncTypeaheadQuery={this.props.asyncTypeaheadQuery}
          fetchDependentOptions={this.props.fetchDependentOptions}
          ruaIsLoading={this.props.events.ruaIsLoading}
          onChangeDeathInput={this.props.onChangeDeathInput}
          deathAnalysis
          FCGAList={this.props.events.FCGAList}
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
        <PageHeader>
          Ocorrencias
          {' '}
          <small>
            Gerais
          </small>
        </PageHeader>
        <EventsGrid
          municipios={this.props.events.municipio}
          ruas={this.props.events.rua}
          cruzamentos={this.props.events.cruzamento}
          data={this.props.events.events}
          options={this.props.events.options}
          loading={this.props.events.loading}
          showModal={this.props.events.showModal}
          selectedEvent={this.props.events.selectedEvent}
          selectedEventID={this.props.events.selectedEventID}
          onChangeDropdown={this.props.onChangeDropdown}
          onNestedInputChange={this.props.onNestedInputChange}
          handleToggleModal={this.props.handleToggleModal}
          selectEvent={this.props.selectEvent}
          onChangeInput={this.props.onChangeInput}
          addVehicle={this.props.addVehicle}
          removeVehicle={this.props.removeVehicle}
          addInvolved={this.props.addInvolved}
          removeInvolved={this.props.removeInvolved}
          addVia={this.props.addVia}
          removeVia={this.props.removeVia}
          updateEvent={this.props.updateEvent}
          asyncTypeaheadQuery={this.props.asyncTypeaheadQuery}
          fetchDependentOptions={this.props.fetchDependentOptions}
          ruaIsLoading={this.props.events.ruaIsLoading}
        />
      </div>
    );
  }
}

class EventFormContainer extends Component {
  componentWillMount() {
    this.props.initializeEvent();
    this.props.listEventsOptions();
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12} style={{ minHeight: '80vh' }}>
            <EventsForm
              selectedEvent={this.props.events.selectedEvent}
              selectedEventID={this.props.events.selectedEventID}
              options={this.props.events.options}
              municipios={this.props.events.municipio}
              ruas={this.props.events.rua}
              cruzamentos={this.props.events.cruzamento}
              municipioIsLoading={this.props.events.municipioIsLoading}
              ruaIsLoading={this.props.events.ruaIsLoading}
              onChangeDropdown={this.props.onChangeDropdown}
              onNestedInputChange={this.props.onNestedInputChange}
              onChangeInput={this.props.onChangeInput}
              asyncTypeaheadQuery={this.props.asyncTypeaheadQuery}
              addVehicle={this.props.addVehicle}
              removeVehicle={this.props.removeVehicle}
              addInvolved={this.props.addInvolved}
              removeInvolved={this.props.removeInvolved}
              addVia={this.props.addVia}
              removeVia={this.props.removeVia}
              fetchDependentOptions={this.props.fetchDependentOptions}
            />
          </Col>
          <Col>
            <Submit bsStyle="primary" type="submit" onClick={(e) => { e.preventDefault(); this.props.saveEvent(this.props.events.selectedEvent); }}>Adicionar</Submit>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  initializeEvent: () => {
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
  updateEvent: (event) => {
    dispatch(EventsApi.updateEvent(event));
  },
  addInvolved: () => {
    dispatch(EventsApi.addInvolved());
  },
  removeInvolved: (involved) => {
    dispatch(EventsApi.removeInvolved(involved));
  },
  addVia: () => {
    dispatch(EventsApi.addVia());
  },
  removeVia: (via) => {
    dispatch(EventsApi.removeVia(via));
  },
  onNestedInputChange: (subMenu, operator, input, id, value, dropdown) => {
    dispatch(EventsApi.onNestedInputChange(subMenu, operator, input, id, value, dropdown));
  },
  onChangeDropdown: (newValue, operator, subMenu) => {
    dispatch(EventsApi.onChangeDropdown(newValue, operator, subMenu));
  },
  onChangeInput: (newValue, operator, subMenu) => {
    dispatch(EventsApi.onChangeInput(newValue, operator, subMenu));
  },
  asyncTypeaheadQuery: (query, option, parent, parentType) => {
    dispatch(EventsApi.asyncTypeaheadQuery(query, option, parent, parentType));
  },
  fetchDependentOptions: (dependency, type) => {
    dispatch(EventsApi.fetchDependentOptions(dependency, type));
  },
  saveEvent: (event) => {
    dispatch(EventsApi.saveEvent(event));
  },
  onChangeDeathInput: (newValue, FCGAId, group, subGroup) => {
    dispatch(DeathApi.onChangeInput(newValue, FCGAId, group, subGroup));
  },
  getFCGA: (year) => {
    dispatch(DeathApi.getFCGA(year));
  },
});

export const OpenEvents = connect(mapStateToProps, mapDispatchToProps)(OpenEvent);

export const Events = connect(mapStateToProps, mapDispatchToProps)(Event);

export const CreateEvent = connect(mapStateToProps, mapDispatchToProps)(EventFormContainer);

export const DeathEvents = connect(mapStateToProps, mapDispatchToProps)(DeathEvent);
