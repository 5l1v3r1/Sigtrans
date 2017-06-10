import React, {Component} from 'react';
import CustomSubmit from './CustomSubmit'
import CustomInput from './CustomInput'
import CustomSelect from './CustomSelect'
import {Form, Grid, Row, Col, PageHeader, Tabs, Tab, Panel} from 'react-bootstrap';
import ReactTable from 'react-table';
import Button from 'react-toolbox/lib/button/Button';
import {Modal} from 'react-bootstrap';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import ErrHandler from  './ErrHandler';
import update from 'immutability-helper';
// import IconButton from 'react-toolbox/lib/button/IconButton';

class EForm extends Component {
    constructor(props) {
        super(props);
        this.state = props.selectedEvent ? props.selectedEvent : ({
            id: '',
            general: {
                date: '', street: '', number: '', cross: '', lat: '', lng: '', middleName: '',
            },
            statisticData: {
                accidentType: '', pavementType: '', surface: '', accidentClassification: '',
                roadState: '', roadProfile: '', roadCondition: '', climaticCondition: '',
                verticalSignaling: '', horizontalSignaling: '', direction: '',
                zone: '', cause: '', additionalInfo: '',
            },
            vehicles: [
                {
                    id: '1',
                    carPlate: '', carStatus: '', carBrand: '', carModel: '',
                    damageLevel: '', licenseLevel: '', firstLicense: '', expireDate: '',
                }
            ],
            involved: [
                {
                    id: '1',
                    Name: '', Age: '', Sex: '', Street: '',
                    Number: '', Corner: '', Neighborhood: '', Mom: '',
                    Reference: '', Situation: '', VehicleType: '', VehiclePosition: '',
                    SecurityCondition: '', InjuryLevel: '', ProbableConduct: '',
                    Evolution: ''
                }
            ]
        });
        this.handleEventSubmit = this.handleEventSubmit.bind(this);
    }

    handleEventSubmit(e) {
        e.preventDefault();
        let selectedID = this.props.selectedEvent ? this.props.selectedEvent.id : 0;
        $.ajax({
            url: selectedID ? "https://ocorrencias-teste-api.herokuapp.com/api/events/open/:" + selectedID : "https://ocorrencias-teste-api.herokuapp.com/api/events/open",
            contentType: 'application/json',
            crossDomain: 'true',
            crossOrigin: 'true',
            dataType: 'json',
            type: selectedID ? 'put' : 'post',
            data: JSON.stringify(this.state),
            success: function (newData) {
                PubSub.publish('update-events', newData);
                this.setState(selectedID ? this.props.selectedEvent : ({
                    id: '',
                    general: {
                        date: '', street: '', number: '', cross: '', lat: '', lng: '', middleName: '',
                    },
                    statisticData: {
                        accidentType: '', pavementType: '', surface: '', accidentClassification: '',
                        roadState: '', roadProfile: '', roadCondition: '', climaticCondition: '',
                        verticalSignaling: '', horizontalSignaling: '', direction: '',
                        zone: '', cause: '', additionalInfo: '',
                    },
                    vehicles: {
                        carPlate: '', carStatus: '', carBrand: '', carModel: '',
                        damageLevel: '', licenseLevel: '', firstLicense: '', expireDate: '',
                    },
                    involved: {
                        Name: '', Age: '', Sex: '', Street: '', Number: '',
                        Corner: '', Neighborhood: '', Mom: '', Reference: '',
                        Situation: '', VehicleType: '', VehiclePosition: '',
                        SecurityCondition: '', InjuryLevel: '', ProbableConduct: '',
                        Evolution: ''
                    }
                }));
            }.bind(this),
            error: function (resposta) {
                if (resposta.status === 400) {
                    new ErrHandler().publicaErros(resposta.responseJSON);
                }
            },
            beforeSend: function () {
                PubSub.publish("limpa-erros", {});
            }
        });
    }

    saveAlteration(group, option, e) {
        this.setState({
            [group]: {
                ...this.state[group],
                [option]: e.target.value,
            },
        });
    }

    saveNestedAlteration(group, option, id, e) {
        this.setState({
            [group]: update(this.state[group], {
                [id]: {[option]: {$set: e.target.value}}
            })
        });
    }

    // toggleSidebar(){
    //     console.log("VAIASHUFISDFHUGJHSRIUH");
    //     this.props.toggleSidebar();
    // }

    /**TODO Generalizar/corrigir os metodos**/

    removeVehicle(id) {
        if (this.state.vehicles.length > 1) {
            this.setState({
                vehicles: update(this.state.vehicles, {$splice: [[id, 1]]})
            });
        }
        else {
            console.log("invalid target");
        }
    }

    addVehicle() {
        this.setState({
            vehicles: update(this.state.vehicles, {$push: [{id: this.state.vehicles.length + 1}]})
        });
    }

    removeInvolved(id) {
        if (this.state.involved.length > 1) {
            this.setState({
                involved: update(this.state.involved, {$splice: [[id, 1]]})
            });
        }
        else {
            console.log("invalid target");
        }
    }

    addInvolved() {
        this.setState({
            involved: update(this.state.involved, {$push: [{id: this.state.involved.length + 1}]})
        });
    }


    // handleCollapse(id) {
    //     this.setState({
    //         collapse: update(this.state.collapse, {
    //             [id]: {open: {$set: !this.state.collapse[id].open}}
    //         })
    //     });
    // }
    //
    // createCollapse(id) {
    //     this.setState({
    //         collapse: update(this.state.collapse, {
    //             [id]: {open: {$set: false}}
    //         })
    //     });
    //     console.log(JSON.stringify(this.state.collapse));
    // }

    render() {


        /**TODO Make as component**/
        let Vehicles = this.state.vehicles.map(function (vehicle) {
            return (
                <Panel header={"Veiculo " + vehicle.id + ": " + vehicle.carModel + " " + vehicle.carPlate}
                       eventKey={vehicle.id} key={vehicle.id} collapsible>
                    <Row>
                        <Col xs={10} md={10} sm={10}>
                            <Row>
                                <Col mdOffset={1} xs={2} md={2} sm={2}>
                                    <CustomInput value={vehicle.carPlate} type="text"
                                                 id="carPlate"
                                                 required="required"
                                                 onChange={this.saveNestedAlteration.bind(this, 'vehicles', 'carPlate', vehicle.id - 1)}
                                                 label="Placa"/>
                                </Col>
                                <Col xs={3} md={3} sm={3}>
                                    <CustomInput value={vehicle.carBrand} type="text"
                                                 id="carBrand"
                                                 required="required"
                                                 onChange={this.saveNestedAlteration.bind(this, 'vehicles', 'carBrand', vehicle.id - 1)}
                                                 label="Marca"/>
                                </Col>
                                <Col xs={4} md={4} sm={4}>
                                    <CustomInput value={vehicle.carModel} type="text"
                                                 id="carModel"
                                                 required="required"
                                                 onChange={this.saveNestedAlteration.bind(this, 'vehicles', 'carModel', vehicle.id - 1)}
                                                 label="Modelo"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col mdOffset={1} xs={4} md={4} sm={4}>
                                    <CustomSelect value={vehicle.carStatus} id="carStatus"
                                                  name="carStatus"
                                                  onChange={this.saveNestedAlteration.bind(this, 'vehicles', 'carStatus', vehicle.id - 1)}
                                                  options={this.props.options.vehicles.carStatuses}
                                                  label="Estado"/>
                                </Col>
                                <Col xs={5} md={5} sm={5}>
                                    <CustomSelect value={vehicle.damageLevel} id="damageLevel"
                                                  name="damageLevel"
                                                  onChange={this.saveNestedAlteration.bind(this, 'vehicles', 'damageLevel', vehicle.id - 1)}
                                                  options={this.props.options.vehicles.damageLevels}
                                                  label="Grau de avaria"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col mdOffset={1}>
                                    <h5>Quanto ao condutor</h5>
                                </Col>
                                <Col mdOffset={1} xs={3} md={3} sm={3}>
                                    <CustomSelect value={vehicle.licenseLevel} id="licenseLevel"
                                                  name="licenseLevel"
                                                  onChange={this.saveNestedAlteration.bind(this, 'vehicles', 'licenseLevel', vehicle.id - 1)}
                                                  options={this.props.options.vehicles.licenseLevels}
                                                  label="Categoria da habilitação"/>
                                </Col>
                                <Col xs={3} md={3} sm={3}>
                                    <CustomInput value={vehicle.firstLicense} type="date"
                                                 id="firstLicense" required="required"
                                                 onChange={this.saveNestedAlteration.bind(this, 'vehicles', 'firstLicense', vehicle.id - 1)}
                                                 label="Primeira habilitação"/>
                                </Col>
                                <Col xs={3} md={3} sm={3}>
                                    <CustomInput value={vehicle.expireDate} type="date"
                                                 id="expireDate" required="required"
                                                 onChange={this.saveNestedAlteration.bind(this, 'vehicles', 'expireDate', vehicle.id - 1)}
                                                 label="Vencimento da habilitação"/>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={2}>
                            <Button icon='close'
                                    onClick={this.removeVehicle.bind(this, vehicle.id - 1)}>Remover</Button>
                        </Col>
                    </Row>
                </Panel>
            );
        }, this);

        /**TODO Make as component**/
        let Involved = this.state.involved.map(function (involved) {
            return (
                <Panel header={"Envolvido: " + involved.Name} eventKey={involved.id} key={involved.id} collapsible>
                    <Col xs={10} md={10} sm={10}>
                        <Row>
                            <Col xs={4} md={4} sm={4}>
                                <CustomInput value={involved.Name} type="text"
                                             id="involvedName" required="required"
                                             onChange={this.saveNestedAlteration.bind(this, 'involved', 'Name', involved.id - 1)}
                                             label="Nome"/>
                            </ Col>
                            <Col xs={4} md={4} sm={4}>
                                <CustomInput value={involved.Age} type="number"
                                             id="involvedAge" required="required"
                                             onChange={this.saveNestedAlteration.bind(this, 'involved', 'Age', involved.id - 1)}
                                             label="Idade"/>
                            </ Col>
                            <Col xs={4} md={4} sm={4}>
                                <CustomSelect value={involved.Sex} id="involvedSex"
                                              name="involvedSex"
                                              onChange={this.saveNestedAlteration.bind(this, 'involved', 'Sex', involved.id - 1)}
                                              options={this.props.options.involved.involvedSexes}
                                              label="Sexo"/>
                            </ Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={4} sm={4}>
                                <CustomInput value={involved.Street} type="text"
                                             id="involvedStreet" required="required"
                                             onChange={this.saveNestedAlteration.bind(this, 'involved', 'Street', involved.id - 1)}
                                             label="Rua"/>
                            </Col>
                            <Col xs={4} md={4} sm={4}>
                                <CustomInput value={involved.Number} type="text"
                                             id="involvedNumber" required="required"
                                             onChange={this.saveNestedAlteration.bind(this, 'involved', 'Number', involved.id - 1)}
                                             label="Numero"/>
                            </Col>
                            <Col xs={4} md={4} sm={4}>
                                <CustomInput value={involved.Corner} type="text"
                                             id="involvedCorner" required="required"
                                             onChange={this.saveNestedAlteration.bind(this, 'involved', 'Corner', involved.id - 1)}
                                             label="Esquina"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={4} sm={4}>
                                <CustomSelect value={involved.Neighborhood}
                                              id="involvedNeighborhood"
                                              name="involvedNeighborhood"
                                              onChange={this.saveNestedAlteration.bind(this, 'involved', 'Neighborhood', involved.id - 1)}
                                              options={this.props.options.involved.involvedNeighborhoods}
                                              label="Bairro"/>
                            </Col>
                            <Col xs={4} md={4} sm={4}>
                                <CustomInput value={involved.Reference} type="text"
                                             id="involvedReference" required="required"
                                             onChange={this.saveNestedAlteration.bind(this, 'involved', 'Reference', involved.id - 1)}
                                             label="Referência"/>
                            </Col>
                            <Col xs={4} md={4} sm={4}>
                                <CustomInput value={involved.Mom} type="text"
                                             id="involvedMom" required="required"
                                             onChange={this.saveNestedAlteration.bind(this, 'involved', 'Mom', involved.id - 1)}
                                             label="Nome da mãe"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={4} sm={4}>
                                <CustomSelect value={involved.Situation}
                                              id="involvedSituation"
                                              name="involvedSituation"
                                              onChange={this.saveNestedAlteration.bind(this, 'involved', 'Situation', involved.id - 1)}
                                              options={this.props.options.involved.involvedSituations}
                                              label="Situação"/>
                            </Col>
                            <Col xs={4} md={4} sm={4}>
                                <CustomSelect value={involved.VehicleType}
                                              id="involvedVehicleType"
                                              name="involvedVehicleType"
                                              onChange={this.saveNestedAlteration.bind(this, 'involved', 'VehicleType', involved.id - 1)}
                                              options={this.props.options.involved.involvedVehicleTypes}
                                              label="Tipo de veiculo"/>
                            </Col>
                            <Col xs={4} md={4} sm={4}>
                                <CustomSelect value={involved.VehiclePosition}
                                              id="involvedVehiclePosition"
                                              name="involvedVehiclePosition"
                                              onChange={this.saveNestedAlteration.bind(this, 'involved', 'VehiclePosition', involved.id - 1)}
                                              options={this.props.options.involved.involvedVehiclePositions}
                                              label="Posição no Veículo"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={4} sm={4}>
                                <CustomSelect value={involved.SecurityCondition}
                                              id="involvedSecurityCondition"
                                              name="involvedSecurityCondition"
                                              onChange={this.saveNestedAlteration.bind(this, 'involved', 'SecurityCondition', involved.id - 1)}
                                              options={this.props.options.involved.involvedSecurityConditions}
                                              label="Condição de segurança"/>
                            </Col>
                            <Col xs={4} md={4} sm={4}>
                                <CustomSelect value={involved.InjuryLevel}
                                              id="involvedInjuryLevel"
                                              name="involvedInjuryLevel"
                                              onChange={this.saveNestedAlteration.bind(this, 'involved', 'InjuryLevel', involved.id - 1)}
                                              options={this.props.options.involved.involvedInjuryLevels}
                                              label="Gravidade da lesão"/>
                            </Col>
                            <Col xs={4} md={4} sm={4}>
                                <CustomSelect value={involved.ProbableConduct}
                                              id="involvedProbableConduct"
                                              name="involvedProbableConduct"
                                              onChange={this.saveNestedAlteration.bind(this, 'involved', 'ProbableConduct', involved.id - 1)}
                                              options={this.props.options.involved.involvedProbableConducts}
                                              label="Conduta provável"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <CustomInput value={involved.Evolution} type="text"
                                             id="involvedEvolution" required="required"
                                             onChange={this.saveNestedAlteration.bind(this, 'involved', 'Evolution', involved.id - 1)}
                                             label="Evolução"/>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <Button icon='close' onClick={this.removeInvolved.bind(this, involved.id - 1)}>Remover</Button>
                    </Col>
                </Panel>
            );
        }, this);

        return (
            <div className="clearfix" style={{flex: 1, overflowX: 'auto'}}>
                <Grid>
                    <Form onSubmit={this.handleEventSubmit} method={this.props.selectedEvent ? "put" : "post"}>
                        {/*<pre>*/}
                        {/*{JSON.stringify(this.state, undefined, 4)}*/}
                        {/*</pre>*/}
                        <Col xs={12} md={12} sm={12}>
                            <Tabs defaultActiveKey={1} id="event-form-tabs">
                                <Tab eventKey={1} title="Geral">
                                    <Row className="form-group">
                                        <br/>
                                        <Row>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomInput value={this.state.general.date} type="date" id="date"
                                                             required="required"
                                                             onChange={this.saveAlteration.bind(this, 'general', 'date')}
                                                             label="Data"/>
                                            </Col>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomInput value={this.state.general.street} type="text" id="street"
                                                             required="required"
                                                             onChange={this.saveAlteration.bind(this, 'general', 'street')}
                                                             label="Rua"/>
                                            </Col>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomInput value={this.state.general.number} type="text" id="number"
                                                             required="required"
                                                             onChange={this.saveAlteration.bind(this, 'general', 'number')}
                                                             label="Numero"/>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomInput value={this.state.general.cross} type="text" id="cross"
                                                             required="required"
                                                             onChange={this.saveAlteration.bind(this, 'general', 'cross')}
                                                             label="Cruzamento"/>
                                            </Col>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomInput value={this.state.general.lat} type="number" id="lat"
                                                             required="required"
                                                             onChange={this.saveAlteration.bind(this, 'general', 'lat')}
                                                             label="Latitude"/>
                                            </Col>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomInput value={this.state.general.lng} type="number" id="lng"
                                                             required="required"
                                                             onChange={this.saveAlteration.bind(this, 'general', 'lng')}
                                                             label="Longitude"/>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs={12}>
                                                <CustomInput value={this.state.general.middleName} type="text"
                                                             id="middleName" required="required"
                                                             onChange={this.saveAlteration.bind(this, 'general', 'middleName')}
                                                             label="Nome do meio / Inicial"/>
                                            </Col>
                                        </Row>

                                    </Row>
                                </Tab>
                                <Tab eventKey={2} title="Dados Estatisticos">
                                    <Row className="form-group">
                                        <br/>
                                        <Row>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomSelect value={this.state.statisticData.accidentType}
                                                              id="accidentType" name="accidentType"
                                                              onChange={this.saveAlteration.bind(this, 'statisticData', 'accidentType')}
                                                              options={this.props.options.statisticData.accidentTypes}
                                                              label="Tipo de Acidente"/>
                                            </Col>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomSelect value={this.state.statisticData.pavementType}
                                                              id="pavementType" name="pavementType"
                                                              onChange={this.saveAlteration.bind(this, 'statisticData', 'pavementType')}
                                                              options={this.props.options.statisticData.pavementTypes}
                                                              label="Tipo de Pavimento"/>
                                            </Col>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomSelect value={this.state.statisticData.surface} id="surface"
                                                              name="surface"
                                                              onChange={this.saveAlteration.bind(this, 'statisticData', 'surface')}
                                                              options={this.props.options.statisticData.surfaces}
                                                              label="Superficie"/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomSelect value={this.state.statisticData.accidentClassification}
                                                              id="accidentClassification" name="accidentClassification"
                                                              onChange={this.saveAlteration.bind(this, 'statisticData', 'accidentClassification')}
                                                              options={this.props.options.statisticData.accidentClassifications}
                                                              label="Classificação do acidente"/>
                                            </Col>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomSelect value={this.state.statisticData.roadState} id="roadState"
                                                              name="roadState"
                                                              onChange={this.saveAlteration.bind(this, 'statisticData', 'roadState')}
                                                              options={this.props.options.statisticData.roadStates}
                                                              label="Estado da pista"/>
                                            </Col>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomSelect value={this.state.statisticData.roadProfile}
                                                              id="roadProfile"
                                                              name="roadProfile"
                                                              onChange={this.saveAlteration.bind(this, 'statisticData', 'roadProfile')}
                                                              options={this.props.options.statisticData.roadProfiles}
                                                              label="Perfil da pista"/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomSelect value={this.state.statisticData.roadCondition}
                                                              id="roadCondition"
                                                              name="roadCondition"
                                                              onChange={this.saveAlteration.bind(this, 'statisticData', 'roadCondition')}
                                                              options={this.props.options.statisticData.roadConditions}
                                                              label="Condição da pista"/>
                                            </Col>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomSelect value={this.state.statisticData.climaticCondition}
                                                              id="climaticCondition"
                                                              name="climaticCondition"
                                                              onChange={this.saveAlteration.bind(this, 'statisticData', 'climaticCondition')}
                                                              options={this.props.options.statisticData.climaticConditions}
                                                              label="Condição climática"/>
                                            </Col>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomSelect value={this.state.statisticData.verticalSignaling}
                                                              id="verticalSignaling"
                                                              name="verticalSignaling"
                                                              onChange={this.saveAlteration.bind(this, 'statisticData', 'verticalSignaling')}
                                                              options={this.props.options.statisticData.verticalSignals}
                                                              label="Sinalização vertical"/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomSelect value={this.state.statisticData.horizontalSignaling}
                                                              id="horizontalSignaling"
                                                              name="horizontalSignaling"
                                                              onChange={this.saveAlteration.bind(this, 'statisticData', 'horizontalSignaling')}
                                                              options={this.props.options.statisticData.horizontalSignals}
                                                              label="Sinalização horizontal"/>
                                            </Col>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomSelect value={this.state.statisticData.direction} id="direction"
                                                              name="direction"
                                                              onChange={this.saveAlteration.bind(this, 'statisticData', 'direction')}
                                                              options={this.props.options.statisticData.directions}
                                                              label="Direção"/>
                                            </Col>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomSelect value={this.state.statisticData.zone} id="zone"
                                                              name="zone"
                                                              onChange={this.saveAlteration.bind(this, 'statisticData', 'zone')}
                                                              options={this.props.options.statisticData.zones}
                                                              label="Zona"/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={4} md={4} sm={4}>
                                                <CustomSelect value={this.state.statisticData.cause} id="cause"
                                                              name="cause"
                                                              onChange={this.saveAlteration.bind(this, 'statisticData', 'cause')}
                                                              options={this.props.options.statisticData.causes}
                                                              label="Causa provável"/>
                                            </Col>
                                            <Col className="control-label" xs={8}>
                                                <CustomInput value={this.state.statisticData.additionalInfo} type="text"
                                                             id="additionalInfo" required="required"
                                                             onChange={this.saveAlteration.bind(this, 'statisticData', 'additionalInfo')}
                                                             label="Informações adicionais"/>
                                            </Col>
                                        </Row>
                                    </Row>
                                </Tab>
                                <Tab eventKey={3} title="Veículos">
                                    <Row className="form-group">
                                        <br/>
                                        <Row>
                                            <Col md={12}>
                                                {Vehicles}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={1}>
                                                <Button icon='add' onClick={this.addVehicle.bind(this)}>Adicionar
                                                    veiculo</Button>
                                            </Col>
                                        </Row>
                                    </Row>
                                </Tab>
                                <Tab eventKey={4} title="Envolvidos">
                                    <br/>
                                    <Row className="form-group">
                                        <Row>
                                            <Col md={12}>
                                                {Involved}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={1}>
                                                <Button icon='add' onClick={this.addInvolved.bind(this)}>Adicionar
                                                    envolvido</Button>
                                            </Col>
                                        </Row>
                                    </Row>
                                </Tab>
                            </Tabs>
                            <Col xs={1} md={1} sm={1} mdOffset={11} smOffset={11} xsOffset={11}>
                                <CustomSubmit label="Gravar"/>
                            </Col>
                        </Col>
                    </Form>
                </Grid>
            </div>
        );

    }
}

export class EGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: '',
            loading: true,
            showModal: false,
            options: {
                statisticData: {
                    accidentTypes: [], pavementTypes: [], surfaces: [],
                    accidentClassifications: [], roadStates: [],
                    roadProfiles: [], roadConditions: [], climaticConditions: [],
                    verticalSignals: [], horizontalSignals: [], directions: [],
                    zones: [], causes: [], additionalInfo: []
                },
                vehicles: {
                    carStatuses: [],
                    damageLevels: [],
                    licenseLevels: []
                },
                involved: {
                    involvedSexes: [],
                    involvedNeighborhoods: [],
                    involvedSituations: [],
                    involvedVehicleTypes: [],
                    involvedVehiclePositions: [],
                    involvedSecurityConditions: [],
                    involvedInjuryLevels: [],
                    involvedProbableConducts: []
                }
            },
            selectedEvent: [],
            data: [], //server side
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true});
        $.ajax({
            url: 'https://ocorrencias-teste-api.herokuapp.com/api/events/open',
            dataType: 'json',
            type: 'GET',
            crossDomain: true,
            success: function (res) {
                this.setState({
                    data: res,
                    loading: false,
                })
            }.bind(this)
        });
        $.ajax({
            url: 'https://ocorrencias-teste-api.herokuapp.com/api/options',
            dataType: 'json',
            type: 'GET',
            crossDomain: true,
            success: function (res) {
                this.setState({options: res});
            }.bind(this)
        });
        PubSub.subscribe('update-events', function (topicName, newData) {
            this.setState({data: newData, showModal: false, selectedEvent: ''});
        }.bind(this));
    }

    handleToggle(e) {
        if (!this.state.selectedEvent || !this.state.showModal) {
            this.setState({selectedEvent: this.state.data[e.target.id - 1]});
        }
        this.setState({showModal: !this.state.showModal});
    }

    render() {
        const columns = [{
            style: {textAlign: "center"},
            header: 'Data',
            accessor: 'general.date'
        }, {
            style: {textAlign: "center"},
            header: 'Rua',
            accessor: 'general.street'
        }, {
            style: {textAlign: "center"},
            header: 'Numero/KM',
            accessor: 'general.number'
        }, {
            style: {textAlign: "center"},
            header: 'Cruzamento com',
            accessor: 'general.cross'
        }, {
            style: {textAlign: "center"},
            header: 'Bairro',
            accessor: 'involved.Neighborhood'
        }, {
            style: {textAlign: "center"},
            header: 'Referencia',
            accessor: 'involved.Reference'
        }, {
            style: {textAlign: "center"},
            header: 'Editar',
            accessor: 'id',
            sortable: false,
            render: props => (
                <Button icon="edit" primary id={props.value} onClick={this.handleToggle}/>
            )
        }];

        return (
            <div>
                <PageHeader>Ocorrências
                    <small>(Abertas)</small>
                </PageHeader>
                <div className="content" id="content">
                    <ReactTable
                        previousText='Anterior'
                        nextText='Proximo'
                        loadingText='Carregando...'
                        noDataText='Não foram encontradas ocorrências'
                        pageText='Pagina'
                        ofText='de'
                        rowsText='linhas'
                        loading={this.state.loading}
                        className="-striped"
                        data={this.state.data}
                        columns={columns}
                        defaultPageSize={5}
                    />
                    <div className="modal-container">
                        <Modal show={this.state.showModal}
                               onHide={this.handleToggle}
                               container={this}
                               dialogClassName="custom-modal"
                               aria-labelledby="contained-modal-title">
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">Ocorrência
                                    <small> Nº: {this.state.selectedEvent.id}</small>
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <EForm options={this.state.options} selectedEvent={this.state.selectedEvent}/>
                            </Modal.Body>

                            {/*<Modal.Footer>*/}
                            {/*/!*<Button onClick={this.handleToggle}>Close</Button>*!/*/}
                            {/*</Modal.Footer>*/}

                        </Modal>
                    </div>
                </div>
            </div>
        );
    }

}

export default class EBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {
                statisticData: {
                    accidentTypes: [], pavementTypes: [], surfaces: [],
                    accidentClassifications: [], roadStates: [],
                    roadProfiles: [], roadConditions: [], climaticConditions: [],
                    verticalSignals: [], horizontalSignals: [], directions: [],
                    zones: [], causes: [], additionalInfo: []
                },
                vehicles: {
                    carStatuses: [],
                    damageLevels: [],
                    licenseLevels: [],
                },
                involved: {
                    involvedSexes: [],
                    involvedNeighborhoods: [],
                    involvedSituations: [],
                    involvedVehicleTypes: [],
                    involvedVehiclePositions: [],
                    involvedSecurityConditions: [],
                    involvedInjuryLevels: [],
                    involvedProbableConducts: [],
                }
                // RoadProfile: [],
                // Zone: [],
                // Position: [],
                // AccidentType: [],
                // LicenseLevel: [],
                // Visibility: [],
                // PavementType: [],
                // RoadCondition: [],
                // RoadSurface: [],
                // ClimaticCondition: [],
                // AccidentClassification: [],
                // InjuryLevel: []
            }
        };
    }

    componentDidMount() {
        //url: 'https://qtdl3zjjzi.execute-api.us-west-2.amazonaws.com/prod2/acidenttype',
        $.ajax({
            url: 'https://ocorrencias-teste-api.herokuapp.com/api/options',
            dataType: 'json',
            type: 'GET',
            crossDomain: true,
            success: function (opts) {
                //this.setState({options: update(this.state.options, {$merge: opts})});
                this.setState({options: opts});
            }.bind(this)
        });

        /*PubSub.subscribe('update-events-list',function(topico,novaLista){
         this.setState({lista:novaLista});
         }.bind(this));*/
    }

    render() {
        return (
            <div>
                <PageHeader>Criar ocorrência</PageHeader>
                <div className="content" id="content">
                    <EForm options={this.state.options} selectedEvent={null}/>
                </div>
            </div>
        );
    }
}