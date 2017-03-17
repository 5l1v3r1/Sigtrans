import React, { Component } from 'react';
import $ from 'jquery';
import CustomSubmit from './components/CustomSubmit'
import CustomInput from './components/CustomInput'
import PubSub from 'pubsub-js';
import ErrHandler from  './ErrHandler';
import {Form, Grid, Row, Col} from 'react-bootstrap';

class FormOcorrencia extends Component{
	
	constructor() {
		super();
		this.state = {nome:'',email:'',senha:''};
		this.enviaForm = this.enviaForm.bind(this);
	}

	enviaForm(e){
		e.preventDefault();
		$.ajax({
			url:'http://cdc-react.herokuapp.com/api/autores',
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
		});
	}

	saveAlteration(inputName, e){
		this.setState({[inputName]:e.target.value});
	}

	render() {
			return (
				<Grid>
					<Row>
						<Col>
						
						</Col>
					</Row>
					<Row>
						<Col>
							<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
								<div class="modal-dialog modal-lg">
									<div class="modal-content">

										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">x</span>
											</button>
											<h4 class="modal-title" id="myModalLabel">Editar Ocorrência</h4>
										</div>
										
										<div class="modal-body">
											
											<form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left">
												<div>
													<h4>Geral</h4>
													<div class="form-group">
														<label class="control-label col-xs-12" for="date">Data <span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="date" id="date" required="required" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="street">Rua <span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="text" id="street" required="required" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="number">Numero <span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="number" id="number"  required="required" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="cross">Cruzamento
														</label>
														<div class="col-xs-12">
															<input type="text" id="cross" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="Lat">Latitude <span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="number" id="Lat"  required="required" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="Long">Longitude <span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="number" id="Long"  required="required" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group">
														<label for="middle-name" class="control-label col-xs-12">Middle Name / Initial</label>
														<div class="col-xs-12">
															<input id="middle-name" class="form-control col-xs-12" type="text" name="middle-name">
														</div>
													</div>
												</div> 
												<div>
													<h4>Dados estatísticos</h4>
													<div class="form-group col-xs-12">
														<label for="tipoAcidente">Tipo de Acidente</label>
														<select name="tipoAcidente" id="tipoAcidente" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="tipoPavimento">Tipo de Pavimento</label>
														<select name="tipoPavimento" id="tipoPavimento" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="surface">Superficie</label>
														<select name="surface" id="surface" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="accidentClassification">Classificação do acidente</label>
														<select name="accidentClassification" id="accidentClassification" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="roadState">Estado da pista</label>
														<select name="roadState" id="roadState" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="roadProfile">Perfil da pista</label>
														<select name="roadProfile" id="roadProfile" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="roadCondition">Condição da pista</label>
														<select name="roadCondition" id="roadCondition" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="climaticCondition">Condição climática</label>
														<select name="climaticCondition" id="climaticCondition" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="verticalSinalization">Sinalização vertical</label>
														<select name="verticalSinalization" id="verticalSinalization" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="horizontalSinalization">Sinalização horizontal</label>
														<select name="horizontalSinalization" id="horizontalSinalization" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="direction">Direção</label>
														<select name="direction" id="direction" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="zone">Zona</label>
														<select name="zone" id="zone" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="cause">Causa provável</label>
														<select name="cause" id="cause" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group">
														<label for="additionalInfo" class="control-label col-xs-12">Informações adicionais</label>
														<div class="col-xs-12">
															<input id="additionalInfo" class="form-control col-xs-12" type="text" name="additionalInfo">
														</div>
													</div>
												</div> 
												<div>
													<h4>Veículos</h4>
													<div class="form-group">
														<label class="control-label col-xs-12" for="carPlate">Placa <span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="text" id="carPlate" required="required" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group col-xs-12">
														<label for="carStatus">Estado</label>
														<select name="carStatus" id="carStatus" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="carBrand">Marca<span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="text" id="carBrand" required="required" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="carModel">Modelo<span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="text" id="carModel" required="required" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group col-xs-12">
														<label for="damageLevel">Grau de avaria</label>
														<select name="damageLevel" id="damageLevel" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>
													<h5>Quanto ao condutor</h5>
													<div class="form-group col-xs-12">
														<label for="licenseLevel">Categoria da habilitação</label>
														<select name="licenseLevel" id="licenseLevel" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="firstLicense">Primeira habilitação <span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="date" id="firstLicense" required="required" class="form-control col-xs-12">
														</div>
													</div>
													<div class="form-group">
														<label class="control-label col-xs-12" for="expireDate">Vencimento da habilitação <span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="date" id="expireDate" required="required" class="form-control col-xs-12">
														</div>
													</div>

												</div> 
												<div>
													<h4>Envolvidos</h4>

													<div class="form-group">
														<label class="control-label col-xs-12" for="involvedName">Nome<span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="text" id="involvedName" required="required" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="involvedAge">Idade<span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="text" id="involvedAge" required="required" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group col-xs-12">
														<label for="involvedSex">Sexo</label>
														<select name="involvedSex" id="involvedSex" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="involvedStreet">Rua<span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="text" id="involvedStreet" required="required" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="involvedNumber">Numero<span class="required">*</span>
														</label>
														<div class="col-xs-12">
															<input type="number" id="involvedNumber" required="required" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="involvedCorner">Esquina
														</label>
														<div class="col-xs-12">
															<input type="number" id="involvedCorner" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group col-xs-12">
														<label for="involvedNeighborhood">Bairro</label>
														<select name="involvedNeighborhood" id="involvedNeighborhood" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="involvedReference">Referência
														</label>
														<div class="col-xs-12">
															<input type="text" id="involvedReference" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="AQUELA_GORDA">Nome da mãe
														</label>
														<div class="col-xs-12">
															<input type="text" id="AQUELA_GORDA" class="form-control col-xs-12">
														</div>
													</div>

													<div class="form-group col-xs-12">
														<label for="involvedSituation">Situação</label>
														<select name="involvedSituation" id="involvedSituation" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="involvedVehicleType">Tipo de veiculo</label>
														<select name="involvedVehicleType" id="involvedVehicleType" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="involvedVehiclePosition">Posição no Veículo</label>
														<select name="involvedVehiclePosition" id="involvedVehiclePosition" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="involvedSecurityCondition">Condição de segurança</label>
														<select name="involvedSecurityCondition" id="involvedSecurityCondition" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="involvedInjuryLevel">Gravidade da lesão</label>
														<select name="involvedInjuryLevel" id="involvedInjuryLevel" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group col-xs-12">
														<label for="involvedProbableConduct">Conduta provável</label>
														<select name="involvedProbableConduct" id="involvedProbableConduct" class="form-control control-label" >
															<option value="">Escolha uma opção</option>
															<option value="opt1">Opção 1</option>
															<option value="opt2">Opção 2</option>
															<option value="optn">...</option>
														</select>
													</div>

													<div class="form-group">
														<label class="control-label col-xs-12" for="involvedEvolution">Evolução
														</label>
														<div class="col-xs-12">
															<input type="text" id="involvedEvolution" class="form-control col-xs-12">
														</div>
													</div>


												</div> 
											</form>
										
										</div>

										<div class="modal-footer">
											<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
											<button type="button" class="btn btn-primary">Salvar Alterações</button>
										</div>

									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Grid>
			);
		}
}

export default class OcorrenciaBox extends Component {

	constructor() {
		super();
		this.state = {lista : []};
	}

	componentDidMount(){
		$.ajax({
				url:"http://cdc-react.herokuapp.com/api/autores",
				dataType: 'json',
				success:function(resposta){
					this.setState({lista:resposta});
				}.bind(this)
			}
		);

		PubSub.subscribe('atualiza-lista-autores',function(topico,novaLista){
			this.setState({lista:novaLista});
		}.bind(this));
	}


	render(){
		return (
			<div>
				<div className="header">
					<h1>Cadastro de autores</h1>
				</div>
				<div className="content" id="content">
					<FormOcorrencia/>
				</div>

			</div>
		);
	}
}