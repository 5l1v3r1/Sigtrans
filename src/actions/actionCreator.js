/**
 * Created by natal on 01/06/17.
 */

export function toggleD() {
    return {type: 'TOGGLEDRAWER'};
}

export function toggleS() {
    return {type: 'TOGGLESIDEBAR'}
}

export function listDeathEvents(loading, deathEvents) {
    return {type: 'LISTDEATHEVENTS', loading, deathEvents};
}

export function listDeathOptions(deathOptions) {
    return {type: 'LISTDEATHOPTIONS', deathOptions}
}

export function toggleDeathModal(showModal, id) {
    return {type: 'TOGGLEDEATHMODAL', showModal, id};
}

export function authERR(msg) {
    return {type: 'AUTHERR', msg}
}