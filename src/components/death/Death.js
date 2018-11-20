/**
 * Created by natal on 17/04/17.
 */

import React, {Component} from 'react';
import MultiInput from 'react-toolbox/lib/input/Input';
import {Grid, Panel,} from 'react-bootstrap';
// import Input from '../custom/CustomInput';
// import Select from '../custom/CustomSelect';
// import Map from '../map/Map';
import Factor from './Factor';

// make new js file
export class DeathAnalysis extends Component {
  render() {
    const {fatoresRisco, condutasRisco, fatoresGravidade} = this.props.FCGAList;
    const padding = {
      paddingLeft: '2px',
    };
    const factors = fatoresRisco.map(item => (
      <div key={item.id}>
        <Factor
          values={this.props.analiseObito ? this.props.analiseObito.fatoresRisco : []}
          style={padding}
          factor={item.nome}
          itemId={item.id}
          group="fatoresRisco"
          subGroup="fatorRisco"
          responsible={(item.nome !== 'Infraestrutura' && item.nome !== 'Visibilidade')}
          specification={(item.nome === 'Velocidade' || item.nome === 'Infraestrutura')}
          options={this.props.options.posicaoVeiculo}
          onChangeDeathInput={this.props.onChangeDeathInput}
          max={10}
          step={2}
        />
      </div>
    ), this);

    const conducts = condutasRisco.map(item => (
      <div key={item.id}>
        <Factor
          values={this.props.analiseObito ? this.props.analiseObito.condutasRisco : []}
          style={padding}
          group="condutasRisco"
          subGroup="condutaRisco"
          factor={item.nome}
          itemId={item.id}
          responsible
          options={this.props.options.posicaoVeiculo}
          onChangeDeathInput={this.props.onChangeDeathInput}
          max={10}
          step={2}
        />
      </div>
    ), this);

    const gravity = fatoresGravidade.map(item => (
      <div key={item.id}>
        <Factor
          values={this.props.analiseObito ? this.props.analiseObito.fatoresGravidade : []}
          style={padding}
          subGroup="fatorGravidade"
          group="fatoresGravidade"
          factor={item.nome}
          itemId={item.id}
          options={this.props.options.posicaoVeiculo}
          responsible={(item.nome === 'Capacete' || item.nome === 'Cinto de Segurança')}
          onChangeDeathInput={this.props.onChangeDeathInput}
          max={5}
          step={1}
        />
      </div>
    ), this);

    return (
      <Grid fluid>
        {/* dadosGerais */}
        <br/>
        {/* Fatores */}
        <Panel header="Fatores de Risco (FR-EA)" collapsible>
          {factors}
        </Panel>
        <Panel header="Condutas de Risco (CLR-EA)" collapsible>
          {conducts}
        </Panel>
        <Panel header="Fatores / Gravidade (FG)" collapsible>
          {gravity}
        </Panel>
        <Panel collapsible>
          <h4>Informações dos Parceiros</h4>
          <MultiInput
            type="text"
            multiline
            label="Informações dos Parceiros"
            name="partnerInfo"
            id="partnerInfo"
            hint="Informações dos parceiros sobre a ocorrência"
            value=""
            onChange={value => this.props.onChangeDeathInput(value, 'partnerInfo', 'additionalInfos')}
          />
          <MultiInput
            type="text"
            multiline
            label="Ações"
            name="actionsToBeTaken"
            id="actionsToBeTaken"
            hint="Ações a serem tomadas, decorrentes da análise"
            value=""
            onChange={value => this.props.onChangeDeathInput(value, 'actionsToBeTaken', 'additionalInfos')}
          />
        </Panel>
      </Grid>
    );
  }
}
