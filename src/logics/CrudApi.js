import {
  cleanForm,
  listGenericType,
  onChangeCrudFormInput,
  onChangeCrudInput,
  toggleATModal,
} from '../actions/actionCreator';
import { getUrl } from '../management/Management';

export default class CrudApi {
  static onChangeInput(newValue, input) {
    return (dispatch) => {
      dispatch(onChangeCrudInput(newValue, input));
    };
  }

  static onChangeCrudFormInput(value, input, option) {
    return (dispatch) => {
      dispatch(onChangeCrudFormInput(value, input, option));
    };
  }

  static addType(form, selectedType, pageSize, page) {
    return (dispatch) => {
      fetch(getUrl('api') + selectedType, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(form),
      })
        .then(response => response.json())
        .then((responseData) => {
          console.log(responseData);
          dispatch(this.listTypes(selectedType, pageSize, page));
          dispatch(cleanForm());
        });
    };
  }

  static removeType(id, selectedType, pageSize, page) {
    return (dispatch) => {
      fetch(`${getUrl('api') + selectedType}/${id}`, {
        method: 'DELETE',
        headers: new Headers({ 'content-type': 'application/json' }),
      })
        .then(response => response.json())
        .then((responseData) => {
          console.log(responseData);
          dispatch(this.listTypes(selectedType, pageSize, page));
        });
    };
  }

  static updateType(id, form, selectedType, pageSize, page) {
    return (dispatch) => {
      form.id = id;
      fetch(`${getUrl('api') + selectedType}/${id}`, {
        method: 'PUT',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(form),
      })
        .then(response => response.json())
        .then((resData) => {
          console.log(resData);
          dispatch(this.listTypes(selectedType, pageSize, page));
        }).catch((err) => {
          console.log(err);
        });
    };
  }

  static listTypes(selectedType, pageSize, page) {
    return (dispatch) => {
      dispatch(this.onChangeInput(true, 'loading'));
      fetch(getUrl('api') + selectedType + (!!pageSize && !!page ? `?pageSize=${pageSize}&start=${page * pageSize}` : '/'))
        .then(response => response.json())
        .then((responseData) => {
          dispatch(this.onChangeInput(pageSize, 'pageSize'));
          dispatch(this.onChangeInput(page, 'page'));
          dispatch(listGenericType(responseData, selectedType));
        })
        .catch((err) => {
          console.log(err);
        });
      dispatch(this.onChangeInput(false, 'loading'));
    };
  }

  static handleModal() {
    return (dispatch) => {
      dispatch(this.onChangeInput({}, 'form'));
      return dispatch(toggleATModal());
    };
  }
}
