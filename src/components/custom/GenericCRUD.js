import React, {Component} from 'react';
import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import {
  Button as Submit,
  Col,
  ControlLabel,
  Form,
  Grid,
  MenuItem,
  Navbar,
  NavDropdown,
  NavItem,
  Row,
} from 'react-bootstrap';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import matchSorter from 'match-sorter';
import Nav from 'react-bootstrap/es/Nav';
import {Typeahead} from 'react-bootstrap-typeahead';
import CrudApi from '../../logics/CrudApi';
import Input from './CustomInput';
import EventsApi from '../../logics/EventsApi';

const today = new Date();

class GenericCRUD extends Component {
  componentDidMount() {
    if (!this.props.events.options) this.props.loadOptions();
  }

  handleTypeahead(e, input) {
    this.props.onChangeFormInput(e[0] ? e[0].id : '', input, true);
  }

  updateType() {
    this.props.updateType(this.props.genericProps.selected.id, this.props.genericProps.form, this.props.genericProps.type.id, this.props.genericProps.pageSize, this.props.genericProps.page);
    this.props.handleToggleModal();
    this.props.loadOptions();
  }

  handleEdit(selected) {
    this.props.onChangeInput(selected, 'selected');
    this.props.handleToggleModal();
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

  add(e) {
    e.preventDefault();
    this.props.addType(this.props.genericProps.form, this.props.genericProps.type.id, this.props.genericProps.pageSize, this.props.genericProps.page);
    this.props.loadOptions();
  }

  render() {
    const { genericProps, events } = this.props;
    const listaCadastros = {
      dadosGerais: [
        {
          id: 'estado',
          name: 'Estado',
          fields: [
            {
              id: 'idParceiro',
              name: 'ID Parceiro',
            }, {
              id: 'nome',
              name: 'Estado',
            }, {
              id: 'sigla',
              name: 'Sigla',
            },
          ],
        }, {
          id: 'municipio',
          name: 'Municipio',
          fields: [
            {
              id: 'idParceiro',
              name: 'ID Parceiro',
            },
            {
              id: 'nome',
              name: 'Municipio',
            },
            {
              id: 'estado',
              name: 'Estado',
              options: true,
            },
          ],

        }, {
          id: 'bairro',
          name: 'Bairro',
          fields: [
            {
              id: 'nome',
              name: 'Bairro',
            },
            {
              id: 'municipio',
              name: 'Municipio',
              options: true,
            },
          ],
        }, {
          id: 'rua',
          name: 'Rua',
          fields: [
            {
              id: 'nome',
              name: 'Rua',
            },
            {
              id: 'municipio',
              name: 'Municipio',
              options: true,
            },
          ],
        },
      ],
      dadosEstatisticos: [
        {
          id: 'classificacaoacidente',
          name: 'Classificação do acidente',
          fields: [{
            id: 'nome',
            name: 'Classificação do acidente',
          }],
        }, {
          id: 'acidentetrabalho',
          name: 'Acidente de Trabalho',
          fields: [
            {
              id: 'nome',
              name: 'Acidente',
            },
          ],
        },
      ],
      vias: [
        {
          id: 'semaforo',
          name: 'Semáforo',
          fields: [
            {
              id: 'nome',
              name: 'Semaforo',
            },
          ],
        }, {
          id: 'perfilpista',
          name: 'Perfil da Pista',
          fields: [{
            id: 'nome',
            name: 'Perfil da Pista',
          }],
        }, {
          id: 'superficie',
          name: 'Superficie',
          fields: [
            {
              id: 'nome',
              name: 'Superficie',
            },
          ],
        }, {
          id: 'condicoesclimaticas',
          name: 'Condições Climáticas',
          fields: [{
            id: 'nome',
            name: 'Condições Climáticas',
          }],
        }, {
          id: 'equipamentocontroletrafego',
          name: 'Equipamento de Controle de Tráfego',
          fields: [
            {
              id: 'nome',
              name: 'Equipamento',
            },
          ],
        }, {
          id: 'separacaopista',
          name: 'Separação da Pista',
          fields: [
            {
              id: 'nome',
              name: 'Tipo',
            },
          ],
        }, {
          id: 'visibilidade',
          name: 'Visibilidade',
          fields: [{
            id: 'nome',
            name: 'Visibilidade',
          }],
        }, {
          id: 'condicaotecnica',
          name: 'Condições Técnicas',
          fields: [{
            id: 'nome',
            name: 'Condição Técnica',
          }],
        }, {
          id: 'acostamento',
          name: 'Acostamento',
          fields: [
            {
              id: 'nome',
              name: 'Acostamento',
            },
          ],
        }, {
          id: 'sinalizacao',
          name: 'Sinalização',
          fields: [{
            id: 'nome',
            name: 'Sinalização',
          }],
        }, {
          id: 'sentidovia',
          name: 'Sentido da Via',
          fields: [{
            id: 'nome',
            name: 'Sentido da Via',
          }],
        }, {
          id: 'conservacaovia',
          name: 'Conservação da via',
          fields: [{
            id: 'nome',
            name: 'Conservação da via',
          }],
        }, {
          id: 'tipovia',
          name: 'Tipo da Via',
          fields: [
            {
              id: 'nome',
              name: 'Tipo',
            },
          ],
        }, {
          id: 'pavimentacao',
          name: 'Pavimentação',
          fields: [
            {
              id: 'nome',
              name: 'Pavimentação',
            },
          ],
        }, {
          id: 'sinaispneus',
          name: 'Sinais de Pneus na Pista',
          fields: [
            {
              id: 'nome',
              name: 'Sinal',
            },
          ],
        }, {
          id: 'tipoacidente',
          name: 'Tipo de Acidente',
          fields: [{
            id: 'nome',
            name: 'Tipo de Acidente',
          }],

        },
      ],
      veiculo: [
        {
          id: 'marcaveiculo',
          name: 'Marca do Veículo',
          fields: [
            {
              id: 'nome',
              name: 'Marca',
            },
          ],
        }, {
          id: 'modeloveiculo',
          name: 'Modelo do Veículo',
          fields: [
            {
              id: 'nome',
              name: 'Modelo',
            },
          ],
        }, {
          id: 'categoriaveiculo',
          name: 'Categoria do Veículo',
          fields: [
            {
              id: 'nome',
              name: 'Categoria',
            },
          ],
        },
      ],
      envolvido: [
        {
          id: 'posicaoveiculo',
          name: 'Posição no Veículo',
          fields: [
            {
              id: 'nome',
              name: 'Posição',
            },
          ],
        }, {
          id: 'condicaoseguranca',
          name: 'Condição de segurança',
          fields: [
            {
              id: 'nome',
              name: 'Condição',
            },
          ],
        }, {
          id: 'grauinstrucao',
          name: 'Grau de Instrucao',
          fields: [
            {
              id: 'nome',
              name: 'Grau',
            },
          ],
        }, {
          id: 'lesoes',
          name: 'Lesões',
          fields: [
            {
              id: 'nome',
              name: 'Lesão',
            },
          ],
        }, {
          id: 'localencaminhado',
          name: 'Local de encaminhamento',
          fields: [
            {
              id: 'nome',
              name: 'Local',
            },
          ],
        }, {
          id: 'profissao',
          name: 'Profissão',
          fields: [
            {
              id: 'nome',
              name: 'Profissão',
            },
          ],
        },
      ],
      parceiro: [{
        id: 'parceiro',
        name: 'Parceiro',
        fields: [
          {
            id: 'nome',
            name: 'Parceiro',
          }, {
            id: 'estado',
            name: 'Estado',
            options: true,
          }, {
            id: 'municipio',
            name: 'Municipio',
            options: true,
          }, {
            id: 'nomeContato',
            name: 'Contato',
          }, {
            id: 'telefone',
            name: 'Telefone',
          }, {
            id: 'email',
            name: 'Email',
          },
        ],
      }],
      obitos: [{
        id: 'ano',
        name: 'Ano',
        fields: [
          {
            id: 'ano',
            name: 'Ano',
          },
        ],
      }, {
        id: 'fatorrisco',
        name: 'Fator de Risco',
        fields: [
          {
            id: 'nome',
            name: 'Fator',
          }, {
            id: 'dataInsercao',
            type: 'date',
            disabled: true,
            value: today.toISOString().split('T')[0],
            name: 'Data de Inserção',
          },
        ],
      }, {
        id: 'condutarisco',
        name: 'Conduta de risco',
        fields: [
          {
            id: 'nome',
            name: 'Conduta',
          }, {
            id: 'dataInsercao',
            type: 'date',
            disabled: true,
            value: today.toISOString().split('T')[0],
            name: 'Data de Inserção',
          },
        ],
      }, {
        id: 'fatorgravidade',
        name: 'Fator/Gravidade',
        fields: [
          {
            id: 'nome',
            name: 'Fator/Gravidade',
          }, {
            id: 'dataInsercao',
            type: 'date',
            disabled: true,
            value: today.toISOString().split('T')[0],
            name: 'Data de Inserção',
          },
        ],
      }],
    };
    const menuItems = {};
    Object.keys(listaCadastros).forEach((prop, i) => {
      listaCadastros[prop].forEach((type, k) => {
        if (!menuItems[prop]) menuItems[prop] = [];
        menuItems[prop].push(
          <MenuItem eventKey={`${i}.${k}`} key={type.id} onSelect={e => this.onSelect(type, e)}>{type.name}</MenuItem>,
        );
      });
    });
    const columns = genericProps.type ? genericProps.type.fields.map(field => ({
      Header: field.name,
      id: field.id,
      accessor: d => d.id,
      Cell: (props) => {
        const value = genericProps[genericProps.type.id][props.index][props.column.id]
            && (
              genericProps[genericProps.type.id][props.index][props.column.id].nome
              || genericProps[genericProps.type.id][props.index][props.column.id].value
              || genericProps[genericProps.type.id][props.index][props.column.id]
            );
        return <div>{value}</div>;
      },
    })) : [];
    columns.push({
      Header: 'Editar',
      id: 'edit',
      accessor: d => d.id,
      filterable: false,
      Cell: props => (
        <Button
          style={{ color: 'blue' }}
          icon="edit"
          primary
          id={props.original.id}
          onClick={() => this.handleEdit(props.original)}
        />
      ),
    }, {
      Header: 'Remover',
      id: 'remove',
      accessor: d => d.id,
      filterable: false,
      Cell: props => (
        <Button
          style={{ color: 'red' }}
          icon="remove"
          primary
          id={props.original.id}
          onClick={() => this.props.removeType(
            props.original.id, genericProps.type.id,
            genericProps.pageSize,
            genericProps.page,
          )}
        />
      ),
    });
    const form = genericProps.type ? genericProps.type.fields.map(field => (
      <Row key={field.id}>
        {
          field.options
            ? (
              <Col>
                <ControlLabel>{field.name}</ControlLabel>
                <Typeahead
                  labelKey={option => `${option.nome}`}
                  id={field.id}
                  onChange={e => this.handleTypeahead(e, field.id)}
                  className="form-group"
                  options={events.options[field.id]}
                />
              </Col>
            )
            : (
              <Col>
                <Input
                  value={genericProps.form[field.id] || (field.value) || ''}
                  label={field.name}
                  readOnly={field.disabled}
                  type={field.type || 'text'}
                  id={field.id}
                  onChange={e => this.props.onChangeFormInput(e.target.value, field.id)}
                />
              </Col>
            )
          }
      </Row>
    )) : undefined;
    return (
      <div className="content" id="content">
        <Grid fluid style={{ minHeight: '80vh' }}>
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
                    <NavDropdown eventKey={1} title="Dados Gerais" id="dadosGeraisDropdown" style={{ overflow: 1 }}>
                      {menuItems.dadosGerais}
                    </NavDropdown>
                    <NavDropdown eventKey={2} title="Dados Estatisticos" id="dadosEstatisticosDropdown" style={{ overflow: 1 }}>
                      {menuItems.dadosEstatisticos}
                    </NavDropdown>
                    <NavDropdown eventKey={3} title="Vias" id="viasDropdown" style={{ overflow: 1 }}>
                      {menuItems.vias}
                    </NavDropdown>
                    <NavDropdown eventKey={4} title="Veiculos" id="veiculosDropdown" style={{ overflow: 1 }}>
                      {menuItems.veiculo}
                    </NavDropdown>
                    <NavDropdown eventKey={5} title="Envolvidos" id="envolvidoDropdown" style={{ overflow: 1 }}>
                      {menuItems.envolvido}
                    </NavDropdown>
                    <NavDropdown eventKey={6} title="Obitos" id="obitosDropdown" style={{ overflow: 1 }}>
                      {menuItems.obitos}
                    </NavDropdown>
                  </Nav>
                  <Nav onSelect={e => this.onSelect(listaCadastros.parceiro[0], e)}>
                    <NavItem eventKey={6} title="Parceiro">
                      Parceiro
                    </NavItem>
                  </Nav>
                </Navbar>
              </Col>
            </Row>
            <Row>
              <br />
              <Col md={12}>
                {
                  genericProps.type ? (
                    <div>
                      <Form>
                        <Col md={9}>
                          <ReactTable
                            previousText="Anterior"
                            nextText="Proximo"
                            manual
                            loadingText="Carregando..."
                            pageText="Pagina"
                            noDataText="Sem dados a exibir"
                            ofText="de"
                            rowsText="linhas"
                            className="-highlight"
                            data={genericProps[genericProps.type.id] || []}
                            loading={genericProps.loading}
                            pages={genericProps.pages}
                            onFetchData={this.fetchData.bind(this)}
                            columns={columns}
                            defaultPageSize={10}
                            filterable
                            defaultFilterMethod={(filter, rows) => matchSorter(rows, filter.value, { keys: [filter.id] })}
                            getTdProps={() => ({ style: { textAlign: 'center' } })}
                          />
                          <Dialog
                            active={genericProps.showModal === !(undefined)}
                            actions={[
                              { label: 'Fechar', onClick: this.props.handleToggleModal },
                              { label: 'Salvar', onClick: this.updateType.bind(this) },
                            ]}
                            className="custom-modal"
                            type="fullscreen"
                            onEscKeyDown={this.props.handleToggleModal}
                            onOverlayClick={this.props.handleToggleModal}
                            title="Ocorrência"
                          >
                            <Grid fluid>
                              <Col md={12}>
                                <Row>
                                  {
                                    genericProps.type && genericProps.selected ? genericProps.type.fields.map((field) => {
                                      const placeholder = genericProps.selected[field.id].nome
                                        || genericProps.selected[field.id].value
                                        || genericProps.selected[field.id] || '';
                                      return (
                                        field.options
                                          ? (
                                            <Col md={4} key={field.id}>
                                              <ControlLabel>{field.name}</ControlLabel>
                                              <Typeahead
                                                labelKey={option => `${option.nome}`}
                                                id={field.id}
                                                placeholder={placeholder}
                                                className="form-group"
                                                onChange={e => this.handleTypeahead(e, field.id)}
                                                options={events.options[field.id]}
                                              />
                                            </Col>
                                          )
                                          : (
                                            <Col md={4} key={field.id}>
                                              <Input
                                                value={genericProps.form[field.id] || field.value || ''}
                                                placeholder={placeholder}
                                                readOnly={field.disabled}
                                                label={field.name}
                                                type="text"
                                                id={field.id}
                                                onChange={e => this.props.onChangeFormInput(e.target.value, field.id)}
                                              />
                                            </Col>
                                          )
                                      );
                                    }) : undefined
                                  }
                                </Row>
                              </Col>
                            </Grid>
                          </Dialog>
                        </Col>
                        <Col md={3}>
                          <Row>
                            <h4>
                              Adicionar
                              {' '}
                              {genericProps.type.name}
                            </h4>
                          </Row>
                          {form}
                          <Row className="pull-right">
                            <Col xs={3}>
                              <Submit bsStyle="primary" type="submit" onClick={e => this.add(e)}>
                                Adicionar
                              </Submit>
                            </Col>
                          </Row>
                        </Col>
                      </Form>
                    </div>) : <div style={{ textAlign: 'center' }}><h4>Selecione um cadastro</h4></div>
                }
              </Col>
            </Row>
          </Col>
          <br />
          <pre>
            {JSON.stringify(genericProps, null, 4)}
          </pre>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  genericProps: state.genericCrud,
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  listTypes: (selectedType, pageSize, page) => {
    dispatch(CrudApi.listTypes(selectedType, pageSize, page));
  },
  onChangeInput: (newValue, selectedInput) => {
    dispatch(CrudApi.onChangeInput(newValue, selectedInput));
  },
  onChangeFormInput: (value, selectedInput, option) => {
    dispatch(CrudApi.onChangeCrudFormInput(value, selectedInput, option));
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
  updateType: (id, form, selectedType, pageSize, page) => {
    dispatch(CrudApi.updateType(id, form, selectedType, pageSize, page));
  },
  loadOptions: () => {
    dispatch(EventsApi.listEventsOpts());
  },
});

const GenericCRUDContainer = connect(mapStateToProps, mapDispatchToProps)(GenericCRUD);

export default GenericCRUDContainer;
