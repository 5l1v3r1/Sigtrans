import {listGenericType, onChangeCrudFormInput, onChangeCrudInput, toggleATModal} from "../actions/actionCreator";

export default class CrudApi {

    static onChangeInput(newValue, input) {
        return dispatch => {
            dispatch(onChangeCrudInput(newValue, input))
        }
    }

    static onChangeCrudFormInput(value, input) {
        return dispatch => {
            dispatch(onChangeCrudFormInput(value, input))
        }
    }

    static addType(form, selectedType, pageSize, page) {
        return dispatch => {
            fetch('http://10.81.81.108:8080/sigtrans-api/' + selectedType, {
                method: 'POST',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify(form),
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log(responseData);
                    dispatch(this.listTypes(selectedType, pageSize, page))
                });
        }
    }

    static removeType(id, selectedType, pageSize, page) {
        return dispatch => {
            fetch('http://10.81.81.108:8080/sigtrans-api/' + selectedType + '/' + id, {
                method: 'DELETE',
                headers: new Headers({'content-type': 'application/json'}),
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log(responseData);
                    dispatch(this.listTypes(selectedType, pageSize, page))
                });
        }
    }

    static updateType(id, value, objToChange, propToChange, selectedType, pageSize, page) {
        return dispatch => {
            console.log(propToChange);
            objToChange[propToChange]=value;
            fetch('http://10.81.81.108:8080/sigtrans-api/' + selectedType + '/' + id, {
                method: 'PUT',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify(objToChange),
            })
                .then(response => response.json())
                .then(resData => {
                    console.log(resData);
                    dispatch(this.listTypes(selectedType, pageSize, page))
                });
        }
    }

    static listTypes(selectedType, pageSize, page) {
        // console.log('loading....');
        return dispatch => {
            dispatch(this.onChangeInput(true, 'loading'));
            fetch('http://10.81.81.108:8080/sigtrans-api/' + selectedType + (pageSize !== undefined && page !== undefined ? '?pageSize=' + pageSize + '&start=' + page * pageSize : '/'))
                .then(response => response.json())
                .then(responseData => {
                    dispatch(this.onChangeInput(pageSize,'pageSize'));
                    dispatch(this.onChangeInput(page,'page'));
                    dispatch(listGenericType(responseData, selectedType));
                    dispatch(this.onChangeInput(false, 'loading'));
                    // console.log('loaded');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    static handleModal() {
        return dispatch => {
            return dispatch(toggleATModal());
        }
    }
}


