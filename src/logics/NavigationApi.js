/**
 * Created by natal on 05/06/17.
 */
import {toggleD, toggleS} from '../actions/actionCreator'

export default class NavigationApi {

    static toggleDrawer() {
        return dispatch => {
            return dispatch(toggleD());
        }
    }

    static toggleSidebar() {
        return dispatch => {
            return dispatch(toggleS());
        }
    }

}