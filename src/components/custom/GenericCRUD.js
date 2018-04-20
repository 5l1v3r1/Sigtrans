import React, {Component} from "react";
import Input from './CustomInput';
import Button from 'react-toolbox/lib/button/Button';
import {Button as Submit, Col, Grid, MenuItem, OverlayTrigger, PageHeader, Panel, Row, Tooltip} from 'react-bootstrap';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import FontIcon from "react-toolbox/lib/font_icon";
import CrudApi from '../../logics/CrudApi';
import matchSorter from 'match-sorter';

class GenericCRUD extends Component {

    onSelect(selectedType) {
        if (this.props.genericProps.type !== undefined) {
            this.props.onChangeInput(undefined, this.props.genericProps[this.props.genericProps.type.id]);
        }
        this.props.onChangeInput({}, 'form');
        this.props.onChangeInput(selectedType, 'type');
        this.props.listTypes(selectedType.id, this.props.genericProps.pageSize || 10, this.props.genericProps.page || 0);
    }

    fetchData(state, instance) {
        this.props.listTypes(this.props.genericProps.type.id, state.pageSize, state.page);
    }

    add(e){
        e.preventDefault();
        this.props.addType(this.props.genericProps.form, this.props.genericProps.type.id, this.props.genericProps.pageSize, this.props.genericProps.page)
    }

    render() {
        const typeList = [
            {
                id: 'classificacaoacidente',
                name: 'Classificação do acidente',
                fields: [{
                    id: 'nome',
                    name: 'Classificação do acidente'
                }]
            }, {
                id: 'condicoesclimaticas',
                name: 'Condições Climáticas',
                fields: [{
                    id: 'nome',
                    name: 'Condições Climáticas'
                }]
            }, {
                id: 'condicaovia',
                name: 'Condição da Via',
                fields: [{
                    id: 'nome',
                    name: 'Condição da Via'
                }]
            }, {
                id: 'sinalizacao',
                name: 'Sinalização',
                fields: [{
                    id: 'nome',
                    name: 'Sinalização'
                }]
            }, {
                id: 'visibilidade',
                name: 'Visibilidade',
                fields: [{
                    id: 'nome',
                    name: 'Visibilidade'
                }]
            }, {
                id: 'perfilpista',
                name: 'Perfil da Pista',
                fields: [{
                    id: 'nome',
                    name: 'Perfil da Pista'
                }]
            }, {
                id: 'conservacaovia',
                name: 'Conservação da via',
                fields: [{
                    id: 'nome',
                    name: 'Conservação da via'
                }]
            }, {
                id: 'sentidovia',
                name: 'Sentido da Via',
                fields: [{
                    id: 'nome',
                    name: 'Sentido da Via'
                }]
            }, {
                id: 'tipoacidente',
                name: 'Tipo de Acidente',
                fields: [{
                    id: 'nome',
                    name: 'Tipo de Acidente'
                }]

            }, {
                id: 'estado',
                name: 'Estado',
                fields: [
                    {
                        id: 'idParceiro',
                        name: 'ID Parceiro'
                    },{
                        id: 'nome',
                        name: 'Estado'
                    },{
                        id: 'sigla',
                        name: 'Sigla'
                    }
                ]
            }, {
                id: 'municipio',
                name: 'Municipio',
                fields: [
                    {
                        id: 'nome',
                        name: 'Municipio'
                    },
                    {
                        id: 'estado',
                        name: 'Estado'
                    }
                ]

            }, {
                id: 'bairro',
                name: 'Bairro',
                fields: [
                    {
                        id: 'nome',
                        name: 'Bairro'
                    },
                    {
                        id: 'municipio',
                        name: 'Municipio'
                    }
                ]
            }, {
                id: 'rua',
                name: 'Rua',
                fields: [
                    {
                        id: 'nome',
                        name: 'Rua'
                    },
                    {
                        id: 'bairro',
                        name: 'Bairro'
                    }
                ]
            }, {
                id: 'marcaveiculo',
                name: 'Marca do Veículo',
                fields: [
                    {
                        id: 'nome',
                        name: 'Marca'
                    }
                ]
            }, {
                id: 'modeloveiculo',
                name: 'Modelo do Veículo',
                fields: [
                    {
                        id: 'nome',
                        name: 'Modelo'
                    }
                ]
            }, {
                id: 'categoriaveiculo',
                name: 'Categoria do Veículo',
                fields: [
                    {
                        id: 'nome',
                        name: 'Categoria'
                    }
                ]
            }, {
                id: 'posicaoveiculo',
                name: 'Posição no Veículo',
                fields: [
                    {
                        id: 'nome',
                        name: 'Posição'
                    }
                ]
            }, {
                id: 'condicaoseguranca',
                name: 'Condição de segurança',
                fields: [
                    {
                        id: 'nome',
                        name: 'Condição'
                    }
                ]
            }, {
                id: 'lesoes',
                name: 'Lesões',
                fields: [
                    {
                        id: 'nome',
                        name: 'Lesão'
                    }
                ]
            }, {
                id: 'localencaminhado',
                name: 'Local de encaminhamento',
                fields: [
                    {
                        id: 'nome',
                        name: 'Local'
                    }
                ]
            }
        ].sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));

        const typeMenuItems = typeList.map((type) => {
            return (<MenuItem key={type.id} onSelect={(e) => this.onSelect(type, e)}>{type.name}</MenuItem>)
        });

        let columns = this.props.genericProps.type ? this.props.genericProps.type.fields.map((field) => {
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
                                            if (this.props.genericProps[this.props.genericProps.type.id][props.index][props.column.id] !== e.target.innerHTML) {
                                                this.props.updateType(
                                                    props.original.id,
                                                    e.target.innerHTML,
                                                    this.props.genericProps[this.props.genericProps.type.id][props.index],
                                                    props.column.id,
                                                    this.props.genericProps.type.id, this.props.genericProps.pageSize,
                                                    this.props.genericProps.page);
                                            }
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: this.props.genericProps[this.props.genericProps.type.id][props.index][props.column.id]
                                        }}
                                    />
                                </OverlayTrigger>
                            </div>
                        )
                    },
                }
            )
        }) : [];

        columns.push({
            Header: 'Remover',
            id: 'remove',
            accessor: d => d.id,
            filterable: false,
            Cell: props => (
                <Button style={{color: 'red'}} icon="remove" primary id={props.original.id}
                        onClick={() => this.props.removeType(props.original.id, this.props.genericProps.type.id, this.props.genericProps.pageSize, this.props.genericProps.page)}/>
            )
        });

        const form = this.props.genericProps.type ? this.props.genericProps.type.fields.map(field => {
            return (
                <Row key={field.id}>
                    <Col>
                        <Input
                            value={field.id === 'nome' ? this.props.genericProps.form[field.id] || '' : this.props.genericProps.form[field.id] ? this.props.genericProps.form[field.id]['nome'] : ''}
                            label={field.name} type="text" id={field.id}
                            onChange={(e) => this.props.onChangeFormInput(e.target.value, field.id)}
                        />
                    </Col>
                </Row>
            );
        }) : [];

        const tooltip = (
            <Tooltip id="tooltip">
                <strong>Clique para Editar!</strong>
            </Tooltip>
        );

        return (
            <div className="content" id="content">
                <PageHeader>Cadastro {this.props.genericProps.type ? (
                    <small>- {this.props.genericProps.type.name}</small>) : ''}</PageHeader>
                <Grid fluid>
                    <Col>
                        <Row>
                            <Col>
                                <Panel collapsible defaultExpanded
                                       header={
                                           <div>
                                               <FontIcon className="md-18 md-dark" value='chevron_right'/>
                                               Selecione um Cadastro
                                           </div>
                                       }

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
                                this.props.genericProps.type ? (
                                    <div style={{flex: '1'}}>
                                        <form>
                                        <Col md={8}>
                                            <ReactTable
                                                previousText='Anterior' nextText='Proximo' manual
                                                loadingText='Carregando...' pageText='Pagina'
                                                noDataText='Sem dados a exibir' ofText='de'
                                                rowsText='linhas' className="-highlight"
                                                data={this.props.genericProps[this.props.genericProps.type.id] || []}
                                                loading={this.props.genericProps.loading}
                                                pages={this.props.genericProps.pages}
                                                onFetchData={this.fetchData.bind(this)}
                                                columns={columns} defaultPageSize={10} filterable
                                                defaultFilterMethod={(filter, rows) => matchSorter(rows, filter.value, {keys: [filter.id]})}
                                                getTdProps={() => ({style: {textAlign: "center"}})}
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <Row>
                                                <h4>Adicionar {this.props.genericProps.type.name}</h4>
                                            </Row>
                                            {form}
                                            <Row className="pull-right">
                                                <Col xs={3}>
                                                    <Submit bsStyle="primary" type="submit"
                                                            onClick={(e) => this.add(e)}
                                                    >
                                                        Adicionar
                                                    </Submit>
                                                </Col>
                                            </Row>
                                        </Col>
                                        </form>
                                </div>) : <div/>
                            }

                        </Row>
                    </Col>
                    <br/>
                    {/*<pre>*/}
                        {/*{JSON.stringify(this.props.genericProps, null, 4)}*/}
                    {/*</pre>*/}
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
        listTypes: (selectedType, pageSize, page) => {
            dispatch(CrudApi.listTypes(selectedType, pageSize, page));
        },
        onChangeInput: (newValue, selectedInput) => {
            dispatch(CrudApi.onChangeInput(newValue, selectedInput));
        },
        onChangeFormInput: (value, selectedInput) => {
            dispatch(CrudApi.onChangeCrudFormInput(value, selectedInput));
        },
        addType: (form, selectedType, pageSize, page) => {
            dispatch(CrudApi.addType(form, selectedType, pageSize, page));
        },
        removeType: (id, selectedType, pageSize, page) => {
            dispatch(CrudApi.removeType(id, selectedType, pageSize, page));
        },
        handleToggleModal: () => {
            dispatch(CrudApi.handleModal());
        },
        updateType: (id, value, objToChange, propToChange, selectedType, pageSize, page) => {
            dispatch(CrudApi.updateType(id, value, objToChange, propToChange, selectedType, pageSize, page));
        }
    }
};

const GenericCRUDContainer = connect(mapStateToProps, mapDispatchToProps)(GenericCRUD);

export default GenericCRUDContainer;
