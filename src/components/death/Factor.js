import React, { Component } from 'react';
import Slider from 'react-toolbox/lib/slider/Slider';
import { Col } from 'react-bootstrap';
import Select from '../custom/CustomSelect';

export default class Factor extends Component {
  render() {
    const {
      itemId, subGroup, group, values, max, step, factor, responsible, onChangeDeathInput, options, style,
    } = this.props;
    let specification = null;
    if (factor === 'Velocidade') {
      specification = [
        { id: 1, nome: 'Excessiva' },
        { id: 2, nome: 'Inadequada' },
      ];
    }
    if (factor === 'Infraestrutura') {
      specification = [
        { id: 1, nome: 'Inadequada' },
        { id: 2, nome: 'Inexistente' },
      ];
    }
    let sliderValue = values ? values.find(x => x[subGroup].id === itemId) : null;
    const specificationValue = sliderValue && sliderValue.especificacao;
    const responsibleValue = sliderValue && sliderValue.responsavel;
    sliderValue = (sliderValue && (!(sliderValue.valor % step) ? sliderValue.valor : sliderValue.valor + step)) || 0;
    return (
      <div>
        <Col md={8} style={style}>
          <p>{factor}</p>
          <Slider
            pinned
            snaps
            editable
            min={0}
            max={max}
            step={step}
            value={sliderValue}
            onChange={newValue => onChangeDeathInput(newValue, itemId, group, subGroup)}
          />
        </Col>
        {
          responsible
            ? (
              <Col md={2} style={style}>
                <Select
                  value={responsibleValue}
                  options={options}
                  disabled={sliderValue ? sliderValue <= 0 : true}
                  onChange={e => onChangeDeathInput(e.target.value, itemId, group, subGroup, 'responsavel')}
                  label="Usuário Contributívo"
                />
              </Col>
            )
            : null
        }
        {
          specification
            ? (
              <Col md={2} style={style}>
                <Select
                  value={specificationValue}
                  options={specification}
                  disabled={sliderValue ? sliderValue <= 0 : true}
                  onChange={e => onChangeDeathInput(e.target.value, itemId, group, subGroup, 'especificacao')}
                  label="Especificação"
                />
              </Col>
            ) : null
        }

      </div>
    );
  }
}
