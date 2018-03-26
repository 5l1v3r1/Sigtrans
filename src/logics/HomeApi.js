import {delayedShowMarkers} from "../actions/actionCreator";

export default class HomeApi {
    static delayedShowMarkers(showMarkers) {
        return dispatch => {
            dispatch(delayedShowMarkers(showMarkers))
        }
    }
}
