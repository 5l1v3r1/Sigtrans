import {List} from 'immutable';

export function home(state = new List(), action) {
    if (action.type === 'SHOWMARKERS') {
        const showMarkers = state.showMarkers?!state.showMarkers:true;
        return Object.assign({}, state, {showMarkers});
    }

    if (action.type === 'ONCHANGEACCIDENTTYPEINPUT') {
        const newValue = action.newValue;
        return Object.assign({}, state, {[action.input]:newValue});
    }

    if (action.type === 'TOGGLEATMODAL') {
        const showModal = !state.showModal;
        return Object.assign({}, state, {showModal});
    }

    if(action.type==='LISTACCIDENTTYPES'){
        const accidentTypes = action.accidentTypes;
        const input = '';
        const updateTypeInput = '';
        const loading = action.loading;
        return Object.assign({}, state, {loading, accidentTypes, input, updateTypeInput});
    }

    if (action.type === 'SELECTACCIDENTTYPE') {
        const selectedType = state.accidentTypes.find(item => {
            return item._id === action.id;
        });
        return Object.assign({}, state, {selectedType});
    }
    return state;
}
