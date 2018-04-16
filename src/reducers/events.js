/**
 * Created by natal on 01/06/17.
 */

import {List} from 'immutable';
import update from 'immutability-helper';

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

    if (action.type === 'SELECTOPENEVENT') {
        const selectedEvent = state.events.find(item =>{
            return item.id===action.id;
        });
        const selectedEventID = selectedEvent.id;
        return Object.assign({}, state, {selectedEvent, selectedEventID});
    }

    if (action.type === 'TOGGLEEVENTSMODAL') {
        const showModal = !state.showModal;
        return Object.assign({}, state, {showModal});
    }

    if (action.type === 'ONCHANGEINPUT') {
        const selectedEvent = update(state.selectedEvent, {
            [action.subMenu]: {
                $set: update(state.selectedEvent[action.subMenu], (action.operator !== 'lat' && action.operator !== 'lng') ?
                    {
                        [action.operator]: {$set: action.newValue}
                    } :
                    {
                        geolocation: {
                            $set: update(state.selectedEvent[action.subMenu].geolocation, {
                                    [action.operator]: {$set: action.newValue}
                                }
                            )
                        }
                    }
                )
            }
        });
        return Object.assign({}, state, {selectedEvent});
    }

    if (action.type === 'ADDINVOLVED') {
        const selectedEvent = update(state.selectedEvent, {
            involved: {
                $push: [{
                    id: parseInt(state.selectedEvent.involved[state.selectedEvent.involved.length - 1].id, 10) + 1,
                    Name: ''
                }]
            }
        });
        return Object.assign({}, state, {selectedEvent});
    }

    if (action.type === 'ADDVEHICLE') {
        const selectedEvent = update(state.selectedEvent, {
            vehicles: {
                $push: [{
                    id: parseInt(state.selectedEvent.vehicles[state.selectedEvent.vehicles.length - 1].id, 10) + 1
                }]
            }
        });
        return Object.assign({}, state, {selectedEvent});
    }

    if (action.type === 'REMOVEINVOLVED') {
        const id = state.selectedEvent.involved.indexOf(action.involved);
        const selectedEvent = update(state.selectedEvent, {involved: {$splice: [[id, 1]]}});
        return Object.assign({}, state, {selectedEvent});
    }

    if (action.type === 'REMOVEVEHICLE') {
        const id = state.selectedEvent.vehicles.indexOf(action.vehicle);
        const selectedEvent = update(state.selectedEvent, {vehicles: {$splice: [[id, 1]]}});
        return Object.assign({}, state, {selectedEvent});
    }

    return state;

}
