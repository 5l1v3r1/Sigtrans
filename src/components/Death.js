/**
 * Created by natal on 17/04/17.
 */

import React, {Component} from "react";
import Button from 'react-toolbox/lib/button/Button';
import DeathApi from '../logics/DeathApi'
import {Col, Form, Grid, Modal, PageHeader, Panel, Row} from 'react-bootstrap';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import Input from "./CustomInput";
import Select from "./CustomSelect";
import Map from "./Map";
import Factor from "./Factor";
import matchSorter from 'match-sorter';

class Death extends Component {

    componentDidMount() {
        this.props.listDeathOptions();
        this.props.listDeathEvents(this.props.deaths.loading);
    }

    render() {
        return (
            <div>
                <PageHeader>Ocorrencias fatais</PageHeader>
                <div className="content" id="content">
                    <DeathEventsGrid data={this.props.deaths.deathEvents}
                                     deathAnalysis={this.props.deaths.deathAnalysis}
                                     options={this.props.deaths.deathOptions}
                                     loading={this.props.deaths.loading}
                                     showModal={this.props.deaths.showModal}
                                     selectedEvent={this.props.deaths.selectedEvent}
                                     selectedEventID={this.props.deaths.selectedEventID}
                                     handleToggleModal={this.props.handleToggleModal}
                                     handleSlider={this.props.handleSlider}
                    />
                </div>
            </div>
        );
    }

}

//make new js file for both grids
class DeathEventsGrid extends Component {

    handleToggleModal(id) {
        this.props.handleToggleModal(this.props.showModal, id)
    }

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
                Header: 'Análise',
                accessor: 'id',
                filterable: false,
                sortable: false,
                Cell: props => (
                    <Button icon="edit" primary id={props.value} onClick={() => this.handleToggleModal(props.value)}/>
                )
            }
        ];

        return (
            <div>
                <div className="content" id="content">
                    <ReactTable
                        filterable
                        previousText='Anterior'
                        nextText='Proximo'
                        loadingText='Carregando...'
                        pageText='Pagina'
                        noDataText='Sem dados correspondentes'
                        ofText='de'
                        rowsText='linhas'
                        data={this.props.data}
                        className="-striped -highlight"
                        loading={(this.props.loading === undefined)}
                        columns={columns}
                        defaultPageSize={5}
                        defaultFilterMethod={(filter, row) =>
                            String(row[filter.id]) === filter.value
                        }
                    />
                    <div className="modal-container">
                        <Modal show={this.props.showModal}
                               container={this}
                               dialogClassName="custom-modal"
                               aria-labelledby="contained-modal-title"
                               onHide={() => this.handleToggleModal(this.props.selectedEventID)}>

                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">Análise do Óbito
                                    <small> Nº: {this.props.selectedEventID}</small>
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <DeathAnalysis
                                    selectedEvent={this.props.selectedEvent}
                                    options={this.props.options}
                                    deathAnalysis={this.props.deathAnalysis}
                                    handleSlider={this.props.handleSlider}
                                />
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

//make new js file
class DeathAnalysis extends Component {

    render() {

        let mapCenter = {
            lat: this.props.selectedEvent.general.lat,
            lng: this.props.selectedEvent.general.lng
        };
        let padding = {
            paddingLeft: '2px'
        };
        let padding5px = {
            paddingLeft: '5px'
        };

        let factorList = [
            {name: 'Velocidade', id: 'speed'},
            {name: 'Alcool', id: 'alcohol'},
            {name: 'Infraestrutura', id: 'infrastructure'},
            {name: 'Veiculo', id: 'vehicle'},
            {name: 'Fadiga', id: 'fatigue'},
            {name: 'Visibilidade', id: 'visibility'},
            {name: 'Drogas', id: 'drugs'},
            {name: 'Celulares', id: 'cellphone'}
        ];
        let factors = factorList.map((item) => {
            return (
                <div key={item.id}>
                    <Factor sliderValue={this.props.deathAnalysis[item.id]} style={padding}
                            factor={item.name} itemId={item.id} responsible
                            options={this.props.options.involved.involvedVehiclePositions}
                            handleSlider={this.props.handleSlider} max={10} step={2}
                    />
                </div>
            )
        }, this);

        let causeList = [
            {name: 'Avanço de Sinal', id: 'signalAdvance'},
            {name: 'Condutor sem habilitação', id: 'noLicence'},
            {name: 'Transitar em local proibido', id: 'transitProhibited'},
            {name: 'Transitar em local Improprio', id: 'transitImproper'},
            {name: 'Mudança de pista sem sinalização prévia', id: 'laneChange'},
            {name: 'Distância mínima não respeitada', id: 'minimalDistance'},
            {name: 'Converter / Cruzar sem dar preferência', id: 'conversionPreference'},
            {name: 'Não dar preferência ao pedestre na faixa', id: 'pedestrianPreference'},
            {name: 'Falta de Atenção', id: 'lackOfAttention'}
        ];
        let causes = causeList.map((item) => {
            return (
                <div key={item.id}>
                    <Factor sliderValue={this.props.deathAnalysis[item.id]} style={padding}
                            factor={item.name} itemId={item.id} responsible
                            options={this.props.options.involved.involvedVehiclePositions}
                            handleSlider={this.props.handleSlider} max={10} step={2}
                    />
                </div>
            )
            // onChange={(value) => this.props.slider = value}

        }, this);

        let othersList = [
            {name: 'Cintos de Segurança', id: 'securityBelt'},
            {name: 'Veículo sem "crash protection"', id: 'crashProtection'},
            {name: 'Fatores Pré-hospitalares', id: 'preHosp'},
            {name: 'Objetos Lateriais à Via', id: 'sideObjects'},
            {name: 'Capacete', id: 'helmet'},
        ];
        let others = othersList.map((item) => {
            return (
                <div key={item.id}>
                    <Factor sliderValue={this.props.deathAnalysis[item.id]} style={padding}
                            factor={item.name} itemId={item.id} responsible
                            handleSlider={this.props.handleSlider} max={5} step={1}
                    />
                </div>
            )
            // options={this.props.options.involved.involvedVehiclePositions}
            //                 onChange={(value) => this.handleSlider(item.name, value)}

        }, this);

        let Involved = this.props.selectedEvent.involved.map((involved) => {
            return (
                <Panel header={"Envolvido: " + involved.Name} eventKey={involved.id} key={involved.id} collapsible>
                    <Col xs={11} md={11} sm={11}>
                        <Col sm={4}>
                            <Input value={involved.Name} type="text" readOnly disabled
                                   id="involvedName" required="required"
                                   label="Nome"/>
                        </ Col>
                        <Col sm={2}>
                            <Input value={involved.Age} type="number" readOnly disabled
                                   id="involvedAge" required="required"
                                   label="Idade"/>
                        </ Col>
                        <Col sm={2}>
                            <Select value={involved.Sex} id="involvedSex" readOnly disabled
                                    name="involvedSex"
                                    options={this.props.options.involved.involvedSexes}
                                    label="Sexo"/>
                        </ Col>
                        <Col sm={4}>
                            <Select value={involved.Situation} readOnly disabled
                                    id="involvedSituation"
                                    name="involvedSituation"
                                    options={this.props.options.involved.involvedSituations}
                                    label="Situação"/>
                        </Col>
                        <Col sm={4}>
                            <Select value={involved.VehiclePosition} readOnly disabled
                                    id="involvedVehiclePosition"
                                    name="involvedVehiclePosition"
                                    options={this.props.options.involved.involvedVehiclePositions}
                                    label="Posição no Veículo"/>
                        </Col>
                        <Col sm={4}>
                            <Select value={involved.SecurityCondition} readOnly disabled
                                    id="involvedSecurityCondition"
                                    name="involvedSecurityCondition"
                                    options={this.props.options.involved.involvedSecurityConditions}
                                    label="Condição de segurança"/>
                        </Col>
                        <Col sm={4}>
                            <Select value={involved.InjuryLevel} readOnly disabled
                                    id="involvedInjuryLevel"
                                    name="involvedInjuryLevel"
                                    options={this.props.options.involved.involvedInjuryLevels}
                                    label="Gravidade da lesão"/>
                        </Col>
                    </Col>
                </Panel>
            )
        }, this);

        return (
            <div className='clearfix'>
                <Grid>
                    <Col xs={12}>
                        <Form>
                            {/*general*/}
                            <Row className="firstRow">
                                <Panel>
                                    <Col sm={6}>
                                        <Row className="form-group">
                                            <h4>Informações Gerais</h4>
                                            <Col sm={4} style={padding}>
                                                <Input type="date" name="deathDate" id="date"
                                                       label="Data" readOnly disabled
                                                       value={this.props.selectedEvent.general.date}
                                                />
                                            </Col>
                                            <Col sm={2} style={padding5px}>
                                                <Input type="time" name="deathTime" id="deathTime"
                                                       label="Hora" readOnly disabled
                                                />
                                            </Col>
                                            <Col sm={4} style={padding5px}>
                                                <Input type="text" name="accidentType" id="accidentType"
                                                       label="Tipo do Acidente" readOnly disabled
                                                       value={this.props.options.statisticData.accidentTypes[this.props.selectedEvent.statisticData.accidentType]['value']}
                                                />
                                            </Col>
                                            <Col sm={2} style={padding5px}>
                                                <Input type="text" name="severity" id="severity"
                                                       label="Severidade" readOnly disabled
                                                       value={this.props.options.statisticData.accidentClassifications[this.props.selectedEvent.statisticData.accidentClassification - 1]['value']}

                                                />
                                            </Col>
                                            <Col sm={8} style={padding}>
                                                <Input type="text" name="eventAddress1"
                                                       id="eventAddress1" placeholder="Endereço 1"
                                                       label="Local da Ocorrência" readOnly disabled
                                                       value={this.props.selectedEvent.general.street}
                                                />
                                            </Col>
                                            <Col sm={4} style={padding}>
                                                <Input type="text" name="eventAddressNumber1"
                                                       id="eventAddressNumber1" placeholder="Numero"
                                                       label="Número" readOnly disabled
                                                       value={this.props.selectedEvent.general.number}
                                                />
                                            </Col>
                                            <Col sm={12} style={padding}>
                                                <Input type="text" name="eventCross"
                                                       id="eventCross" placeholder="Cruzamento"
                                                       label="Cruzamento" readOnly disabled
                                                       value={this.props.selectedEvent.general.cross}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    {/*Map*/}
                                    <Col sm={6} style={{paddingLeft: '1%'}}>
                                        <Row className='mapRow'>
                                            <Map center={mapCenter}/>
                                        </Row>
                                    </Col>
                                </Panel>
                            </Row>
                            {/*Fatores*/}
                            <Row className="form-group">
                                <Panel>
                                    <h4>Fatores</h4>
                                    {factors}
                                </Panel>
                                <Panel>
                                    <h4>Causas</h4>
                                    {causes}
                                </Panel>
                                <Panel>
                                    <h4>Outros</h4>
                                    {others}
                                </Panel>
                            </Row>
                            {/*victims*/}
                            <Row className="form-group">
                                <h4>
                                    Informações sobre as vítimas
                                </h4>
                                {Involved}
                            </Row>
                            {/*</Col>*/}
                        </Form>
                    </Col>
                </Grid>
            </div>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        deaths: state.death
    }
};

const mapDispatchToProps = dispatch => {

    return {
        listDeathEvents: (loading) => {
            dispatch(DeathApi.listDeaths(loading));
        },
        listDeathOptions: () => {
            dispatch(DeathApi.listDeathsOpts());
        },
        handleToggleModal: (showModal, id) => {
            dispatch(DeathApi.handleDeathModal(showModal, id));
        },
        handleSlider: (name, value) => {
            dispatch(DeathApi.handleSlider(name, value))
        }
    }

};

const DeathContainer = connect(mapStateToProps, mapDispatchToProps)(Death);

export default DeathContainer;