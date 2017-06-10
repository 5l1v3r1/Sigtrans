/**
 * Created by natal on 05/06/17.
 */
import {List} from 'immutable';

function toggleDrawer(state, callback) {
    const oldDrawerState = state.drawerPinned;
    const newProps = callback(oldDrawerState);

    const newDrawerState = Object.assign({}, oldDrawerState, newProps);
    return state.set(newDrawerState);

}

export function content(state = new List(), action) {
    if (action.type === 'TOGGLEDRAWER') {
        return toggleDrawer(state, oldDrawerState => {
            const newDrawerState = !oldDrawerState;
            return {drawerPinned: newDrawerState};
        });
    }
    return state;
}