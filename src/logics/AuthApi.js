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
                    'Csrf-Token': Cookies.get("auth-token"),
                    'Content-Type': 'application/json; charset=utf-8',
                    Accept: 'application/json',
                }),
                credentials: 'include',
                body: JSON.stringify({login: user, senha: psw}),
            };
            fetch('http://localhost:8080/api/public/login', requestInfo)
                .then(response => {
                    if (response.ok) {
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
