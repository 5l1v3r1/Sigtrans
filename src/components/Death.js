/**
 * Created by natal on 17/04/17.
 */
import React, {Component} from 'react';
import CustomSubmit from './CustomSubmit'
import CustomInput from './CustomInput'
import CustomSelect from './CustomSelect'
import {Form, Grid, Row, Col, PageHeader} from 'react-bootstrap';
import ReactTable from 'react-table';
import Button from 'react-toolbox/lib/button/Button';
import {Modal} from 'react-bootstrap';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import ErrHandler from  './ErrHandler';
import update from 'immutability-helper';
import Slider from 'react-toolbox/lib/slider/Slider';

class DForm extends Component {
    constructor(props) {
        super(props);
        this.state = props.selectedDeath ? props.selectedDeath : ({
            death: {
                id: '',
                general: {
                    year: '', date: '', street: '', time: '', number: '', cross: '', lat: '', lng: '', zone: ''
                },
                victim: {
                    victimName: '', victimSex: '', victimAge: ''
                },
                riskFactors: {
                    speed: 0, drugs: 0, infra: 0, vehicle: 0, fatigue: 0, visibility: 0, psych: 0, distraction: 0,
                    climateConditions: 0, responsible: ''
                },
                riskConducts: {
                    license: 0,
                    prohibited: 0,
                    improper: 0,
                    trackChange: 0,
                    vehiclesDistance: 0,
                    signalingDisrespect: 0,
                    convergePreference: 0,
                    defensiveDriving: 0,
                    dangerousDriving: 0,
                    recklessPedestrian: 0,
                    responsible: ''
                },
                user: {
                    helmet: 0, belt: 0, occupantProtection: 0, sideObjects: 0, traumaAttention: 0, alcoholism: 0,
                    licensing: 0
                },
                other: {
                    possibleCauseDescription: '', mainCauses: [],
                }
            },
            causes: [
                {name: "Excesso de velocidade", id: "speed"},
                {name: "Problemas do veículo", id: "vehicleProblems"},
                {name: "Imprudência do Condutor", id: "driverImprudence"},
                {name: "Uso de álcool/drogas", id: "drugs"},
                {name: "Problemas psicológicos", id: "psych"},
                {name: "Imprudência do pedestre", id: "recklessPedestrian"},
                {name: "Condições climáticas e visibilidade", id: "visibility"},
                {name: "Problemas na infraestrutura ou via", id: "infra"},
                {name: "Imperícia do Condutor", id: "driverInexperience"},
                {name: "Fadiga ou distração", id: "fatigueDistraction"},
                {name: "Outro", id: "other"}
            ]
        });
        this.handleEventSubmit = this.handleEventSubmit.bind(this);
    }

    handleEventSubmit(e) {
        e.preventDefault();
        let selectedID = this.props.selectedDeath ? this.props.selectedDeath.id : 0;
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
                this.setState(selectedID ? this.props.selectedDeath : ({
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
                        involvedName: '',
                        involvedAge: '',
                        involvedSex: '',
                        involvedStreet: '',
                        involvedNumber: '',
                        involvedCorner: '',
                        involvedNeighborhood: '',
                        involvedMom: '',
                        involvedReference: '',
                        involvedSituation: '',
                        involvedVehicleType: '',
                        involvedVehiclePosition: '',
                        involvedSecurityCondition: '',
                        involvedInjuryLevel: '',
                        involvedProbableConduct: '',
                        involvedEvolution: ''
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
        let alteration = this.state.death;
        alteration[group] = update(alteration[group], {
            [option]: {$set: e.target.value}
        });

        this.setState({
            death: alteration
        });

    }

    handleSlide(group, option, value) {
        let alteration = this.state.death;
        alteration[group] = update(alteration[group], {
            [option]: {$set: value}
        });
        this.setState({
            death: alteration
        });
    };

    handleCheckBox(group, option, e) {
        let value = e.target.name;
        let alteration = this.state.death;
        let idx = alteration[group][option].indexOf(value);
        alteration[group] = idx > -1 ?
            (
                update(alteration[group], {
                    [option]: {$splice: [[idx, 1]]}
                })
            ):(
                update(alteration[group], {
                    [option]: {$push: [value]}
                })
            );
        this.setState({
            death: alteration
        });
    }
    
    render() {
        let causes = this.state.causes.map(function (cause) {
            return (
                <Col key={cause.id} xs={3} md={3} sm={3}>
                    <input name={cause.id}
                           type="checkbox"
                           checked={this.state.death.other.mainCauses[cause.id]}
                           onChange={this.handleCheckBox.bind(this, 'other', 'mainCauses')} />
                    {' ' + cause.name}
                </Col>
            );
        }, this);
        return (
            <div className="clearfix">
                <Grid>
                    <Row className="clearfix">
                        <Form onSubmit={this.handleEventSubmit} method={this.props.selectedDeath ? "put" : "post"}>
                            {/*{console.log(JSON.stringify(this.state, undefined, 4))}*/}
                            <Col xs={12} md={12} sm={12}>
                                {/*<pre>*/}
                                    {/*{JSON.stringify(this.state, undefined, 4)}*/}
                                {/*</pre>*/}
                                {/**
                                 * Geral
                                 * Ano de Referência (ex: 2016)
                                 * Data da Ocorrência
                                 * Hora da Ocorrência
                                 * Endereço Completo (Ex: Av. Brasil, 207, Centro, Cascavel, PR)
                                 * Trecho
                                 * Nome da Vítima
                                 * Status da vítima
                                 * Idade da vítima (somente número)
                                 * Sexo
                                 */}
                                <Row className="form-group clearfix">
                                    <h3>Geral</h3>
                                    <Row>
                                        <Col xs={2} md={2} sm={2}>
                                            <CustomInput value={this.state.death.general.year} type="number" id="year"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'general', 'year')}
                                                         label="Ano de Referência"/>
                                        </Col>
                                        <Col xs={3} md={3} sm={3}>
                                            <CustomInput value={this.state.death.general.date} type="date" id="date"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'general', 'date')}
                                                         label="Data da Ocorrência"/>
                                        </Col>
                                        <Col xs={3} md={3} sm={3}>
                                            <CustomSelect value={this.state.death.general.zone} id="zone"
                                                          name="zone"
                                                          onChange={this.saveAlteration.bind(this, 'general', 'zone')}
                                                          options={this.props.options.statisticData.zones}
                                                          label="Trecho"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6} md={6} sm={6}>
                                            <CustomInput value={this.state.death.general.street} type="text" id="street"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'general', 'street')}
                                                         label="Rua"/>
                                        </Col>
                                        <Col xs={2} md={2} sm={2}>
                                            <CustomInput value={this.state.death.general.number} type="text" id="number"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'general', 'number')}
                                                         label="Numero/KM"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6} md={6} sm={6}>
                                            <CustomInput value={this.state.death.general.cross} type="text" id="cross"
                                                         onChange={this.saveAlteration.bind(this, 'general', 'cross')}
                                                         label="Cruzamento"/>
                                        </Col>
                                        <Col xs={2} md={2} sm={2}>
                                            <CustomInput value={this.state.death.general.time} type="time" id="time"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'general', 'time')}
                                                         label="Hora da Ocorrência"/>
                                        </Col>
                                        {/*<Col mdOffset={1} xs={2} md={2} sm={2}>*/}
                                        {/*<CustomInput value={this.state.death.general.lat} type="number" id="lat"*/}
                                        {/*required="required"*/}
                                        {/*onChange={this.saveAlteration.bind(this, 'general', 'lat')}*/}
                                        {/*label="Latitude"/>*/}
                                        {/*</Col>*/}
                                        {/*<Col xs={2} md={2} sm={2}>*/}
                                        {/*<CustomInput value={this.state.death.general.lng} type="number" id="lng"*/}
                                        {/*required="required"*/}
                                        {/*onChange={this.saveAlteration.bind(this, 'general', 'lng')}*/}
                                        {/*label="Longitude"/>*/}
                                        {/*</Col>*/}
                                    </Row>
                                </Row>
                                {/**
                                 * Vitima
                                 * Fatores de Risco [Velocidade]
                                 * Fatores de Risco [Álcool/Drogas]
                                 * Fatores de Risco [Infraestrutura]
                                 * Fatores de Risco [Veículo]
                                 * Fatores de Risco [Fadiga]
                                 * Fatores de Risco [Visibilidade]
                                 * Fatores de Risco [Problemas psicológicos]
                                 * Fatores de Risco [Celular ou distração]
                                 * Fatores de Risco [Condições climáticas]
                                 * Possível responsável pelos fatores de risco
                                 */}
                                <Row className="form-group clearfix">
                                    <h3>Vítima</h3>
                                    <Row>
                                        <Col xs={8} md={8} sm={8}>
                                            <CustomInput value={this.state.death.victim.victimName} type="text"
                                                         id="victimName" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'victim', 'victimName')}
                                                         label="Nome"/>
                                        </ Col>
                                    </Row>
                                    <Row>
                                        <Col xs={2} md={2} sm={2}>
                                            <CustomSelect value={this.state.death.victim.victimSex} id="victimSex"
                                                          name="victimSex"
                                                          onChange={this.saveAlteration.bind(this, 'victim', 'victimSex')}
                                                          options={this.props.options.involved.involvedSexes}
                                                          label="Sexo"/>
                                        </ Col>
                                        <Col xs={2} md={2} sm={2}>
                                            <CustomInput value={this.state.death.victim.victimAge} type="number"
                                                         id="victimAge" required="victimAge"
                                                         onChange={this.saveAlteration.bind(this, 'victim', 'victimAge')}
                                                         label="Idade"/>
                                        </ Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.victim.victimVehiclePosition}
                                                          id="victimVehiclePosition"
                                                          name="victimVehiclePosition"
                                                          onChange={this.saveAlteration.bind(this, 'victim', 'victimVehiclePosition')}
                                                          options={this.props.options.involved.involvedVehiclePositions}
                                                          label="Posição no Veículo"/>
                                        </Col>
                                    </Row>
                                </Row>
                                {/**
                                 * Fatores de Risco
                                 * Fatores de Risco [Velocidade]
                                 * Fatores de Risco [Álcool/Drogas]
                                 * Fatores de Risco [Infraestrutura]
                                 * Fatores de Risco [Veículo]
                                 * Fatores de Risco [Fadiga]
                                 * Fatores de Risco [Visibilidade]
                                 * Fatores de Risco [Problemas psicológicos]
                                 * Fatores de Risco [Celular ou distração]
                                 * Fatores de Risco [Condições climáticas]
                                 * Possível responsável pelos fatores de risco
                                 */}
                                <Row className="form-group clearfix">
                                    <h3>Fatores de Risco</h3>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="speed">Velocidade</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="speed" name="speed"
                                                    value={this.state.death.riskFactors.speed}
                                                    onChange={this.handleSlide.bind(this, 'riskFactors', 'speed')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="drugs">Álcool/Drogas</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="drugs" name="drugs"
                                                    value={this.state.death.riskFactors.drugs}
                                                    onChange={this.handleSlide.bind(this, 'riskFactors', 'drugs')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="infra">Infraestrutura</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="infra" name="infra"
                                                    value={this.state.death.riskFactors.infra}
                                                    onChange={this.handleSlide.bind(this, 'riskFactors', 'infra')}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="vehicle">Veículo</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="vehicle" name="vehicle"
                                                    value={this.state.death.riskFactors.vehicle}
                                                    onChange={this.handleSlide.bind(this, 'riskFactors', 'vehicle')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="fatigue">Fadiga</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="fatigue" name="fatigue"
                                                    value={this.state.death.riskFactors.fatigue}
                                                    onChange={this.handleSlide.bind(this, 'riskFactors', 'fatigue')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="visibility">Visibilidade</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="visibility" name="visibility"
                                                    value={this.state.death.riskFactors.visibility}
                                                    onChange={this.handleSlide.bind(this, 'riskFactors', 'visibility')}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="psych">Problemas psicológicos</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="psych" name="psych"
                                                    value={this.state.death.riskFactors.psych}
                                                    onChange={this.handleSlide.bind(this, 'riskFactors', 'psych')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="distraction">Celular ou distração</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="distraction" name="distraction"
                                                    value={this.state.death.riskFactors.distraction}
                                                    onChange={this.handleSlide.bind(this, 'riskFactors', 'distraction')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="climateConditions">Condições climáticas</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="climateConditions" name="climateConditions"
                                                    value={this.state.death.riskFactors.climateConditions}
                                                    onChange={this.handleSlide.bind(this, 'riskFactors', 'climateConditions')}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col mdOffset={6} xs={6} md={6} sm={6}>
                                            <CustomSelect value={this.state.death.riskFactors.responsible}
                                                          id="responsibleFactors" name="responsibleFactors"
                                                          onChange={this.saveAlteration.bind(this, 'riskFactors', 'responsible')}
                                                          options={this.props.options.involved.involvedVehiclePositions}
                                                          label="Possível responsável pelos fatores de risco"/>
                                        </Col>
                                    </Row>
                                </Row>
                                {/**
                                 * Condutas de Risco
                                 * Condutas de Risco [Habilitação]
                                 * Condutas de Risco [Transitar local proibido]
                                 * Condutas de Risco [Transitar local impróprio]
                                 * Condutas de Risco [Mudança faixa/pista]
                                 * Condutas de Risco [Distância veículos]
                                 * Condutas de Risco [Desrespeito sinalização]
                                 * Condutas de Risco [Converter/cruzar sem dar preferência]
                                 * Condutas de Risco [Evitabilidade/Direção defensiva]
                                 * Condutas de Risco [Direção perigosa]
                                 * Condutas de Risco [Atitude imprudente pedestre]
                                 * Possível responsável pelas condutas de risco
                                 */}
                                <Row className="form-group clearfix">
                                    <h3>Condutas de Risco</h3>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="license">Habilitação</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="license" name="license"
                                                    value={this.state.death.riskConducts.license}
                                                    onChange={this.handleSlide.bind(this, 'riskConducts', 'license')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="prohibited">Transitar local proibido</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="prohibited" name="prohibited"
                                                    value={this.state.death.riskConducts.prohibited}
                                                    onChange={this.handleSlide.bind(this, 'riskConducts', 'prohibited')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="improper">Transitar local impróprio</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="improper" name="improper"
                                                    value={this.state.death.riskConducts.improper}
                                                    onChange={this.handleSlide.bind(this, 'riskConducts', 'improper')}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="trackChange">Mudança faixa/pista</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="trackChange" name="trackChange"
                                                    value={this.state.death.riskConducts.trackChange}
                                                    onChange={this.handleSlide.bind(this, 'riskConducts', 'trackChange')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="vehiclesDistance">Distância veículos</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="vehiclesDistance" name="vehiclesDistance"
                                                    value={this.state.death.riskConducts.vehiclesDistance}
                                                    onChange={this.handleSlide.bind(this, 'riskConducts', 'vehiclesDistance')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="signalingDisrespect">Desrespeito sinalização</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="signalingDisrespect" name="signalingDisrespect"
                                                    value={this.state.death.riskConducts.signalingDisrespect}
                                                    onChange={this.handleSlide.bind(this, 'riskConducts', 'signalingDisrespect')}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="convergePreference">Converter/cruzar sem dar
                                                preferência</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="convergePreference" name="convergePreference"
                                                    value={this.state.death.riskConducts.convergePreference}
                                                    onChange={this.handleSlide.bind(this, 'riskConducts', 'convergePreference')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="defensiveDriving">Evitabilidade/Direção defensiva</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="defensiveDriving" name="defensiveDriving"
                                                    value={this.state.death.riskConducts.defensiveDriving}
                                                    onChange={this.handleSlide.bind(this, 'riskConducts', 'defensiveDriving')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="dangerousDriving">Direção perigosa</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="dangerousDriving" name="dangerousDriving"
                                                    value={this.state.death.riskConducts.dangerousDriving}
                                                    onChange={this.handleSlide.bind(this, 'riskConducts', 'dangerousDriving')}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="recklessPedestrian">Atitude imprudente pedestre</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="recklessPedestrian" name="recklessPedestrian"
                                                    value={this.state.death.riskConducts.recklessPedestrian}
                                                    onChange={this.handleSlide.bind(this, 'riskConducts', 'recklessPedestrian')}/>
                                        </Col>
                                        <Col xs={6} md={6} sm={6} mdOffset={2}>
                                            <CustomSelect value={this.state.death.riskConducts.responsible}
                                                          id="responsibleConducts" name="responsibleConducts"
                                                          onChange={this.saveAlteration.bind(this, 'riskConducts', 'responsible')}
                                                          options={this.props.options.involved.involvedVehiclePositions}
                                                          label="Possível responsável pelas condutas de risco"/>
                                        </Col>
                                    </Row>
                                </Row>
                                {/**
                                 * Quanto ao Usuário
                                 * Quanto ao Usuário [Capacete]
                                 * Quanto ao Usuário [Cinto]
                                 * Quanto ao Usuário [Proteção do ocupante]
                                 * Quanto ao Usuário [Objetos laterais]
                                 * Quanto ao Usuário [Atenção ao trauma]
                                 * Outros itens avaliados [Alcoolemia]
                                 * Outros itens avaliados [Licenciamento]
                                 */}
                                <Row className="form-group clearfix">
                                    <h3>Quanto ao Usuário</h3>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="helmet">Capacete</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="helmet" name="helmet"
                                                    value={this.state.death.user.helmet}
                                                    onChange={this.handleSlide.bind(this, 'user', 'helmet')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="belt">Cinto de Segurança</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="belt" name="belt"
                                                    value={this.state.death.user.belt}
                                                    onChange={this.handleSlide.bind(this, 'user', 'belt')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="occupantProtection">Proteção do ocupante</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="occupantProtection" name="occupantProtection"
                                                    value={this.state.death.user.occupantProtection}
                                                    onChange={this.handleSlide.bind(this, 'user', 'occupantProtection')}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="sideObjects">Objetos laterais</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="sideObjects" name="sideObjects"
                                                    value={this.state.death.user.sideObjects}
                                                    onChange={this.handleSlide.bind(this, 'user', 'sideObjects')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="traumaAttention">Atenção ao trauma</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="traumaAttention" name="traumaAttention"
                                                    value={this.state.death.user.traumaAttention}
                                                    onChange={this.handleSlide.bind(this, 'user', 'traumaAttention')}/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="alcoholism">Alcoolemia</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="alcoholism" name="alcoholism"
                                                    value={this.state.death.user.alcoholism}
                                                    onChange={this.handleSlide.bind(this, 'user', 'alcoholism')}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label htmlFor="licensing">Licenciamento</label>
                                            <Slider pinned snaps editable min={0} max={10} step={2}
                                                    id="licensing" name="licensing"
                                                    value={this.state.death.user.licensing}
                                                    onChange={this.handleSlide.bind(this, 'user', 'licensing')}/>
                                        </Col>
                                    </Row>
                                </Row>
                                {/**
                                 * Outros
                                 * Órgãos Responsáveis pelo Fornecimento dos Dados
                                 * Descritivo de possível causa
                                 * Principal(ais) causa(s) avaliada(s)
                                 mainCauses
                                 partners
                                 */}
                                <Row className="form-group clearfix">
                                    <Row>
                                        <h3>Outros</h3>
                                    </Row>
                                    <Row>
                                        <h4>Principais causas avaliadas</h4>
                                        {causes}
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={12} sm={12}>
                                            <br/>
                                            <CustomInput value={this.state.death.other.possibleCauseDescription}
                                                         required="required"
                                                         type="text" id="possibleCauseDescription"
                                                         onChange={this.saveAlteration.bind(this, 'other', 'possibleCauseDescription')}
                                                         label="Descritivo de possível causa"/>
                                        </Col>
                                    </Row>
                                </Row>
                                <Row className="clearfix">
                                    <Col xs={1} md={1} sm={1} mdOffset={11} smOffset={9} xsOffset={8}>
                                        <CustomSubmit className="col-md-2" label="Gravar"/>
                                    </Col>
                                </Row>
                            </Col>
                            <div className="clearfix"/>
                        </Form>
                    </Row>
                </Grid>
            </div>
        );
    }

}

export class DGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: '',
            loading: true,
            showModal: false,
            options: {
                general: {
                    date: "",
                    street: "",
                    number: "",
                    cross: "",
                    lat: "",
                    lng: ""
                },
                statisticData: {
                    accidentTypes: [], pavementTypes: [], surfaces: [],
                    accidentClassifications: [], roadStates: [],
                    roadProfiles: [], roadConditions: [], climaticConditions: [],
                    verticalSignals: [], horizontalSignals: [], directions: [],
                    zones: [], causes: [], additionalInfo: []
                },
                vehicles: {
                    carPlate: "",
                    carStatuses: [],
                    carBrand: "",
                    carModel: "",
                    damageLevels: [],
                    licenseLevels: [],
                    firstLicense: "",
                    expireDate: ""
                },
                involved: {
                    involvedName: "",
                    involvedAge: "",
                    involvedSexes: [],
                    involvedStreet: "",
                    involvedNumber: "",
                    involvedCorner: "",
                    involvedNeighborhoods: [],
                    middleName: "",
                    involvedMom: "",
                    involvedReference: "",
                    involvedSituations: [],
                    involvedVehicleTypes: [],
                    involvedVehiclePositions: [],
                    involvedSecurityConditions: [],
                    involvedInjuryLevels: [],
                    involvedProbableConducts: [],
                    involvedEvolution: ""
                }
            },
            selectedDeath: [],
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
            this.setState({data: newData, showModal: false, selectedDeath: ''});
        }.bind(this));
    }

    handleToggle(e) {
        if (!this.state.selectedDeath || !this.state.showModal) {
            this.setState({selectedDeath: this.state.data[e.target.id - 1]});
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
            accessor: 'involved.involvedNeighborhood'
        }, {
            style: {textAlign: "center"},
            header: 'Referencia',
            accessor: 'involved.involvedReference'
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
                <PageHeader>Obitos</PageHeader>
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
                                    <small> Nº: {this.state.selectedDeath.id}</small>
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <DForm options={this.state.options} selectedDeath={this.state.selectedDeath}/>
                            </Modal.Body>

                            <Modal.Footer>
                                {/*<Button onClick={this.handleToggle}>Close</Button>*/}
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }

}

export default class Deaths extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {
                general: {
                    year: "",
                    date: "",
                    street: "",
                    number: "",
                    cross: "",
                    lat: "",
                    lng: ""
                },
                statisticData: {
                    accidentTypes: [], pavementTypes: [], surfaces: [],
                    accidentClassifications: [], roadStates: [],
                    roadProfiles: [], roadConditions: [], climaticConditions: [],
                    verticalSignals: [], horizontalSignals: [], directions: [],
                    zones: [], causes: [], additionalInfo: []
                },
                vehicles: {
                    carPlate: "",
                    carStatuses: [],
                    carBrand: "",
                    carModel: "",
                    damageLevels: [],
                    licenseLevels: [],
                    firstLicense: "",
                    expireDate: ""
                },
                involved: {
                    involvedName: "",
                    involvedAge: "",
                    involvedSexes: [],
                    involvedStreet: "",
                    involvedNumber: "",
                    involvedCorner: "",
                    involvedNeighborhoods: [],
                    middleName: "",
                    involvedMom: "",
                    involvedReference: "",
                    involvedSituations: [],
                    involvedVehicleTypes: [],
                    involvedVehiclePositions: [],
                    involvedSecurityConditions: [],
                    involvedInjuryLevels: [],
                    involvedProbableConducts: [],
                    involvedEvolution: ""
                }
            }
        };
    }

    componentDidMount() {
        $.ajax({
            url: 'https://ocorrencias-teste-api.herokuapp.com/api/options',
            dataType: 'json',
            type: 'GET',
            crossDomain: true,
            success: function (opts) {
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
                {/*<PageHeader>Obitos</PageHeader>*/}
                <div className="content" id="content">
                    <DGrid/>
                    {/*<DForm options={this.state.options} selectedDeath={null}/>*/}
                </div>
            </div>
        );
    }
}