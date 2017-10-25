/**
 * Created by natal on 05/06/17.
 */
import {listEventsOptions, listOpenEvents, toggleEventsModal} from '../actions/actionCreator'

export default class EventsApi {

    static listOpenEvents(loading) {
        return dispatch => {
            fetch('https://ocorrencias-teste-api.herokuapp.com/api/events/open')
                .then(response => response.json())
                .then(events => {
                    dispatch(listOpenEvents(loading, events));
                    return events;
                });
        }
    }

    static listEventsOpts() {
        return dispatch => {
            fetch('https://ocorrencias-teste-api.herokuapp.com/api/options')
                .then(response => response.json())
                .then(options => {
                    dispatch(listEventsOptions(options));
                    return options;
                });
        }
    }

    static handleEventsModal(showModal, id) {
        return dispatch => {
            return dispatch(toggleEventsModal(showModal, id));
        }
    }

}
