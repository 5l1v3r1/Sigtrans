import {authERR} from '../actions/actionCreator'
import {browserHistory} from 'react-router';
// import Cookies from 'js-cookie';
// import $ from "jquery";

export default class AuthAPI {

    static rAuth(user, psw) {
        return dispatch => {
            let data = new FormData();
            data.append("client_id", "client");
            data.append("client_secret", "secret");
            data.append("grant_type", "password");
            data.append("username", user);   //alice
            data.append("password", psw);   //password
            data.append("scope", "api1");

            fetch('https://10.81.81.12:5000/connect/token', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: data,
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Não foi possível realizar o login');
                    }
                })
                .then(responseData => {
                    console.log(responseData.token_type + " " + responseData.access_token);
                    // dispatch(loginSucessfull(responseData));
                    // Cookies.set("auth-token", responseData.token_type+" "+responseData.access_token);
                    browserHistory.push('/home');
                })
                .catch(err => {
                    dispatch(authERR(err.message));
                });

        }
    }

}
