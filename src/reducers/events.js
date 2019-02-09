/**
 * Created by natal on 01/06/17.
 */

import { List } from 'immutable';

export function events(state = new List(), action) {
  const { type } = action;
  if (type === 'LISTOPENEVENTS') {
    const { events, loading } = action;
    return Object.assign({}, state, { events, loading: !loading });
  }

  if (type === 'LISTASYNC') {
    const { options, listType } = action;
    return Object.assign({}, state, { [listType]: options });
  }

  if (type === 'LISTDEPENDENTOPTION') {
    const { listType } = action;
    const option = action.options;
    const options = Object.assign({}, state.options, { [listType]: option });

    return Object.assign({}, state, { options });
  }

  if (type === 'LISTEVENTSOPTIONS') {
    const { options } = action;
    return Object.assign({}, state, { options });
  }

  if (type === 'SELECTOPENEVENT') {
    const selectedEvent = state.events.find(item => item.id === action.id);
    selectedEvent.dadosGerais.dataHora = new Date(selectedEvent.dadosGerais.dataHora).toISOString().replace('Z', '');
    const selectedEventID = selectedEvent.id;
    return Object.assign({}, state, { selectedEvent, selectedEventID });
  }

  if (type === 'TOGGLEEVENTSMODAL') {
    const showModal = !state.showModal;
    return Object.assign({}, state, { showModal });
  }

  if (type === 'ONCHANGE') {
    if (action.subMenu) {
      const { selectedEvent } = state;
      selectedEvent[action.subMenu][action.operator] = action.newValue;
      return Object.assign({}, state, { selectedEvent });
    }
    return Object.assign({}, state, { [action.operator]: action.newValue });
  }

  if (type === 'ONCHANGEDROPDOWN') {
    const { selectedEvent } = state;
    if (!selectedEvent[action.subMenu][action.operator]) selectedEvent[action.subMenu][action.operator] = {};
    selectedEvent[action.subMenu][action.operator].id = action.newValue;
    return Object.assign({}, state, { selectedEvent });
  }

  if (type === 'NESTEDINPUTCHANGE') {
    const { selectedEvent } = state;
    let item;
    // é possivel melhorar essa joça
    if (action.operator) {
      item = selectedEvent[action.subMenu][action.operator].find(item => item === action.id);
      if (!action.dropdown) item[action.input] = action.value;
      else {
        if (!item[action.input]) item[action.input] = {};
        item[action.input][action.dropdown] = action.value;
      }
      selectedEvent[action.subMenu][action.operator][item] = item;
    } else {
      item = selectedEvent[action.subMenu].find(item => item === action.id);
      if (!action.dropdown) item[action.input] = action.value;
      else if (action.dropdown !== 'condutor') {
        if (!item[action.input]) item[action.input] = {};
        item[action.input][action.dropdown] = action.value;
      } else {
        if (!item[action.dropdown]) item[action.dropdown] = {};
        item[action.dropdown][action.input] = action.value;
      }
      selectedEvent[action.subMenu][item] = item;
    }
    return Object.assign({}, state, { selectedEvent });
  }

  if (type === 'ADDINVOLVED') {
    const { selectedEvent } = state;
    selectedEvent.envolvidos.push({});
    return Object.assign({}, state, { selectedEvent });
  }

  if (type === 'REMOVEINVOLVED') {
    const { selectedEvent } = state;
    const id = state.selectedEvent.envolvidos.indexOf(action.involved);
    selectedEvent.envolvidos.splice(id, 1);
    return Object.assign({}, state, { selectedEvent });
  }

  if (type === 'ADDVEHICLE') {
    const { selectedEvent } = state;
    selectedEvent.veiculos.push({});
    return Object.assign({}, state, { selectedEvent });
  }

  if (type === 'REMOVEVEHICLE') {
    const { selectedEvent } = state;
    const id = selectedEvent.veiculos.indexOf(action.vehicle);
    selectedEvent.veiculos.splice(id, 1);
    return Object.assign({}, state, { selectedEvent });
  }

  if (type === 'ADDVIA') {
    const { selectedEvent } = state;
    if (!selectedEvent.dadosEstatisticos.vias) selectedEvent.dadosEstatisticos.vias = [];
    selectedEvent.dadosEstatisticos.vias.push({});
    return Object.assign({}, state, { selectedEvent });
  }

  if (type === 'REMOVEVIA') {
    const { selectedEvent } = state;
    const id = selectedEvent.dadosEstatisticos.vias.indexOf(action.via);
    selectedEvent.dadosEstatisticos.vias.splice(id, 1);
    return Object.assign({}, state, { selectedEvent });
  }

  if (type === 'INITIALIZEEVENT') {
    const selectedEvent = {
      dadosGerais: {},
      dadosEstatisticos: {},
      analiseObito: {},
      veiculos: [],
      envolvidos: [],
    };
    return Object.assign({}, state, { selectedEvent });
  }

  if (type === 'HANDLEDEATHINPUT') {
    const {
      newValue, FCGAId, group, subGroup, input,
    } = action;
    const { selectedEvent } = state;
    const deathAnalysis = selectedEvent.analiseObito ? selectedEvent.analiseObito : {};
    console.log(input);
    if (!input) {
      if (!newValue || newValue <= 0) {
        // if (operator === 'weight' || operator === 'amount'){
        //   deathAnalysis[subMenu] = null;
        // }
        if (group === 'additionalInfos') {
          deathAnalysis.additionalInfos[subGroup] = null;
        }
      }

      const FatorCondutaGravidadeAno = {
        [subGroup]: {
          id: FCGAId,
        },
        valor: newValue,
      };

      if (!deathAnalysis[group]) {
        deathAnalysis[group] = [];
        deathAnalysis[group].push(FatorCondutaGravidadeAno);
        selectedEvent.analiseObito = deathAnalysis;
        return Object.assign({}, state, { selectedEvent });
      }

      const index = deathAnalysis[group]
        .findIndex(x => x[subGroup].id === FCGAId);

      if (index === -1) {
        deathAnalysis[group].push(FatorCondutaGravidadeAno);
        selectedEvent.analiseObito = deathAnalysis;
        return Object.assign({}, state, { selectedEvent });
      }

      deathAnalysis[group][index].valor = newValue;

      selectedEvent.analiseObito = deathAnalysis;
      return Object.assign({}, state, { selectedEvent });
    }

    console.log('aeHO');

    const index = deathAnalysis[group] && deathAnalysis[group]
      .findIndex(x => x[subGroup].id === FCGAId);
    console.log(index);

    switch (input) {
      case 'responsible':
        deathAnalysis[group][index].responsavel = newValue;
        break;
      case 'specification':
        deathAnalysis[group][index].especificacao = newValue;
        break;
      default:
        break;
    }
    selectedEvent.analiseObito = deathAnalysis;
    return Object.assign({}, state, { selectedEvent });
  }

  if (type === 'LISTFCGA') {
    const FCGAList = action.list;
    return Object.assign({}, state, { FCGAList });
  }

  return state;
}
