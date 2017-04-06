/**
 * Created by natal on 06/04/17.
 */
import React, {Component} from 'react';
//import PubSub from 'pubsub-js';
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

export default class CustomSelect extends Component {

    constructor() {
        super();
        this.state = {msgErro: ''};
    }

    render() {
        const selectProps = Object.assign({}, this.props);
        let opts = selectProps.options.map(function (type) {
            return <option key={type.id} value={type.id}>{type.value}</option>;
        });
        delete selectProps.options;

        return (
            <FormGroup >
                <ControlLabel>{selectProps.label}</ControlLabel>
                <FormControl {...selectProps} componentClass="select" placeholder="Selecione">
                    <option value="">Selecione</option>
                    {opts}
                </FormControl>
                {/*<span className="error">{this.state.msgErro}</span>*/}
            </FormGroup>
        )
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