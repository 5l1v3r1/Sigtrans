/**
 * Created by natal on 01/06/17.
 */

//NAVIGATION
export function toggleD() {
    return {type: 'TOGGLEDRAWER'};
}

export function toggleS() {
    return {type: 'TOGGLESIDEBAR'};
}

//EVENTS
export function toggleEventsModal(showModal, id) {
    return {type: 'TOGGLEEVENTSMODAL', showModal, id};
}

//OPEN EVENTS
export function listOpenEvents(loading, events) {
    return {type: 'LISTOPENEVENTS', loading, events};
}

export function listEventsOptions(options) {
    return {type: 'LISTEVENTSOPTIONS', options};
}

//CLOSED EVENTS


//DEATH
export function listDeathEvents(loading, deathEvents) {
    return {type: 'LISTDEATHEVENTS', loading, deathEvents};
}
export function listDeathOptions(deathOptions) {
    return {type: 'LISTDEATHOPTIONS', deathOptions};
}
export function toggleDeathModal(showModal, id) {
    return {type: 'TOGGLEDEATHMODAL', showModal, id};
}
export function handleDeathSlider(name, value) {
    return {type: 'HANDLEDEATHSLIDER', name, value};
}

//AUTH
export function authERR(msg) {
    return {type: 'AUTHERR', msg};
}

//REPORTS
export function makeReportsData() {
    return {type: 'MAKEREPORTSDATA'};
}

export function changeReportsType(value) {
    return {type: 'CHANGEREPORTTYPE', value};
}

export function initializeReportsData(reportTypes) {
    return {type: 'INITIALIZEREPORTSDATA', reportTypes};
}