/**
 * Created by natal on 10/23/17.
 */

import {List} from 'immutable';
import _ from 'lodash';

export function reports(state = new List(), action) {

    if (action.type === 'INITIALIZEREPORTSDATA') {
        const managementReportTypes = action.reportTypes;
        const managementReportType = 1;
        return Object.assign({}, state, {managementReportTypes, managementReportType});
    }

    if (action.type === 'MAKEREPORTSDATA') {
        const makeSeries = () => {
            const startDate = new Date();
            // const length = Math.round(Math.random() * 30)
            const length = 10;
            const max = 150;
            // const max = Math.random() > 0.5 ? 100000 : 10
            // const multiplier = 10
            // const multiplier = Math.round((Math.random() * 10) + Math.round(Math.random() * 50))
            return _.map(_.range(length), d => ({
                // x: d * multiplier,
                x: new Date().setDate(startDate.getDay() + 1 * d),
                y: Math.round(Math.random() * max + Math.round(Math.random() * 50)),
                r: Math.round(Math.random() * 5)
            }))
        };
        const makeData = () => {
            return _.map(_.range(Math.max(Math.round(Math.random() * 8), 1)), d =>
                makeSeries()
            )
        };
        const data = makeData();
        return Object.assign({}, state, {data});
    }

    if (action.type === 'CHANGEREPORTTYPE') {
        const managementReportType = action.value;
        return Object.assign({}, state, {managementReportType});
    }
    return state;
}