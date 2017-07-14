/**
 * Created by natal on 01/06/17.
 */
export function toggleD() {
    return {type: 'TOGGLEDRAWER'};
}

export function toggleS() {
    return {type: 'TOGGLESIDEBAR'}
}

export function listDeathEvents(deathEvents) {
    return {type: 'LISTDEATHEVENTS', deathEvents};
}