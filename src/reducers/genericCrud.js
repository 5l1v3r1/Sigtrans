import { List } from 'immutable';

export function genericCrud(state = new List(), action) {
  if (action.type === 'ONCHANGECRUDINPUT') {
    if (action.value === undefined) {
      const newState = delete (state[action.input]);
      return Object.assign({}, newState);
    }
    const { value } = action;
    return Object.assign({}, state, { [action.input]: value });
  }

  if (action.type === 'ONCHANGECRUDFORMINPUT') {
    const { value } = action;
    const form = Object.assign({}, state.form);
    if ((value === '') || (!value)) {
      delete form[action.input];
    } else {
      form[action.input] = form[action.input] || {};
      if (!action.option) form[action.input] = value;
      else form[action.input].id = value;
    }
    return Object.assign({}, state, { form });
  }

  if (action.type === 'TOGGLEATMODAL') {
    const showModal = !state.showModal;
    return Object.assign({}, state, { showModal });
  }

  if (action.type === 'LISTACCIDENTTYPES') {
    const pages = Math.ceil(action.data.count / action.data.pageSize);
    return Object.assign({}, state, { [action.selectedType]: action.data.values, pages });
  }

  if (action.type === 'SELECTACCIDENTTYPE') {
    const selectedType = state.accidentTypes.find(item => item._id === action.id);
    return Object.assign({}, state, { selectedType });
  }
  if (action.type === 'CLEANFORM') {
    const form = Object.keys(state.form).map(item => state.form[item] = undefined);
    return Object.assign({}, state, form);
  }

  return state;
}
