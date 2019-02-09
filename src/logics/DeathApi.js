/**
 * Created by natal on 05/06/17.
 */
import {
  changeDeathInput, listDeathFCGA, listFCGA, mountDeathYearFCGAForm,
} from '../actions/actionCreator';
import { getUrl } from '../management/Management';

export default class DeathApi {
  static onChangeInput(newValue, FCGAId, group, subGroup, input) {
    return dispatch => dispatch(changeDeathInput(newValue, FCGAId, group, subGroup, input));
  }

  static getFCGA(year) {
    return (dispatch) => {
      fetch(`${getUrl('api')}fatoresano/porano?ano=${year}`)
        .then((response) => {
          if (response.ok) {
            response.json()
              .then(list => dispatch(listFCGA(list)));
          } else {
            console.log(`Falha ao receber dados: ${response.status}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  static listTypes(selectedType) {
    return async (dispatch) => {
      await fetch(`${getUrl('api')}${selectedType}?pageSize=1000`)
        .then((response) => {
          if (response.ok) {
            response.json()
              .then(types => dispatch(listDeathFCGA(types.values, selectedType)));
          } else {
            console.log(`Falha ao receber dados: ${response.status}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  static submitFCGAForm(form) {
    return (dispatch) => {
      fetch(`${getUrl('api')}fatoresano`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(form),
      })
        .then((response) => {
          if (response.ok) {
            response.json()
              .then(responseJson => console.log(responseJson));
          } else {
            console.log(`Falha ao receber dados: ${response.status}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  static mountForm(key, values) {
    return dispatch => dispatch(mountDeathYearFCGAForm(key, values));
  }
}
