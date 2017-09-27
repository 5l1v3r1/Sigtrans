/**
 * Created by natal on 17/04/17.
 */

// import MetisMenu from "react-metismenu";
// import NavDrawer from "react-toolbox/lib/layout/NavDrawer";
// import RouterLink from "react-metismenu-router-link";
// import CustomSubmit from './CustomSubmit'
// import CustomInput from './CustomInput'
// import CustomSelect from './CustomSelect'
// import $ from 'jquery';
// import PubSub from 'pubsub-js';
// import ErrHandler from  './ErrHandler';
// import update from 'immutability-helper';
// import Navigation from "react-toolbox/lib/navigation/Navigation";
// import Link from "react-toolbox/lib/link/Link";
// import AppBar from "react-toolbox/lib/app_bar/AppBar";
// import Layout from "react-toolbox/lib/layout/Layout";
// import Panel from "react-toolbox/lib/layout/Panel";
// import FontIcon from "react-toolbox/lib/font_icon";
// import Sidebar from 'react-toolbox/lib/layout/Sidebar';
// import IconButton from 'react-toolbox/lib/button/IconButton';

import React, {Component} from "react";
import Button from 'react-toolbox/lib/button/Button';
import DeathApi from '../logics/DeathApi'
import {Col, Form, Grid, Modal, PageHeader, Row} from 'react-bootstrap';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import Slider from 'react-toolbox/lib/slider/Slider';

class Death extends Component {

    componentDidMount() {
        this.props.list(this.props.deaths.loading)
    }

    render() {
        return (
            <div>
                <DGrid
                    data={this.props.deaths.deathEvents}
                    loading={this.props.deaths.loading}
                    showModal={this.props.deaths.showModal}
                    selectedEvent={this.props.deaths.selectedEvent}
                    selectedEventID={this.props.deaths.selectedEventID}
                    handleToggle={this.props.handleToggle}
                    slider={this.props.deaths.slider}
                />
            </div>
        );
    }

}

//make new js file
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
                header: 'Editar',
                accessor: 'id',
                sortable: false,
                render: props => (
                    <Button icon="edit" primary id={props.value} onClick={() => this.handleToggle(props.value)}/>
                )
            }
        ];
        return (
            <div>
                <PageHeader>Obitos</PageHeader>
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
                                <Modal.Title id="contained-modal-title">Óbito
                                    <small> Nº: {this.props.selectedEventID}</small>
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <DeathAnalysis
                                    slider={this.props.slider}
                                />
                            </Modal.Body>

                            {/*<Modal.Footer>*/}
                            {/*/!*<Button onClick={this.handleToggle}>Close</Button>*!/*/}
                            {/*</Modal.Footer>*/}

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
        return (
            <div className='clearfix'>
                <Grid>
                    <Form>
                        <Col xs={12} md={12} sm={12}>
                            {/*general*/}
                            <Row>
                                <Col xs={6} md={6} sm={6}>
                                    <Row className="form-group">
                                        <Row>
                                            General Info
                                        </Row>
                                        <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                            <input type="text" placeholder="Info1" name="info1" disabled
                                                   ref={(input) => this.info1 = input}/>
                                        </Col>
                                        <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                            <input type="text" placeholder="Info2" name="info2" disabled
                                                   ref={(input) => this.info2 = input}/>
                                        </Col>
                                        <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                            <input type="text" placeholder="Info3" name="info3" disabled
                                                   ref={(input) => this.info3 = input}/>
                                        </Col>
                                        <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                            <input type="text" placeholder="Info4" name="info4" disabled
                                                   ref={(input) => this.info4 = input}/>
                                        </Col>
                                    </Row>
                                </Col>
                                {/*Map*/}
                                <Col xs={6} md={6} sm={6}
                                     style={{height: '400px', borderStyle: 'solid', borderWidth: '1px'}}>
                                    <div style={{
                                        position: 'relative',
                                        float: 'left',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}>
                                        MAP HERE
                                    </div>
                                </Col>
                            </Row>
                            {/*sliders*/}
                            <Row className="form-group">
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <p>Fator/Causa</p>
                                    <Slider pinned snaps min={0} max={10} step={2} editable value={this.slider}
                                            onChange={(value) => this.slider = value}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <p>Fator/Causa</p>
                                    <Slider pinned snaps min={0} max={10} step={2} editable value={this.slider}
                                            onChange={(value) => this.slider = value}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <p>Fator/Causa</p>
                                    <Slider pinned snaps min={0} max={10} step={2} editable value={this.slider}
                                            onChange={(value) => this.slider = value}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <p>Fator/Causa</p>
                                    <Slider pinned snaps min={0} max={10} step={2} editable value={this.slider}
                                            onChange={(value) => this.slider = value}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <p>Fator/Causa</p>
                                    <Slider pinned snaps min={0} max={10} step={2} editable value={this.slider}
                                            onChange={(value) => this.slider = value}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <p>Fator/Causa</p>
                                    <Slider pinned snaps min={0} max={10} step={2} editable value={this.slider}
                                            onChange={(value) => this.slider = value}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <p>Fator/Causa</p>
                                    <Slider pinned snaps min={0} max={10} step={2} editable value={this.slider}
                                            onChange={(value) => this.slider = value}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <p>Fator/Causa</p>
                                    <Slider pinned snaps min={0} max={10} step={2} editable value={this.slider}
                                            onChange={(value) => this.slider = value}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <p>Fator/Causa</p>
                                    <Slider pinned snaps min={0} max={10} step={2} editable value={this.slider}
                                            onChange={(value) => this.slider = value}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <p>Fator/Causa</p>
                                    <Slider pinned snaps min={0} max={10} step={2} editable value={this.slider}
                                            onChange={(value) => this.slider = value}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <p>Fator/Causa</p>
                                    <Slider pinned snaps min={0} max={10} step={2} editable value={this.slider}
                                            onChange={(value) => this.slider = value}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <p>Fator/Causa</p>
                                    <Slider pinned snaps min={0} max={10} step={2} editable value={this.slider}
                                            onChange={(value) => this.slider = value}/>
                                </Col>
                            </Row>
                            {/*victims*/}
                            <Row className="form-group">
                                <Row>
                                    Victims Info
                                </Row>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <input type="text" placeholder="Info1" name="vinfo1" disabled
                                           ref={(input) => this.vinfo1 = input}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <input type="text" placeholder="Info2" name="vinfo2" disabled
                                           ref={(input) => this.vinfo2 = input}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <input type="text" placeholder="Info3" name="vinfo3" disabled
                                           ref={(input) => this.vinfo3 = input}/>
                                </Col>
                                <Col md={4} style={{padding: '3px 3px 3px 3px'}}>
                                    <input type="text" placeholder="Info4" name="vinfo4" disabled
                                           ref={(input) => this.vinfo3 = input}/>
                                </Col>
                            </Row>
                        </Col>
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