import {List} from 'immutable';

export function auth(state = new List(), action) {
    if (action.type === 'AUTHERR') {
        const msg = action.msg;
        return Object.assign({}, state, {msg});
    }
    return state;
}