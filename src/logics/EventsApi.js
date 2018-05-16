/**
 * Created by natal on 05/06/17.
 */
import {getUrl} from '../management/Management';
import {
    addInvolved,
    addVehicle,
    changeDropdown,
    changeInput,
    listEventsOptions,
    listOpenEvents,
    nestedInputChange,
    removeInvolved,
    removeVehicle,
    selectOpenEvent,
    toggleEventsModal
} from '../actions/actionCreator'

export default class EventsApi {

	static listOpenEvents(loading) {
		return dispatch => {
            fetch(getUrl('api')+'ocorrencias')
                .then(response => {
                    if (response.ok)
                        response.json()
                            .then(events => {
                                return dispatch(listOpenEvents(loading, events.values));
                            });
                    else {
                        console.log('Falha ao receber dados: ' + response.status);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            dispatch(listOpenEvents(loading))

		}
	}

	static listEventsOpts() {
		return dispatch => {
			fetch(getUrl('api')+'options')
            // fetch(getUrl('options'))
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(options => {
                                console.log('ok');
                                return dispatch(listEventsOptions(options));
                            })
                    }
                    else {
                        console.log('Falha ao receber opcoes: ' + response.status);
                    }
                })
                .catch((err) => {
                    console.log(err);
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

	static onChangeDropdown(newValue, operator, subMenu) {
		return dispatch => {
			return dispatch(changeDropdown(newValue, operator, subMenu));
		}
	}

	static onNestedInputChange(subMenu, operator, input, id, value, dropdown){
		return dispatch => {
			return dispatch(nestedInputChange(subMenu, operator, input, id, value, dropdown));
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
