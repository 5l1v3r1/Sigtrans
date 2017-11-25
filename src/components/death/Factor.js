import React, {Component} from "react";
import Slider from 'react-toolbox/lib/slider/Slider';
import Select from "../custom/CustomSelect";
import {Col} from 'react-bootstrap';

export default class Factor extends Component {
    render() {
        let specification = this.props.itemId === "speed" ? [
            {id: 1, value: 'Excessiva'},
            {id: 2, value: 'Inadequada'}
        ] : this.props.itemId === "infrastructure" ? [
            {id: 1, value: 'Inadequada'},
            {id: 2, value: 'Inexistente'}
        ] : undefined;
        return (
            <div>
                <Col md={8} style={this.props.style}>
                    <p>{this.props.factor ? this.props.factor : "Fator/Causa"}</p>
                    <Slider pinned snaps editable
                            min={0} max={this.props.max} step={this.props.step}
                            value={this.props.sliderValue}
                            onChange={(newValue) => this.props.handleSlider(this.props.itemId, newValue)}/>
                </Col>
                {
                    this.props.responsible ?
                        <Col md={2} style={this.props.style}>
                            <Select value={0}
                                    options={this.props.options}
                                    label="Usuário Contributívo"/>
                        </Col>
                        : undefined
                }
                {
                    this.props.specification ?
                        <Col md={2} style={this.props.style}>
                            <Select value={0}
                                    options={specification}
                                    label="Especificação"
                            />
                        </Col>
                        : undefined
                }

            </div>
        )
    }
}