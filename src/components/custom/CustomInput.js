import React, {Component} from 'react';

import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

export default class CustomInput extends Component {
    render() {
        return (
            <FormGroup controlId={this.props.id}>
                <ControlLabel style={{color:"black"}}>{this.props.label}</ControlLabel>
                <FormControl {...this.props}/>
                {/*<p {...this.props}>{this.props.value}</p>*/}
                {/*<span className="error">{this.state.msgErro}</span>*/}
            </FormGroup>
        );
    }
}
