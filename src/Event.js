import React, {Component} from 'react';
import CustomSubmit from './components/CustomSubmit'
import CustomInput from './components/CustomInput'
import {Form, Grid, Row, Col, PageHeader} from 'react-bootstrap';
import ReactTable from 'react-table';
import Button from 'react-toolbox/lib/button/Button';
import {Modal} from 'react-bootstrap';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import ErrHandler from  './ErrHandler';

class EventForm extends Component {
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
        });
        this.handleEventSubmit = this.handleEventSubmit.bind(this);
    }

    handleEventSubmit(e){
        e.preventDefault();
    	let selectedID=this.props.selectedEvent?this.props.selectedEvent.id:null;
    	$.ajax({
             url:selectedID!=null?"https://ocorrencias-teste-api.herokuapp.com/api/events/open/:"+selectedID:"https://ocorrencias-teste-api.herokuapp.com/api/events/open",
             contentType:'application/json',
             crossDomain:'true',
             crossOrigin:'true',
             dataType:'json',
             type: selectedID? 'put' : 'post',
             data: JSON.stringify(this.state),
             success: function(newData){
                PubSub.publish('update-events',newData);
                this.setState(this.state);
             }.bind(this),
             error: function(resposta){
                 if(resposta.status === 400) {
                     new ErrHandler().publicaErros(resposta.responseJSON);
                 }
             },
             beforeSend: function(){
                 PubSub.publish("limpa-erros",{});
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

    render() {

        //Statistic Data
        let accidentTypes = this.props.options.statisticData.accidentTypes.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let pavementTypes = this.props.options.statisticData.pavementTypes.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let surfaces = this.props.options.statisticData.surfaces.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let accidentClassifications = this.props.options.statisticData.accidentClassifications.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let roadStates = this.props.options.statisticData.roadStates.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let roadProfiles = this.props.options.statisticData.roadProfiles.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let roadConditions = this.props.options.statisticData.roadConditions.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let climaticConditions = this.props.options.statisticData.climaticConditions.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let horizontalSignals = this.props.options.statisticData.horizontalSignals.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let verticalSignals = this.props.options.statisticData.verticalSignals.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let directions = this.props.options.statisticData.directions.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let zones = this.props.options.statisticData.zones.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let causes = this.props.options.statisticData.causes.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        //Vehicles
        let carStatuses = this.props.options.vehicles.carStatuses.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let damageLevels = this.props.options.vehicles.damageLevels.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let licenseLevels = this.props.options.vehicles.licenseLevels.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        //involved
        let involvedSexes = this.props.options.involved.involvedSexes.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let involvedNeighborhoods = this.props.options.involved.involvedNeighborhoods.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let involvedSituations = this.props.options.involved.involvedSituations.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let involvedVehicleTypes = this.props.options.involved.involvedVehicleTypes.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let involvedVehiclePositions = this.props.options.involved.involvedVehiclePositions.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let involvedSecurityConditions = this.props.options.involved.involvedSecurityConditions.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let involvedInjuryLevels = this.props.options.involved.involvedInjuryLevels.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        let involvedProbableConducts = this.props.options.involved.involvedProbableConducts.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });

        return (
            <div className="clearfix">
                <Grid>
                    <Row className="clearfix">
                        <Form onSubmit={this.handleEventSubmit} method={this.props.selectedEvent ? "put" : "post"}>
                            {/*<pre>*/}
                            {/*{JSON.stringify(this.state, undefined, 4)}*/}
                            {/*</pre>*/}
                            <Col xs={12} md={12} sm={12}>

                                {/*Geral*/}
                                <Row className="form-group clearfix">
                                    <h4>Geral</h4>
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

                                {/*Dados Estatisticos*/}
                                <Row className="form-group clearfix">
                                    <h4>Dados estatísticos</h4>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="accidentType">Tipo de
                                                Acidente</label>
                                            <select value={this.state.statisticData.accidentType} name="accidentType"
                                                    id="accidentType" className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'statisticData', 'accidentType')}>
                                                <option value="">Selecione</option>
                                                {accidentTypes}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="pavementType">Tipo de
                                                Pavimento</label>
                                            <select value={this.state.statisticData.pavementType} name="pavementType"
                                                    id="pavementType" className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'statisticData', 'pavementType')}>
                                                <option value="">Selecione</option>
                                                {pavementTypes}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="surface">Superficie</label>
                                            <select value={this.state.statisticData.surface} name="surface" id="surface"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'statisticData', 'surface')}>
                                                <option value="">Selecione</option>
                                                {surfaces}
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="accidentClassification">Classificação
                                                do acidente</label>
                                            <select value={this.state.statisticData.accidentClassification}
                                                    name="accidentClassification" id="accidentClassification"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'statisticData', 'accidentClassification')}>
                                                <option value="">Selecione</option>
                                                {accidentClassifications}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="roadState">Estado da pista</label>
                                            <select value={this.state.statisticData.roadState} name="roadState"
                                                    id="roadState" className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'statisticData', 'roadState')}>
                                                <option value="">Selecione</option>
                                                {roadStates}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="roadProfile">Perfil da
                                                pista</label>
                                            <select value={this.state.statisticData.roadProfile} name="roadProfile"
                                                    id="roadProfile" className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'statisticData', 'roadProfile')}>
                                                <option value="">Selecione</option>
                                                {roadProfiles}
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="roadCondition">Condição da
                                                pista</label>
                                            <select value={this.state.statisticData.roadCondition} name="roadCondition"
                                                    id="roadCondition" className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'statisticData', 'roadCondition')}>
                                                <option value="">Selecione</option>
                                                {roadConditions}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="climaticCondition">Condição
                                                climática</label>
                                            <select value={this.state.statisticData.climaticCondition}
                                                    name="climaticCondition" id="climaticCondition"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'statisticData', 'climaticCondition')}>
                                                <option value="">Selecione</option>
                                                {climaticConditions}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="verticalSignaling">Sinalização
                                                vertical</label>
                                            <select value={this.state.statisticData.verticalSignaling}
                                                    name="verticalSignaling" id="verticalSignaling"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'statisticData', 'verticalSignaling')}>
                                                <option value="">Selecione</option>
                                                {verticalSignals}
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="horizontalSignaling">Sinalização
                                                horizontal</label>
                                            <select value={this.state.statisticData.horizontalSignaling}
                                                    name="horizontalSignaling" id="horizontalSignaling"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'statisticData', 'horizontalSignaling')}>
                                                <option value="">Selecione</option>
                                                {horizontalSignals}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="direction">Direção</label>
                                            <select value={this.state.statisticData.direction} name="direction"
                                                    id="direction" className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'statisticData', 'direction')}>
                                                <option value="">Selecione</option>
                                                {directions}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="zone">Zona</label>
                                            <select value={this.state.statisticData.zone} name="zone" id="zone"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'statisticData', 'zone')}>
                                                <option value="">Selecione</option>
                                                {zones}
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="cause">Causa provável</label>
                                            <select value={this.state.statisticData.cause} name="cause" id="cause"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'statisticData', 'cause')}>
                                                <option value="">Selecione</option>
                                                {causes}
                                            </select>
                                        </Col>
                                        <Col className="control-label" xs={8}>
                                            <CustomInput value={this.state.statisticData.additionalInfo} type="text"
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
                                            <CustomInput value={this.state.vehicles.carPlate} type="text" id="carPlate"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'vehicles', 'carPlate')}
                                                         label="Placa"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="carStatus">Estado</label>
                                            <select value={this.state.vehicles.carStatus} name="carStatus"
                                                    id="carStatus" className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'vehicles', 'carStatus')}>
                                                <option value="">Selecione</option>
                                                {carStatuses}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.vehicles.carBrand} type="text" id="carBrand"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'vehicles', 'carBrand')}
                                                         label="Marca"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.vehicles.carModel} type="text" id="carModel"
                                                         required="required"
                                                         onChange={this.saveAlteration.bind(this, 'vehicles', 'carModel')}
                                                         label="Modelo"/>
                                        </Col>
                                        <Col xs={8}>
                                            <label className="control-label" htmlFor="damageLevel">Grau de
                                                avaria</label>
                                            <select value={this.state.vehicles.damageLevel} name="damageLevel"
                                                    id="damageLevel" className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'vehicles', 'damageLevel')}>
                                                <option value="">Selecione</option>
                                                {damageLevels}
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h5>Quanto ao condutor</h5>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="licenseLevel">Categoria da
                                                habilitação</label>
                                            <select value={this.state.vehicles.licenseLevel} name="licenseLevel"
                                                    id="licenseLevel" className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'vehicles', 'licenseLevel')}>
                                                <option value="">Selecione</option>
                                                {licenseLevels}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.vehicles.firstLicense} type="date"
                                                         id="firstLicense" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'vehicles', 'firstLicense')}
                                                         label="Primeira habilitação"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.vehicles.expireDate} type="date"
                                                         id="expireDate" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'vehicles', 'expireDate')}
                                                         label="Vencimento da habilitação"/>
                                        </Col>
                                    </Row>
                                </Row>

                                {/*Envolvidos*/}
                                <Row className="form-group clearfix">
                                    <h4>Envolvidos</h4>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.involved.involvedName} type="text"
                                                         id="involvedName" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'involved', 'involvedName')}
                                                         label="Nome"/>
                                        </ Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.involved.involvedAge} type="number"
                                                         id="involvedAge" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'involved', 'involvedAge')}
                                                         label="Idade"/>
                                        </ Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="involvedSex">Sexo</label>
                                            <select value={this.state.involved.involvedSex} name="involvedSex"
                                                    id="involvedSex" className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'involved', 'involvedSex')}>
                                                <option value="">Selecione</option>
                                                {involvedSexes}
                                            </select>
                                        </ Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.involved.involvedStreet} type="text"
                                                         id="involvedStreet" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'involved', 'involvedStreet')}
                                                         label="Rua"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.involved.involvedNumber} type="text"
                                                         id="involvedNumber" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'involved', 'involvedNumber')}
                                                         label="Numero"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.involved.involvedCorner} type="text"
                                                         id="involvedCorner" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'involved', 'involvedCorner')}
                                                         label="Esquina"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label"
                                                   htmlFor="involvedNeighborhood">Bairro</label>
                                            <select value={this.state.involved.involvedNeighborhood}
                                                    name="involvedNeighborhood" id="involvedNeighborhood"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'involved', 'involvedNeighborhood')}>
                                                <option value="">Selecione</option>
                                                {involvedNeighborhoods}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.involved.involvedReference} type="text"
                                                         id="involvedReference" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'involved', 'involvedReference')}
                                                         label="Referência"/>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <CustomInput value={this.state.involved.involvedMom} type="text"
                                                         id="involvedMom" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'involved', 'involvedMom')}
                                                         label="Nome da mãe"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label"
                                                   htmlFor="involvedSituation">Situação</label>
                                            <select value={this.state.involved.involvedSituation}
                                                    name="involvedSituation" id="involvedSituation"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'involved', 'involvedSituation')}>
                                                <option value="">Selecione</option>
                                                {involvedSituations}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="involvedVehicleType">Tipo de
                                                veiculo</label>
                                            <select value={this.state.involved.involvedVehicleType}
                                                    name="involvedVehicleType" id="involvedVehicleType"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'involved', 'involvedVehicleType')}>
                                                <option value="">Selecione</option>
                                                {involvedVehicleTypes}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="involvedVehiclePosition">Posição
                                                no Veículo</label>
                                            <select value={this.state.involved.involvedVehiclePosition}
                                                    name="involvedVehiclePosition" id="involvedVehiclePosition"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'involved', 'involvedVehiclePosition')}>
                                                <option value="">Selecione</option>
                                                {involvedVehiclePositions}
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="involvedSecurityCondition">Condição
                                                de segurança</label>
                                            <select value={this.state.involved.involvedSecurityCondition}
                                                    name="involvedSecurityCondition" id="involvedSecurityCondition"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'involved', 'involvedSecurityCondition')}>
                                                <option value="">Selecione</option>
                                                {involvedSecurityConditions}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="involvedInjuryLevel">Gravidade da
                                                lesão</label>
                                            <select value={this.state.involved.involvedInjuryLevel}
                                                    name="involvedInjuryLevel" id="involvedInjuryLevel"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'involved', 'involvedInjuryLevel')}>
                                                <option value="">Selecione</option>
                                                {involvedInjuryLevels}
                                            </select>
                                        </Col>
                                        <Col xs={4} md={4} sm={4}>
                                            <label className="control-label" htmlFor="involvedProbableConduct">Conduta
                                                provável</label>
                                            <select value={this.state.involved.involvedProbableConduct}
                                                    name="involvedProbableConduct" id="involvedProbableConduct"
                                                    className="form-control control-label"
                                                    onChange={this.saveAlteration.bind(this, 'involved', 'involvedProbableConduct')}>
                                                <option value="">Selecione</option>
                                                {involvedProbableConducts}
                                            </select>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <CustomInput value={this.state.involved.involvedEvolution} type="text"
                                                         id="involvedEvolution" required="required"
                                                         onChange={this.saveAlteration.bind(this, 'involved', 'involvedEvolution')}
                                                         label="Evolução"/>
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

export class EventTable extends Component {
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
        PubSub.subscribe('update-events',function(topicName,newData){
            this.setState({data:newData, showModal:false, selectedEvent:''});
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
                                <EventForm options={this.state.options} selectedEvent={this.state.selectedEvent}/>
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

export default class EventBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
                <PageHeader>Criar ocorrência</PageHeader>
                <div className="content" id="content">
                    <EventForm options={this.state.options} selectedEvent={null}/>
                </div>
            </div>
        );
    }
}