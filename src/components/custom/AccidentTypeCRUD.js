/**
 * Created by natal on 17/04/17.
 */

import React, {Component} from "react";
import Input from './CustomInput';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Button from 'react-toolbox/lib/button/Button';
import {Col, Grid, PageHeader, Row} from 'react-bootstrap';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import HomeApi from "../../logics/HomeApi";
import matchSorter from "match-sorter";

//make new js file
class AccidentTypeCRUD extends Component {

    componentDidMount() {
        this.props.listTypes(false);
        // this.props.listDeathOptions();
    }

    buttonToggleModal(id) {
        this.props.handleToggleModal();
        this.props.selectAccidentType(id);
    }

    render() {
        // let counter = false;
        const columns = [
            {
                Header: 'ObjectID',
                id: 'ObjectID',
                accessor: d => d._id,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["ObjectID"]}),
                filterAll: true
            }, {
                Header: 'Valor',
                id: 'value',
                accessor: d => d.value,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["value"]}),
                filterAll: true
            }, {
                Header: 'Editar',
                id: 'edit',
                accessor: d=>d._id,
                filterable: false,
                Cell: props => (
                    <Button style={{color: 'black'}} icon="edit" primary id={props.original._id}
                            onClick={() => this.buttonToggleModal(props.original._id)}/>
                )
            }, {
                Header: 'Remover',
                id: 'remove',
                accessor: d=>d._id,
                filterable: false,
                Cell: props => (
                    <Button style={{color: 'red'}} icon="remove" primary id={props.original._id}
                            onClick={() => this.props.removeType(props.original._id)}/>
                )
            }
        ];
        const actions = [
            {label: "Fechar", onClick: this.props.handleToggleModal},
            // {label: "Salvar", onClick: this.props.handleToggleModal}
        ];
        return(
            <div className="content" id="content">
                <PageHeader>Tipo de Acidente - <small>CRUD</small></PageHeader>
                <Grid>
                    <Col md={4}>
                        <Row>
                            <h4>Adicionar tipo de acidente</h4>
                        </Row>
                        <Row>
                            <Col md={7}>
                                <Input value={this.props.accidentTypes.input}
                                       label="Valor" type="text" id="accidentTypeInput"
                                       onChange={(e)=>this.props.onChangeInput(e.target.value, 'input')}
                                />
                            </Col>
                            <Col md={3}>
                                <br/>
                                <Button style={{color: 'white', backgroundColor:"lightgreen"}} icon="add" raised
                                        onClick={() => this.props.addType(this.props.accidentTypes.input)}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={8}>
                        <ReactTable
                            previousText='Anterior' nextText='Proximo'
                            loadingText='Carregando...' pageText='Pagina'
                            noDataText='Sem dados correspondentes' ofText='de'
                            rowsText='linhas' className="-striped -highlight"
                            data={this.props.accidentTypes.accidentTypes} loading={(this.props.accidentTypes.loading === undefined)}
                            columns={columns} defaultPageSize={10} filterable
                            defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                            getTdProps={() => ({style: {textAlign: "center"}})}
                        />
                    </Col>
                </Grid>
                <Dialog active={this.props.accidentTypes.showModal === !(undefined)}
                        actions={actions} type='fullscreen'
                        className="custom-modal"
                        onEscKeyDown={this.props.handleToggleModal}
                        onOverlayClick={this.props.handleToggleModal}
                        title='Editar Tipo de Acidente'>
                    {
                        this.props.accidentTypes.selectedType?(
                            <Row>
                                <Col md={7}>
                                    <Input value={this.props.accidentTypes.selectedType.value}
                                           label="Valor" type="text" id="accidentTypeInput"
                                           onChange={(e)=>this.props.onChangeInput(e.target.value, 'selectedInput')}
                                    />
                                </Col>
                                <Col md={3}>
                                    <br/>
                                    <Button style={{color: 'white', backgroundColor:"lightgreen"}} label="Salvar" raised
                                            onClick={() => this.props.updateType(this.props.accidentTypes.selectedType._id, this.props.accidentTypes.selectedType.value)}/>
                                </Col>
                            </Row>
                        ):{}
                    }
                </Dialog>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        accidentTypes: state.home
    }
};

const mapDispatchToProps = dispatch => {

    return {
        listTypes: (loading) => {
            dispatch(HomeApi.listTypes(loading));
        },
        onChangeInput: (newValue, selectedInput) => {
            dispatch(HomeApi.onChangeInput(newValue, selectedInput));
        },
        addType: (value) => {
            dispatch(HomeApi.addType(value));
        },
        removeType: (id) => {
            dispatch(HomeApi.removeType(id));
        },
        handleToggleModal: () => {
            dispatch(HomeApi.handleModal());
        },
        selectAccidentType: (id) => {
            dispatch(HomeApi.selectAccidentType(id));
        },
        updateType:(id, value) => {
            dispatch(HomeApi.updateType(id, value));
        }
        /*listDeathOptions: () => {
            dispatch(DeathApi.listDeathsOpts());
        },
        handleToggleModal: (showModal, id) => {
            dispatch(DeathApi.handleDeathModal(showModal, id));
        },
        onChangeInput: (newValue, operator, subMenu) => {
            dispatch(DeathApi.onChangeInput(newValue, operator, subMenu));
        },*/
    }

};

const AccidentTypeCRUDContainer = connect(mapStateToProps, mapDispatchToProps)(AccidentTypeCRUD);

export default AccidentTypeCRUDContainer;
