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
            date:'',					street:'',						number:'',					cross:'',
            accidentType:'',			pavementType:'',				surface:'',					accidentClassification:'',
            roadState:'',				roadProfile:'',					roadCondition:'',			climaticCondition:'',
            verticalSignaling:'', 		horizontalSignaling:'',			direction:'',				lat:'',
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
        var accidentTypes = this.props.statisticData.accidentTypes.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });
        var pavementTypes = this.props.statisticData.pavementTypes.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });
        //TODO FINISH LINKING
        var surfaces = this.props.statisticData.surfaces.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });
        var accidentClassifications = this.props.statisticData.accidentClassifications.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });
        var roadStates = this.props.statisticData.roadStates.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });
        var roadProfiles = this.props.statisticData.roadProfiles.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });
        var roadConditions = this.props.statisticData.roadConditions.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });
        var climaticConditions = this.props.statisticData.climaticConditions.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });
        var horizontalSignals = this.props.statisticData.horizontalSignals.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });
        var verticalSignals = this.props.statisticData.verticalSignals.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });
        var directions = this.props.statisticData.directions.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });
        var zones = this.props.statisticData.zones.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });
        var causes = this.props.statisticData.causes.map(function(type){
            return <option key={type.id} value={type.id}>{type.classification}</option>;
        });

        return (
			<div className="clearfix">
				<Grid>
					<Row className="clearfix">
						<Form onSubmit={this.handleEventSubmit} method="post">
							{/*<pre>*/}
							 {/*{JSON.stringify(this.state,undefined,4)}*/}
							 {/*</pre>*/}
							<Col xs={12} md={12} sm={12}>

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
											<CustomInput type="number" id="lat" required="required" onChange={this.saveAlteration.bind(this,'lat')} label="Latitude"/>
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
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="pavementType">Tipo de Pavimento</label>
											<select value={this.state.pavementType} name="pavementType" id="pavementType" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'pavementType')}>
												<option value="">Selecione</option>
                                                {pavementTypes}
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="surface">Superficie</label>
											<select value={this.state.surface} name="surface" id="surface" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'surface')}>
												<option value="">Selecione</option>
                                                {surfaces}
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
											<label className="control-label" htmlFor="accidentClassification">Classificação do acidente</label>
											<select value={this.state.accidentClassification} name="accidentClassification" id="accidentClassification" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'accidentClassification')}>
												<option value="">Selecione</option>
                                                {accidentClassifications}
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="roadState">Estado da pista</label>
											<select value={this.state.roadState} name="roadState" id="roadState" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'roadState')}>
												<option value="">Selecione</option>
                                                {roadStates}
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="roadProfile">Perfil da pista</label>
											<select value={this.state.roadProfile} name="roadProfile" id="roadProfile" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'roadProfile')}>
												<option value="">Selecione</option>
                                                {roadProfiles}
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
											<label className="control-label" htmlFor="roadCondition">Condição da pista</label>
											<select value={this.state.roadCondition} name="roadCondition" id="roadCondition" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'roadCondition')}>
												<option value="">Selecione</option>
                                                {roadConditions}
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="climaticCondition">Condição climática</label>
											<select value={this.state.climaticCondition} name="climaticCondition" id="climaticCondition" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'climaticCondition')}>
												<option value="">Selecione</option>
                                                {climaticConditions}
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="verticalSignaling">Sinalização vertical</label>
											<select value={this.state.verticalSignaling} name="verticalSignaling" id="verticalSignaling" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'verticalSignaling')}>
												<option value="">Selecione</option>
                                                {verticalSignals}
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
											<label className="control-label" htmlFor="horizontalSignaling">Sinalização horizontal</label>
											<select value={this.state.horizontalSignaling} name="horizontalSignaling" id="horizontalSignaling" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'horizontalSignaling')}>
												<option value="">Selecione</option>
                                                {horizontalSignals}
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="direction">Direção</label>
											<select value={this.state.direction} name="direction" id="direction" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'direction')}>
												<option value="">Selecione</option>
                                                {directions}
											</select>
										</Col>
										<Col xs={4}>
											<label className="control-label" htmlFor="zone">Zona</label>
											<select value={this.state.zone} name="zone" id="zone" className="form-control control-label" onChange={this.saveAlteration.bind(this, 'zone')}>
												<option value="">Selecione</option>
                                                {zones}
											</select>
										</Col>
									</Row>
									<Row>
										<Col xs={4}>
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
    	this.state={
            showModal: false,
            statisticData : {
            	accidentTypes:[], pavementTypes:[], surfaces:[],
                accidentClassifications:[], roadStates:[],
                roadProfiles:[], roadConditions:[], climaticConditions:[],
                verticalSignals:[], horizontalSignals:[], directions:[],
                zones:[], causes:[], additionalInfo:[]
			},
            selectedEvent:'',
			data:[{
                id:1,
                data: '1/10/2016',
                street: 'Castro Alves',
                number: '2011',
                cross: 'Av. Brasil',
                neighborhood: 'Centro',
                reference:'Proximo á loja MM',
            },{
                id:2,
                data: '1/10/2016',
                street: 'Joao Alves',
                number: '2543',
                cross: 'Av. Brasil',
                neighborhood: 'Neva',
                reference:'Proximo á loja MM',
            },{
                id:3,
                data: '1/02/2017',
                street: 'Castro Alves',
                number: '2161',
                cross: 'Av. Brasil',
                neighborhood: 'Centro',
                reference:'Proximo á loja MM',
            }],
    	};
        this.handleToggle = this.handleToggle.bind(this);
	}

    componentDidMount(){
        $.ajax({
            url:'https://ocorrencias-teste-api.herokuapp.com/api/statisticData',
            dataType: 'json',
            type:'GET',
            crossDomain: true,
            success: function(data) {
                this.setState({statisticData: data});
            }.bind(this)
        });

		/*PubSub.subscribe('update-events-list',function(topico,novaLista){
		 this.setState({lista:novaLista});
		 }.bind(this));*/
    }

    handleToggle(e){
        this.setState({showModal: !this.state.showModal, selectedEvent:e.target.id});
    }

	render(){

        const columns = [{
            header: 'Ocorrencias Abertas',
            headerClassName: 'open-events',
            columns: [{
                style:{textAlign:"center"},
                header: 'Data',
                accessor: 'data'
            },{
                style:{textAlign:"center"},
                header: 'Rua',
                accessor: 'street'
            }, {
                style:{textAlign:"center"},
                header: 'Numero/KM',
                accessor: 'number'
            },{
                style:{textAlign:"center"},
                header: 'Cruzamento com',
                accessor: 'cross'
            },{
                style:{textAlign:"center"},
                header: 'Bairro',
                accessor: 'neighborhood'
            },{
                style:{textAlign:"center"},
                header: 'Referencia',
                accessor: 'reference'
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
								<EventForm statisticData={this.state.statisticData}/>
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
        	statisticData : {
				accidentTypes:[], pavementTypes:[], surfaces:[],
				accidentClassifications:[], roadStates:[],
				roadProfiles:[], roadConditions:[], climaticConditions:[],
				verticalSignals:[], horizontalSignals:[], directions:[],
				zones:[], causes:[], additionalInfo:[]}
        };
    }

    componentDidMount(){
		 $.ajax({
			 url:'https://ocorrencias-teste-api.herokuapp.com/api/statisticData',
			 dataType: 'json',
			 type:'GET',
			 crossDomain: true,
			 success: function(data) {
			 	this.setState({statisticData: data});
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
					<EventForm statisticData={this.state.statisticData}/>
				</div>
			</div>
        );
    }
}