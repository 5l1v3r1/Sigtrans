/**
 * Created by natal on 05/06/17.
 */
import {
  changeDeathInput,
} from '../actions/actionCreator';

export default class DeathApi {
  static onChangeInput(newValue, operator, subMenu) {
    return dispatch => dispatch(changeDeathInput(newValue, operator, subMenu));
  }
}
