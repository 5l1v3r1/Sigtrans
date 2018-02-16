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
        const selectedEvent = state.deathEvents.find(item => {
            return item.id === action.id;
        });
        const selectedEventID = selectedEvent.id;
        return Object.assign({}, state, {selectedEvent, selectedEventID});
    }

    if (action.type === 'HANDLEDEATHINPUT') {
        const selectedEvent = state.selectedEvent;
        const deathAnalysis = selectedEvent.deathAnalysis ? selectedEvent.deathAnalysis : {};
        if (!deathAnalysis[action.subMenu]) {
            deathAnalysis[action.subMenu] = {};
        }
        deathAnalysis[action.subMenu][action.operator] = action.newValue;
        if ((!action.newValue || action.newValue <= 0)) {
            if(action.operator === "weight" || action.operator === "amount")
                deathAnalysis[action.subMenu] = undefined;
            if(action.subMenu === "additionalInfos") {
                deathAnalysis[action.subMenu][action.operator] = undefined;
            }
        }
        selectedEvent.deathAnalysis = deathAnalysis;
        return Object.assign({}, state, {selectedEvent});
    }

    return state;

}