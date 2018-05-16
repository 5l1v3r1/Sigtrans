import React, {Component} from "react";
import Input from './CustomInput';
import Button from 'react-toolbox/lib/button/Button';
import {
    Button as Submit,
    Col,
    Grid,
    MenuItem,
    Navbar,
    NavDropdown,
    OverlayTrigger,
    Row,
    Tooltip
} from 'react-bootstrap';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import CrudApi from '../../logics/CrudApi';
import matchSorter from 'match-sorter';
import Nav from "react-bootstrap/es/Nav";
import {Typeahead} from 'react-bootstrap-typeahead';
import EventsApi from "../../logics/EventsApi";

class GenericCRUD extends Component {

    componentWillMount() {
        if(!this.props.events.options)
            this.props.loadOptions();
        console.log(this.props.events.options)
    }

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
        const listaCadastros = {
            dadosGerais:[
                {
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
                },
            ],
            dadosEstatisticos:[
                {
                    id: 'classificacaoacidente',
                    name: 'Classificação do acidente',
                    fields: [{
                        id: 'nome',
                        name: 'Classificação do acidente'
                    }]
                },{
                    id: 'acidentetrabalho',
                    name: 'Acidente de Trabalho',
                    fields: [
                        {
                            id: 'nome',
                            name: 'Acidente'
                        }
                    ]
                }
            ],
            vias:[
                {
                    id: 'semaforo',
                    name: 'Semáforo',
                    fields: [
                        {
                            id: 'nome',
                            name: 'Semaforo'
                        }
                    ]
                }, {
                    id: 'perfilpista',
                    name: 'Perfil da Pista',
                    fields: [{
                        id: 'nome',
                        name: 'Perfil da Pista'
                    }]
                },{
                    id: 'superficie',
                    name: 'Superficie',
                    fields: [
                        {
                            id: 'nome',
                            name: 'Superficie'
                        }
                    ]
                },{
                    id: 'condicoesclimaticas',
                    name: 'Condições Climáticas',
                    fields: [{
                        id: 'nome',
                        name: 'Condições Climáticas'
                    }]
                },{
                    id: 'equipamentocontroletrafego',
                    name: 'Equipamento de Controle de Tráfego',
                    fields: [
                        {
                            id: 'nome',
                            name: 'Equipamento'
                        }
                    ]
                }, {
                    id: 'separacaopista',
                    name: 'Separação da Pista',
                    fields: [
                        {
                            id: 'nome',
                            name: 'Tipo'
                        }
                    ]
                },{
                    id: 'visibilidade',
                    name: 'Visibilidade',
                    fields: [{
                        id: 'nome',
                        name: 'Visibilidade'
                    }]
                }, {
                    id: 'condicaotecnica',
                    name: 'Condições Técnicas',
                    fields: [{
                        id: 'nome',
                        name: 'Condição Técnica'
                    }]
                }, {
                    id: 'acostamento',
                    name: 'Acostamento',
                    fields: [
                        {
                            id: 'nome',
                            name: 'Acostamento'
                        }
                    ]
                }, {
                    id: 'sinalizacao',
                    name: 'Sinalização',
                    fields: [{
                        id: 'nome',
                        name: 'Sinalização'
                    }]
                },{
                    id: 'sentidovia',
                    name: 'Sentido da Via',
                    fields: [{
                        id: 'nome',
                        name: 'Sentido da Via'
                    }]
                },{
                    id: 'conservacaovia',
                    name: 'Conservação da via',
                    fields: [{
                        id: 'nome',
                        name: 'Conservação da via'
                    }]
                },{
                    id: 'tipovia',
                    name: 'Tipo da Via',
                    fields: [
                        {
                            id: 'nome',
                            name: 'Tipo'
                        }
                    ]
                },{
                    id: 'pavimentacao',
                    name: 'Pavimentação',
                    fields: [
                        {
                            id: 'nome',
                            name: 'Pavimentação'
                        }
                    ]
                },{
                    id: 'sinaispneus',
                    name: 'Sinais de Pneus na Pista',
                    fields: [
                        {
                            id: 'nome',
                            name: 'Sinal'
                        }
                    ]
                },{
                    id: 'tipoacidente',
                    name: 'Tipo de Acidente',
                    fields: [{
                        id: 'nome',
                        name: 'Tipo de Acidente'
                    }]

                }
            ],
            veiculo:[
                {
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
                },
            ],
            envolvido:[
                {
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
                    id:'grauinstrucao',
                    name:'Grau de Instrucao',
                    fields:[
                        {
                            id:'nome',
                            name:"Grau"
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
                },{
                    id: 'profissao',
                    name: 'Profissão',
                    fields: [
                        {
                            id: 'nome',
                            name: 'Profissão'
                        }
                    ]
                }
            ],
            parceiro:[{
                id: 'parceiro',
                name: 'Parceiro',
                fields: [
                    {
                        id: 'nome',
                        name: 'Parceiro'
                    },{
                        id: 'estado',
                        name: 'Estado',
                        options:true
                    },{
                        id: 'municipio',
                        name: 'Municipio',
                        options:true
                    },{
                        id: 'nomeContato',
                        name: 'Contato'
                    },{
                        id: 'telefone',
                        name: 'Telefone'
                    },{
                        id: 'email',
                        name: 'Email'
                    }
                ]
            }]
        };
        let menuItems={};
        Object.keys(listaCadastros).forEach((prop, i)=> {
            listaCadastros[prop].forEach((type, k)=>{
                if(!menuItems[prop])
                    menuItems[prop]=[];
                menuItems[prop].push(
                    <MenuItem eventKey={i+"."+k} key={type.id} onSelect={(e) => this.onSelect(type, e)}>{type.name}</MenuItem>
                )
            })
        });
        // console.log(menuItems);
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
                        {
                            this.props.genericProps.type.options?
                                <Input value={field.id === 'nome' ? this.props.genericProps.form[field.id] || '' : this.props.genericProps.form[field.id] ? this.props.genericProps.form[field.id]['nome'] : ''}
                                       label={field.name} type="text" id={field.id}
                                       onChange={(e) => this.props.onChangeFormInput(e.target.value, field.id)}
                                /> :
                                <Typeahead labelKey={option => `${option.nome}`} id={field.id}
                                           onChange={(e)=>this.handleTypeahead(e, field.id)}
                                           options={this.props.eventProps.options[field.id]}
                                />
                        }

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
                {/*<PageHeader>Cadastro {this.props.genericProps.type ? (*/}
                    {/*<small>- {this.props.genericProps.type.name}</small>) : ''}</PageHeader>*/}
                <Grid fluid style={{minHeight:"80vh"}}>
                    <Col>
                        <Row>
                            <Col md={12}>
                                <Navbar fluid>
                                    <Navbar.Header>
                                        <Navbar.Brand>
                                            <a href="#Cadastro">Cadastros</a>
                                        </Navbar.Brand>
                                    </Navbar.Header>
                                    <Nav>
                                        <NavDropdown eventKey={1} title="Dados Gerais" id="basic-nav-dropdown" style={{overflow:1}}>
                                            {menuItems.dadosGerais}
                                        </NavDropdown>
                                        <NavDropdown eventKey={2} title="Dados Estatisticos" id="basic-nav-dropdown" style={{overflow:1}}>
                                            {menuItems.dadosEstatisticos}
                                        </NavDropdown>
                                        <NavDropdown eventKey={3} title="Vias" id="basic-nav-dropdown" style={{overflow:1}}>
                                            {menuItems.vias}
                                        </NavDropdown>
                                        <NavDropdown eventKey={4} title="Veiculos" id="basic-nav-dropdown" style={{overflow:1}}>
                                            {menuItems.veiculo}
                                        </NavDropdown>
                                        <NavDropdown eventKey={5} title="Envolvidos" id="basic-nav-dropdown" style={{overflow:1}}>
                                            {menuItems.envolvido}
                                        </NavDropdown>
                                        {menuItems.parceiro}
                                    </Nav>
                                </Navbar>
                            </Col>
                        </Row>
                        <Row>
                            <br/>
                            <Col md={12}>
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
                                                    <Submit bsStyle="primary" type="submit" onClick={(e) => this.add(e)}>
                                                        Adicionar
                                                    </Submit>
                                                </Col>
                                            </Row>
                                        </Col>
                                        </form>
                                    </div>) : <div style={{textAlign:'center'}}><h4>Selecione um cadastro</h4></div>
                            }
                            </Col>
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
        genericProps: state.genericCrud,
        events: state.events
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
        },
        loadOptions:() => {
            dispatch(EventsApi.listEventsOpts());
        }
    }
};

const GenericCRUDContainer = connect(mapStateToProps, mapDispatchToProps)(GenericCRUD);

export default GenericCRUDContainer;
