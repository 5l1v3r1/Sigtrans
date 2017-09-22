import {authERR} from '../actions/actionCreator'
import {browserHistory} from 'react-router';
import Cookies from 'js-cookie';

export default class AuthAPI {


    // static listDeaths(loading) {
    //     return dispatch => {
    //         fetch('https://ocorrencias-teste-api.herokuapp.com/api/events/open')
    //             .then(response => response.json())
    //             .then(deathEvents => {
    //                 dispatch(listDeathEvents(loading, deathEvents));
    //                 return deathEvents;
    //             });
    //     }
    // }

    static rAuth(user, psw) {
        return dispatch => {
            const requestInfo = {
                method: 'POST',
                headers: new Headers({
                    // 'Csrf-Token': Cookies.get("auth-token"),
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // Accept: 'application/json',
                }),
                credentials: 'include',
                body: JSON.stringify({
                    username: user,
                    password: psw,
                    grant_type: 'password',
                    client_id: 'client',
                    client_secret: 'secret',
                    scope: 'api1'
                }),
            };
            fetch('http://10.81.81.12:5000/.well-known/openid-configuration', requestInfo)
                .then(response => {
                    if (response.ok) {
                        //Bearer 'key'
                        return response.text();
                    } else {
                        throw new Error('Não foi possível fazer o login');
                    }
                })
                .then(token => {
                    Cookies.set("auth-token", token);
                    browserHistory.push('/home');
                })
                .catch(err => {
                    dispatch(authERR(err.message));
                });
        }
    }
}
