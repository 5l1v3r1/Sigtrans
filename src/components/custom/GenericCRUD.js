/**
 * Created by natal on 17/04/17.
 */

import React, {Component} from "react";
import Input from './CustomInput';
import Button from 'react-toolbox/lib/button/Button';
import {Col, Grid, OverlayTrigger, PageHeader, Row, Tooltip} from 'react-bootstrap';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import CrudApi from "../../logics/CrudApi";
import matchSorter from "match-sorter";

//make new js file
class GenericCRUD extends Component {

    componentDidMount() {
        this.props.listTypes(false);
    }

    // buttonToggleModal(id) {
    //     this.props.handleToggleModal();
    //     this.props.selectAccidentType(id);
    // }

    render() {
        const tooltip = (
            <Tooltip id="tooltip">
                <strong>Clique para Editar!</strong>
            </Tooltip>
        );
        const columns = [
            {
                Header: 'Valor',
                id: 'value',
                accessor: d => d.value,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["value"]}),
                Cell: props => {
                    return (
                        <div>
                            <OverlayTrigger placement="right" overlay={tooltip}>
                                <div
                                    style={{ backgroundColor: "whitesmoke" }}
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={e => {
                                        if(this.props.genericProps['accidentTypes'][props.index][props.column.id]!==e.target.innerHTML)
                                            this.props.updateType(props.original._id, e.target.innerHTML);
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: this.props.genericProps['accidentTypes'][props.index][props.column.id]
                                    }}
                                />
                            </OverlayTrigger>
                        </div>
                    )
                },
                filterAll: true
            },
            {
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

        return(
            <div className="content" id="content">
                <PageHeader>Tipo de Acidente <small>CRUD</small></PageHeader>
                <Grid>
                    <Col md={4}>
                        <Row>
                            <h4>Adicionar tipo de acidente</h4>
                        </Row>
                        <Row>
                            <Col md={7}>
                                <Input value={this.props.genericProps.input||''}
                                       label="Valor" type="text" id="accidentTypeInput"
                                       onChange={(e)=>this.props.onChangeInput(e.target.value, 'input')}
                                />
                            </Col>
                            <Col md={3}>
                                <br/>
                                <Button style={{color: 'white', backgroundColor:"lightgreen"}} icon="add" raised
                                        onClick={() => this.props.addType(this.props.genericProps.input)}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={8}>
                        <ReactTable
                            previousText='Anterior' nextText='Proximo'
                            loadingText='Carregando...' pageText='Pagina'
                            noDataText='Sem dados correspondentes' ofText='de'
                            rowsText='linhas' className="-highlight"
                            data={this.props.genericProps['accidentTypes']} loading={(this.props.genericProps.loading === undefined)}
                            columns={columns} defaultPageSize={10} filterable
                            defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                            getTdProps={() => ({style: {textAlign: "center"}})}
                        />
                    </Col>
                </Grid>
            </div>
        )
    }
    // <Dialog active={this.props.genericProps.showModal === !(undefined)}
    // actions={actions} type='small'
    // className="custom-modal"
    // onEscKeyDown={this.props.handleToggleModal}
    // onOverlayClick={this.props.handleToggleModal}
    // title='Editar Tipo de Acidente'>
    // {
    //     this.props.genericProps.selectedType?(
    //         <Row>
    //             <Col md={7}>
    //                 <Input placeholder={this.props.genericProps.selectedType.value}
    //                        value={this.props.genericProps.updateTypeInput||''}
    //                        label="Valor" type="text" id="updateTypeInput"
    //                        onChange={(e)=>this.props.onChangeInput(e.target.value, 'updateTypeInput')}
    //                 />
    //             </Col>
    //         </Row>
    //     ):<div/>
    // }
    // </Dialog>
}

const mapStateToProps = state => {
    return {
        genericProps: state.home
    }
};

const mapDispatchToProps = dispatch => {

    return {
        listTypes: (loading) => {
            dispatch(CrudApi.listTypes(loading));
        },
        onChangeInput: (newValue, selectedInput) => {
            dispatch(CrudApi.onChangeInput(newValue, selectedInput));
        },
        addType: (value) => {
            dispatch(CrudApi.addType(value));
        },
        removeType: (id) => {
            dispatch(CrudApi.removeType(id));
        },
        handleToggleModal: () => {
            dispatch(CrudApi.handleModal());
        },
        selectAccidentType: (id) => {
            dispatch(CrudApi.selectAccidentType(id));
        },
        updateType:(id, value) => {
            dispatch(CrudApi.updateType(id, value));
        }
    }

};

const GenericCRUDContainer = connect(mapStateToProps, mapDispatchToProps)(GenericCRUD);

export default GenericCRUDContainer;
