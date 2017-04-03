import React, {Component} from 'react';
//import PubSub from 'pubsub-js';
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

export default class CustomInput extends Component {

    constructor() {
        super();
        this.state = {msgErro: ''};
    }

    render() {
        return (
            <FormGroup controlId={this.props.id}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl {...this.props}/>
                {/*<span className="error">{this.state.msgErro}</span>*/}
            </FormGroup>
        );
    }

    /*componentDidMount() {
     PubSub.subscribe("erro-validacao",function(topico,erro){
     if(erro.field === this.props.name){
     this.setState({msgErro:erro.defaultMessage});
     }
     }.bind(this));

     PubSub.subscribe("limpa-erros",function(topico){
     this.setState({msgErro:''});
     }.bind(this));
     }*/
}