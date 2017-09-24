import {authERR} from '../actions/actionCreator'

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
            // 'Csrf-Token': Cookies.get("auth-token"),
            // Accept: 'application/json',
            // credentials: 'include',
            //alice
            //password

            const requestInfo = {
                method: 'POST',
                headers: new Headers({
                    "content-type": "application/x-www-form-urlencoded"
                }),
                body: JSON.stringify({
                    username: user,
                    password: psw,
                    grant_type: "password",
                    client_id: "client",
                    client_secret: "secret",
                    scope: "api1"
                }),
            };
            console.log(JSON.stringify(requestInfo));
            // .well-known/openid-configuration
            fetch('https://10.81.81.12:5000/connect/token', requestInfo)
                .then(response => {
                    console.log(response);
                    if (response.ok) {
                        //Bearer 'key'
                        return response.text();
                    } else {
                        throw new Error('Não foi possível fazer o login');
                    }
                })
                /*.then(token => {
                    Cookies.set("auth-token", token);
                    browserHistory.push('/home');
                })*/
                .catch(err => {
                    dispatch(authERR(err.message));
                });
        }
    }
}
