import {delayedShowMarkers} from "../actions/actionCreator";
// import $ from "jquery";

export default class HomeApi {

    static delayedShowMarkers(showMarkers) {
        return dispatch => {
            dispatch(delayedShowMarkers(showMarkers))
        }
    }
}
