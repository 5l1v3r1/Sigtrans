import React, {Component} from "react";
import Slider from 'react-toolbox/lib/slider/Slider';
import Select from "../custom/CustomSelect";
import {Col} from 'react-bootstrap';

export default class Factor extends Component {
    render() {
        return (
            <div>
                <Col md={4} style={this.props.style}>
                    <p>{this.props.factor ? this.props.factor : "Fator/Causa"}</p>
                    <Slider pinned snaps editable
                            min={0} max={this.props.max} step={this.props.step}
                            value={this.props.sliderValue}
                            onChange={(newValue) => this.props.handleSlider(this.props.itemId, newValue)}/>
                </Col>
                <Col md={2} style={this.props.style}>
                    {
                        this.props.options ? (
                                <Select value={0}
                                        options={this.props.options}
                                        label="Responsável"/>
                            ) :
                            undefined
                    }
                </Col>
            </div>
        )
    }
}