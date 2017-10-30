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

        const columns = [
            {
                style: {textAlign: "center"},
                Header: 'Data',
                id: 'date',
                accessor: d => d.general.date,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["date"]}),
                filterAll: true
            }, {
                style: {textAlign: "center"},
                Header: 'Rua',
                id: 'street',
                accessor: d => d.general.street,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["street"]}),
                filterAll: true

            }, {
                style: {textAlign: "center"},
                Header: 'Numero/KM',
                id: 'number',
                accessor: d => d.general.number,
                filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
            }, {
                style: {textAlign: "center"},
                Header: 'Cruzamento com',
                id: 'cross',
                accessor: d => d.general.cross,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["cross"]}),
                filterAll: true
            }, {
                style: {textAlign: "center"},
                Header: 'Bairro',
                id: 'neighborhood',
                accessor: d => d.general.Neighborhood,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["neighborhood"]}),
                filterAll: true
            }, {
                style: {textAlign: "center"},
                Header: 'Referencia',
                id: 'reference',
                accessor: d => d.general.Reference,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {keys: ["reference"]}),
                filterAll: true
            }, {
                style: {textAlign: "center"},
                Header: 'Visualizar',
                accessor: 'id',
                filterable: false,
                sortable: false,
                Cell: props => (
                    <Button icon="edit" primary id={props.value} onClick={() => this.buttonToggleModal(props.value)}/>
                )
            }
        ];

        const actions = [
            {label: "Fechar", onClick: this.props.handleToggleModal}
        ];
        return (
            <div>
                <div className="content" id="content">
                    <ReactTable previousText='Anterior' nextText='Proximo' ofText='de'
                                owsText='linhas' pageText='Pagina' loadingText='Carregando...'
                                noDataText='Sem dados correspondentes' className="-striped -highlight"
                                data={this.props.data} loading={(this.props.loading === undefined)}
                                columns={columns} defaultPageSize={5}
                                defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                                filterable
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
                                        addInvolved={this.props.addVehicle} removeInvolved={this.props.removeInvolved}
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
                    <Col>
                        <Form>
                            <Tabs defaultActiveKey={1} id="event-form-tabs">
                                <Tab eventKey={1} title="Geral">
                                    <General data={this.props.selectedEvent.general}
                                             onChangeInput={this.props.onChangeInput}
                                             subMenu='general'
                                    />
                                </Tab>
                                <Tab eventKey={2} title="Dados Estatisticos">
                                    <StatisticData data={this.props.selectedEvent.statisticData}
                                                   options={this.props.options.statisticData}
                                                   onChangeInput={this.props.onChangeInput}
                                                   subMenu='statisticData'
                                    />
                                </Tab>
                                <Tab eventKey={3} title="Veículos">
                                    <Vehicles selectedEvent={this.props.selectedEvent.vehicles}
                                              options={this.props.options.vehicles}
                                              onChangeInput={this.props.onChangeInput}
                                              addVehicle={this.props.addVehicle}
                                              removeVehicle={this.props.removeVehicle}
                                              subMenu='vehicle'
                                    />
                                </Tab>
                                <Tab eventKey={4} title="Envolvidos">
                                    <Involved selectedEvent={this.props.selectedEvent.involved}
                                              options={this.props.options.involved}
                                              onChangeInput={this.props.onChangeInput}
                                              addInvolved={this.props.addInvolved}
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
                <Row>
                    <Col sm={4}>
                        <Input value={this.props.data.date} type="date"
                               id="date" required="required"
                               onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                               label="Data"/>
                    </Col>
                    <Col sm={4}>
                        <Input value={this.props.data.street} type="text"
                               id="street" required="required"
                               onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                               label="Rua"/>
                    </Col>
                    <Col sm={4}>
                        <Input value={this.props.data.number} type="text"
                               id="number" required="required"
                               onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                               label="Numero"/>
                    </Col>
                </Row>

                <Row>
                    <Col sm={4}>
                        <Input value={this.props.data.cross} type="text"
                               id="cross" required="required"
                               onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                               label="Cruzamento"/>
                    </Col>
                    <Col sm={4}>
                        <Input value={this.props.data.lat} type="number"
                               id="lat" required="required"
                               onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                               label="Latitude"/>
                    </Col>
                    <Col sm={4}>
                        <Input value={this.props.data.lng} type="number"
                               id="lng" required="required"
                               onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                               label="Longitude"/>
                    </Col>
                </Row>

                <Row>
                    <Col sm={12}>
                        <Input value={this.props.data.middleName} type="text"
                               id="middleName" required="required"
                               onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                               label="Nome do meio / Inicial"/>
                    </Col>
                </Row>

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
                                options={this.props.options.accidentTypes}
                                label="Tipo de Acidente"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.pavementType}
                                id="pavementType" name="pavementType"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.pavementTypes}
                                label="Tipo de Pavimento"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.surface}
                                id="surface" name="surface"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.surfaces}
                                label="Superficie"/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Select value={this.props.data.accidentClassification}
                                id="accidentClassification" name="accidentClassification"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.accidentClassifications}
                                label="Classificação do acidente"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.roadState}
                                id="roadState" name="roadState"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.roadStates}
                                label="Estado da pista"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.roadProfile}
                                id="roadProfile" name="roadProfile"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.roadProfiles}
                                label="Perfil da pista"/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Select value={this.props.data.roadCondition}
                                id="roadCondition" name="roadCondition"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.roadConditions}
                                label="Condição da pista"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.climaticCondition}
                                id="climaticCondition" name="climaticCondition"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.climaticConditions}
                                label="Condição climática"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.verticalSignaling}
                                id="verticalSignaling" name="verticalSignaling"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.verticalSignals}
                                label="Sinalização vertical"/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Select value={this.props.data.horizontalSignaling}
                                id="horizontalSignaling" name="horizontalSignaling"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.horizontalSignals}
                                label="Sinalização horizontal"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.direction}
                                id="direction" name="direction"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.directions}
                                label="Direção"/>
                    </Col>
                    <Col sm={4}>
                        <Select value={this.props.data.zone}
                                id="zone" name="zone"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.zones}
                                label="Zona"/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Select value={this.props.data.cause}
                                id="cause" name="cause"
                                onChange={(e) => this.props.onChangeInput(e.target.value, e.target.id, this.props.subMenu)}
                                options={this.props.options.causes}
                                label="Causa provável"/>
                    </Col>
                    <Col className="control-label" sm={4}>
                        <Input value={this.props.data.additionalInfo} type="text"
                               id="additionalInfo" required="required"
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

        let vehicles = this.props.selectedEvent ?
            this.props.selectedEvent.map(function (vehicle) {
                return (
                    <Panel header={"Veiculo " + vehicle.id + ": " + vehicle.carModel + " " + vehicle.carPlate}
                           eventKey={vehicle.id} key={vehicle.id} collapsible>
                        <Row>
                            <Col sm={10}>
                                <Row>
                                    <Col sm={2}>
                                        <Input value={vehicle.carPlate} type="text"
                                               id="carPlate" required="required"
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
                                        <Input value={vehicle.carBrand} type="text"
                                               id="carBrand" required="required"
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
                                        <Input value={vehicle.carModel} type="text"
                                               id="carModel" required="required"
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
                                    <Col sm={5}>
                                        <Select value={vehicle.carStatus} id="carStatus"
                                                name="carStatus" required="required"
                                                label="Estado"
                                                options={this.props.options.carStatuses}
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
                                        <Select value={vehicle.damageLevel} id="damageLevel"
                                                name="damageLevel" required='required'
                                                label="Grau de avaria"
                                                options={this.props.options.damageLevels}
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
                                        <Select value={vehicle.licenseLevel} id="licenseLevel"
                                                name="licenseLevel" required="required"
                                                label="Habilitação"
                                                options={this.props.options.licenseLevels}
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
                                        <Input value={vehicle.firstLicense} type="date"
                                               id="firstLicense" required="required"
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
                                        <Input value={vehicle.expireDate} type="date"
                                               id="expireDate" required="required"
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
                                        onClick={() => this.props.removeVehicle()}>Remover</Button>
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
                            onClick={() => this.props.addVehicle()}
                    />
                </Col>
            </Row>
        )
    }

}

class Involved extends Component {

    render() {
        let involved = this.props.selectedEvent ?
            this.props.selectedEvent.map((involved) => {
                return (
                    <Panel header={"Envolvido: " + involved.Name} eventKey={involved.id} key={involved.id} collapsible>
                        <Col>
                            <Col sm={4}>
                                <Input value={involved.Name} type="text"
                                       id="involvedName" required="required"
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
                                <Input value={involved.Age} type="number"
                                       id="involvedAge" required="required"
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
                                <Select value={involved.Sex} required="required"
                                        id="involvedSex" name="involvedSex"
                                        options={this.props.options.involvedSexes}
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
                                <Input value={involved.Street} type="text"
                                       id="involvedStreet" required="required"
                                       label="Rua"
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
                                <Input value={involved.Number} type="text"
                                       id="involvedNumber" required="required"
                                       label="Numero"
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
                                <Input value={involved.Corner} type="text"
                                       id="involvedCorner" required="required"
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
                                <Select value={involved.Neighborhood} required="required"
                                        id="involvedNeighborhood" name="involvedNeighborhood"
                                        label="Bairro"
                                        options={this.props.options.involvedNeighborhoods}
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
                                <Input value={involved.Reference} type="text"
                                       id="involvedReference" required="required"
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
                                <Input value={involved.Mom} type="text"
                                       id="involvedMom" required="required"
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
                                <Select value={involved.Situation} required="required"
                                        id="involvedSituation" name="involvedSituation"
                                        label="Situação"
                                        options={this.props.options.involvedSituations}
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
                                <Select value={involved.VehicleType}
                                        id="involvedVehicleType" name="involvedVehicleType"
                                        label="Tipo de veiculo" required="required"
                                        options={this.props.options.involvedVehicleTypes}
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
                                <Select value={involved.VehiclePosition}
                                        id="involvedVehiclePosition" name="involvedVehiclePosition"
                                        label="Posição no Veículo" required="required"
                                        options={this.props.options.involvedVehiclePositions}
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
                                <Select value={involved.SecurityCondition}
                                        id="involvedSecurityCondition" name="involvedSecurityCondition"
                                        label="Condição de segurança" required="required"
                                        options={this.props.options.involvedSecurityConditions}
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
                                <Select value={involved.InjuryLevel}
                                        id="involvedInjuryLevel" name="involvedInjuryLevel"
                                        label="Gravidade da lesão" required="required"
                                        options={this.props.options.involvedInjuryLevels}
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
                                <Select value={involved.ProbableConduct}
                                        id="involvedProbableConduct" name="involvedProbableConduct"
                                        label="Conduta provável" required="required"
                                        options={this.props.options.involvedProbableConducts}
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
                                <Input value={involved.Evolution} type="text"
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
                                    onClick={() => this.props.removeInvolved()}>Remover</Button>
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
                            onClick={() => this.props.addInvolved()}
                    />
                </Col>
            </Row>
        )
    }

}