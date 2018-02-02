/**
 * Created by natal on 01/06/17.
 */

import {List} from 'immutable';

// import update from "immutability-helper";

export function death(state = new List(), action) {

    if (action.type === 'LISTDEATHEVENTS') {
        const deathEvents = action.deathEvents;
        const loading = !action.loading;
        return Object.assign({}, state, {deathEvents, loading});
    }

    if (action.type === 'LISTDEATHOPTIONS') {
        const deathOptions = action.deathOptions;
        return Object.assign({}, state, {deathOptions});
    }

    if (action.type === 'TOGGLEDEATHMODAL') {
        const showModal = !state.showModal;
        return Object.assign({}, state, {showModal});
    }

    if (action.type === 'SELECTDEATHEVENT') {
        const selectedEvent = state.deathEvents.find(item =>{
            return item.id===action.id;
        });
        const selectedEventID = selectedEvent.id;
        return Object.assign({}, state, {selectedEvent, selectedEventID});
    }

    if (action.type === 'HANDLEDEATHINPUT') {
        const selectedEvent = state.selectedEvent;
        const deathAnalysis = selectedEvent.deathAnalysis ? selectedEvent.deathAnalysis : {};
        if(!deathAnalysis[action.subMenu]) {
            deathAnalysis[action.subMenu] = {};
        }
        if(action.operator==="weight" && action.newValue===0) {
            deathAnalysis[action.subMenu].specification = undefined;
            deathAnalysis[action.subMenu].responsible = undefined;
        }
        deathAnalysis[action.subMenu][action.operator]=action.newValue;
        selectedEvent.deathAnalysis=deathAnalysis;
        return Object.assign({}, state, {selectedEvent});
    }

    return state;

}