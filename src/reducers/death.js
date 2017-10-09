/**
 * Created by natal on 01/06/17.
 */

import {List} from 'immutable';

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
        const deathAnalysis = state.deathAnalysis ? state.deathAnalysis : {}; //Add DeathAnalysis on Server
        const showModal = !action.showModal;
        const selectedEventID = state.selectedEventID ? state.selectedEventID : action.id;
        const selectedEvent = state.selectedEvent ? state.selectedEvent : state.deathEvents[selectedEventID - 1];
        return Object.assign({}, state, {showModal, selectedEventID, selectedEvent, deathAnalysis});
    }

    if (action.type === 'HANDLEDEATHSLIDER') {
        const deathAnalysis = state.deathAnalysis ? state.deathAnalysis : {}; //Add DeathAnalysis on Server
        deathAnalysis[action.name] = action.value;
        return Object.assign({}, state, {deathAnalysis});
    }

    return state;

}