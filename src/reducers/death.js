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

    if (action.type === 'TOGGLEDEATHMODAL') {
        const showModal = !action.showModal;
        const selectedEventID = action.id;
        const selectedEvent = state.selectedEvent ? state.deathEvents[selectedEventID - 1] : undefined;
        return Object.assign({}, state, {showModal, selectedEventID, selectedEvent});
    }

    return state;
}