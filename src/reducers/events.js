/**
 * Created by natal on 01/06/17.
 */

import { List } from 'immutable';

// import update from 'immutability-helper';

export function events(state = new List(), action) {
  if (action.type === 'LISTOPENEVENTS') {
    const events = action.events;
    const loading = !action.loading;
    return Object.assign({}, state, { events, loading });
  }

  if (action.type === 'LISTASYNC') {
    const { options, listType } = action;
    return Object.assign({}, state, { [listType]: options });
  }

  if (action.type === 'LISTDEPENDENTOPTION') {
    const { listType } = action;
    const option = action.options;
    const options = Object.assign({}, state.options, { [listType]: option });

    return Object.assign({}, state, { options });
  }

  if (action.type === 'LISTEVENTSOPTIONS') {
    const { options } = action;
    return Object.assign({}, state, { options });
  }

  if (action.type === 'SELECTOPENEVENT') {
    const selectedEvent = state.events.find(item => item.id === action.id);
    selectedEvent.dadosGerais.dataHora = new Date(selectedEvent.dadosGerais.dataHora).toISOString().replace('Z', '');
    const selectedEventID = selectedEvent.id;
    return Object.assign({}, state, { selectedEvent, selectedEventID });
  }

  if (action.type === 'TOGGLEEVENTSMODAL') {
    const showModal = !state.showModal;
    return Object.assign({}, state, { showModal });
  }

  if (action.type === 'ONCHANGE') {
    if (action.subMenu) {
      const selectedEvent = state.selectedEvent;
      selectedEvent[action.subMenu][action.operator] = action.newValue;
      return Object.assign({}, state, { selectedEvent });
    }
    return Object.assign({}, state, { [action.operator]: action.newValue });
  }

  if (action.type === 'ONCHANGEDROPDOWN') {
    const selectedEvent = state.selectedEvent;
    if (!selectedEvent[action.subMenu][action.operator]) selectedEvent[action.subMenu][action.operator] = {};
    selectedEvent[action.subMenu][action.operator].id = action.newValue;
    return Object.assign({}, state, { selectedEvent });
  }

  if (action.type === 'NESTEDINPUTCHANGE') {
    const selectedEvent = state.selectedEvent;
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

  if (action.type === 'ADDINVOLVED') {
    const selectedEvent = state.selectedEvent;
    selectedEvent.envolvidos.push({});
    return Object.assign({}, state, { selectedEvent });
  }

  if (action.type === 'REMOVEINVOLVED') {
    const selectedEvent = state.selectedEvent;
    const id = state.selectedEvent.envolvidos.indexOf(action.involved);
    selectedEvent.envolvidos.splice(id, 1);
    return Object.assign({}, state, { selectedEvent });
  }

  if (action.type === 'ADDVEHICLE') {
    const selectedEvent = state.selectedEvent;
    selectedEvent.veiculos.push({});
    return Object.assign({}, state, { selectedEvent });
  }

  if (action.type === 'REMOVEVEHICLE') {
    const selectedEvent = state.selectedEvent;
    const id = selectedEvent.veiculos.indexOf(action.vehicle);
    selectedEvent.veiculos.splice(id, 1);
    return Object.assign({}, state, { selectedEvent });
  }

  if (action.type === 'ADDVIA') {
    const selectedEvent = state.selectedEvent;
    if (!selectedEvent.dadosEstatisticos.vias) selectedEvent.dadosEstatisticos.vias = [];
    selectedEvent.dadosEstatisticos.vias.push({});
    return Object.assign({}, state, { selectedEvent });
  }

  if (action.type === 'REMOVEVIA') {
    const selectedEvent = state.selectedEvent;
    const id = selectedEvent.dadosEstatisticos.vias.indexOf(action.via);
    selectedEvent.dadosEstatisticos.vias.splice(id, 1);
    return Object.assign({}, state, { selectedEvent });
  }

  if (action.type === 'INITIALIZEEVENT') {
    const selectedEvent = {
      dadosGerais: {},
      dadosEstatisticos: {},
      veiculos: [],
      envolvidos: [],
    };
    return Object.assign({}, state, { selectedEvent });
  }

  // deathEvents
  if (action.type === 'LISTDEATHEVENTS') {
    const events = action.deathEvents;
    const loading = !action.loading;
    return Object.assign({}, state, { events, loading });
  }

  // if (action.type === 'LISTDEATHOPTIONS') {
  //   const deathOptions = action.deathOptions;
  //   return Object.assign({}, state, {deathOptions});
  // }

  // if (action.type === 'TOGGLEDEATHMODAL') {
  //   const showModal = !state.showModal;
  //   return Object.assign({}, state, {showModal});
  // }

  // if (action.type === 'SELECTDEATHEVENT') {
  //   const selectedEvent = state.deathEvents.find(item => {
  //     return item.id === action.id;
  //   });
  //   const selectedEventID = selectedEvent.id;
  //   return Object.assign({}, state, {selectedEvent, selectedEventID});
  // }

  if (action.type === 'HANDLEDEATHINPUT') {
    const { selectedEvent } = state;
    const deathAnalysis = selectedEvent.analiseObito ? selectedEvent.analiseObito : {};
    if (!deathAnalysis[action.subMenu]) {
      deathAnalysis[action.subMenu] = {};
    }
    deathAnalysis[action.subMenu][action.operator] = action.newValue;
    if ((!action.newValue || action.newValue <= 0)) {
      if (action.operator === 'weight' || action.operator === 'amount') deathAnalysis[action.subMenu] = null;
      if (action.subMenu === 'additionalInfos') deathAnalysis[action.subMenu][action.operator] = null;
    }
    selectedEvent.analiseObito = deathAnalysis;
    return Object.assign({}, state, { selectedEvent });
  }

  return state;
}
