import React, {Component} from "react";
import EventsApi from '../logics/EventsApi'
import {Col, Form, Grid, PageHeader, Tab, Tabs} from 'react-bootstrap';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import matchSorter from 'match-sorter';
import Dialog from "react-toolbox/lib/dialog/Dialog";
import Button from 'react-toolbox/lib/button/Button';
import {General, Involved, StatisticData, Vehicles} from './EventClasses';

class Event extends Component {

    componentDidMount() {
        this.props.listEventsOptions();
        this.props.listEvents(this.props.events.loading);
    }

    render() {
        return (
            <div>
                <PageHeader>Ocorrencias
                    <small>Abertas</small>
                </PageHeader>
                <EventsGrid data={this.props.events.events}
                            options={this.props.events.options}
                            loading={this.props.events.loading}
                            showModal={this.props.events.showModal}
                            selectedEvent={this.props.events.selectedEvent}
                            selectedEventID={this.props.events.selectedEventID}
                            handleToggleModal={this.props.handleToggleModal}
                            selectEvent={this.props.selectEvent}
                            onChangeInput={this.props.onChangeInput}
                />
            </div>
        );
    }

}

//make new js file for both grids
class EventsGrid extends Component {

    buttonToggleModal(id) {
        this.props.handleToggleModal();
        this.props.selectEvent(id);
    };

    render() {
        const columns = [
            {
                style: {textAlign: "center"},
                Header: 'Data',
                id: 'date',
                accessor: d => d.general.date,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["date"]}),
                filterAll: true
            }, {
                style: {textAlign: "center"},
                Header: 'Rua',
                id: 'street',
                accessor: d => d.general.street,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["street"]}),
                filterAll: true

            }, {
                style: {textAlign: "center"},
                Header: 'Numero/KM',
                id: 'number',
                accessor: d => d.general.number,
                filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
            }, {
                style: {textAlign: "center"},
                Header: 'Cruzamento com',
                id: 'cross',
                accessor: d => d.general.cross,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["cross"]}),
                filterAll: true
            }, {
                style: {textAlign: "center"},
                Header: 'Bairro',
                id: 'neighborhood',
                accessor: d => d.general.Neighborhood,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["neighborhood"]}),
                filterAll: true
            }, {
                style: {textAlign: "center"},
                Header: 'Referencia',
                id: 'reference',
                accessor: d => d.general.Reference,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["reference"]}),
                filterAll: true
            }, {
                style: {textAlign: "center"},
                Header: 'Editar',
                accessor: 'id',
                filterable: false,
                sortable: false,
                Cell: props => (
                    <Button icon="edit" primary id={props.value} onClick={() => this.buttonToggleModal(props.value)}/>
                )
            }
        ];
        const actions = [
            {label: "Fechar", onClick: this.props.handleToggleModal}
        ];
        return (
            <div>
                <div className="content" id="content">
                    <ReactTable
                        previousText='Anterior' nextText='Proximo'
                        ofText='de' rowsText='linhas' pageText='Pagina'
                        noDataText='Sem dados correspondentes' loadingText='Carregando...'
                        className="-striped -highlight" columns={columns} defaultPageSize={5}
                        data={this.props.data} loading={(this.props.loading === undefined)}
                        defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                        filterable
                    />
                    <div className="modal-container">
                        <Dialog active={this.props.showModal === !(undefined)}
                                actions={actions} type='fullscreen'
                                onEscKeyDown={this.props.handleToggleModal}
                                onOverlayClick={this.props.handleToggleModal}
                                title='Ocorrência'
                        >
                            <EventsForm selectedEvent={this.props.selectedEvent}
                                        selectedEventID={this.props.selectedEventID}
                                        options={this.props.options}
                                        onChangeInput={this.props.onChangeInput}
                            />
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }
}

//make new js file
class EventsForm extends Component {
    render() {
        return (
            <div className='clearfix'>
                <Grid>
                    <Col>
                        <Form>
                            <Tabs defaultActiveKey={1} id="event-form-tabs">
                                <Tab eventKey={1} title="Geral">
                                    <General data={this.props.selectedEvent.general}
                                             onChangeInput={this.props.onChangeInput}
                                             subMenu='general'
                                    />
                                </Tab>
                                <Tab eventKey={2} title="Dados Estatisticos">
                                    <StatisticData data={this.props.selectedEvent.statisticData}
                                                   options={this.props.options.statisticData}
                                                   onChangeInput={this.props.onChangeInput}
                                                   subMenu='statisticData'
                                    />
                                </Tab>
                                <Tab eventKey={3} title="Veículos">
                                    <Vehicles selectedEvent={this.props.selectedEvent.involved}
                                              options={this.props.options.involved}
                                              onChangeInput={this.props.onChangeInput}
                                              subMenu='vehicle'
                                    />
                                </Tab>
                                <Tab eventKey={4} title="Envolvidos">
                                    <Involved selectedEvent={this.props.selectedEvent.involved}
                                              options={this.props.options.involved}
                                              onChangeInput={this.props.onChangeInput}
                                              subMenu='involved'
                                    />
                                </Tab>
                            </Tabs>
                        </Form>
                    </Col>
                </Grid>
            </div>
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
        listEvents: (loading, type) => {
            dispatch(EventsApi.listOpenEvents(loading, type));
        },
        listEventsOptions: () => {
            dispatch(EventsApi.listEventsOpts());
        },
        handleToggleModal: () => {
            dispatch(EventsApi.handleEventsModal());
        },
        selectEvent: (id) => {
            dispatch(EventsApi.selectEvent(id));
        },
        onChangeInput: (newValue, operator, subMenu) => {
            dispatch(EventsApi.onChangeInput(newValue, operator, subMenu));
        }

    }

};

const EventContainer = connect(mapStateToProps, mapDispatchToProps)(Event);

export default EventContainer;