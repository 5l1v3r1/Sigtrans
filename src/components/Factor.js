import React, {Component} from "react";
import Slider from 'react-toolbox/lib/slider/Slider';
import Select from "./CustomSelect";
import {Col} from 'react-bootstrap';

export default class Factor extends Component {

    render() {
        return (
            <div>
                <Col md={4} style={this.props.style}>
                    <p>{this.props.factor ? this.props.factor : "fator/causa"}</p>
                    <Slider pinned snaps min={0} max={10} step={2}
                            editable value={this.props.slider}
                            onChange={this.props.onChange}/>
                </Col>
                <Col md={2} style={this.props.style}>
                    {/*// onChange={this.saveNestedAlteration.bind(this, 'vehicles', 'carStatus', vehicle.id - 1)}*/}
                    <Select value={0}
                            options={this.props.options}
                            label="Responsável"/>
                </Col>
            </div>
        )
    }

}