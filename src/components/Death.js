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
// import Slider from 'react-toolbox/lib/slider/Slider';
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
import {Modal, PageHeader} from 'react-bootstrap';
import ReactTable from 'react-table';
import {connect} from 'react-redux';

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
                                {/*<pre>{JSON.stringify(this.props.selectedEvent, undefined, 4)}</pre>*/}
                                <DForm/>
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
class DForm extends Component {
    render() {
        return (
            <div>
                vai toma no cu
            </div>
        )
    }
}

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
                />
            </div>
        );
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