/**
 * Created by natal on 13/03/17.
 */
import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import CustomSubmit from './components/CustomSubmit'
import PubSub from 'pubsub-js';
import ErrHandler from  './ErrHandler';

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
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.saveAlteration.bind(this,'nome')} label="Nome"/>
                    <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.saveAlteration.bind(this,'email')} label="Email"/>
                    <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.saveAlteration.bind(this,'senha')} label="Senha"/>
                    <div className="pure-control-group">
                        <label></label>
                        <CustomSubmit label="Gravar"/>
                    </div>
                </form>

            </div>

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
                    <FormularioAutor/>
                    <TabelaAutores lista={this.state.lista}/>
                </div>

            </div>
        );
    }
}