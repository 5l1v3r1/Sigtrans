import React, { Component } from 'react';
import Slider from 'react-toolbox/lib/slider/Slider';
import { Col } from 'react-bootstrap';
import Select from '../custom/CustomSelect';

export default class Factor extends Component {
  render() {
    const specification = this.props.itemId === 'speed' ? [
      { id: 1, value: 'Excessiva' },
      { id: 2, value: 'Inadequada' }]
      : this.props.itemId === 'infrastructure' ? [
        { id: 1, value: 'Inadequada' },
        { id: 2, value: 'Inexistente' },
      ] : null;

    return (
      <div>
        <Col md={8} style={this.props.style}>
          <p>{this.props.factor}</p>
          <Slider
            pinned
            snaps
            editable
            min={0}
            max={this.props.max}
            step={this.props.step}
            value={this.props.values ? this.props.values.weight : 0}
            onChange={newValue => this.props.onChangeDeathInput(newValue, 'weight', this.props.itemId)}
          />
        </Col>
        {
          this.props.responsible
            ? (
              <Col md={2} style={this.props.style}>
                <Select
                  value={this.props.values ? (this.props.values.weight > 0 ? this.props.values.responsible : 0) : 0}
                  options={this.props.options}
                  disabled={this.props.values ? this.props.values.weight <= 0 : true}
                  onChange={e => this.props.onChangeDeathInput(e.target.value, 'responsible', this.props.itemId)}
                  label="Usuário Contributívo"
                />
              </Col>
            )
            : null
        }
        {
          this.props.specification
            ? (
              <Col md={2} style={this.props.style}>
                <Select
                  value={this.props.values
                    ? (this.props.values.weight > 0
                      ? this.props.values.specification
                      : 0)
                    : 0}
                  options={specification}
                  disabled={this.props.values ? this.props.values.weight <= 0 : true}
                  onChange={e => this.props.onChangeDeathInput(e.target.value, 'specification', this.props.itemId)}
                  label="Especificação"
                />
              </Col>
            ) : null
        }

      </div>
    );
  }
}
