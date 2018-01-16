import {handleFiles} from '../actions/actionCreator'
// import {browserHistory} from 'react-router';
// import Cookies from 'js-cookie';
// import $ from "jquery";

export default class DataAPI {

    static handleFiles(files) {
        return dispatch => {
            return dispatch(handleFiles(files));
        }
    }

}
