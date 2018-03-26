import {
    listAccidentTypes,
    onChangeAccidentTypeInput,
    selectAccidentType,
    toggleATModal
} from "../actions/actionCreator";

export default class CrudApi {

    static onChangeInput(newValue, input) {
        return dispatch => {
            dispatch(onChangeAccidentTypeInput(newValue, input))
        }
    }

    static addType(value) {
        return dispatch => {
            let data = {value};
            fetch('http://localhost:3000/api/AccidentTypes', {
                method: 'POST',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log(responseData);
                    dispatch(this.listTypes(false));
                });
        }
    }

    static removeType(id) {
        return dispatch => {
            console.log('http://localhost:3000/api/AccidentTypes/'+id);
            fetch('http://localhost:3000/api/AccidentTypes/'+id, {
                method: 'DELETE',
                headers: new Headers({'content-type': 'application/json'}),
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log(responseData);
                    dispatch(this.listTypes(false));
                });
        }
    }

    static updateType(id, value) {
        return dispatch => {
            let data = {value};
            fetch('http://localhost:3000/api/AccidentTypes/'+id, {
                method: 'PUT',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log(responseData);
                    dispatch(this.listTypes(false));
                    dispatch(this.handleModal(true));
                });
        }
    }

    static listTypes(loading) {
        return dispatch => {
            fetch('http://localhost:3000/api/AccidentTypes')
                .then(response => response.json())
                .then(accidentTypes => {
                    return dispatch(listAccidentTypes(loading, accidentTypes));
                });
        }
    }

    static handleModal() {
        return dispatch => {
            return dispatch(toggleATModal());
        }
    }

    static selectAccidentType(id) {
        return dispatch => {
            return dispatch(selectAccidentType(id));
        }
    }

}


