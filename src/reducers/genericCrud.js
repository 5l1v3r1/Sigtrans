import {List} from 'immutable';

export function genericCrud(state = new List(), action) {
    if (action.type === 'ONCHANGEACCIDENTTYPEINPUT') {
        const newValue = action.newValue;
        return Object.assign({}, state, {[action.input]: newValue});
    }

    if (action.type === 'TOGGLEATMODAL') {
        const showModal = !state.showModal;
        return Object.assign({}, state, {showModal});
    }

    if (action.type === 'LISTACCIDENTTYPES') {
        const accidentTypes = action.accidentTypes;
        const input = '';
        const updateTypeInput = '';
        return Object.assign({}, state, {accidentTypes, input, updateTypeInput});
    }

    if (action.type === 'SELECTACCIDENTTYPE') {
        const selectedType = state.accidentTypes.find(item => {
            return item._id === action.id;
        });
        return Object.assign({}, state, {selectedType});
    }
    return state;
}
