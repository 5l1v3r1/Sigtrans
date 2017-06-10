/**
 * Created by natal on 01/06/17.
 */

import {List} from 'immutable';

export function navegation(state = new List(), action) {
    if (action.type === 'TOGGLEDRAWER') {
        const drawer = !state.drawer;
        return Object.assign({}, state, {drawer});
    }
    if (action.type === 'TOGGLESIDEBAR') {
        const sidebar = !state.sidebar;
        return Object.assign({}, state, {sidebar});
    }
    return state;
}