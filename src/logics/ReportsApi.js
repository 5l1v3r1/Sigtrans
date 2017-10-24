import {changeReportsType, initializeReportsData, makeReportsData} from '../actions/actionCreator';

export default class ReportsApi {

    static makeData() {
        return dispatch => {
            return dispatch(makeReportsData());
        }
    }

    static initializeReports(reportTypes) {
        return dispatch => {
            return dispatch(initializeReportsData(reportTypes));
        }
    }

    static changeReportType(value) {
        return dispatch => {
            return dispatch(changeReportsType(value));
        }
    }
}
