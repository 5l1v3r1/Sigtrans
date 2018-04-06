import {List} from 'immutable';

export function genericCrud(state = new List(), action) {
    if (action.type === 'ONCHANGETYPEINPUT') {
        const newValue = action.newValue;
        return Object.assign({}, state, {[action.input]: newValue});
    }

    if (action.type === 'TOGGLEATMODAL') {
        const showModal = !state.showModal;
        return Object.assign({}, state, {showModal});
    }

    if (action.type === 'LISTACCIDENTTYPES') {
        const input = '';
        const updateTypeInput = '';
        const pages = Math.ceil(action.data.count / action.data.pageSize);
        return Object.assign({}, state, {
            [action.selectedType]: action.data.values,
            input,
            updateTypeInput,
            pages
        });
    }

    if (action.type === 'SELECTACCIDENTTYPE') {
        const selectedType = state.accidentTypes.find(item => {
            return item._id === action.id;
        });
        return Object.assign({}, state, {selectedType});
    }
    return state;
}
