import {List} from 'immutable';

export function datareceive(state = new List(), action) {
    if (action.type === 'HANDLEFILES') {
        const files = action.files;
        return Object.assign({}, state, {files});
    }
    return state;
}