/**
 * Created by natal on 10/23/17.
 */

import {List} from 'immutable';

export function reports(state = new List(), action) {

    if (action.type === 'INITIALIZEREPORTSDATA') {
        const date1 = new Date();
        const date2 = new Date();
        const reportTypes = action.reportTypes;
        return Object.assign({}, state, {reportTypes, date1, date2});
    }

    if (action.type === 'MAKEREPORTSDATA') {
        const reportData = action.reportData;
        const index = state.reportTypes.map(d => {
            return d['value'];
        }).indexOf(action.reportType);
        const reportTypeName = state.reportTypes[index].label;
        return Object.assign({}, state, {reportData, reportTypeName});
    }

    if (action.type === 'CHANGEREPORTTYPE') {
        const reportType = action.value;
        return Object.assign({}, state, {reportType});
    }

    if (action.type === 'HANDLEDATEPICKER') {
        // console.log(new Date(action.value));
        return Object.assign({}, state, {[action.picker]:action.value});
    }
    return state;
}