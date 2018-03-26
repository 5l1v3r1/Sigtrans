/**
 * Created by natal on 05/06/17.
 */
import {
    changeDeathInput,
    listDeathEvents,
    listDeathOptions,
    selectDeathEvent,
    toggleDeathModal
} from '../actions/actionCreator'

export default class DeathApi {

    static listDeaths(loading) {
        return dispatch => {
            fetch('https://ocorrencias-teste-api.herokuapp.com/api/events/open')
                .then(response => response.json())
                .then(deathEvents => {
                    return dispatch(listDeathEvents(loading, deathEvents));
                });
        }
    }

    static listDeathsOpts() {
        return dispatch => {
            // fetch('http://localhost:3000/api/AccidentTypes')
            //     .then(response => response.json())
            //     .then(options => console.log(options));

            fetch('https://ocorrencias-teste-api.herokuapp.com/api/options')
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(options => {
                                return dispatch(listDeathOptions(options));
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

    static handleDeathModal(showModal, id) {
        return dispatch => {
            return dispatch(toggleDeathModal(showModal, id));
        }
    }

    static selectEvent(id) {
        return dispatch => {
            return dispatch(selectDeathEvent(id));
        }
    }

    static onChangeInput(newValue, operator, subMenu) {
        return dispatch => {
            return dispatch(changeDeathInput(newValue, operator, subMenu));
        }
    }

}
