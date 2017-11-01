/**
 * Created by natal on 05/06/17.
 */

import {
	addInvolved,
	addVehicle,
	changeInput,
	listEventsOptions,
	listOpenEvents,
	removeInvolved,
	removeVehicle,
	selectOpenEvent,
	toggleEventsModal
} from '../actions/actionCreator'

export default class EventsApi {

	static listOpenEvents(loading) {
		return dispatch => {
			// fetch('https://ocorrencias-teste-api.herokuapp.com/api/events/open')
			fetch('https://131.255.84.174:5000/api/CarAccidents')
				.then(response => response.json())
				.then(events => {
					dispatch(listOpenEvents(loading, events));
					return events;
				});
		}
	}

	static listEventsOpts() {
		return dispatch => {
			// fetch('https://ocorrencias-teste-api.herokuapp.com/api/options')
			fetch('https://131.255.84.174:5000/api/Options')
				.then(response => response.json())
				.then(options => {
					dispatch(listEventsOptions(options));
					return options;
				});
		}
	}

	static handleEventsModal() {
		return dispatch => {
			return dispatch(toggleEventsModal())
		}
	}

	static selectEvent(id) {
		return dispatch => {
			return dispatch(selectOpenEvent(id));
		}
	}

	static onChangeInput(newValue, operator, subMenu) {
		return dispatch => {
			return dispatch(changeInput(newValue, operator, subMenu));
		}
	}

	static addInvolved() {
		return dispatch => {
			return dispatch(addInvolved());
		}
	}

	static removeInvolved(involved) {
		return dispatch => {
			return dispatch(removeInvolved(involved));
		}
	}

	static addVehicle() {
		return dispatch => {
			return dispatch(addVehicle());
		}
	}

	static removeVehicle(vehicle) {
		return dispatch => {
			return dispatch(removeVehicle(vehicle));
		}
	}

}
