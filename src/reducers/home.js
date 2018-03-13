import {List} from 'immutable';

export function home(state = new List(), action) {
    if (action.type === 'SHOWMARKERS') {
        const showMarkers = state.showMarkers?!state.showMarkers:true;
        return Object.assign({}, state, {showMarkers});
    }

    if (action.type === 'ONCHANGEACCIDENTTYPEINPUT') {
        if(action.input==='selectedInput') {
            state.selectedType.value=action.newValue;
            return Object.assign({}, state);
        }
        const input = action.newValue;
        return Object.assign({}, state, {input});
    }

    if (action.type === 'TOGGLEATMODAL') {
        const showModal = !state.showModal;
        return Object.assign({}, state, {showModal});
    }

    if(action.type==='LISTACCIDENTTYPES'){
        const accidentTypes = action.accidentTypes;
        const input = '';
        const loading = action.loading;
        return Object.assign({}, state, {loading, accidentTypes, input});
    }

    if (action.type === 'SELECTACCIDENTTYPE') {
        const selectedType = state.accidentTypes.find(item => {
            return item._id === action.id;
        });
        // const selectedTypeID = selectedType.id;
        return Object.assign({}, state, {selectedType});
    }
    return state;
}
