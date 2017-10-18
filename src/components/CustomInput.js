import React, {Component} from 'react';

import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

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

}