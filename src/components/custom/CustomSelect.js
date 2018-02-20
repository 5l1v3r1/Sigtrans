/**
 * Created by natal on 06/04/17.
 */

import React, {Component} from 'react';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

export default class CustomSelect extends Component {

    render() {
        const selectProps = Object.assign({}, this.props);
        let opts;
        if (selectProps.options) {
            opts = selectProps.options.map(function (type) {
                return <option key={type.id} value={type.id}>{type.value}</option>;
            });
        }
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
}