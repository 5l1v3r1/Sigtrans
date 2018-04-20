import React, {Component} from 'react'
import Input from "../custom/CustomInput";
import Select from "../custom/CustomSelect";
import {Col, Form, Grid, Panel, Row, Tab, Tabs} from 'react-bootstrap';
import matchSorter from 'match-sorter';
import Button from 'react-toolbox/lib/button/Button';
import Dialog from "react-toolbox/lib/dialog/Dialog";
import ReactTable from 'react-table';
import Map from "../map/Map";

//make new js file for both grids
export class EventsGrid extends Component {

    buttonToggleModal(id) {
        this.props.handleToggleModal();
        this.props.selectEvent(id);
    };

    render() {
        return (
            <div>
                <div className="content" id="content">
                    <ReactTable previousText='Anterior' nextText='Proximo' ofText='de'
                                rowsText='linhas' pageText='Pagina' loadingText='Carregando...'
                                noDataText='Opa, Algo deu errado!' className="-striped -highlight"
                                data={this.props.data} loading={(this.props.loading === undefined)}
                                defaultPageSize={10} filterable
                                defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                                getTdProps={() => ({style: {textAlign: "center"}})}
                                columns={[
                                    {
                                        Header: 'Data',
                                        id: 'data',
                                        accessor: d => {
                                            return new Date(d.general.data).toLocaleDateString();
                                        },
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, {keys: ["data"]}),
                                        filterAll: true
                                    }, {
                                        Header: 'Cidade',
                                        id: 'municipio',
                                        accessor: d => d.general.municipio,
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, {keys: ["municipio"]}),
                                        filterAll: true
                                    }, {
                                        Header: 'Rua',
                                        id: 'rua',
                                        accessor: d => d.general.rua,
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, {keys: ["rua"]}),
                                        filterAll: true

                                    }, {
                                        Header: 'Numero/KM',
                                        id: 'numero',
                                        accessor: d => d.general.numero,
                                        filterMethod: (filter, row) =>
                                            row[filter.id].startsWith(filter.value)
                                    }, {
                                        Header: 'Cruzamento com',
                                        id: 'cruzamento',
                                        accessor: d => d.general.cruzamento,
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, {keys: ["cruzamento"]}),
                                        filterAll: true
                                    }, {
                                        Header: 'Bairro',
                                        id: 'bairro',
                                        accessor: d => d.general.bairro,
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, {keys: ["bairro"]}),
                                        filterAll: true
                                    }, {
                                        Header: 'Referencia',
                                        id: 'referencia',
                                        accessor: d => d.general.referencia,
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, {keys: ["referencia"]}),
                                        filterAll: true
                                    }, {
                                        Header: 'Detalhar',
                                        accessor: 'id',
                                        filterable: false,
                                        sortable: false,
                                        Cell: props => (
                                            <Button icon="edit" primary id={props.value}
                                                    onClick={() => this.buttonToggleModal(props.value)}/>
                                        )
                                    }
                                ]}
                    />
                    <div className="modal-container">
                        <Dialog active={this.props.showModal === !(undefined)}
                                actions={[
                                    {label: "Fechar", onClick: this.props.handleToggleModal},
                                    {label: "Salvar", onClick: this.props.handleToggleModal}
                                ]}
                                className="custom-modal" type='fullscreen'
                                onEscKeyDown={this.props.handleToggleModal}
                                onOverlayClick={this.props.handleToggleModal}
                                title='Ocorrência'
                        >
                            <EventsForm selectedEvent={this.props.selectedEvent}
                                        selectedEventID={this.props.selectedEventID}
                                        options={this.props.options}
                                        onChangeInput={this.props.onChangeInput}
                                        addVehicle={this.props.addVehicle} removeVehicle={this.props.removeVehicle}
                                        addInvolved={this.props.addInvolved} removeInvolved={this.props.removeInvolved}
                            />
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }

}

export class EventsForm extends Component {

    render() {
        return (
            <div className='clearfix'>
                <Grid>
                    {/*style={{textAlign:'center'}}*/}
                    <Col>
                        <Form id="eventForm">
                            <Tabs defaultActiveKey={1} id="event-form-tabs">
                                <Tab eventKey={1} title="Geral">
                                    <General
                                        data={this.props.selectedEvent.general}
                                        options={this.props.options}
                                        onChangeInput={this.props.onChangeInput}
                                        subMenu='general'
                                    />
                                </Tab>
                                <Tab eventKey={2} title="Dados Estatisticos">
                                    <StatisticData
                                        data={this.props.selectedEvent.statisticData}
                                        options={this.props.options}
                                        onChangeInput={this.props.onChangeInput}
                                        subMenu='statisticData'
                                    />
                                </Tab>
                                <Tab eventKey={3} title="Veículos">
                                    <Vehicles
                                        data={this.props.selectedEvent.vehicles}
                                        options={this.props.options}
                                        onChangeInput={this.props.onChangeInput}
                                        add={this.props.addVehicle}
                                        remove={this.props.removeVehicle}
                                        subMenu='vehicles'
                                    />
                                </Tab>
                                <Tab eventKey={4} title="Envolvidos">
                                    <Involved
                                        data={this.props.selectedEvent.involved}
                                        veiculo={this.props.selectedEvent.vehicles}
                                        options={this.props.options}
                                        onChangeInput={this.props.onChangeInput}
                                        add={this.props.addInvolved}
                                        remove={this.props.removeInvolved}
                                        subMenu='involved'
                                    />
                                </Tab>
                            </Tabs>
                        </Form>
                    </Col>
                    <Col>
                        <p>Ultima edição por: {this.props.selectedEvent.parceiro}</p>
                        <p>Adicionado em: {this.props.selectedEvent.dataSigtrans} as {this.props.selectedEvent.horaSigtrans}</p>
                    </Col>
                </Grid>
            </div>
        )
    }

}

class General extends Component {
    render() {
        let mapCenter = this.props.data.geolocation ? {
            lat: parseFloat(this.props.data.geolocation.lat),
            lng: parseFloat(this.props.data.geolocation.lng)
        } : {
            lat: 0,
            lng: 0
        };
        let marker=mapCenter.lat!==0?[{position:mapCenter}]:[];
        return (
            <Row className="form-group">
                <br/>
                <Col md={2}>
                    <Input value={this.props.data.data} type="date"
                           id="data" required="required"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Data"/>
                </Col>
                <Col md={2}>
                    <Input value={this.props.data.hora} type="time-local"
                           id="hora" required="required"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Hora"/>
                </Col>
                <Col md={2}>
                    <Select value={this.props.data.estado}
                            id="estado" name="estado"
                            onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                            options={this.props.options.estado?this.props.options.estado:[{id:1, value:'Paraná'}]}
                            label="Estado"/>
                </Col>
                <Col md={2}>
                    <Select value={this.props.data.municipio}
                            id="municipio" name="municipio"
                            onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                            options={this.props.options.municipio?this.props.options.municipio:[{id:1, value:'Cascavel'}]}
                            label="Municipio"/>
                </Col>
                <Col md={2}>
                    <Select value={this.props.data.bairro}
                            id="bairro" name="bairro"
                            onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                            options={this.props.options.bairro?this.props.options.bairro:[{id:1, value:'Centro'}]}
                            label="Bairro"/>
                </Col>
                <Col md={2}>
                    <Input value={this.props.data.numero} type="text"
                           id="numero" required="required"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Número"/>
                </Col>
                <Col md={4}>
                    <Input value={this.props.data.rua} type="text"
                           id="rua" required="required"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Rua"/>
                </Col>
                <Col md={4}>
                    <Input value={this.props.data.cruzamento} type="text"
                           id="cruzamento" required="required"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Cruzamento"/>
                </Col>
                <Col md={4}>
                    <Input value={this.props.data.referencia} type="text"
                           id="referencia" required="required"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Ponto de Ref."/>
                </Col>
                {this.props.data.geolocation ? (
                    <Col md={12}>
                        <Row className="mapRow">
                            <Map center={mapCenter} markers={marker} defaultZoom={15} showMarkers={true}
                                 googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzTZTuwTczZL2JedjuYJRiEh2v0BQpgxo"
                                 loadingElement={<div style={{height: `100%`}}/>}
                                 containerElement={<div style={{height: '100%'}}/>}
                                 mapElement={<div style={{height: '100%'}}/>}
                            />
                        </Row>
                    </Col>
                ) : <div/>}
            </Row>
        )
    }
}

class StatisticData extends Component {

    render() {
        return (
            <Row className="form-group">
                <br/>
                <Row>
                    <Col md={4}>
                        <Select value={this.props.data.zona}
                                id="zona" name="zona"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.zona}
                                label="Zona"/>
                    </Col>
                    <Col md={4}>
                        <Select value={this.props.data.acidenteTrabalho}
                                id="acidenteTrabalho" name="acidenteTrabalho"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.acidenteTrabalho}
                                label="Acidente de Trabalho"/>
                    </Col>
                    <Col md={4}>
                        <Select value={this.props.data.tipoAcidente}
                                id="tipoAcidente" name="tipoAcidente"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.tipoAcidente}
                                label="Tipo de Acidente"/>
                    </Col>
                    <Col md={4}>
                        <Select value={this.props.data.classificacaoAcidente}
                                id="classificacaoAcidente" name="classificacaoAcidente"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.classificacaoAcidente}
                                label="Classificação do acidente"/>
                    </Col>
                    <Col md={4}>
                        <Select value={this.props.data.condicaoClimatica}
                                id="condicaoClimatica" name="condicaoClimatica"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.condicaoClimatica}
                                label="Condições Climáticas"/>
                    </Col>
                    <Col md={4}>
                        <Select value={this.props.data.sentidoVia}
                                id="sentidoVia" name="sentidoVia"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.sentidoVia}
                                label="Sentido da Via"/>
                    </Col>
                    <Col md={4}>
                        <Select value={this.props.data.condicaoVia}
                                id="condicaoVia" name="condicaoVia"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.condicaoVia}
                                label="Condição da Via"/>
                    </Col>
                    <Col md={4}>
                        <Select value={this.props.data.perfilPista}
                                id="perfilPista" name="perfilPista"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.perfilPista}
                                label="Perfil da Pista"/>
                    </Col>
                    <Col md={4}>
                        <Select value={this.props.data.sinalizacao}
                                id="sinalizacao" name="sinalizacao"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.sinalizacao}
                                label="Sinalização"/>
                    </Col>
                    <Col md={4}>
                        <Input value={this.props.data.velocidadeMaxima} type="number" min="0"
                               id="velocidadeMaxima" required="required"
                               onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                               label="Velocidade Máxima Permitida"/>
                    </Col>
                    <Col md={4}>
                        <Select value={this.props.data.visibilidade}
                                id="visibilidade" name="visibilidade"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.visibilidade}
                                label="Visibilidade"/>
                    </Col>

                    <Col md={12}>
                        <Input value={this.props.data.informacoesAdicionais}
                               componentClass='textarea'
                               id="informacoesAdicionais" required="required"
                               onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                               label="Informações adicionais"/>
                    </Col>
                </Row>
            </Row>
        )
    }

}

class Vehicles extends Component {

    render() {
        return (
            <Row className="form-group">
                <br/>
                <Col md={10}>
                    {
                        this.props.data ? this.props.data.map(vehicle => {
                            let header = (vehicle.modelo+' '+vehicle.placa)||'';
                            return (
                                <Panel
                                    header={"Veiculo: " + header}
                                    eventKey={vehicle.id} key={vehicle.id} collapsible>
                                    <Row>
                                        <Col md={10}>
                                            <Row>
                                                <Col md={2}>
                                                    <Input value={vehicle.placa} type="text"
                                                           id="placa" required="required" label="Placa"
                                                           onChange={(e) => {
                                                               this.props.onChangeInput(
                                                                   e.target.value,
                                                                   e.target.id,
                                                                   this.props.subMenu
                                                               )
                                                           }}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Select value={vehicle.marca}
                                                            id="marca" name="marca"
                                                            required='required' label="Marca"
                                                            options={this.props.options.marca}
                                                            onChange={(e) => {
                                                                this.props.onChangeInput(
                                                                    e.target.value,
                                                                    e.target.id,
                                                                    this.props.subMenu
                                                                )
                                                            }}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Select value={vehicle.modelo}
                                                            id="modelo" name="modelo"
                                                            required='required' label="Modelo"
                                                            options={this.props.options.modelo}
                                                            onChange={(e) => {
                                                                this.props.onChangeInput(
                                                                    e.target.value,
                                                                    e.target.id,
                                                                    this.props.subMenu
                                                                )
                                                            }}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Select value={vehicle.tipoVeiculo}
                                                            id="tipoVeiculo" name="tipoVeiculo"
                                                            required='required' label="Tipo de veículo"
                                                            options={this.props.options.tipoVeiculo}
                                                            onChange={(e) => {
                                                                this.props.onChangeInput(
                                                                    e.target.value,
                                                                    e.target.id,
                                                                    this.props.subMenu
                                                                )
                                                            }}
                                                    />
                                                </Col>
                                                <Col md={2}>
                                                    <Input value={vehicle.numeroOcupantes} type="number" min="0"
                                                           id="numeroOcupantes" required="required"
                                                           label="Ocupantes"
                                                           onChange={(e) => {
                                                               this.props.onChangeInput(
                                                                   e.target.value,
                                                                   e.target.id,
                                                                   this.props.subMenu
                                                               )
                                                           }}
                                                    />
                                                </Col>
                                                <Col md={2}>
                                                    <Input value={vehicle.numeroFeridos} type="number" min="0"
                                                           id="numeroFeridos" required="required"
                                                           label="Qtd. de Feridos"
                                                           onChange={(e) => {
                                                               this.props.onChangeInput(
                                                                   e.target.value,
                                                                   e.target.id,
                                                                   this.props.subMenu
                                                               )
                                                           }}
                                                    />
                                                </Col>
                                                <Col md={2}>
                                                    <Input value={vehicle.numeroObitos} type="number" min="0"
                                                           id="numeroObitos" required="required"
                                                           label="Qtd. de Obitos"
                                                           onChange={(e) => {
                                                               this.props.onChangeInput(
                                                                   e.target.value,
                                                                   e.target.id,
                                                                   this.props.subMenu
                                                               )
                                                           }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={12}>
                                                    <h5>Quanto ao condutor</h5>
                                                </Col>
                                                <Col md={3}>
                                                    <Select value={vehicle.cnh}
                                                            id="cnh" name="cnh" required="required"
                                                            label="Habilitação"
                                                            options={this.props.options.cnh}
                                                            onChange={(e) => {
                                                                this.props.onChangeInput(
                                                                    e.target.value,
                                                                    e.target.id,
                                                                    this.props.subMenu
                                                                )
                                                            }}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Input value={vehicle.validadeCNH}
                                                           type="date" id="validadeCNH" required="required"
                                                           label="Validade da CNH"
                                                           onChange={(e) => {
                                                               this.props.onChangeInput(
                                                                   e.target.value,
                                                                   e.target.id,
                                                                   this.props.subMenu
                                                               )
                                                           }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={2}>
                                            <Button icon='close' onClick={() => this.props.remove(vehicle)}>
                                                Remover
                                            </Button>
                                        </Col>
                                    </Row>
                                </Panel>
                            );
                        }):<div/>
                }
                </Col>
                <Col md={2}>
                    <Button icon='add'
                            label='Adicionar veiculo'
                            onClick={() => this.props.add()}
                    />
                </Col>
            </Row>
        )
    }

}

class Involved extends Component {

    render() {
        return (
            <Row className="form-group">
                <br/>
                <Col md={10}>
                    {
                        this.props.data ?
                            this.props.data.map((involved) => {
                                return (
                                    <Panel header={"Envolvido: " + involved.nome} eventKey={involved.id} key={involved.id} collapsible>
                                        <Row>
                                            <Col md={10}>
                                                <Row>
                                                    <Col md={4}>
                                                        <Input value={involved.nome} type="text"
                                                               id="nome" required="required"
                                                               onChange={(e) => {
                                                                   this.props.onChangeInput(
                                                                       e.target.value,
                                                                       e.target.id,
                                                                       this.props.subMenu
                                                                   )
                                                               }}
                                                               label="Nome"/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Input value={involved.dataNasc} type="date"
                                                               id="dataNasc" required="required"
                                                               onChange={(e) => {
                                                                   this.props.onChangeInput(
                                                                       e.target.value,
                                                                       e.target.id,
                                                                       this.props.subMenu
                                                                   )
                                                               }}
                                                               label="Data Nasc."/>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Input value={involved.idade} type="number"
                                                               id="idade" required="required"
                                                               onChange={(e) => {
                                                                   this.props.onChangeInput(
                                                                       e.target.value,
                                                                       e.target.id,
                                                                       this.props.subMenu
                                                                   )
                                                               }}
                                                               label="Idade"/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Select value={involved.sexo} required="required"
                                                                id="sexo" name="sexo"
                                                                options={this.props.options.sexo}
                                                                onChange={(e) => {
                                                                    this.props.onChangeInput(
                                                                        e.target.value,
                                                                        e.target.id,
                                                                        this.props.subMenu
                                                                    )
                                                                }}
                                                                label="Sexo"/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Input value={involved.documento} type="text"
                                                               id="documento" required="required"
                                                               onChange={(e) => {
                                                                   this.props.onChangeInput(
                                                                       e.target.value,
                                                                       e.target.id,
                                                                       this.props.subMenu
                                                                   )
                                                               }}
                                                               label="Documento"/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Input value={involved.orgaoExp} type="text"
                                                               id="orgaoExp" required="required"
                                                               onChange={(e) => {
                                                                   this.props.onChangeInput(
                                                                       e.target.value,
                                                                       e.target.id,
                                                                       this.props.subMenu
                                                                   )
                                                               }}
                                                               label="Orgão Exp."/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Input value={involved.cnh} type="text"
                                                               id="cnh" required="required"
                                                               onChange={(e) => {
                                                                   this.props.onChangeInput(
                                                                       e.target.value,
                                                                       e.target.id,
                                                                       this.props.subMenu
                                                                   )
                                                               }}
                                                               label="CNH"/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Input value={involved.validadeCNH} type="date"
                                                               id="validadeCNH" required="required"
                                                               onChange={(e) => {
                                                                   this.props.onChangeInput(
                                                                       e.target.value,
                                                                       e.target.id,
                                                                       this.props.subMenu
                                                                   )
                                                               }}
                                                               label="Validade CNH"/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Input value={involved.cpf} type="text"
                                                               id="cpf" required="required"
                                                               onChange={(e) => {
                                                                   this.props.onChangeInput(
                                                                       e.target.value,
                                                                       e.target.id,
                                                                       this.props.subMenu
                                                                   )
                                                               }}
                                                               label="CPF"/>
                                                    </Col>
                                                    <Col md={5}>
                                                        <Input value={involved.nomeMae} type="text"
                                                               id="nomeMae" required="required"
                                                               label="Nome da mãe"
                                                               onChange={(e) => {
                                                                   this.props.onChangeInput(
                                                                       e.target.value,
                                                                       e.target.id,
                                                                       this.props.subMenu
                                                                   )
                                                               }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={4}>
                                                        <Select value={involved.estado} required="required"
                                                                id="estado" name="estado"
                                                                options={this.props.options.estado}
                                                                onChange={(e) => {
                                                                    this.props.onChangeInput(
                                                                        e.target.value,
                                                                        e.target.id,
                                                                        this.props.subMenu
                                                                    )
                                                                }}
                                                                label="Estado"/>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Select value={involved.municipio} required="required"
                                                                id="municipio" name="municipio"
                                                                options={this.props.options.municipio}
                                                                onChange={(e) => {
                                                                    this.props.onChangeInput(
                                                                        e.target.value,
                                                                        e.target.id,
                                                                        this.props.subMenu
                                                                    )
                                                                }}
                                                                label="Municipio"/>
                                                    </Col>
                                                    <Col md={5}>
                                                        <Select value={involved.rua} required="required"
                                                                id="rua" name="rua" label="Rua"
                                                                options={this.props.options.rua}
                                                                onChange={(e) => {
                                                                    this.props.onChangeInput(
                                                                        e.target.value,
                                                                        e.target.id,
                                                                        this.props.subMenu
                                                                    )
                                                                }}
                                                        />
                                                    </Col>
                                                    <Col md={3}>
                                                        <Input value={involved.numero} type="text"
                                                               id="numero" required="required" label="Numero"
                                                               onChange={(e) => {
                                                                   this.props.onChangeInput(
                                                                       e.target.value,
                                                                       e.target.id,
                                                                       this.props.subMenu,
                                                                   )
                                                               }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={4}>
                                                        <Input value={involved.profissao} type="text"
                                                               id="profissao" required="required"
                                                               onChange={(e) => {
                                                                   this.props.onChangeInput(
                                                                       e.target.value,
                                                                       e.target.id,
                                                                       this.props.subMenu
                                                                   )
                                                               }}
                                                               label="Profissão"/>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Input value={involved.nacionalidade} type="text"
                                                               id="nacionalidade" required="required"
                                                               label="Nacionalidade"
                                                               onChange={(e) => {
                                                                   this.props.onChangeInput(
                                                                       e.target.value,
                                                                       e.target.id,
                                                                       this.props.subMenu
                                                                   )
                                                               }}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Input value={involved.naturalidade} type="text"
                                                               id="naturalidade" required="required"
                                                               label="Naturalidade"
                                                               onChange={(e) => {
                                                                   this.props.onChangeInput(
                                                                       e.target.value,
                                                                       e.target.id,
                                                                       this.props.subMenu
                                                                   )
                                                               }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={4}>
                                                        <Select value={involved.veiculo.id||''}
                                                                id="veiculo" name="veiculo"
                                                                label="Veiculo" required="required"
                                                                options={this.props.veiculos}
                                                                onChange={(e) => {
                                                                    this.props.onChangeInput(
                                                                        e.target.value,
                                                                        e.target.id,
                                                                        this.props.subMenu
                                                                    )
                                                                }}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Select value={involved.posicaoVeiculo}
                                                                id="posicaoVeiculo" name="posicaoVeiculo"
                                                                label="Posição no Veículo" required="required"
                                                                options={this.props.options.posicaoVeiculo}
                                                                onChange={(e) => {
                                                                    this.props.onChangeInput(
                                                                        e.target.value,
                                                                        e.target.id,
                                                                        this.props.subMenu
                                                                    )
                                                                }}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Select value={involved.condicaoSeguranca}
                                                                id="condicaoSeguranca" name="condicaoSeguranca"
                                                                label="Condição de segurança" required="required"
                                                                options={this.props.options.condicaoSeguranca}
                                                                onChange={(e) => {
                                                                    this.props.onChangeInput(
                                                                        e.target.value,
                                                                        e.target.id,
                                                                        this.props.subMenu
                                                                    )
                                                                }}
                                                        />
                                                    </Col>
                                                </Row>
                                                {
                                                    involved.lesao||involved.localEncaminhado||involved.aih?(
                                                        <Row>
                                                            <Col md={4}>
                                                                <Select value={involved.lesao}
                                                                        id="lesao" name="lesao"
                                                                        label="Gravidade da lesão" required="required"
                                                                        options={this.props.options.InjuryLevels}
                                                                        onChange={(e) => {
                                                                            this.props.onChangeInput(
                                                                                e.target.value,
                                                                                e.target.id,
                                                                                this.props.subMenu
                                                                            )
                                                                        }}
                                                                />
                                                            </Col>
                                                            <Col md={4}>
                                                                <Select value={involved.localEncaminhado}
                                                                        id="localEncaminhado" name="localEncaminhado"
                                                                        label="Local Encaminhado" required="required"
                                                                        options={this.props.options.localEncaminhado}
                                                                        onChange={(e) => {
                                                                            this.props.onChangeInput(
                                                                                e.target.value,
                                                                                e.target.id,
                                                                                this.props.subMenu
                                                                            )
                                                                        }}
                                                                />
                                                            </Col>
                                                        </Row>):<Row/>
                                                }
                                            </Col>
                                            <Col md={2}>
                                                <Button icon='close'
                                                        onClick={() => this.props.remove(involved)}>Remover</Button>
                                            </Col>
                                        </Row>
                                    </Panel>
                                )
                            }) : <div/>
                    }
                </Col>
                <Col md={2}>
                    <Button icon='add'
                            label='Adicionar envolvido'
                            onClick={() => this.props.add()}
                    />
                </Col>
            </Row>
        )
    }

}
