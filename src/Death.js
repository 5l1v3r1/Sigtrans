/**
 * Created by natal on 17/04/17.
 */

import React, {Component} from 'react';
import CustomSubmit from './components/CustomSubmit'
import CustomInput from './components/CustomInput'
import CustomSelect from './components/CustomSelect'
import {Form, Grid, Row, Col, PageHeader} from 'react-bootstrap';
import ReactTable from 'react-table';
import Button from 'react-toolbox/lib/button/Button';
import {Modal} from 'react-bootstrap';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import ErrHandler from  './ErrHandler';
import update from 'immutability-helper';

class DForm extends Component {
    constructor(props) {
        super(props);
        this.state = props.selectedEvent ? props.selectedEvent : ({
            death:{
                id: '',
                general: {
                    year: '', date:'', street: '', time: '', number: '', cross: '', lat: '', lng: '', middleName: '',
                    zone: ''
                },
                statisticData: {
                    accidentType: '', pavementType: '', surface: '', accidentClassification: '',
                    roadState: '', roadProfile: '', roadCondition: '', climaticCondition: '',
                    verticalSignaling: '', horizontalSignaling: '', direction: '',
                    cause: '', additionalInfo: '',
                },
                vehicles: {
                    carPlate: '', carStatus: '', carBrand: '', carModel: '',
                    damageLevel: '', licenseLevel: '', firstLicense: '', expireDate: '',
                },
                involved: {
                    involvedName: '', involvedAge: '', involvedSex: '', involvedStreet: '',
                    involvedNumber: '', involvedCorner: '', involvedNeighborhood: '', involvedMom: '',
                    involvedReference: '', involvedSituation: '', involvedVehicleType: '', involvedVehiclePosition: '',
                    involvedSecurityCondition: '', involvedInjuryLevel: '', involvedProbableConduct: '',
                    involvedEvolution: ''
                }
            }
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
            death:alteration
        });
    }

    render() {
        /*
*         * Ano de Referência (ex: 2016)
*         * Data da Ocorrência
*         * Hora da Ocorrência
*         * Endereço Completo (Ex: Av. Brasil, 207, Centro, Cascavel, PR)
*         * Trecho
*         * Nome da Vítima
*         * Status da vítima
*         * Idade da vítima (somente número)
*         * Sexo
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
         * Quanto ao Usuário [Capacete]
         * Quanto ao Usuário [Cinto]
         * Quanto ao Usuário [Proteção do ocupante]
         * Quanto ao Usuário [Objetos laterais]
         * Quanto ao Usuário [Atenção ao trauma]
         * Outros itens avaliados [Alcoolemia]
         * Outros itens avaliados [Licenciamento]
         * Órgãos Responsáveis pelo Fornecimento dos Dados
         * Descritivo de possível causa
         * Principal(ais) causa(s) avaliada(s)
         */
        return (
            <div className="clearfix">
                <Grid>
                    <Row className="clearfix">
                        <Form onSubmit={this.handleEventSubmit} method={this.props.selectedEvent ? "put" : "post"}>
                            {/*{console.log(JSON.stringify(this.state, undefined, 4))}*/}
                            {/*<pre>*/}
                                {/*{JSON.stringify(this.state, undefined, 4)}*/}
                            {/*</pre>*/}
                            <Col xs={12} md={12} sm={12}>

                                {/*Geral
                                    * Ano de Referência (ex: 2016) -------------------------------------------------
                                    * Data da Ocorrência -----------------------------------------------------------
                                    * Hora da Ocorrência -----------------------------------------------------------
                                    * Endereço Completo (Ex: Av. Brasil, 207, Centro, Cascavel, PR)-----------------
                                    */}
                                <Row className="form-group clearfix">
                                    <h4>Geral</h4>
                                    <Row>
                                        <Col xs={2} md={2} sm={2}>
                                            <CustomInput value={this.state.death.general.year} type="number" id="year"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'general', 'year')}
                                                         label="Ano"/>
                                        </Col>
                                        <Col xs={2} md={2} sm={2}>
                                            <CustomInput value={this.state.death.general.time} type="time" id="time"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'general', 'time')}
                                                         label="Hora"/>
                                        </Col>
                                        <Col xs={2} md={2} sm={2}>
                                            <CustomInput value={this.state.death.general.number} type="text" id="number"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'general', 'number')}
                                                         label="Numero/KM"/>
                                        </Col>
                                        <Col xs={2} md={2} sm={2}>
                                            <CustomSelect value={this.state.death.statisticData.zone} id="zone"
                                                          name="zone"
                                                          onChange={this.saveAlteration.bind(this, 'statisticData', 'zone')}
                                                          options={this.props.options.statisticData.zones}
                                                          label="Zona"/>
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
                                            <CustomInput value={this.state.death.general.lat} type="number" id="lat"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'general', 'lat')}
                                                         label="Latitude"/>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={6} md={6} sm={6}>
                                            <CustomInput value={this.state.death.general.cross} type="text" id="cross"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'general', 'cross')}
                                                         label="Cruzamento"/>
                                        </Col>
                                        <Col xs={2} md={2} sm={2}>
                                            <CustomInput value={this.state.death.general.lng} type="number" id="lng"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'general', 'lng')}
                                                         label="Longitude"/>
                                        </Col>
                                    </Row>

                                </Row>

                                {/*Vitima
                                     * Nome da Vítima----------------------
                                     * Status da vítima--------------------
                                     * Idade da vítima (somente número)----
                                     * Sexo--------------------------------
                                */}
                                <Row className="form-group clearfix">
                                    <h4>Vítima</h4>
                                    <Row>
                                        <Col xs={8} md={8} sm={8}>
                                            <CustomInput value={this.state.death.involved.involvedName} type="text"
                                                         id="involvedName" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'involved', 'involvedName')}
                                                         label="Nome"/>
                                        </ Col>
                                    </Row>
                                    <Row>
                                        <Col xs={2} md={2} sm={2}>
                                            <CustomSelect value={this.state.death.involved.involvedSex} id="involvedSex"
                                                          name="involvedSex"
                                                          onChange={this.saveAlteration.bind(this, 'involved', 'involvedSex')}
                                                          options={this.props.options.involved.involvedSexes}
                                                          label="Sexo"/>
                                        </ Col>
                                        <Col xs={2} md={2} sm={2}>
                                            <CustomInput value={this.state.death.involved.involvedAge} type="number"
                                                     id="involvedAge" required="required"
                                                     onChange={this.saveAlteration.bind(this, 'involved', 'involvedAge')}
                                                     label="Idade"/>
                                        </ Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.involved.involvedVehiclePosition}
                                                          id="involvedVehiclePosition"
                                                          name="involvedVehiclePosition"
                                                          onChange={this.saveAlteration.bind(this, 'involved', 'involvedVehiclePosition')}
                                                          options={this.props.options.involved.involvedVehiclePositions}
                                                          label="Posição no Veículo"/>
                                        </Col>
                                    </Row>
                                    {/*<Row>*/}
                                        {/*<Col xs={4} md={4} sm={4}>*/}
                                            {/*<CustomInput value={this.state.death.involved.involvedStreet} type="text"*/}
                                                         {/*id="involvedStreet" required="required"*/}
                                                         {/*onChange={this.saveAlteration.bind(this, 'involved', 'involvedStreet')}*/}
                                                         {/*label="Rua"/>*/}
                                        {/*</Col>*/}
                                        {/*<Col xs={4} md={4} sm={4}>*/}
                                            {/*<CustomInput value={this.state.death.involved.involvedNumber} type="text"*/}
                                                         {/*id="involvedNumber" required="required"*/}
                                                         {/*onChange={this.saveAlteration.bind(this, 'involved', 'involvedNumber')}*/}
                                                         {/*label="Numero"/>*/}
                                        {/*</Col>*/}
                                        {/*<Col xs={4} md={4} sm={4}>*/}
                                            {/*<CustomInput value={this.state.death.involved.involvedCorner} type="text"*/}
                                                         {/*id="involvedCorner" required="required"*/}
                                                         {/*onChange={this.saveAlteration.bind(this, 'involved', 'involvedCorner')}*/}
                                                         {/*label="Esquina"/>*/}
                                        {/*</Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row>*/}
                                        {/*<Col xs={4} md={4} sm={4}>*/}
                                            {/*<CustomSelect value={this.state.death.involved.involvedNeighborhood}*/}
                                                          {/*id="involvedNeighborhood"*/}
                                                          {/*name="involvedNeighborhood"*/}
                                                          {/*onChange={this.saveAlteration.bind(this, 'involved', 'involvedNeighborhood')}*/}
                                                          {/*options={this.props.options.involved.involvedNeighborhoods}*/}
                                                          {/*label="Bairro"/>*/}
                                        {/*</Col>*/}
                                        {/*<Col xs={4} md={4} sm={4}>*/}
                                            {/*<CustomInput value={this.state.death.involved.involvedReference} type="text"*/}
                                                         {/*id="involvedReference" required="required"*/}
                                                         {/*onChange={this.saveAlteration.bind(this, 'involved', 'involvedReference')}*/}
                                                         {/*label="Referência"/>*/}
                                        {/*</Col>*/}
                                        {/*<Col xs={4} md={4} sm={4}>*/}
                                            {/*<CustomInput value={this.state.death.involved.involvedMom} type="text"*/}
                                                         {/*id="involvedMom" required="required"*/}
                                                         {/*onChange={this.saveAlteration.bind(this, 'involved', 'involvedMom')}*/}
                                                         {/*label="Nome da mãe"/>*/}
                                        {/*</Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row>*/}
                                        {/*<Col xs={4} md={4} sm={4}>*/}
                                            {/*<CustomSelect value={this.state.death.involved.involvedSituation}*/}
                                                          {/*id="involvedSituation"*/}
                                                          {/*name="involvedSituation"*/}
                                                          {/*onChange={this.saveAlteration.bind(this, 'involved', 'involvedSituation')}*/}
                                                          {/*options={this.props.options.involved.involvedSituations}*/}
                                                          {/*label="Situação"/>*/}
                                        {/*</Col>*/}
                                        {/*<Col xs={4} md={4} sm={4}>*/}
                                            {/*<CustomSelect value={this.state.death.involved.involvedVehicleType}*/}
                                                          {/*id="involvedVehicleType"*/}
                                                          {/*name="involvedVehicleType"*/}
                                                          {/*onChange={this.saveAlteration.bind(this, 'involved', 'involvedVehicleType')}*/}
                                                          {/*options={this.props.options.involved.involvedVehicleTypes}*/}
                                                          {/*label="Tipo de veiculo"/>*/}
                                        {/*</Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row>*/}
                                        {/*<Col xs={4} md={4} sm={4}>*/}
                                            {/*<CustomSelect value={this.state.death.involved.involvedSecurityCondition}*/}
                                                          {/*id="involvedSecurityCondition"*/}
                                                          {/*name="involvedSecurityCondition"*/}
                                                          {/*onChange={this.saveAlteration.bind(this, 'involved', 'involvedSecurityCondition')}*/}
                                                          {/*options={this.props.options.involved.involvedSecurityConditions}*/}
                                                          {/*label="Condição de segurança"/>*/}
                                        {/*</Col>*/}
                                        {/*<Col xs={4} md={4} sm={4}>*/}
                                            {/*<CustomSelect value={this.state.death.involved.involvedInjuryLevel}*/}
                                                          {/*id="involvedInjuryLevel"*/}
                                                          {/*name="involvedInjuryLevel"*/}
                                                          {/*onChange={this.saveAlteration.bind(this, 'involved', 'involvedInjuryLevel')}*/}
                                                          {/*options={this.props.options.involved.involvedInjuryLevels}*/}
                                                          {/*label="Gravidade da lesão"/>*/}
                                        {/*</Col>*/}
                                        {/*<Col xs={4} md={4} sm={4}>*/}
                                            {/*<CustomSelect value={this.state.death.involved.involvedProbableConduct}*/}
                                                          {/*id="involvedProbableConduct"*/}
                                                          {/*name="involvedProbableConduct"*/}
                                                          {/*onChange={this.saveAlteration.bind(this, 'involved', 'involvedProbableConduct')}*/}
                                                          {/*options={this.props.options.involved.involvedProbableConducts}*/}
                                                          {/*label="Conduta provável"/>*/}
                                        {/*</Col>*/}
                                    {/*</Row>*/}
                                    {/*<Row>*/}
                                        {/*<Col xs={12}>*/}
                                            {/*<CustomInput value={this.state.death.involved.involvedEvolution} type="text"*/}
                                                         {/*id="involvedEvolution" required="required"*/}
                                                         {/*onChange={this.saveAlteration.bind(this, 'involved', 'involvedEvolution')}*/}
                                                         {/*label="Evolução"/>*/}
                                        {/*</Col>*/}
                                    {/*</Row>*/}
                                </Row>

                                {/*Fatores de Risco*/}
                                <Row className="form-group clearfix">
                                    <h4>Fatores de Risco</h4>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.statisticData.accidentType}
                                                          id="accidentType" name="accidentType"
                                                          onChange={this.saveAlteration.bind(this, 'statisticData', 'accidentType')}
                                                          options={this.props.options.statisticData.accidentTypes}
                                                          label="Tipo de Acidente"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.statisticData.pavementType}
                                                          id="pavementType" name="pavementType"
                                                          onChange={this.saveAlteration.bind(this, 'statisticData', 'pavementType')}
                                                          options={this.props.options.statisticData.pavementTypes}
                                                          label="Tipo de Pavimento"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.statisticData.surface} id="surface"
                                                          name="surface"
                                                          onChange={this.saveAlteration.bind(this, 'statisticData', 'surface')}
                                                          options={this.props.options.statisticData.surfaces}
                                                          label="Superficie"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.statisticData.accidentClassification}
                                                          id="accidentClassification" name="accidentClassification"
                                                          onChange={this.saveAlteration.bind(this, 'statisticData', 'accidentClassification')}
                                                          options={this.props.options.statisticData.accidentClassifications}
                                                          label="Classificação do acidente"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.statisticData.roadState} id="roadState"
                                                          name="roadState"
                                                          onChange={this.saveAlteration.bind(this, 'statisticData', 'roadState')}
                                                          options={this.props.options.statisticData.roadStates}
                                                          label="Estado da pista"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.statisticData.roadProfile} id="roadProfile"
                                                          name="roadProfile"
                                                          onChange={this.saveAlteration.bind(this, 'statisticData', 'roadProfile')}
                                                          options={this.props.options.statisticData.roadProfiles}
                                                          label="Perfil da pista"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.statisticData.roadCondition}
                                                          id="roadCondition"
                                                          name="roadCondition"
                                                          onChange={this.saveAlteration.bind(this, 'statisticData', 'roadCondition')}
                                                          options={this.props.options.statisticData.roadConditions}
                                                          label="Condição da pista"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.statisticData.climaticCondition}
                                                          id="climaticCondition"
                                                          name="climaticCondition"
                                                          onChange={this.saveAlteration.bind(this, 'statisticData', 'climaticCondition')}
                                                          options={this.props.options.statisticData.climaticConditions}
                                                          label="Condição climática"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.statisticData.verticalSignaling}
                                                          id="verticalSignaling"
                                                          name="verticalSignaling"
                                                          onChange={this.saveAlteration.bind(this, 'statisticData', 'verticalSignaling')}
                                                          options={this.props.options.statisticData.verticalSignals}
                                                          label="Sinalização vertical"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.statisticData.horizontalSignaling}
                                                          id="horizontalSignaling"
                                                          name="horizontalSignaling"
                                                          onChange={this.saveAlteration.bind(this, 'statisticData', 'horizontalSignaling')}
                                                          options={this.props.options.statisticData.horizontalSignals}
                                                          label="Sinalização horizontal"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.statisticData.direction} id="direction"
                                                          name="direction"
                                                          onChange={this.saveAlteration.bind(this, 'statisticData', 'direction')}
                                                          options={this.props.options.statisticData.directions}
                                                          label="Direção"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.statisticData.cause} id="cause"
                                                          name="cause"
                                                          onChange={this.saveAlteration.bind(this, 'statisticData', 'cause')}
                                                          options={this.props.options.statisticData.causes}
                                                          label="Causa provável"/>
                                        </Col>
                                        <Col className="control-label" xs={8}>
                                            <CustomInput value={this.state.death.statisticData.additionalInfo} type="text"
                                                         id="additionalInfo" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'statisticData', 'additionalInfo')}
                                                         label="Informações adicionais"/>
                                        </Col>
                                    </Row>
                                </Row>

                                {/*Veículos*/}
                                <Row className="form-group clearfix">
                                    <h4>Veículos</h4>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.death.vehicles.carPlate} type="text" id="carPlate"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'vehicles', 'carPlate')}
                                                         label="Placa"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.vehicles.carStatus} id="carStatus"
                                                          name="carStatus"
                                                          onChange={this.saveAlteration.bind(this, 'vehicles', 'carStatus')}
                                                          options={this.props.options.vehicles.carStatuses}
                                                          label="Estado"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.death.vehicles.carBrand} type="text" id="carBrand"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'vehicles', 'carBrand')}
                                                         label="Marca"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.death.vehicles.carModel} type="text" id="carModel"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'vehicles', 'carModel')}
                                                         label="Modelo"/>
                                        </Col>
                                        <Col xs={8}>
                                            <CustomSelect value={this.state.death.vehicles.damageLevel} id="damageLevel"
                                                          name="damageLevel"
                                                          onChange={this.saveAlteration.bind(this, 'vehicles', 'damageLevel')}
                                                          options={this.props.options.vehicles.damageLevels}
                                                          label="Grau de avaria"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h5>Quanto ao condutor</h5>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomSelect value={this.state.death.vehicles.licenseLevel} id="licenseLevel"
                                                          name="licenseLevel"
                                                          onChange={this.saveAlteration.bind(this, 'vehicles', 'licenseLevel')}
                                                          options={this.props.options.vehicles.licenseLevels}
                                                          label="Categoria da habilitação"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.death.vehicles.firstLicense} type="date"
                                                         id="firstLicense" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'vehicles', 'firstLicense')}
                                                         label="Primeira habilitação"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.death.vehicles.expireDate} type="date"
                                                         id="expireDate" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'vehicles', 'expireDate')}
                                                         label="Vencimento da habilitação"/>
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

class DGrid extends Component {
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
                                <DForm options={this.state.options} selectedEvent={this.state.selectedEvent}/>
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
                    year:"",
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
                <PageHeader>Editar Obito</PageHeader>
                <div className="content" id="content">
                    <DForm options={this.state.options} selectedEvent={null}/>
                </div>
            </div>
        );
    }
}