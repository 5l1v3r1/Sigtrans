/**
 * Created by natal on 01/06/17.
 */

import {List} from 'immutable';

export function events(state = new List(), action) {

    if (action.type === 'LISTOPENEVENTS') {
        const events = action.events;
        const loading = !action.loading;
        return Object.assign({}, state, {events, loading});
    }

    if (action.type === 'LISTEVENTSOPTIONS') {
        const options = action.options;
        return Object.assign({}, state, {options});
    }

    if (action.type === 'TOGGLEEVENTSMODAL') {
        const showModal = !action.showModal;
        const selectedEventID = state.selectedEventID ? state.selectedEventID : action.id;
        const selectedEvent = state.selectedEvent ? state.selectedEvent : state.events[selectedEventID - 1];
        return Object.assign({}, state, {showModal, selectedEventID, selectedEvent});
    }

    return state;

}