/**
 * Created by natal on 05/06/17.
 */
import {handleDeathSlider, listDeathEvents, listDeathOptions, toggleDeathModal} from '../actions/actionCreator'

export default class DeathApi {

    static listDeaths(loading) {
        return dispatch => {
            fetch('https://ocorrencias-teste-api.herokuapp.com/api/events/open')
                .then(response => response.json())
                .then(deathEvents => {
                    dispatch(listDeathEvents(loading, deathEvents));
                    return deathEvents;
                });
        }
    }

    static listDeathsOpts() {
        return dispatch => {
            fetch('https://ocorrencias-teste-api.herokuapp.com/api/options')
                .then(response => response.json())
                .then(deathOptions => {
                    dispatch(listDeathOptions(deathOptions));
                    return deathOptions;
                });
        }
    }

    static handleDeathModal(showModal, id) {
        return dispatch => {
            return dispatch(toggleDeathModal(showModal, id));
        }
    }

    static handleSlider(name, value) {
        return dispatch => {
            return dispatch(handleDeathSlider(name, value));
        }
    }

}
