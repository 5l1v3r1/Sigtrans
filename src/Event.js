import React, { Component } from 'react';
// import $ from 'jquery';
import CustomSubmit from './components/CustomSubmit'
import CustomInput from './components/CustomInput'
// import PubSub from 'pubsub-js';
// import ErrHandler from  './ErrHandler';
import {Form, Grid, Row, Col, PageHeader} from 'react-bootstrap';

class FormOcorrencia extends Component{
	
	constructor() {
		super();
		this.state = {
						date:'',					street:'',						number:'',					cross:'',
						accidentType:'',			pavementType:'',				surface:'',					accidentClassification:'',
						roadState:'',				roadProfile:'',					roadCondition:'',			climaticCondition:'',
						verticalSinalization:'', 	horizontalSinalization:'',		direction:'',				lt:'',
						zone:'', 					cause:'',						additionalInfo:'',			lng:'',
						carPlate:'',				carStatus:'', 					carBrand:'', 				carModel:'',
						damageLevel:'',				licenseLevel:'', 				firstLicense:'', 			expireDate:'',
						involvedName:'',			involvedAge:'',					involvedSex:'',				involvedStreet:'',
						involvedNumber:'',			involvedCorner:'',				involvedNeighborhood:'',	middleName:'',
						involvedMom:'',				involvedReference:'',			involvedSituation:'',		involvedVehicleType:'',
						involvedVehiclePosition:'',	involvedSecurityCondition:'',	involvedInjuryLevel:'',		involvedEvolution:''
		};
		this.handleEventSubmit = this.handleEventSubmit.bind(this);
	}

	handleEventSubmit(e){
		e.preventDefault();
		/* Alterar
		$.ajax({
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
        var accidentTypes = this.props.accidentTypes.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });
			return (
				<Grid>
					<Row>
						<Form onSubmit={this.handleEventSubmit} method="post">
								<pre>
									{JSON.stringify(this.state,undefined,4)}
								</pre>
							<Col xs={12} md={12} sm={12}>


								<Row>
									<Col xs={1} xsOffset={11}>
										<CustomSubmit label="Gravar"/>
									</Col>
								</Row>

								{/*Geral*/}
								<Row className="form-group">
									<h4>Geral</h4>
									<Row>
										<Col xs={4}>
											<CustomInput type="date" id="date" required="required" onChange={this.saveAlteration.bind(this, 'date')} label="Data"/>
										</Col>
										<Col xs={4}>
											<CustomInput type="text" id="street" required="required" onChange={this.saveAlteration.bind(this,'street')} label="Rua"/>
										</Col>
										<Col xs={4}>
											<CustomInput type="text" id="number" required="required" onChange={this.saveAlteration.bind(this,'number')} label="Numero"/>
										</Col>
									</Row>

									<Row>
										<Col xs={4}>
											<CustomInput type="text" id="cross" required="required" onChange={this.saveAlteration.bind(this,'cross')} label="Cruzamento"/>
										</Col>
										<Col xs={4}>
											<CustomInput type="number" id="lt" required="required" onChange={this.saveAlteration.bind(this,'lt')} label="Latitude"/>
										</Col>
										<Col xs={4}>
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
										<Col xs={4}>
											<label className="control-label" htmlFor="accidentType">Tipo de Acidente</label>
											<select value={this.state.accidentType} name="accidentType" id="accidentType" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'accidentType')}>
												<option value="">Selecione</option>
                                                {accidentTypes}
											</select>
											{/*<select name="acidentType" id="acidentType" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>*/}
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="pavementType">Tipo de Pavimento</label>
											<select name="pavementType" id="pavementType" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="surface">Superficie</label>
											<select name="surface" id="surface" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
											<label className="control-label" htmlFor="accidentClassification">Classificação do acidente</label>
											<select name="accidentClassification" id="accidentClassification" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="roadState">Estado da pista</label>
											<select name="roadState" id="roadState" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="roadProfile">Perfil da pista</label>
											<select name="roadProfile" id="roadProfile" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
											<label className="control-label" htmlFor="roadCondition">Condição da pista</label>
											<select name="roadCondition" id="roadCondition" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="climaticCondition">Condição climática</label>
											<select name="climaticCondition" id="climaticCondition" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="verticalSinalization">Sinalização vertical</label>
											<select name="verticalSinalization" id="verticalSinalization" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
											<label className="control-label" htmlFor="horizontalSinalization">Sinalização horizontal</label>
											<select name="horizontalSinalization" id="horizontalSinalization" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="direction">Direção</label>
											<select name="direction" id="direction" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="zone">Zona</label>
											<select name="zone" id="zone" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
											<label className="control-label" htmlFor="cause">Causa provável</label>
											<select name="cause" id="cause" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
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
										<Col xs={4}>
											<CustomInput type="text" id="carPlate" required="required" onChange={this.saveAlteration.bind(this,'carPlate')} label="Placa"/>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="carStatus">Estado</label>
											<select name="carStatus" id="carStatus" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<CustomInput type="text" id="carBrand" required="required" onChange={this.saveAlteration.bind(this,'carBrand')} label="Marca"/>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
											<CustomInput type="text" id="carModel" required="required" onChange={this.saveAlteration.bind(this,'carModel')} label="Modelo"/>
										</Col>
										<Col xs={8}>
											<label className="control-label" htmlFor="damageLevel">Grau de avaria</label>
											<select name="damageLevel" id="damageLevel" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
									</Row>
									<Row>
										<h5>Quanto ao condutor</h5>
										<Col xs={4}>
											<label className="control-label" htmlFor="licenseLevel">Categoria da habilitação</label>
											<select name="licenseLevel" id="licenseLevel" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<CustomInput type="date" id="firstLicense" required="required" onChange={this.saveAlteration.bind(this,'firstLicense')} label="Primeira habilitação"/>
										</Col>
										<Col xs={4}>
											<CustomInput type="date" id="expireDate" required="required" onChange={this.saveAlteration.bind(this,'expireDate')} label="Vencimento da habilitação"/>
										</Col>
									</Row>
								</Row>

								{/*Envolvidos*/}
								<Row className="form-group">
									<h4>Envolvidos</h4>
									<Row>
										<Col xs={4}>
											<CustomInput type="text" id="involvedName" required="required" onChange={this.saveAlteration.bind(this,'involvedName')} label="Nome"/>											
										</ Col>
										<Col xs={4}>
											<CustomInput type="number" id="involvedAge" required="required" onChange={this.saveAlteration.bind(this,'involvedAge')} label="Idade"/>
										</ Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="involvedSex">Sexo</label>
											<select name="involvedSex" id="involvedSex" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</ Col>
									</Row>
									<Row>
										<Col xs={4}>
											<CustomInput type="text" id="involvedStreet" required="required" onChange={this.saveAlteration.bind(this,'involvedStreet')} label="Rua"/>
										</Col>
										<Col xs={4}>
											<CustomInput type="text" id="involvedNumber" required="required" onChange={this.saveAlteration.bind(this,'involvedNumber')} label="Numero"/>
										</Col>
										<Col xs={4}>
											<CustomInput type="text" id="involvedCorner" required="required" onChange={this.saveAlteration.bind(this,'involvedCorner')} label="Esquina"/>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
											<label className="control-label" htmlFor="involvedNeighborhood">Bairro</label>
											<select name="involvedNeighborhood" id="involvedNeighborhood" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<CustomInput type="text" id="involvedReference" required="required" onChange={this.saveAlteration.bind(this,'involvedReference')} label="Referência"/>
										</Col>
										<Col xs={4}>
											<CustomInput type="text" id="involvedMom" required="required" onChange={this.saveAlteration.bind(this,'involvedMom')} label="Nome da mãe"/>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
											<label className="control-label" htmlFor="involvedSituation">Situação</label>
											<select name="involvedSituation" id="involvedSituation" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="involvedVehicleType">Tipo de veiculo</label>
											<select name="involvedVehicleType" id="involvedVehicleType" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="involvedVehiclePosition">Posição no Veículo</label>
											<select name="involvedVehiclePosition" id="involvedVehiclePosition" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
											<label className="control-label" htmlFor="involvedSecurityCondition">Condição de segurança</label>
											<select name="involvedSecurityCondition" id="involvedSecurityCondition" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="involvedInjuryLevel">Gravidade da lesão</label>
											<select name="involvedInjuryLevel" id="involvedInjuryLevel" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="involvedProbableConduct">Conduta provável</label>
											<select name="involvedProbableConduct" id="involvedProbableConduct" className="form-control control-label" >
												<option value="">Escolha uma opção</option>
												<option value="opt1">Opção 1</option>
												<option value="opt2">Opção 2</option>
												<option value="optn">...</option>
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={12}>
											<CustomInput type="text" id="involvedEvolution" required="required" onChange={this.saveAlteration.bind(this,'involvedEvolution')} label="Evolução"/>
										</Col>
									</Row>
								</Row>

							</Col>
							
						</Form>
					</Row>
				</Grid>
			);
		}
}

export default class EventBox extends Component {

	constructor(props) {
		super(props);
		this.state = {accidentTypes : [{"id":1,"classification":"Queda de Bicicleta"},{"id":2,"classification":"Colisao"},{"id":3,"classification":"Acidente Complexo"},{"id":4,"classification":"Choque"},{"id":5,"classification":"Queda de Motocicleta"},{"id":6,"classification":"Engavetamento"},{"id":7,"classification":"Capotamento"},{"id":8,"classification":"Atropelamento"},{"id":9,"classification":"Nao Apurado"}]};
	}


	componentDidMount(){

		/*$.ajax({
            url:'http://sigtrans.unioeste.br:39000/AccidentType?callback=?',
            dataType: 'jsonp',
            jsonp: 'jsonp_callback',
            type:'GET',
            crossDomain: true,
            success: function(data) {
            	console.log(data);
                this.setState({accidentTypes: data});
            }.bind(this)
        });*/

		/*PubSub.subscribe('update-events-list',function(topico,novaLista){
			this.setState({lista:novaLista});
		}.bind(this));*/
	}

	render(){
		return (
			<div>
				<PageHeader className="centered">Cadastro de Ocorrência</PageHeader>
				<div className="content" id="content">
					<FormOcorrencia accidentTypes={this.state.accidentTypes}/>
				</div>

			</div>
		);
	}
}