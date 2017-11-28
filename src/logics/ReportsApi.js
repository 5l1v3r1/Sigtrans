import {changeReportsType, handleDatePicker, initializeReportsData, makeReportsData} from '../actions/actionCreator';
import _ from 'lodash';

export default class ReportsApi {

    static makeData(reportType) {
        return dispatch => {
            const makeData = () => {
                const length = Math.round(Math.random()*11)+4;
                const max = 150;
                return _.map(_.range(length), d => ({
                    name: 'F/C '+Math.round(Math.random()*length),
                    value: Math.round(Math.random() * max + Math.round(Math.random() * 50)),
                }))
            };
            return dispatch(makeReportsData(makeData(), reportType));
        }
    }

    static initializeReports() {
        return dispatch => {
            const reportTypes = [
                {value: 'FR', label: 'Fatores de Risco (FR)'},
                {value: 'CR', label: 'Condutas de Risco (CR)'},
                {value: 'FG', label: 'Fator de risco gravidade da lesão (FG)'},
                {value: 'FRCR', label: 'Fatores e Condutas de Risco (FR e CR)'},
                {value: 'GV', label: 'Grupo de Vítimas (GV)'},
                {value: 'UC', label: 'Usuários Contributivos (UC)'}
            ];
            return dispatch(initializeReportsData(reportTypes));
        }
    }

    static changeReportType(value) {
        return dispatch => {
            return dispatch(changeReportsType(value));
        }
    }

    static handleDatePick(value, picker){
        return dispatch => {
            return dispatch(handleDatePicker(value, picker));
        }
    }
}
