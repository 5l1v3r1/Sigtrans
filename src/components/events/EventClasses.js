import React, {Component} from 'react'
import Input from "../custom/CustomInput";
import Select from "../custom/CustomSelect";
import {Col, Form, Grid, Panel, Row, Tab, Tabs} from 'react-bootstrap';
import matchSorter from 'match-sorter';
import Button from 'react-toolbox/lib/button/Button';
import Dialog from "react-toolbox/lib/dialog/Dialog";
import ReactTable from 'react-table';

//make new js file for both grids
export class EventsGrid extends Component {

    buttonToggleModal(id) {
        this.props.handleToggleModal();
        this.props.selectEvent(id);
    };

    render() {
        
        const alignCenter = {
            textAlign:"center"
        };
        const columns = [
            {
                style: alignCenter,
                Header: 'Data',
                id: 'date',
                accessor: d => {
                    let date = new Date(d.general.date);
                    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
                },
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["date"]}),
                filterAll: true
            }, {
                style: alignCenter,
                Header: 'Cidade',
                id: 'city',
                accessor: d => d.general.city,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["city"]}),
                filterAll: true
            }, {
                style: alignCenter,
                Header: 'Rua',
                id: 'street',
                accessor: d => d.general.street,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["street"]}),
                filterAll: true

            }, {
                style: alignCenter,
                Header: 'Numero/KM',
                id: 'number',
                accessor: d => d.general.number,
                filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
            }, {
                style: alignCenter,
                Header: 'Cruzamento com',
                id: 'crossRoad',
                accessor: d => d.general.crossRoad,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["crossRoad"]}),
                filterAll: true
            }, {
                style: alignCenter,
                Header: 'Bairro',
                id: 'neighborhood',
                accessor: d => d.general.neighborhood,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["neighborhood"]}),
                filterAll: true
            }, {
                style: alignCenter,
                Header: 'Referencia',
                id: 'reference',
                accessor: d => d.general.reference,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["reference"]}),
                filterAll: true
            }, {
                style: alignCenter,
                Header: 'Detalhar',
                accessor: 'id',
                filterable: false,
                sortable: false,
                Cell: props => (
                    <Button icon="edit" primary id={props.value} onClick={() => this.buttonToggleModal(props.value)}/>
                )
            }
        ];
        const actions = [
            {label: "Fechar", onClick: this.props.handleToggleModal},
            {label: "Salvar", onClick: this.props.handleToggleModal}
        ];

        return (
            <div>
                <div className="content" id="content">
                    <ReactTable previousText='Anterior' nextText='Proximo' ofText='de'
                                rowsText='linhas' pageText='Pagina' loadingText='Carregando...'
                                noDataText='Opa, Algo deu errado!' className="-striped -highlight"
                                data={this.props.data} loading={(this.props.loading === undefined)}
                                columns={columns} defaultPageSize={10} filterable
                                defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                    />
                    <div className="modal-container">
                        <Dialog active={this.props.showModal === !(undefined)}
                                actions={actions} type='fullscreen'
                                className="custom-modal"
                                onEscKeyDown={this.props.handleToggleModal}
                                onOverlayClick={this.props.handleToggleModal}
                                title='Ocorrência'
                        >
                            <EventsForm selectedEvent={this.props.selectedEvent} options={this.props.options}
                                        selectedEventID={this.props.selectedEventID}
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
        // let selectedEvent = this.props.selectedEvent;
        return (
            <div className='clearfix'>
                <Grid>
                    <Col>
                        <Form id="eventForm">
                            <Tabs defaultActiveKey={1} id="event-form-tabs">
                                <Tab eventKey={1} title="Geral">
                                    <General
                                        data={this.props.selectedEvent.general}
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
                </Grid>
            </div>
        )
    }

}

class General extends Component {
    render() {
        return (
            <Row className="form-group">
                <br/>
                <Col sm={6}>
                    <Input value={this.props.data.street}
                           type="text" id="street" required="required"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Rua"/>
                </Col>
                <Col sm={2}>
                    <Input value={this.props.data.number ? this.props.data.number : 0}
                           type="text" id="number" required="required"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Numero"/>
                </Col>
                <Col sm={4}>
                    <Input value={this.props.data.date ? this.props.data.date : Date.now()} type="datetime-local"
                           id="date" required="required"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Data/Hora"/>
                </Col>
                <Col sm={6}>
                    <Input value={this.props.data.crossRoad ? this.props.data.crossRoad : ''} type="text"
                           id="crossRoad" required="required"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Cruzamento"/>
                </Col>
                <Col sm={3}>
                    <Input value={this.props.data.geolocation.lat}
                           type="number" id="lat" required="required"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Latitude"/>
                </Col>
                <Col sm={3}>
                    <Input value={this.props.data.geolocation.lng}
                           type="number" id="lng" required="required"
                           onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                           label="Longitude"/>
                </Col>
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
                    <Col sm={4}>
                        <Select value={this.props.data.accidentType}
                                id="accidentType" name="accidentType"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.AccidentTypes}
                                label="Tipo de Acidente"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.accidentClassification}
                                id="accidentClassification" name="accidentClassification"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.AccidentClassification}
                                label="Classificação do acidente"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.pavementType}
                                id="pavementType" name="pavementType"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.PavementTypes}
                                label="Tipo de Pavimento"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.roadSurface}
                                id="roadSurface" name="roadSurface"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.RoadSurfaces}
                                label="Superficie"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.roadCondition}
                                id="roadCondition" name="roadCondition"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.RoadConditions}
                                label="Condição da pista"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.roadProfile}
                                id="roadProfile" name="roadProfile"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.RoadProfiles}
                                label="Perfil da pista"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.climaticCondition}
                                id="climaticCondition" name="climaticCondition"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.ClimaticConditions}
                                label="Condição climática"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.trafficSignCondition}
                                id="trafficSignCondition" name="trafficSignCondition"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.Conditions}
                                label="Sinalização vertical"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.trafficPaintCondition}
                                id="trafficPaintCondition" name="trafficPaintCondition"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.Conditions}
                                label="Sinalização horizontal"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.roadDirection}
                                id="roadDirection" name="roadDirection"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.RoadDirections}
                                label="Direção"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.visibility}
                                id="visibility" name="visibility"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.Visibilities}
                                label="Direção"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.zone}
                                id="zone" name="zone"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.Zones}
                                label="Zona"/>
                    </Col>
                    <Col sm={12}>
                        <Input value={this.props.data.otherInformation} type="text"
                               id="otherInformation" required="required"
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

        let vehicles = this.props.data ?
            this.props.data.map(function (vehicle) {
                return (
                    <Panel
                        header={"Veiculo " + vehicle.id + ": " + this.props.options.VehicleType[vehicle.vehicleType].value}
                        eventKey={vehicle.id} key={vehicle.id} collapsible>
                        <Row>
                            <Col sm={10}>
                                <Row>
                                    <Col sm={2}>
                                        <Input value={vehicle.licensePlate} type="text"
                                               id="licensePlate" required="required"
                                               label="Placa"
                                               onChange={(e) => {
                                                   this.props.onChangeInput(
                                                       e.target.value,
                                                       e.target.id,
                                                       this.props.subMenu
                                                   )
                                               }}
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Input value={vehicle.brand} type="text"
                                               id="brand" required="required"
                                               label="Marca"
                                               onChange={(e) => {
                                                   this.props.onChangeInput(
                                                       e.target.value,
                                                       e.target.id,
                                                       this.props.subMenu
                                                   )
                                               }}
                                        />
                                    </Col>
                                    <Col sm={5}>
                                        <Input value={vehicle.model} type="text"
                                               id="model" required="required"
                                               label="Modelo"
                                               onChange={(e) => {
                                                   this.props.onChangeInput(
                                                       e.target.value,
                                                       e.target.id,
                                                       this.props.subMenu
                                                   )
                                               }}
                                        />
                                    </Col>
                                    <Col sm={4}>
                                        <Select value={vehicle.vehicleType} id="vehicleType"
                                                name="vehicleType" required='required'
                                                label="Tipo de veículo"
                                                options={this.props.options.VehicleType}
                                                onChange={(e) => {
                                                    this.props.onChangeInput(
                                                        e.target.value,
                                                        e.target.id,
                                                        this.props.subMenu
                                                    )
                                                }}
                                        />
                                    </Col>
                                    <Col sm={5}>
                                        <Select value={vehicle.degreeOfDamage} id="degreeOfDamage"
                                                name="degreeOfDamage" required='required'
                                                label="Grau de avaria"
                                                options={this.props.options.DegreesOfDamage}
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
                                    <Col sm={12}>
                                        <h5>Quanto ao condutor</h5>
                                    </Col>
                                    <Col sm={3}>
                                        <Select value={vehicle.licenseLevel ? vehicle.licenseLevel : ''}
                                                id="licenseLevel" name="licenseLevel" required="required"
                                                label="Habilitação"
                                                options={this.props.options.LicenseLevels}
                                                onChange={(e) => {
                                                    this.props.onChangeInput(
                                                        e.target.value,
                                                        e.target.id,
                                                        this.props.subMenu
                                                    )
                                                }}
                                        />
                                    </Col>
                                    <Col sm={3}>
                                        <Input value={vehicle.firstLicense ? vehicle.firstLicense : ''}
                                               type="date" id="firstLicense" required="required"
                                               label="Primeira habilitação"
                                               onChange={(e) => {
                                                   this.props.onChangeInput(
                                                       e.target.value,
                                                       e.target.id,
                                                       this.props.subMenu
                                                   )
                                               }}
                                        />
                                    </Col>
                                    <Col sm={4}>
                                        <Input value={vehicle.expireDate ? vehicle.expireDate : ''}
                                               type="date" id="expireDate" required="required"
                                               label="Vencimento da habilitação"
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
                            <Col sm={2}>
                                <Button icon='close'
                                        onClick={() => this.props.remove(vehicle)}>Remover</Button>
                            </Col>
                        </Row>
                    </Panel>
                );
            }, this) : undefined;

        return (
            <Row className="form-group">
                <br/>
                <Col sm={10}>
                    {vehicles}
                </Col>
                <Col sm={2}>
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
        let involved = this.props.data ?
            this.props.data.map((involved) => {
                return (
                    <Panel header={"Envolvido: " + involved.name} eventKey={involved.id} key={involved.id} collapsible>
                        <Col sm={10}>
                            <Col sm={4}>
                                <Input value={involved.name} type="text"
                                       id="name" required="required"
                                       onChange={(e) => {
                                           this.props.onChangeInput(
                                               e.target.value,
                                               e.target.id,
                                               this.props.subMenu
                                           )
                                       }}
                                       label="Nome"/>
                            </ Col>
                            <Col sm={2}>
                                <Input value={involved.age} type="number"
                                       id="age" required="required"
                                       onChange={(e) => {
                                           this.props.onChangeInput(
                                               e.target.value,
                                               e.target.id,
                                               this.props.subMenu
                                           )
                                       }}
                                       label="Idade"/>
                            </ Col>
                            <Col sm={2}>
                                <Select value={involved.sex} required="required"
                                        id="sex" name="involvedSex"
                                        options={this.props.options.Sexes}
                                        onChange={(e) => {
                                            this.props.onChangeInput(
                                                e.target.value,
                                                e.target.id,
                                                this.props.subMenu
                                            )
                                        }}
                                        label="Sexo"/>
                            </ Col>
                            <Col sm={4}>
                                <Input value={involved.street} type="text"
                                       id="street" required="required"
                                       label="Rua"
                                       onChange={(e) => {
                                           this.props.onChangeInput(
                                               e.target.value,
                                               e.target.id,
                                               this.props.subMenu,
                                               true
                                           )
                                       }}
                                />
                            </Col>
                            <Col sm={4}>
                                <Input value={involved.number} type="text"
                                       id="number" required="required"
                                       label="Numero"
                                       onChange={(e) => {
                                           this.props.onChangeInput(
                                               e.target.value,
                                               e.target.id,
                                               this.props.subMenu,
                                               true
                                           )
                                       }}
                                />
                            </Col>
                            <Col sm={4}>
                                <Input value={involved.crossRoad} type="text"
                                       id="crossRoad" required="required"
                                       label="Esquina"
                                       onChange={(e) => {
                                           this.props.onChangeInput(
                                               e.target.value,
                                               e.target.id,
                                               this.props.subMenu
                                           )
                                       }}
                                />
                            </Col>
                            <Col sm={4}>
                                <Input value={involved.reference} type="text"
                                       id="reference" required="required"
                                       label="Referência"
                                       onChange={(e) => {
                                           this.props.onChangeInput(
                                               e.target.value,
                                               e.target.id,
                                               this.props.subMenu
                                           )
                                       }}
                                />
                            </Col>
                            <Col sm={4}>
                                <Input value={involved.mothersName} type="text"
                                       id="mothersName" required="required"
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
                            <Col sm={4}>
                                <Select value={involved.situation} required="required"
                                        id="involvedSituation" name="involvedSituation"
                                        label="Situação"
                                        options={this.props.options.InvolvedSituations}
                                        onChange={(e) => {
                                            this.props.onChangeInput(
                                                e.target.value,
                                                e.target.id,
                                                this.props.subMenu
                                            )
                                        }}
                                />
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.vehicleType}
                                        id="vehicleType" name="vehicleType"
                                        label="Tipo de veiculo" required="required"
                                        options={this.props.options.VehicleType}
                                        onChange={(e) => {
                                            this.props.onChangeInput(
                                                e.target.value,
                                                e.target.id,
                                                this.props.subMenu
                                            )
                                        }}
                                />
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.positionOnTheVehicle}
                                        id="positionOnTheVehicle" name="positionOnTheVehicle"
                                        label="Posição no Veículo" required="required"
                                        options={this.props.options.Positions}
                                        onChange={(e) => {
                                            this.props.onChangeInput(
                                                e.target.value,
                                                e.target.id,
                                                this.props.subMenu
                                            )
                                        }}
                                />
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.securityCondition}
                                        id="securityCondition" name="securityCondition"
                                        label="Condição de segurança" required="required"
                                        options={this.props.options.SecurityCondition}
                                        onChange={(e) => {
                                            this.props.onChangeInput(
                                                e.target.value,
                                                e.target.id,
                                                this.props.subMenu
                                            )
                                        }}
                                />
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.injuryLevel}
                                        id="injuryLevel" name="injuryLevel"
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
                            <Col sm={12}>
                                <Input value={involved.evolutions} type="text"
                                       id="involvedEvolution" required="required"
                                       label="Evolução"
                                       onChange={(e) => {
                                           this.props.onChangeInput(
                                               e.target.value,
                                               e.target.id,
                                               this.props.subMenu
                                           )
                                       }}
                                />
                            </Col>
                        </Col>
                        <Col sm={2}>
                            <Button icon='close'
                                    onClick={() => this.props.remove(involved)}>Remover</Button>
                        </Col>
                    </Panel>
                )
            }, this) : undefined;

        return (
            <Row className="form-group">
                <br/>
                <Col sm={10}>
                    {involved}
                </Col>
                <Col sm={2}>
                    <Button icon='add'
                            label='Adicionar envolvido'
                            onClick={() => this.props.add()}
                    />
                </Col>
            </Row>
        )
    }
}