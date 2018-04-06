import {listGenericType, onChangeAccidentTypeInput, toggleATModal} from "../actions/actionCreator";

export default class CrudApi {

    static onChangeInput(newValue, input) {
        return dispatch => {
            dispatch(onChangeAccidentTypeInput(newValue, input))
        }
    }

    //arrumar o metodo para ser generico
    static addType(value, selectedType, pageSize, page) {
        return dispatch => {
            let data = {
                nome: value
            };
            fetch('http://10.81.81.108:8080/sigtrans-api/' + selectedType, {
                method: 'POST',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify(data),
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

    static updateType(id, value, objToChange, selectedType, pageSize, page) {
        return dispatch => {
            objToChange.nome=value;
            console.log(objToChange);
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
        console.log('loading....');
        return dispatch => {
            dispatch(this.onChangeInput(true, 'loading'));
            fetch('http://10.81.81.108:8080/sigtrans-api/' + selectedType + (pageSize !== undefined && page !== undefined ? '?pageSize=' + pageSize + '&start=' + page * pageSize : '/'))
                .then(response => response.json())
                .then(responseData => {
                    dispatch(this.onChangeInput(pageSize,'pageSize'));
                    dispatch(this.onChangeInput(page,'page'));
                    dispatch(listGenericType(responseData, selectedType));
                    dispatch(this.onChangeInput(false, 'loading'));
                    console.log('loaded');
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


