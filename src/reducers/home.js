import {List} from 'immutable';

export function home(state = new List(), action) {
    if (action.type === 'SHOWMARKERS') {
        const showMarkers = !action.showMarkers;
        return Object.assign({}, state, {showMarkers});
    }
    return state;
}