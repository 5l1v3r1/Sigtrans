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
export function toggleEventsModal() {
    return {type: 'TOGGLEEVENTSMODAL'};
}
export function selectOpenEvent(id) {
    return {type: 'SELECTOPENEVENT', id};
}
export function changeInput(newValue, operator, subMenu) {
    return {type: 'ONCHANGE', newValue, operator, subMenu};
}

export function nestedInputChange(subMenu, operator, input, id, value){
    return {type:'NESTEDINPUTCHANGE', subMenu, operator, input, id, value}
}

export function addVehicle(vehicle) {
    return {type: 'ADDVEHICLE', vehicle}
}
export function removeVehicle(vehicle) {
    return {type: 'REMOVEVEHICLE', vehicle}
}
export function addInvolved() {
    return {type: 'ADDINVOLVED'}
}
export function removeInvolved(involved) {
    return {type: 'REMOVEINVOLVED', involved}
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

export function selectDeathEvent(id) {
    return {type: 'SELECTDEATHEVENT', id};
}
export function changeDeathInput(newValue, operator, subMenu) {
    return {type: 'HANDLEDEATHINPUT', newValue, operator, subMenu};
}
//AUTH
export function authERR(msg) {
    return {type: 'AUTHERR', msg};
}

//REPORTS
export function makeReportsData(reportData, reportType) {
    return {type: 'MAKEREPORTSDATA', reportData, reportType};
}

export function changeReportsType(value) {
    return {type: 'CHANGEREPORTTYPE', value};
}

export function initializeReportsData(reportTypes) {
    return {type: 'INITIALIZEREPORTSDATA', reportTypes};
}

export function handleDatePicker(value, picker) {
    return {type: 'HANDLEDATEPICKER', value, picker};
}

//FILES
export function handleFiles(files) {
    return {type: 'HANDLEFILES', files};
}

//HOME

export function delayedShowMarkers(){
    return {type:"SHOWMARKERS"};
}

//CRUD AT
export function listGenericType(data, selectedType){
    return {type:"LISTACCIDENTTYPES", data, selectedType};
}

export function onChangeCrudInput(value, input){
    return {type:"ONCHANGECRUDINPUT", value, input};
}

export function onChangeCrudFormInput(value, input){
    return {type:"ONCHANGECRUDFORMINPUT", value, input};
}

export function toggleATModal() {
    return {type: 'TOGGLEATMODAL'};
}

export function cleanForm() {
    return {type: 'CLEANFORM'};
}
