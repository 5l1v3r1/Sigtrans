/**
 * Created by natal on 05/06/17.
 */
import {listDeathEvents} from '../actions/actionCreator'

//     $.ajax({
//         url: 'https://ocorrencias-teste-api.herokuapp.com/api/options',
//         dataType: 'json',
//         type: 'GET',
//         crossDomain: true,
//         success: function (res) {
//             this.setState({options: res});
//         }.bind(this)
//     });

export default class DeathApi {

    static listDeaths(loading) {
        return dispatch => {
            fetch('https://ocorrencias-teste-api.herokuapp.com/api/events/open')
                .then(response => response.json())
                .then(deathEvents => {
                    dispatch(listDeathEvents(loading, deathEvents));
                    return deathEvents;
                });
        }
    }
}
