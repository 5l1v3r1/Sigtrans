/**
 * Created by natal on 17/04/17.
 */

import React, {Component} from "react";
import Button from 'react-toolbox/lib/button/Button';
import DeathApi from '../logics/DeathApi'
import {Col, Form, Grid, Modal, PageHeader, Row} from 'react-bootstrap';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import Input from "./CustomInput";
// import Slider from 'react-toolbox/lib/slider/Slider';
import Map from "./Map";
import Fator from "./Factor"

class Death extends Component {

    componentDidMount() {
        this.props.list(this.props.deaths.loading)
    }

    render() {
        return (
            <DGrid
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
                                    event={this.props.selectedEvent}
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
    render() {
        let padding = {padding: '2px 2px 2px 2px'};
        return (
            <div className='clearfix'>
                <Grid>
                    <Form>
                        {/*<Col xs={12} md={12} sm={12}>*/}
                            {/*general*/}
                        <Row className="firstRow">
                                <Col xs={6} md={6} sm={6}>
                                    <Row className="form-group">
                                        <Row>
                                            <h4>Informações Gerais</h4>
                                        </Row>
                                        <Col md={4} sm={2} xs={2} style={padding}>
                                            <Input type="date" name="deathDate"
                                                   id="date"
                                                   label="Data" disabled
                                                   ref={(input) => this.date = input}
                                            />
                                        </Col>
                                        <Col md={8} sm={6} xs={6} style={padding}>
                                            <Input type="text" name="eventAddress"
                                                   id="eventAddress" placeholder="Local da Ocorrência"
                                                   label="Local da Ocorrência" disabled
                                                   ref={(input) => this.eventAddress = input}
                                            />
                                        </Col>
                                        <Col md={2} sm={2} xs={2} style={padding}>
                                            <Input type="time" name="deathTime"
                                                   id="deathTime"
                                                   label="Hora" disabled
                                                   ref={(input) => this.deathTime = input}
                                            />
                                        </Col>
                                        <Col md={4} sm={2} xs={2} style={padding}>
                                            <Input type="text" name="accidentType"
                                                   id="accidentType"
                                                   label="Tipo do Acidente" disabled
                                                   ref={(input) => this.accidentType = input}
                                            />
                                        </Col>
                                        <Col md={4} sm={2} xs={2} style={padding}>
                                            <Input type="text" name="severity"
                                                   id="severity"
                                                   label="Severidade" disabled
                                                   ref={(input) => this.severity = input}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                {/*Map*/}
                            <Col xs={6} md={6} sm={6}>
                                <Row className='mapRow'>
                                    <Map/>
                                    </Row>
                                </Col>
                            </Row>

                        {/*sliders*/}
                            <Row className="form-group">
                                <Fator value={this.slider} style={padding}
                                       factor="Fator"
                                       onChange={(value) => this.slider = value}
                                />
                                <Fator value={this.props.slider} style={padding}
                                       factor="Fator"
                                       onChange={(value) => this.slider = value}
                                />
                                <Fator value={this.props.slider} style={padding}
                                       factor="Fator"
                                       onChange={(value) => this.slider = value}
                                />
                                <Fator value={this.props.slider} style={padding}
                                       factor="Fator"
                                       onChange={(value) => this.slider = value}
                                />
                                <Fator value={this.props.slider} style={padding}
                                       factor="Fator"
                                       onChange={(value) => this.slider = value}
                                />
                                <Fator value={this.props.slider} style={padding}
                                       factor="Fator"
                                       onChange={(value) => this.slider = value}
                                />
                            </Row>
                            {/*victims*/}
                            <Row className="form-group">
                                <Row>
                                    Victims Info
                                </Row>
                                <Col md={4} style={padding}>
                                    <input type="text" placeholder="Info1" name="vinfo1" disabled
                                           ref={(input) => this.vinfo1 = input}/>
                                </Col>
                                <Col md={4} style={padding}>
                                    <input type="text" placeholder="Info2" name="vinfo2" disabled
                                           ref={(input) => this.vinfo2 = input}/>
                                </Col>
                                <Col md={4} style={padding}>
                                    <input type="text" placeholder="Info3" name="vinfo3" disabled
                                           ref={(input) => this.vinfo3 = input}/>
                                </Col>
                                <Col md={4} style={padding}>
                                    <input type="text" placeholder="Info4" name="vinfo4" disabled
                                           ref={(input) => this.vinfo3 = input}/>
                                </Col>
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
        list: (loading) => {
            dispatch(DeathApi.listDeaths(loading));
        },
        handleToggle: (showModal, id) => {
            dispatch(DeathApi.handleDeathModal(showModal, id));
        }
    }
};

const DeathContainer = connect(mapStateToProps, mapDispatchToProps)(Death);

export default DeathContainer;