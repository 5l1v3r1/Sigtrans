/**
 * Created by natal on 13/03/17.
 */
import React, { Component } from 'react';
import $ from 'jquery';
import CustomSubmit from './components/CustomSubmit'
import CustomInput from './components/CustomInput'
import PubSub from 'pubsub-js';
import ErrHandler from  './ErrHandler';
import {Form, Grid, Row, Col} from 'react-bootstrap';


class FormularioAutor extends Component {

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
			<Col xs={12} md={12} sm={12}>
				<Form inline onSubmit={this.enviaForm} method="post">
					<Row className="show-grid">
						<Col xs={6} md={4} sm={2}>
							<CustomInput id="nome" type="text" name="nome" value={this.state.nome} onChange={this.saveAlteration.bind(this,'nome')} label="Nome"/>
						</Col>
						<Col xs={6} md={4} sm={2}>
							<CustomInput id="email" type="email" name="email" value={this.state.email} onChange={this.saveAlteration.bind(this,'email')} label="Email"/>
						</Col>
						<Col xs={6} md={4} sm={2}>
							<CustomInput id="senha" type="password" name="senha" value={this.state.senha} onChange={this.saveAlteration.bind(this,'senha')} label="Senha"/>
						</Col>
					</Row>
					<Row>
						<Col xs={6} md={4} sm={2}>
							<CustomSubmit label="Gravar"/>
						</Col>
					</Row>
				</Form>
			</Col>

		);
	}
}

class TabelaAutores extends Component {

	render() {
		return(
			<div>
				<table className="pure-table">
					<thead>
					<tr>
						<th>Nome</th>
						<th>email</th>
					</tr>
					</thead>
					<tbody>
					{
						this.props.lista.map(function(autor){
							return (
								<tr key={autor.id}>
									<td>{autor.nome}</td>
									<td>{autor.email}</td>
								</tr>
							);
						})
					}
					</tbody>
				</table>
			</div>
		);
	}
}

export default class AutorBox extends Component {

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
					<Grid>
						<Row className="show-grid">
							<FormularioAutor/>
						</Row>
						<Row className="show-grid">
							<Col xs={12} md={12} sm={12}>
								<TabelaAutores lista={this.state.lista}/>
							</Col>
						</Row>
					</Grid>
				</div>

			</div>
		);
	}
}