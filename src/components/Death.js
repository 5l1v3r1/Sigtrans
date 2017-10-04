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
import Factor from "./Factor"

class Death extends Component {

    componentDidMount() {
        this.props.listDeathOptions();
        this.props.listDeathEvents(this.props.deaths.loading);
    }

    render() {
        return (
            <DGrid
                options={this.props.deaths.deathOptions}
                data={this.props.deaths.deathEvents}
                loading={this.props.deaths.loading}
                showModal={this.props.deaths.showModal}
                selectedEvent={this.props.deaths.selectedEvent}
                selectedEventID={this.props.deaths.selectedEventID}
                handleToggle={this.props.handleToggle}
                slider={this.props.deaths.slider}
            />
        );
    }

}

//make new js file for both grids
class DGrid extends Component {

    handleToggle(id) {
        this.props.handleToggle(this.props.showModal, id)
    }

    render() {

        const columns = [
            {
                style: {textAlign: "center"},
                header: 'Data',
                accessor: 'general.date'
            }, {
                style: {textAlign: "center"},
                header: 'Rua',
                accessor: 'general.street'
            }, {
                style: {textAlign: "center"},
                header: 'Numero/KM',
                accessor: 'general.number'
            }, {
                style: {textAlign: "center"},
                header: 'Cruzamento com',
                accessor: 'general.cross'
            }, {
                style: {textAlign: "center"},
                header: 'Bairro',
                accessor: 'general.Neighborhood'
            }, {
                style: {textAlign: "center"},
                header: 'Referencia',
                accessor: 'general.Reference'
            }, {
                style: {textAlign: "center"},
                header: 'Análise',
                accessor: 'id',
                sortable: false,
                render: props => (
                    <Button icon="edit" primary id={props.value} onClick={() => this.handleToggle(props.value)}/>
                )
            }
        ];

        return (
            <div>
                <PageHeader>Ocorrencias fatais</PageHeader>
                <div className="content" id="content">
                    <ReactTable
                        previousText='Anterior'
                        nextText='Proximo'
                        loadingText='Carregando...'
                        pageText='Pagina'
                        noDataText='Opa! Algo deu errado!'
                        ofText='de'
                        rowsText='linhas'
                        data={this.props.data}
                        className="-striped"
                        loading={(this.props.loading === undefined)}
                        columns={columns}
                        defaultPageSize={5}
                    />
                    <div className="modal-container">
                        <Modal show={this.props.showModal}
                               container={this}
                               dialogClassName="custom-modal"
                               aria-labelledby="contained-modal-title"
                               onHide={() => this.handleToggle(this.props.selectedEventID)}>

                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">Análise do Óbito
                                    <small> Nº: {this.props.selectedEventID}</small>
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <DeathAnalysis
                                    selectedEvent={this.props.selectedEvent}
                                    options={this.props.options}
                                    slider={this.props.slider}
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

    /**
     * TODO NANI
     * */

    render() {
        let padding = {paddingLeft: '2px'};
        let padding5px = {paddingLeft: '5px'};

        let factorList = [
            {name: 'Velocidade', id: 1},
            {name: 'Alcool', id: 2},
            {name: 'Infraestrutura', id: 3},
            {name: 'Veiculo', id: 4},
            {name: 'Fadiga', id: 5},
            {name: 'Visibilidade', id: 6},
            {name: 'Drogas', id: 7},
            {name: 'Celulares', id: 8}
        ];
        let factors = factorList.map((item) => {
            return (
                <div key={item.id}>
                    <Factor value={this.props.slider} style={padding}
                            factor={item.name} responsible
                            onChange={(value) => this.props.slider = value}
                    />
                </div>
            )
        }, this);

        let causeList = [
            {name: 'Avanço de Sinal', id: 1},
            {name: 'Condutor sem habilitação', id: 2},
            {name: 'Transitar em local proibido', id: 3},
            {name: 'Transitar em local Improprio', id: 4},
            {name: 'Mudança de pista sem sinalização prévia', id: 5},
            {name: 'Distância mínima não respeitada', id: 6},
            {name: 'Converter / Cruzar sem dar preferência', id: 7},
            {name: 'Não dar preferência ao pedestre na faixa', id: 8},
            {name: 'Falta de Atenção', id: 9}
        ];
        let causes = causeList.map((item) => {
            return (
                <div key={item.id}>
                    <Factor value={this.props.slider} style={padding}
                            factor={item.name} responsible
                            onChange={(value) => this.props.slider = value}
                    />
                </div>
            )

        }, this);

        let Involved = this.props.selectedEvent.involved.map((involved) => {

            return (
                <Panel header={"Envolvido: " + involved.Name} eventKey={involved.id} key={involved.id} collapsible>
                    <Col xs={10} md={10} sm={10}>
                        <Row>
                            <Col sm={4}>
                                <Input value={involved.Name} type="text"
                                       id="involvedName" required="required"
                                       label="Nome"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'Name', involved.id - 1)}*/}
                            </ Col>
                            <Col sm={4}>
                                <Input value={involved.Age} type="number"
                                       id="involvedAge" required="required"
                                       label="Idade"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'Age', involved.id - 1)}*/}
                            </ Col>
                            <Col sm={4}>
                                <Select value={involved.Sex} id="involvedSex"
                                        name="involvedSex"
                                        options={this.props.options.involved.involvedSexes}
                                        label="Sexo"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'Sex', involved.id - 1)}*/}
                            </ Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <Input value={involved.Street} type="text"
                                       id="involvedStreet" required="required"
                                       label="Rua"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'Street', involved.id - 1)}*/}
                            </Col>
                            <Col sm={4}>
                                <Input value={involved.Number} type="text"
                                       id="involvedNumber" required="required"
                                       label="Numero"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'Number', involved.id - 1)}*/}
                            </Col>
                            <Col sm={4}>
                                <Input value={involved.Corner} type="text"
                                       id="involvedCorner" required="required"
                                       label="Esquina"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'Corner', involved.id - 1)}*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <Select value={involved.Neighborhood}
                                        id="involvedNeighborhood"
                                        name="involvedNeighborhood"
                                        options={this.props.options.involved.involvedNeighborhoods}
                                        label="Bairro"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'Neighborhood', involved.id - 1)}*/}
                            </Col>
                            <Col sm={4}>
                                <Input value={involved.Reference} type="text"
                                       id="involvedReference" required="required"
                                       label="Referência"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'Reference', involved.id - 1)}*/}
                            </Col>
                            <Col sm={4}>
                                <Input value={involved.Mom} type="text"
                                       id="involvedMom" required="required"
                                       label="Nome da mãe"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'Mom', involved.id - 1)}*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <Select value={involved.Situation}
                                        id="involvedSituation"
                                        name="involvedSituation"
                                        options={this.props.options.involved.involvedSituations}
                                        label="Situação"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'Situation', involved.id - 1)}*/}
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.VehicleType}
                                        id="involvedVehicleType"
                                        name="involvedVehicleType"
                                        options={this.props.options.involved.involvedVehicleTypes}
                                        label="Tipo de veiculo"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'VehicleType', involved.id - 1)}*/}
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.VehiclePosition}
                                        id="involvedVehiclePosition"
                                        name="involvedVehiclePosition"
                                        options={this.props.options.involved.involvedVehiclePositions}
                                        label="Posição no Veículo"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'VehiclePosition', involved.id - 1)}*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <Select value={involved.SecurityCondition}
                                        id="involvedSecurityCondition"
                                        name="involvedSecurityCondition"
                                        options={this.props.options.involved.involvedSecurityConditions}
                                        label="Condição de segurança"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'SecurityCondition', involved.id - 1)}*/}
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.InjuryLevel}
                                        id="involvedInjuryLevel"
                                        name="involvedInjuryLevel"
                                        options={this.props.options.involved.involvedInjuryLevels}
                                        label="Gravidade da lesão"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'InjuryLevel', involved.id - 1)}*/}
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.ProbableConduct}
                                        id="involvedProbableConduct"
                                        name="involvedProbableConduct"
                                        options={this.props.options.involved.involvedProbableConducts}
                                        label="Conduta provável"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'ProbableConduct', involved.id - 1)}*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <Input value={involved.Evolution} type="text"
                                       id="involvedEvolution" required="required"
                                       label="Evolução"/>
                                {/*onChange={this.saveNestedAlteration.bind(this, 'involved', 'Evolution', involved.id - 1)}*/}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2}>
                        {/*<Button icon='close' onClick={this.removeInvolved.bind(this, involved.id - 1)}>Remover</Button>*/}
                    </Col>
                </Panel>
            );
        }, this);

        return (
            <div className='clearfix'>
                <Grid>
                    <Form>
                        {/*general*/}
                        <Row className="firstRow">
                            <Panel>
                                <Col sm={6}>
                                    <Row className="form-group">
                                        <h4>Informações Gerais</h4>
                                        <Col sm={4} style={padding}>
                                            <Input type="date" name="deathDate"
                                                   id="date"
                                                   label="Data" readOnly
                                                   value={this.props.selectedEvent.general.date}
                                            />
                                        </Col>
                                        <Col sm={2} style={padding5px}>
                                            <Input type="time" name="deathTime"
                                                   id="deathTime"
                                                   label="Hora" readOnly
                                            />
                                        </Col>
                                        <Col sm={4} style={padding5px}>
                                            <Input type="text" name="accidentType"
                                                   id="accidentType"
                                                   label="Tipo do Acidente" readOnly
                                                   value={this.props.options.statisticData.accidentTypes[this.props.selectedEvent.statisticData.accidentType]['value']}
                                            />
                                        </Col>
                                        <Col sm={2} style={padding5px}>
                                            <Input type="text" name="severity"
                                                   id="severity"
                                                   label="Severidade" readOnly
                                                   value={this.props.options.statisticData.accidentClassifications[this.props.selectedEvent.statisticData.accidentClassification - 1]['value']}

                                            />
                                        </Col>
                                        <Col sm={8} style={padding}>
                                            <Input type="text" name="eventAddress1"
                                                   id="eventAddress1" placeholder="Endereço 1"
                                                   label="Local da Ocorrência" readOnly
                                                   value={this.props.selectedEvent.general.street}
                                            />
                                        </Col>
                                        <Col sm={4} style={padding}>
                                            <Input type="text" name="eventAddressNumber1"
                                                   id="eventAddressNumber1" placeholder="Numero"
                                                   label="Número" readOnly
                                                   value={this.props.selectedEvent.general.number}
                                            />
                                        </Col>
                                        <Col sm={12} style={padding}>
                                            <Input type="text" name="eventCross"
                                                   id="eventCross" placeholder="Cruzamento"
                                                   label="Cruzamento" readOnly
                                                   value={this.props.selectedEvent.general.cross}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                {/*Map*/}
                                <Col sm={6} style={{paddingLeft: '1%'}}>
                                    <Row className='mapRow'>
                                        <Map/>
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
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        deaths: state.death,
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
        handleToggle: (showModal, id) => {
            dispatch(DeathApi.handleDeathModal(showModal, id));
        }
    }
};

const DeathContainer = connect(mapStateToProps, mapDispatchToProps)(Death);

export default DeathContainer;