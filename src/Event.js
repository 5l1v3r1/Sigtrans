import React, { Component } from 'react';
import CustomSubmit from './components/CustomSubmit'
import CustomInput from './components/CustomInput'
import {Form, Grid, Row, Col, PageHeader} from 'react-bootstrap';
import ReactTable from 'react-table';
import Button from 'react-toolbox/lib/button/Button';
import {Modal} from 'react-bootstrap';
import $ from 'jquery';
// import PubSub from 'pubsub-js';
// import ErrHandler from  './ErrHandler';

class EventForm extends Component{

	constructor() {
		super();
		this.state = {
			date:'',					street:'',						number:'',					cross:'',						lat:'',			lng:'',			middleName:'',
			accidentType:'',			pavementType:'',				surface:'',					accidentClassification:'',
			roadState:'',				roadProfile:'',					roadCondition:'',			climaticCondition:'',
			verticalSignaling:'', 		horizontalSignaling:'',			direction:'',
			zone:'', 					cause:'',						additionalInfo:'',
			carPlate:'',				carStatus:'', 					carBrand:'', 				carModel:'',
			damageLevel:'',				licenseLevel:'', 				firstLicense:'', 			expireDate:'',
			involvedName:'',			involvedAge:'',					involvedSex:'',				involvedStreet:'',
			involvedNumber:'',			involvedCorner:'',				involvedNeighborhood:'',
			involvedMom:'',				involvedReference:'',			involvedSituation:'',		involvedVehicleType:'',
			involvedVehiclePosition:'',	involvedSecurityCondition:'',	involvedInjuryLevel:'',		involvedProbableConduct:'',		involvedEvolution:''
		};
		this.handleEventSubmit = this.handleEventSubmit.bind(this);
	}

	handleEventSubmit(e){
		e.preventDefault();
		//TODO Comunicação com a API
		/* $.ajax({
		 url:'',
		 contentType:'application/json',
		 dataType:'json',
		 type:'post',
		 data: JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
		 success: function(novaListagem){
		 PubSub.publish('atualiza-lista-autores',novaListagem);
		 this.setState({nome:'',email:'',senha:''});
		 }.bind(this),
		 error: function(resposta){
		 if(resposta.status === 400) {
		 new ErrHandler().publicaErros(resposta.responseJSON);
		 }
		 },
		 beforeSend: function(){
		 PubSub.publish("limpa-erros",{});
		 }
		 });*/
	}

	saveAlteration(inputName, e){
		this.setState({[inputName]:e.target.value});
	}

	render() {

		//Statistic Data
		var accidentTypes =             this.props.options.statisticData.accidentTypes.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var pavementTypes =             this.props.options.statisticData.pavementTypes.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var surfaces =                  this.props.options.statisticData.surfaces.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var accidentClassifications =   this.props.options.statisticData.accidentClassifications.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var roadStates =                this.props.options.statisticData.roadStates.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var roadProfiles =              this.props.options.statisticData.roadProfiles.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var roadConditions =            this.props.options.statisticData.roadConditions.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var climaticConditions =        this.props.options.statisticData.climaticConditions.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var horizontalSignals =         this.props.options.statisticData.horizontalSignals.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var verticalSignals =           this.props.options.statisticData.verticalSignals.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var directions =                this.props.options.statisticData.directions.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var zones =                     this.props.options.statisticData.zones.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var causes =                    this.props.options.statisticData.causes.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		//Vehicles
		var carStatuses =               this.props.options.vehicles.carStatuses.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var damageLevels =              this.props.options.vehicles.damageLevels.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var licenseLevels =             this.props.options.vehicles.conductor.licenseLevels.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		//involved
		var involvedSexes =             this.props.options.involved.involvedSexes.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var involvedNeighborhoods =     this.props.options.involved.involvedNeighborhoods.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var involvedSituations =        this.props.options.involved.involvedSituations.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var involvedVehicleTypes =      this.props.options.involved.involvedVehicleTypes.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var involvedVehiclePositions =  this.props.options.involved.involvedVehiclePositions.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var involvedSecurityConditions =this.props.options.involved.involvedSecurityConditions.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
		var involvedInjuryLevels =      this.props.options.involved.involvedInjuryLevels.map(function(type){
			return <option key={type.id} value={type.id}>{type.value}</option>;
		});
        var involvedProbableConducts =  this.props.options.involved.involvedProbableConducts.map(function(type){
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });

		return (
			<div className="clearfix">
				<Grid>
					<Row className="clearfix">
						<Form onSubmit={this.handleEventSubmit} method="post">
							{/*<pre>
								 {JSON.stringify(this.state,undefined,4)}
							</pre>*/}
							<Col xs={12} md={12} sm={12}>

								{/*Geral*/}
								<Row className="form-group">
									<h4>Geral</h4>
									<Row>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="date" id="date" required="required" onChange={this.saveAlteration.bind(this, 'date')} label="Data"/>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="text" id="street" required="required" onChange={this.saveAlteration.bind(this,'street')} label="Rua"/>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="text" id="number" required="required" onChange={this.saveAlteration.bind(this,'number')} label="Numero"/>
										</Col>
									</Row>

									<Row>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="text" id="cross" required="required" onChange={this.saveAlteration.bind(this,'cross')} label="Cruzamento"/>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="number" id="lat" required="required" onChange={this.saveAlteration.bind(this,'lat')} label="Latitude"/>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="number" id="lng" required="required" onChange={this.saveAlteration.bind(this,'lng')} label="Longitude"/>
										</Col>
									</Row>

									<Row>
										<Col xs={12}>
											<CustomInput type="text" id="middleName" required="required" onChange={this.saveAlteration.bind(this,'middleName')} label="Nome do meio / Inicial"/>
										</Col>
									</Row>

								</Row>

								{/*Dados Estatisticos*/}
								<Row className="form-group">
									<h4>Dados estatísticos</h4>
									<Row>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="accidentType">Tipo de Acidente</label>
											<select value={this.state.accidentType} name="accidentType" id="accidentType" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'accidentType')}>
												<option value="">Selecione</option>
												{accidentTypes}
											</select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="pavementType">Tipo de Pavimento</label>
											<select value={this.state.pavementType} name="pavementType" id="pavementType" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'pavementType')}>
												<option value="">Selecione</option>
												{pavementTypes}
											</select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="surface">Superficie</label>
											<select value={this.state.surface} name="surface" id="surface" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'surface')}>
												<option value="">Selecione</option>
												{surfaces}
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="accidentClassification">Classificação do acidente</label>
											<select value={this.state.accidentClassification} name="accidentClassification" id="accidentClassification" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'accidentClassification')}>
												<option value="">Selecione</option>
												{accidentClassifications}
											</select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="roadState">Estado da pista</label>
											<select value={this.state.roadState} name="roadState" id="roadState" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'roadState')}>
												<option value="">Selecione</option>
												{roadStates}
											</select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="roadProfile">Perfil da pista</label>
											<select value={this.state.roadProfile} name="roadProfile" id="roadProfile" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'roadProfile')}>
												<option value="">Selecione</option>
												{roadProfiles}
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="roadCondition">Condição da pista</label>
											<select value={this.state.roadCondition} name="roadCondition" id="roadCondition" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'roadCondition')}>
												<option value="">Selecione</option>
												{roadConditions}
											</select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="climaticCondition">Condição climática</label>
											<select value={this.state.climaticCondition} name="climaticCondition" id="climaticCondition" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'climaticCondition')}>
												<option value="">Selecione</option>
												{climaticConditions}
											</select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="verticalSignaling">Sinalização vertical</label>
											<select value={this.state.verticalSignaling} name="verticalSignaling" id="verticalSignaling" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'verticalSignaling')}>
												<option value="">Selecione</option>
												{verticalSignals}
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="horizontalSignaling">Sinalização horizontal</label>
											<select value={this.state.horizontalSignaling} name="horizontalSignaling" id="horizontalSignaling" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'horizontalSignaling')}>
												<option value="">Selecione</option>
												{horizontalSignals}
											</select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="direction">Direção</label>
											<select value={this.state.direction} name="direction" id="direction" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'direction')}>
												<option value="">Selecione</option>
												{directions}
											</select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="zone">Zona</label>
											<select value={this.state.zone} name="zone" id="zone" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'zone')}>
												<option value="">Selecione</option>
												{zones}
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="cause">Causa provável</label>
											<select value={this.state.cause} name="cause" id="cause" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'cause')}>
												<option value="">Selecione</option>
												{causes}
											</select>
										</Col>
										<Col className="control-label" xs={8}>
											<CustomInput type="text" id="additionalInfo" required="required" onChange={this.saveAlteration.bind(this,'additionalInfo')} label="Informações adicionais"/>
										</Col>
									</Row>
								</Row>

								{/*Veículos*/}
								<Row className="form-group">
									<h4>Veículos</h4>
									<Row>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="text" id="carPlate" required="required" onChange={this.saveAlteration.bind(this,'carPlate')} label="Placa"/>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="carStatus">Estado</label>
                                            <select value={this.state.carStatus} name="carStatus" id="carStatus" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'carStatus')}>
                                                <option value="">Selecione</option>
                                                {carStatuses}
                                            </select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="text" id="carBrand" required="required" onChange={this.saveAlteration.bind(this,'carBrand')} label="Marca"/>
										</Col>
									</Row>
									<Row>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="text" id="carModel" required="required" onChange={this.saveAlteration.bind(this,'carModel')} label="Modelo"/>
										</Col>
										<Col xs={8}>
											<label className="control-label" htmlFor="damageLevel">Grau de avaria</label>
                                            <select value={this.state.damageLevel} name="damageLevel" id="damageLevel" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'damageLevel')}>
                                                <option value="">Selecione</option>
                                                {damageLevels}
                                            </select>
										</Col>
									</Row>
									<Row>
										<h5>Quanto ao condutor</h5>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="licenseLevel">Categoria da habilitação</label>
                                            <select value={this.state.licenseLevel} name="licenseLevel" id="licenseLevel" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'licenseLevel')}>
                                                <option value="">Selecione</option>
                                                {licenseLevels}
                                            </select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="date" id="firstLicense" required="required" onChange={this.saveAlteration.bind(this,'firstLicense')} label="Primeira habilitação"/>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="date" id="expireDate" required="required" onChange={this.saveAlteration.bind(this,'expireDate')} label="Vencimento da habilitação"/>
										</Col>
									</Row>
								</Row>

								{/*Envolvidos*/}
								<Row className="form-group">
									<h4>Envolvidos</h4>
									<Row>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="text" id="involvedName" required="required" onChange={this.saveAlteration.bind(this,'involvedName')} label="Nome"/>
										</ Col>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="number" id="involvedAge" required="required" onChange={this.saveAlteration.bind(this,'involvedAge')} label="Idade"/>
										</ Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="involvedSex">Sexo</label>
                                            <select value={this.state.involvedSex} name="involvedSex" id="involvedSex" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'involvedSex')}>
                                                <option value="">Selecione</option>
                                                {involvedSexes}
                                            </select>
										</ Col>
									</Row>
									<Row>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="text" id="involvedStreet" required="required" onChange={this.saveAlteration.bind(this,'involvedStreet')} label="Rua"/>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="text" id="involvedNumber" required="required" onChange={this.saveAlteration.bind(this,'involvedNumber')} label="Numero"/>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="text" id="involvedCorner" required="required" onChange={this.saveAlteration.bind(this,'involvedCorner')} label="Esquina"/>
										</Col>
									</Row>
									<Row>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="involvedNeighborhood">Bairro</label>
                                            <select value={this.state.involvedNeighborhood} name="involvedNeighborhood" id="involvedNeighborhood" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'involvedNeighborhood')}>
                                                <option value="">Selecione</option>
                                                {involvedNeighborhoods}
                                            </select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="text" id="involvedReference" required="required" onChange={this.saveAlteration.bind(this,'involvedReference')} label="Referência"/>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<CustomInput type="text" id="involvedMom" required="required" onChange={this.saveAlteration.bind(this,'involvedMom')} label="Nome da mãe"/>
										</Col>
									</Row>
									<Row>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="involvedSituation">Situação</label>
                                            <select value={this.state.involvedSituation} name="involvedSituation" id="involvedSituation" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'involvedSituation')}>
                                                <option value="">Selecione</option>
                                                {involvedSituations}
                                            </select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="involvedVehicleType">Tipo de veiculo</label>
                                            <select value={this.state.involvedVehicleType} name="involvedVehicleType" id="involvedVehicleType" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'involvedVehicleType')}>
                                                <option value="">Selecione</option>
                                                {involvedVehicleTypes}
                                            </select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="involvedVehiclePosition">Posição no Veículo</label>
                                            <select value={this.state.involvedVehiclePosition} name="involvedVehiclePosition" id="involvedVehiclePosition" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'involvedVehiclePosition')}>
                                                <option value="">Selecione</option>
                                                {involvedVehiclePositions}
                                            </select>
										</Col>
									</Row>
									<Row>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="involvedSecurityCondition">Condição de segurança</label>
                                            <select value={this.state.involvedSecurityCondition} name="involvedSecurityCondition" id="involvedSecurityCondition" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'involvedSecurityCondition')}>
                                                <option value="">Selecione</option>
                                                {involvedSecurityConditions}
                                            </select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="involvedInjuryLevel">Gravidade da lesão</label>
                                            <select value={this.state.involvedInjuryLevel} name="involvedInjuryLevel" id="involvedInjuryLevel" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'involvedInjuryLevel')}>
                                                <option value="">Selecione</option>
                                                {involvedInjuryLevels}
                                            </select>
										</Col>
										<Col xs={4} md={4} sm={4}>
											<label className="control-label" htmlFor="involvedProbableConduct">Conduta provável</label>
                                            <select value={this.state.involvedProbableConduct} name="involvedProbableConduct" id="involvedProbableConduct" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'involvedProbableConduct')}>
                                                <option value="">Selecione</option>
                                                {involvedProbableConducts}
                                            </select>
										</Col>
									</Row>
									<Row>
										<Col xs={12}>
											<CustomInput type="text" id="involvedEvolution" required="required" onChange={this.saveAlteration.bind(this,'involvedEvolution')} label="Evolução"/>
										</Col>
									</Row>
								</Row>

								<Row>

									<Col xs={1} xsOffset={11}>
										<CustomSubmit label="Gravar"/>
									</Col>
								</Row>
							</Col>

						</Form>
					</Row>
				</Grid>
			</div>
		);
	}

}

export class EventTable extends Component{
	constructor(props){
		super(props);
		this.state= {
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
					conductor: {
						licenseLevels: [],
						firstLicense: "",
						expireDate: ""
					}
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
                    involvedProbableConducts:[],
					involvedEvolution: ""
				}
			},
			selectedEvent:'',
			data:[],
		};
		this.handleToggle = this.handleToggle.bind(this);
	}

	componentDidMount(){
        this.setState({loading: true})
        $.ajax({
            url:'https://ocorrencias-teste-api.herokuapp.com/api/events/open',
            dataType: 'json',
            type:'GET',
            crossDomain: true,
            success: function(res) {
                this.setState({
                    data: res,
                    loading: false,
                })
            }.bind(this)
        });
		$.ajax({
			url:'https://ocorrencias-teste-api.herokuapp.com/api/options',
			dataType: 'json',
			type:'GET',
			crossDomain: true,
			success: function(data) {
				this.setState({options: data});
			}.bind(this)
		});
		/*PubSub.subscribe('update-events-list',function(topico,novaLista){
		 this.setState({lista:novaLista});
		 }.bind(this));*/
	}

	handleToggle(e){
		if(!this.state.selectedEvent || !this.state.showModal)
            this.setState({selectedEvent: e.target.id});
		this.setState({showModal: !this.state.showModal});
	}

	render(){
		const columns = [{
			header: 'Ocorrencias Abertas',
			headerClassName: 'open-events',
			columns: [{
				style:{textAlign:"center"},
				header: 'Data',
				accessor: 'general.date'
			},{
				style:{textAlign:"center"},
				header: 'Rua',
				accessor: 'general.street'
			}, {
				style:{textAlign:"center"},
				header: 'Numero/KM',
				accessor: 'general.number'
			},{
				style:{textAlign:"center"},
				header: 'Cruzamento com',
				accessor: 'general.cross'
			},{
				style:{textAlign:"center"},
				header: 'Bairro',
				accessor: 'involved.involvedNeighborhood'
			},{
				style:{textAlign:"center"},
				header: 'Referencia',
				accessor: 'involved.involvedReference'
			},{
				style:{textAlign:"center"},
				header: 'Editar',
				accessor: 'id',
				render: props => (
						<Button icon="edit" primary id={props.value} onClick={this.handleToggle}/>
				)
			}]
		}];

		return(
			<div>
				<PageHeader>Ocorrências <small>(Abertas)</small> </PageHeader>
				<div className="content" id="content">
					<ReactTable
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
								<Modal.Title id="contained-modal-title">Ocorrência <small>Id da ocorrência: {this.state.selectedEvent}</small></Modal.Title>
							</Modal.Header>

							<Modal.Body>
								<EventForm options={this.state.options}/>
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
					conductor: {
						licenseLevels: [],
						firstLicense: "",
						expireDate: ""
					}
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
                    involvedProbableConducts:[],
					involvedEvolution: ""
				}
			}
		};
	}

	componentDidMount(){
		 $.ajax({
			 url:'https://ocorrencias-teste-api.herokuapp.com/api/options',
			 dataType: 'json',
			 type:'GET',
			 crossDomain: true,
			 success: function(data) {
				this.setState({options: data});
			 }.bind(this)
		 });

		/*PubSub.subscribe('update-events-list',function(topico,novaLista){
		 this.setState({lista:novaLista});
		 }.bind(this));*/
	}

	render(){
		return (
			<div>
				<PageHeader>Criar ocorrência</PageHeader>
				<div className="content" id="content">
					<EventForm options={this.state.options}/>
				</div>
			</div>
		);
	}
}