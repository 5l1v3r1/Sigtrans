/**
 * Created by natal on 01/06/17.
 */

import {List} from 'immutable';

export function death(state = new List(), action) {
    if (action.type === 'LISTDEATHEVENTS') {
        const deathEvents = action.deathEvents;
        const loading = !action.loading;
        return {deathEvents, loading};
    }
    return state;
}