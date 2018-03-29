import React, {Component} from "react";
import Input from './CustomInput';
import Button from 'react-toolbox/lib/button/Button';
import {Col, Grid, MenuItem, OverlayTrigger, PageHeader, Panel, Row, Tooltip} from 'react-bootstrap';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import FontIcon from "react-toolbox/lib/font_icon";
import CrudApi from "../../logics/CrudApi";
import matchSorter from "match-sorter";

class GenericCRUD extends Component {

    onSelect (type){
        this.props.onChangeInput(type.name, 'typeName');
        this.props.onChangeInput(type, 'type');
        this.props.listTypes();
    }

    render() {

        const tooltip = (
            <Tooltip id="tooltip">
                <strong>Clique para Editar!</strong>
            </Tooltip>
        );
        const typeList = [
            {
                id:'classificacaoAcidente',
                name:'Classificação do acidente',
                fields: [{
                    id:'nome',
                    name:'Classificação do acidente'
                }]
            },{
                id:'condicoesClimaticas',
                name:'Condições Climáticas',
                fields: [{
                    id:'nome',
                    name:'Condições Climáticas'
                }]
            },{
                id:'condicaoVia',
                name:'Condição da Via',
                fields: [{
                    id:'nome',
                    name:'Condição da Via'
                }]
            },{
                id:'sinalizacao',
                name:'Sinalização',
                fields: [{
                    id:'nome',
                    name:'Sinalização'
                }]
            },{
                id:'visibilidade',
                name:'Visibilidade',
                fields: [{
                    id:'nome',
                    name:'Visibilidade'
                }]
            },{
                id:'perfilPista',
                name:'Perfil da Pista',
                fields: [{
                    id:'nome',
                    name:'Perfil da Pista'
                }]
            },{
                id:'conservaçãoVia',
                name:'Conservação da via',
                fields: [{
                    id:'nome',
                    name:'Conservação da via'
                }]
            },{
                id:'sentidoVia',
                name:'Sentido da Via',
                fields: [{
                    id:'nome',
                    name:'Sentido da Via'
                }]
            },{
                id:' tipoAcidente',
                name:'Tipo de Acidente',
                fields: [{
                    id:'nome',
                    name:'Tipo de Acidente'
                }]

            },{
                id:'estado',
                name:'Estado',
                fields: [
                    {
                        id:'nome',
                        name:'Estado'
                    },
                    {
                        id:'sigla',
                        name:'Sigla'
                    }
                ]
            },{
                id:'municipio',
                name:'Municipio',
                fields: [
                    {
                        id:'nome',
                        name:'Municipio'
                    },
                    {
                        id:'estado',
                        name:'Estado'
                    }
                ]

            },{
                id:'bairro',
                name:'Bairro',
                fields: [
                    {
                        id:'nome',
                        name:'Bairro'
                    },
                    {
                        id:'municipio',
                        name:'Municipio'
                    }
                ]
            },{
                id:'rua',
                name:'Rua',
                fields: [
                    {
                        id:'nome',
                        name:'Rua'
                    },
                    {
                        id:'bairro',
                        name:'Bairro'
                    }
                ]
            },
        ];
        const typeMenuItems = typeList.map((type)=> {
            return (<MenuItem key={type.id} onSelect={(e) => this.onSelect(type, e)}>{type.name}</MenuItem>)
        });
        let columns = this.props.genericProps.type?this.props.genericProps.type.fields.map((field)=> {
            return (
                {
                    Header: field.name,
                    id: field.id,
                    accessor: d => d.id,
                    Cell: props => {
                        return (
                            <div>
                                <OverlayTrigger placement="right" overlay={tooltip}>
                                    <div
                                        style={{backgroundColor: "whitesmoke"}}
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={e => {
                                            if (this.props.genericProps['accidentTypes'][props.index][props.column.id] !== e.target.innerHTML)
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
                }
            )
        }):[];
        columns.push({
                Header: 'Remover',
                id: 'remove',
                accessor: d => d._id,
                filterable: false,
                Cell: props => (
                    <Button style={{color: 'red'}} icon="remove" primary id={props.original._id}
                            onClick={() => this.props.removeType(props.original._id)}/>
                )
        });

        return (
            <div className="content" id="content">
                <PageHeader>Alterar - <small>{this.props.genericProps.typeName}</small></PageHeader>
                <Grid fluid>
                    <Col>
                        <Row>
                            <Col>
                                <Panel header={<div><FontIcon className="md-18 md-dark" value='chevron_right'/>Selecione um Cadastro</div>}
                                       collapsible defaultExpanded
                                >
                                    <ul className="dropdown-menu2">
                                        {typeMenuItems}
                                    </ul>
                                </Panel>
                            </Col>
                        </Row>
                        <Row>
                            <br/>
                            {
                                this.props.genericProps.type? (
                                    <div>
                                    <Col md={8}>
                                        <ReactTable
                                            previousText='Anterior' nextText='Proximo'
                                            loadingText='Carregando...' pageText='Pagina'
                                            noDataText='Sem dados a exibir' ofText='de'
                                            rowsText='linhas' className="-highlight"
                                            data={this.props.genericProps['accidentTypes']}
                                            loading={this.props.genericProps.loading}
                                            columns={columns} defaultPageSize={10} filterable
                                            defaultFilterMethod={(filter, rows) => matchSorter(rows, filter.value, {keys: [filter.id]})}
                                            getTdProps={() => ({style: {textAlign: "center"}})}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Row>
                                            <h4>Adicionar {this.props.genericProps.type.name}</h4>
                                        </Row>
                                        <Row>
                                            <Col >
                                                <Input value={this.props.genericProps.input || ''}
                                                       label="Valor" type="text" id="accidentTypeInput"
                                                       onChange={(e) => this.props.onChangeInput(e.target.value, 'input')}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col mdOffset={7} md={3}>
                                                <Button style={{color: 'white', backgroundColor: "lightgreen"}}
                                                        icon="add" raised
                                                        onClick={() => this.props.addType(this.props.genericProps.input)}>Adicionar</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    </div>):<div/>
                            }
                        </Row>
                    </Col>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        genericProps: state.genericCrud
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listTypes: () => {
            dispatch(CrudApi.listTypes());
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
        updateType: (id, value) => {
            dispatch(CrudApi.updateType(id, value));
        }
    }
};

const GenericCRUDContainer = connect(mapStateToProps, mapDispatchToProps)(GenericCRUD);

export default GenericCRUDContainer;
