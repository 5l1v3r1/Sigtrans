/**
 * Created by natal on 17/04/17.
 */

import React, { Component } from 'react';
// import MultiInput from 'react-toolbox/lib/input/Input';
import { Grid, Panel } from 'react-bootstrap';
import Factor from './Factor';

export class DeathAnalysis extends Component {
  render() {
    const {
      onChangeDeathInput,
      analiseObito,
      options: { posicaoVeiculo },
      FCGAList: { fatoresRisco, condutasRisco, fatoresGravidade },
    } = this.props;
    const padding = {
      paddingLeft: '2px',
    };
    const factors = fatoresRisco.map(item => (
      <div key={item.id}>
        <Factor
          values={analiseObito ? analiseObito.fatoresRisco : []}
          style={padding}
          factor={item.nome}
          itemId={item.id}
          group="fatoresRisco"
          subGroup="fatorRisco"
          responsible={(item.nome !== 'Infraestrutura' && item.nome !== 'Visibilidade')}
          specification={(item.nome === 'Velocidade' || item.nome === 'Infraestrutura')}
          options={posicaoVeiculo}
          onChangeDeathInput={onChangeDeathInput}
          max={10}
          step={2}
        />
      </div>
    ), this);

    const conducts = condutasRisco.map(item => (
      <div key={item.id}>
        <Factor
          values={analiseObito ? analiseObito.condutasRisco : []}
          style={padding}
          group="condutasRisco"
          subGroup="condutaRisco"
          factor={item.nome}
          itemId={item.id}
          responsible
          options={posicaoVeiculo}
          onChangeDeathInput={onChangeDeathInput}
          max={10}
          step={2}
        />
      </div>
    ), this);

    const gravity = fatoresGravidade.map(item => (
      <div key={item.id}>
        <Factor
          values={analiseObito ? analiseObito.fatoresGravidade : []}
          style={padding}
          subGroup="fatorGravidade"
          group="fatoresGravidade"
          factor={item.nome}
          itemId={item.id}
          options={posicaoVeiculo}
          responsible={(item.nome === 'Capacete' || item.nome === 'Cinto de Segurança')}
          onChangeDeathInput={onChangeDeathInput}
          max={5}
          step={1}
        />
      </div>
    ), this);

    return (
      <Grid fluid>
        {/* dadosGerais */}
        <br />
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
        <Panel>
          <pre>
            {JSON.stringify(analiseObito, null, 2)}
          </pre>
        </Panel>
      </Grid>
    );
  }
}
