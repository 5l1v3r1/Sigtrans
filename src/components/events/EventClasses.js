import React, {Component} from 'react'
import Input from "../custom/CustomInput";
import Select from "../custom/CustomSelect";
import {Col, ControlLabel, Form, Grid, Row, Tab, Tabs} from 'react-bootstrap';
import matchSorter from 'match-sorter';
import Button from 'react-toolbox/lib/button/Button';
import Dialog from "react-toolbox/lib/dialog/Dialog";
import ReactTable from 'react-table';
import {Accordion, AccordionItem} from "react-sanfona";
import Map from "../map/Map";
import {AsyncTypeahead} from "react-bootstrap-typeahead";

//make new js file for both grids
export class EventsGrid extends Component {

    buttonToggleModal(id) {
        this.props.handleToggleModal();
        this.props.selectEvent(id);
    };

    updateEvent(){
        this.props.handleToggleModal();
        this.props.updateEvent(this.props.selectedEvent);
    }

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
                                            return d.dadosGerais?d.dadosGerais.dataHora?new Date().toLocaleDateString():new Date().toLocaleDateString():'';
                                        },
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, {keys: ["data"]}),
                                        filterAll: true
                                    }, {
                                        Header: 'Cidade',
                                        id: 'municipio',
                                        accessor: d => d.dadosGerais?(d.dadosGerais.municipio?d.dadosGerais.municipio.nome:''):'',
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, {keys: ["municipio"]}),
                                        filterAll: true
                                    }, {
                                        Header: 'Rua',
                                        id: 'rua',
                                        accessor: d => d.dadosGerais?d.dadosGerais.rua?d.dadosGerais.rua.nome:'':'',
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, {keys: ["rua"]}),
                                        filterAll: true

                                    }, {
                                        Header: 'Numero/KM',
                                        id: 'numero',
                                        accessor: d => d.dadosGerais?d.dadosGerais.numero:'',
                                        filterMethod: (filter, row) =>
                                            row[filter.id].startsWith(filter.value)
                                    }, {
                                        Header: 'Cruzamento com',
                                        id: 'cruzamento',
                                        accessor: d => d.dadosGerais?d.dadosGerais.cruzamento?d.dadosGerais.cruzamento.nome:'':'',
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, {keys: ["cruzamento"]}),
                                        filterAll: true
                                    }, {
                                        Header: 'Bairro',
                                        id: 'bairro',
                                        accessor: d => d.dadosGerais?d.dadosGerais.bairro?d.dadosGerais.bairro.nome:'':'',
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, {keys: ["bairro"]}),
                                        filterAll: true
                                    }, {
                                        Header: 'Referencia',
                                        id: 'referencia',
                                        accessor: d => d.dadosGerais?d.dadosGerais.pontoReferencia:"",
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
                                    {label: "Salvar", onClick: this.updateEvent.bind(this)}
                                ]}
                                className="custom-modal" type='fullscreen'
                                onEscKeyDown={this.props.handleToggleModal}
                                onOverlayClick={this.props.handleToggleModal}
                                title='Ocorrência'
                        >
                            <EventsForm selectedEvent={this.props.selectedEvent}
                                        selectedEventID={this.props.selectedEventID}
                                        options={this.props.options}
                                        municipioIsLoading={this.props.municipioIsLoading}
                                        municipios={this.props.municipios}
                                        onChangeDropdown={this.props.onChangeDropdown}
                                        onNestedInputChange={this.props.onNestedInputChange}
                                        onChangeInput={this.props.onChangeInput}
                                        addVehicle={this.props.addVehicle} removeVehicle={this.props.removeVehicle}
                                        addInvolved={this.props.addInvolved} removeInvolved={this.props.removeInvolved}
                                        addVia={this.props.addVia} removeVia={this.props.removeVia}
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
                    <Col md={12}>
                        <Form id="eventForm">
                            <Tabs defaultActiveKey={1} id="event-form-tabs">
                                <Tab eventKey={1} title="Geral">
                                    <General
                                        data={this.props.selectedEvent?this.props.selectedEvent.dadosGerais:{}}
                                        options={this.props.options} municipios={this.props.municipios}
                                        ruas={this.props.ruas} cruzamentos={this.props.cruzamentos}
                                        onChangeInput={this.props.onChangeInput}
                                        onChangeDropdown={this.props.onChangeDropdown}
                                        onNestedInputChange={this.props.onNestedInputChange}
                                        asyncTypeaheadQuery={this.props.asyncTypeaheadQuery}
                                        municipioIsLoading={this.props.municipioIsLoading}
                                        ruaIsLoading={this.props.ruaIsLoading}
                                        subMenu='dadosGerais' fetchDependentOptions={this.props.fetchDependentOptions}
                                    />
                                </Tab>
                                <Tab eventKey={2} title="Dados Estatisticos">
                                    <StatisticData
                                        data={this.props.selectedEvent?this.props.selectedEvent.dadosEstatisticos:{}}
                                        options={this.props.options}
                                        onNestedInputChange={this.props.onNestedInputChange}
                                        onChangeDropdown={this.props.onChangeDropdown}
                                        onChangeInput={this.props.onChangeInput}
                                        add={this.props.addVia} remove={this.props.removeVia}
                                        subMenu='dadosEstatisticos'
                                    />
                                </Tab>
                                <Tab eventKey={3} title="Veículos">
                                    <br/><Button label='Adicionar' onClick={() => this.props.addVehicle()}/>
                                    <Vehicles
                                        data={this.props.selectedEvent?this.props.selectedEvent.veiculos:[]}
                                        options={this.props.options}
                                        onChangeInput={this.props.onChangeInput}
                                        onChangeDropdown={this.props.onChangeDropdown}
                                        add={this.props.addVehicle} remove={this.props.removeVehicle}
                                        onNestedInputChange={this.props.onNestedInputChange}
                                        subMenu='veiculos'
                                    />
                                </Tab>
                                <Tab eventKey={4} title="Envolvidos">
                                    <br/><Button label='Adicionar' onClick={() => this.props.addInvolved()}/>
                                    <Involved
                                        data={this.props.selectedEvent?this.props.selectedEvent.envolvidos:[]}
                                        veiculo={this.props.selectedEvent?this.props.selectedEvent.veiculos:[]}
                                        options={this.props.options}
                                        onChangeInput={this.props.onChangeInput}
                                        onChangeDropdown={this.props.onChangeDropdown}
                                        add={this.props.addInvolved} remove={this.props.removeInvolved}
                                        onNestedInputChange={this.props.onNestedInputChange}
                                        subMenu='envolvidos'
                                    />
                                </Tab>
                                <Tab eventKey={5} title="Informações Adicionais">
                                    <Row>
                                        <br/>
                                        <Col md={12}>
                                            <Input value={this.props.selectedEvent?this.props.selectedEvent.dadosGerais.informacoesAdicionais:''}
                                                   style={{height:'200px'}} componentClass='textarea'
                                                   id="informacoesAdicionais" label="Informações adicionais"
                                                   onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, 'dadosGerais')}/>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Form>
                    </Col>
                    {typeof (this.props.selectedEvent)!=="undefined"?this.props.selectedEvent.id?
                        <Col md={12}>
                            <Row>
                                <Col md={8}>Adicionado
                                    em: {new Date(this.props.selectedEvent.dadosGerais.dataHoraSigtrans).toLocaleDateString('pt-BR')} as {new Date(this.props.selectedEvent.dadosGerais.dataHoraSigtrans).toLocaleTimeString('pt-BR')}</Col>
                                <Col md={4}>Ultima edição por: {this.props.selectedEvent.dadosGerais.parceiro} em
                                    DD/MM/AAAA as HH:MM</Col>
                            </Row>
                            <Row>
                                <Col md={3}>RGO: {this.props.selectedEvent.dadosGerais.rgoBombeiros} / Protocolo
                                    (Bateu): {this.props.selectedEvent.dadosGerais.protocoloBateu}</Col>
                            </Row>
                        </Col>:undefined:undefined
                    }
                    {/*<Row>*/}
                        {/*<Col md={12}>*/}
                            {/*<pre>*/}
                                {/*{JSON.stringify(this.props.selectedEvent, null, 4)}*/}
                            {/*</pre>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                </Grid>
            </div>
        )
    }

}

class General extends Component {

    render() {
        let mapCenter = this.props.data.latitude ? {
            lat: parseFloat(this.props.data.latitude),
            lng: parseFloat(this.props.data.longitude)
        } : {
            lat: 0,
            lng: 0
        };
        let marker=mapCenter.lat!==0?[{position:mapCenter}]:[];

        return(
            <Row className="form-group">
                <br/>
                <Col md={4}>
                    <Input value={this.props.data.dataHora} type="datetime-local"
                           id="dataHora" label="Data"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           />
                </Col>
                <Col md={2}>
                    <Select value={this.props.data.estado?this.props.data.estado.id:''}
                            id="estado" name="estado"
                            onChange={(e) => this.props.onChangeDropdown(e.target.value, e.target.id, this.props.subMenu)}
                            options={this.props.options?this.props.options.estado:[]}
                            label="Estado"/>
                </Col>
                <Col md={3}>
                    <ControlLabel>Municipio</ControlLabel>
                    <AsyncTypeahead
                        disabled={this.props.data.estado===undefined}
                        maxResults={10} minLength={3} useCache paginationText="Mais..."
                        labelKey={option => `${option.nome}`} isLoading={this.props.municipioIsLoading === true}
                        onSearch={query => this.props.asyncTypeaheadQuery(query, 'municipio', this.props.data.estado, 'estado')}
                        options={this.props.municipios?this.props.municipios:this.props.data.municipio?[].push(this.props.data.municipio):undefined}
                        searchText="Procurando..." promptText="Municipio" id='municipio' className='form-group'
                        onChange={selected => {this.props.fetchDependentOptions(selected[0], 'bairro') ; this.props.onChangeInput(selected[0], 'municipio', this.props.subMenu)}}
                    />
                </Col>
                <Col md={3}>
                    <Input value={this.props.data.referencia||''} type="text"
                           id="referencia"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Ponto de Ref."/>
                </Col>
                <Col md={4}>
                    <ControlLabel>Rua</ControlLabel>
                    <AsyncTypeahead
                        disabled={this.props.data.municipio===undefined}
                        maxResults={10} minLength={3} useCache paginationText="Mais..."
                        labelKey={option => `${option.nome}`} isLoading={this.props.ruaIsLoading===true}
                        onSearch={query => this.props.asyncTypeaheadQuery(query, 'rua', this.props.data.municipio, 'municipio')}
                        options={this.props.ruas?this.props.ruas:this.props.data.rua?[].push(this.props.data.rua):undefined}
                        searchText="Procurando..." promptText="Rua" id='rua' className='form-group'
                        onChange={(selected)=>{this.props.onChangeInput(selected[0], 'rua', this.props.subMenu)}}
                    />
                </Col>
                <Col md={2}>
                    <Input value={this.props.data.numero||''} type="text"
                           id="numero"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Número"/>
                </Col>
                <Col md={2}>
                    <Select value={this.props.data.bairro?this.props.data.bairro.id:''}
                            id="bairro" name="bairro"
                            onChange={(e) => this.props.onChangeDropdown(e.target.value, e.target.id, this.props.subMenu)}
                            options={this.props.options?this.props.options.bairro:[]}
                            label="Bairro"/>
                </Col>
                <Col md={4}>
                    <ControlLabel>Cruzamento</ControlLabel>
                    <AsyncTypeahead
                        disabled={this.props.data.municipio===undefined}
                        maxResults={10} minLength={3} useCache paginationText="Mais..."
                        labelKey={option => `${option.nome}`} isLoading={this.props.ruaIsLoading===true}
                        onSearch={query => this.props.asyncTypeaheadQuery(query, 'cruzamento', this.props.data.municipio, 'municipio')}
                        options={this.props.cruzamentos?this.props.cruzamentos:this.props.data.cruzamento?[].push(this.props.data.cruzamento):undefined}
                        searchText="Procurando..." promptText="Cruzamento" id='municipio' className='form-group'
                        onChange={(selected)=>{this.props.onChangeInput(selected[0], 'cruzamento', this.props.subMenu)}}
                    />
                </Col>
                {this.props.data.latitude && this.props.data.longitude ? (
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
        let i=1;
        return (
            <Row className="form-group">
                <br/>
                <Col md={12}>
                    <Row>
                        <Col md={3}>
                            <Select value={this.props.data.zona}
                                    id="zona" name="zona"
                                    onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                    options={[{id:"URBANA", nome:"Urbana"},{id:"RURAL", nome:"Rural"}]}
                                    label="Zona"/>
                        </Col>
                        <Col md={3}>
                            <Select value={this.props.data.acidenteTrabalho?this.props.data.acidenteTrabalho.id:''}
                                    id="acidenteTrabalho" name="acidenteTrabalho"
                                    onChange={(e) => this.props.onChangeDropdown(e.target.value, e.target.id, this.props.subMenu)}
                                    options={this.props.options?this.props.options.acidenteTrabalho:[]}
                                    label="Acidente de Trabalho"/>
                        </Col>
                        <Col md={3}>
                            <Select value={this.props.data.tipoAcidente?this.props.data.tipoAcidente.id:''}
                                    id="tipoAcidente" name="tipoAcidente"
                                    onChange={(e) => this.props.onChangeDropdown(e.target.value, e.target.id, this.props.subMenu)}
                                    options={this.props.options?this.props.options.tipoAcidente:[]}
                                    label="Tipo de Acidente"/>
                        </Col>
                        <Col md={3}>
                            <Select value={this.props.data.classificacaoAcidente?this.props.data.classificacaoAcidente.id:''}
                                    id="classificacaoAcidente" name="classificacaoAcidente"
                                    onChange={(e) => this.props.onChangeDropdown(e.target.value, e.target.id, this.props.subMenu)}
                                    options={this.props.options?this.props.options.classificacaoAcidente:[]}
                                    label="Classificação do acidente"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Row>
                                <h4 style={{borderBottom:'1px solid whitesmoke'}}>Quanto às Vias</h4>
                                <Button label='Adicionar' onClick={() => this.props.add()}/>
                            </Row>
                            <Row>
                                <br/>
                                <Accordion allowMultiple>
                                {
                                    this.props.data.vias?this.props.data.vias.map((via)=>{
                                        let key = i++;
                                        return(
                                            <AccordionItem title="Via" eventKey={key} key={key} collapsible>
                                                <Row>
                                                    <Col md={10}>
                                                        <Row>
                                                            <Col md={3}>
                                                                <Input value={via.faixas} type="number" min="0"
                                                                       id="faixas"
                                                                       onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, undefined)}
                                                                       label="Faixas"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Input value={via.velocidadeMaxima} type="number" min="0"
                                                                       id="velocidadeMaxima"
                                                                       onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, undefined)}
                                                                       label="Velocidade Máxima"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.tipoVia?via.tipoVia.id:""}
                                                                        id="tipoVia" name="tipoVia"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.tipoVia}
                                                                        label="Tipo da Via"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.pavimentacao?via.pavimentacao.id:""}
                                                                        id="pavimentacao" name="pavimentacao"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.pavimentacao}
                                                                        label="Pavimentação"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.conservacaoVia?via.conservacaoVia.id:""}
                                                                        id="conservacaoVia" name="conservacaoVia"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.conservacaoVia}
                                                                        label="Conservação da Via"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.sentidoVia?via.sentidoVia.id:''}
                                                                        id="sentidoVia" name="sentidoVia"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.sentidoVia}
                                                                        label="Sentido da Via"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.semaforo?via.semaforo.id:""}
                                                                        id="semaforo" name="semaforo"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.semaforo}
                                                                        label="Semaforo"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.perfilPista?via.perfilPista.id:''}
                                                                        id="perfilPista" name="perfilPista"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.perfilPista}
                                                                        label="Perfil da Pista"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.superficie?via.superficie.id:""}
                                                                        id="superficie" name="superficie"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.superficie}
                                                                        label="Superficie"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.condicaoClimatica?via.condicaoClimatica.id:""}
                                                                        id="condicaoClimatica" name="condicaoClimatica"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.condicaoClimatica}
                                                                        label="Condições Climáticas"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.equipamentoControleTrafego?via.equipamentoControleTrafego.id:''}
                                                                        id="equipamentoControleTrafego" name="equipamentoControleTrafego"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.equipamentoControleTrafego}
                                                                        label="Equip. Controle Tráfego"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.separacaoPista?via.separacaoPista.id:''}
                                                                        id="separacaoPista" name="separacaoPista"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.separacaoPista}
                                                                        label="Separacao da Pista"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.visibilidade?via.visibilidade.id:''}
                                                                        id="visibilidade" name="visibilidade"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.visibilidade}
                                                                        label="Visibilidade"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.condicaoTecnica?via.condicaoTecnica.id:''}
                                                                        id="condicaoTecnica" name="condicaoTecnica"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.condicaoTecnica}
                                                                        label="Condição Técnica"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.acostamento?via.acostamento.id:''}
                                                                        id="acostamento" name="acostamento"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.acostamento}
                                                                        label="Acostamento"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.sinalizacao?via.sinalizacao.id:''}
                                                                        id="sinalizacao" name="sinalizacao"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.sinalizacao}
                                                                        label="Sinalização"/>
                                                            </Col>
                                                            <Col md={3}>
                                                                <Select value={via.sinaisPneus?via.sinaisPneus.id:''}
                                                                        id="sinaisPneus" name="sinaisPneus"
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, "vias", e.target.id, via, e.target.value, 'id')}
                                                                        options={this.props.options.sinaisPneus}
                                                                        label="Sinais de Pneus"/>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Button icon='close' onClick={() => this.props.remove(via)}>
                                                            Remover
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </AccordionItem>
                                        )
                                  }):undefined
                                }
                                </Accordion>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

}

class Vehicles extends Component {

    render() {
        let i=1;
        return (
            <Row className="form-group">
                <br/>
                <Col md={12}>
                    <Accordion allowMultiple>
                    {
                        this.props.data ? this.props.data.map(vehicle => {
                            let eventKey = vehicle.id?vehicle.id:i++;
                            let header = vehicle.placa?vehicle.placa:'';
                            return (
                                <AccordionItem title={`Veiculo: ${header}`} eventKey={eventKey} key={eventKey} collapsible>
                                    <Row>
                                        <Col md={10}>
                                            <Row>
                                                <Col md={2}>
                                                    <Input value={vehicle.placa} type="text"
                                                           id="placa"  label="Placa"
                                                           onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, vehicle, e.target.value, false)}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Select value={vehicle.marca?vehicle.marca.id:""}
                                                            id="marca" name="marca"
                                                            required='required' label="Marca"
                                                            options={this.props.options.marca}
                                                            onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, vehicle, e.target.value, 'id')}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Select value={vehicle.modelo?vehicle.modelo.id:''}
                                                            id="modelo" name="modelo"
                                                            required='required' label="Modelo"
                                                            options={this.props.options.modelo}
                                                            onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, vehicle, e.target.value, 'id')}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Select value={vehicle.categoriaVeiculo?vehicle.categoriaVeiculo.id:''}
                                                            id="categoriaVeiculo" name="categoriaVeiculo"
                                                            required='required' label="Categoria do veículo"
                                                            options={this.props.options.categoriaVeiculo}
                                                            onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, vehicle, e.target.value, 'id')}
                                                    />
                                                </Col>
                                                <Col md={2}>
                                                    <Input value={vehicle.numeroOcupantes} type="number" min="0"
                                                           id="numeroOcupantes"
                                                           label="Ocupantes"
                                                           onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, vehicle, e.target.value, false)}
                                                    />
                                                </Col>
                                                <Col md={2}>
                                                    <Input value={vehicle.numeroFeridos} type="number" min="0"
                                                           id="numeroFeridos"
                                                           label="Qtd. de Feridos"
                                                           onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, vehicle, e.target.value, false)}
                                                    />
                                                </Col>
                                                <Col md={2}>
                                                    <Input value={vehicle.numeroObitos} type="number" min="0"
                                                           id="numeroObitos"
                                                           label="Qtd. de Obitos"
                                                           onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, vehicle, e.target.value, false)}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={12}>
                                                    <h5>Quanto ao condutor</h5>
                                                </Col>
                                                <Col md={4}>
                                                    <Input value={vehicle.condutor?vehicle.condutor.nome:''}
                                                           type="text" id="nome"
                                                           label="Nome do Condutor"
                                                           onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, vehicle, e.target.value, 'condutor')}
                                                    />
                                                </Col>
                                                <Col md={3}>
                                                    <Input value={vehicle.condutor?vehicle.condutor.cnh:''}
                                                           type="number" id="cnh"
                                                           label="CNH do Condutor"
                                                           onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, vehicle, e.target.value, 'condutor')}
                                                    />
                                                </Col>
                                                <Col md={3}>
                                                    <Input value={vehicle.condutor?vehicle.condutor.validadeCNH:''}
                                                           type="date" id="validadeCNH"
                                                           label="Validade da CNH"
                                                           onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, vehicle, e.target.value, 'condutor')}
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
                                </AccordionItem>
                            );
                        }):<div/>
                    }
                    </Accordion>
                </Col>
            </Row>
        )
    }

}

class Involved extends Component {

    render() {
        let i=1;
        return (
            <Row className="form-group">
                <br/>
                <Col md={12}>
                    <Accordion allowMultiple>
                    {
                        this.props.data ? this.props.data.map((involved) => {
                            let header = involved.nome?involved.nome:'';
                            let eventKey = involved.id?involved.id:i++;
                                return (
                                    <AccordionItem title={`Envolvido: ${header}`} eventKey={involved.id} key={eventKey} collapsible>
                                        <Row>
                                            <Col md={10}>
                                                <Row>
                                                    <Col md={4}>
                                                        <Input value={involved.nome} type="text" id="nome"
                                                               onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, false)}
                                                               label="Nome"/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Input value={involved.dataNasc} type="date"
                                                               id="dataNasc"
                                                               onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, false)}
                                                               label="Data Nasc."/>
                                                    </Col>
                                                    <Col md={2}>
                                                        <Input value={involved.idade} type="number"
                                                               id="idade"
                                                               onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, false)}
                                                               label="Idade"/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Select value={involved.sexo}
                                                                id="sexo" name="sexo"
                                                                options={[{id:"M", nome:"Masculino"},{id:"F", nome:"Feminino"},{id:"ND", nome:"Não Identificado"}]}
                                                                onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, false)}
                                                                label="Sexo"/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Input value={involved.documento} type="text"
                                                               id="documento"
                                                               onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, false)}
                                                               label="Documento"/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Input value={involved.orgaoExp} type="text"
                                                               id="orgaoExp"
                                                               onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, false)}
                                                               label="Orgão Exp."/>
                                                    </Col>
                                                    <Col md={3}>
                                                        <Input value={involved.cpf} type="text"
                                                               id="cpf"
                                                               onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, false)}
                                                               label="CPF"/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={4}>
                                                        <Select value={involved.estado?involved.estado.id:''}
                                                                id="estado" name="estado"
                                                                options={this.props.options.estado}
                                                                onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, 'id')}
                                                                label="Estado"/>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Select value={involved.municipio?involved.municipio.id:""}
                                                                id="municipio" name="municipio"
                                                                options={this.props.options.municipio}
                                                                onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, 'id')}
                                                                label="Municipio"/>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Input value={involved.nomeMae} type="text"
                                                               id="nomeMae"
                                                               label="Nome da mãe"
                                                               onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, false)}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Select value={involved.rua?involved.rua.id:''}
                                                                id="rua" name="rua" label="Rua"
                                                                options={this.props.options.rua}
                                                                onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, 'id')}
                                                        />
                                                    </Col>
                                                    <Col md={3}>
                                                        <Input value={involved.numero} type="text"
                                                               id="numero"  label="Numero"
                                                               onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, false)}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={4}>
                                                        <Select value={involved.grauInstrucao?involved.grauInstrucao.id:""}
                                                                id="grauInstrucao" name="grauInstrucao"
                                                                label="Grau de Instrução"
                                                                options={this.props.options.grauInstrucao}
                                                                onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, 'id')}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Select value={involved.profissao?involved.profissao.id:''}
                                                                id="profissao" name="profissao" label="Profissão"
                                                                options={this.props.options.profissao}
                                                                onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, 'id')}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Input value={involved.nacionalidade} type="text"
                                                               id="nacionalidade"
                                                               label="Nacionalidade"
                                                               onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, false)}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Input value={involved.naturalidade} type="text"
                                                               id="naturalidade"
                                                               label="Naturalidade"
                                                               onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, false)}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={4}>
                                                        <Select value={involved.veiculo?involved.veiculo.id:''}
                                                                id="veiculo" name="veiculo"
                                                                label="Veiculo"
                                                                options={this.props.veiculos}
                                                                onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, 'id')}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Select value={involved.posicaoVeiculo?involved.posicaoVeiculo.id:''}
                                                                id="posicaoVeiculo" name="posicaoVeiculo"
                                                                label="Posição no Veículo"
                                                                options={this.props.options.posicaoVeiculo}
                                                                onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, 'id')}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Select value={involved.condicaoSeguranca?involved.condicaoSeguranca.id:""}
                                                                id="condicaoSeguranca" name="condicaoSeguranca"
                                                                label="Condição de segurança"
                                                                options={this.props.options.condicaoSeguranca}
                                                                onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, 'id')}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Input value={involved.etilometria} type="number" step="0.01" min="0"
                                                               id="etilometria" label="Etilometria"
                                                               onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, false)}
                                                        />
                                                    </Col>
                                                </Row>
                                                {
                                                    involved.lesao||involved.localEncaminhado||involved.aih?(
                                                        <Row>
                                                            <Col md={4}>
                                                                <Select value={involved.lesao?involved.lesao.id:''}
                                                                        id="lesao" name="lesao"
                                                                        label="Gravidade da lesão"
                                                                        options={this.props.options.lesao}
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, 'id')}
                                                                />
                                                            </Col>
                                                            <Col md={4}>
                                                                <Select value={involved.localEncaminhado?involved.localEncaminhado.id:''}
                                                                        id="localEncaminhado" name="localEncaminhado"
                                                                        label="Local Encaminhado"
                                                                        options={this.props.options.localEncaminhado}
                                                                        onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, 'id')}
                                                                />
                                                            </Col>
                                                            <Col md={4}>
                                                                <Input value={involved.aih} type="number"
                                                                       id="aih" name="aih" label="AIH"
                                                                       onChange={(e) => this.props.onNestedInputChange(this.props.subMenu, null, e.target.id, involved, e.target.value, false)}
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
                                    </AccordionItem>
                                )
                            }) : <div/>
                    }
                    </Accordion>
                </Col>
            </Row>
        )
    }

}