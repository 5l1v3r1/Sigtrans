import {authERR} from '../actions/actionCreator'
// import {browserHistory} from 'react-router';
// import Cookies from 'js-cookie';
// import $ from "jquery";

export default class AuthAPI {

    static rAuth(user, psw) {
        return dispatch => {
            // 'Csrf-Token': Cookies.get("auth-token"),
            // Accept: 'application/json',
            // credentials: 'include',
            let data = new FormData();
            data.append("grant_type", "password");
            data.append("username", user);   //alice
            data.append("password", psw);   //password
            data.append("scope", "api1");
            data.append("client_id", "client");
            data.append("client_secret", "secret");

            let requestInfo = {
                method: "post",
                headers: new Headers({
                    "content-type": "application/x-www-form-urlencoded",
                }),
                body: data,
            };

            console.log(requestInfo);
            // .well-known/openid-configuration
            fetch('https://10.81.81.12:5000/connect/token', requestInfo)
                .then(response => {
                    console.log(response);
                    if (response.ok) {
                        //Bearer 'key'
                        return response.json();
                    } else {
                        throw new Error('Não foi possível fazer o login');
                    }
                })
                .then(token => {
                    alert(JSON.stringify(token))
                    // Cookies.set("auth-token", token);
                    // browserHistory.push('/home');
                })
                .catch(err => {
                    dispatch(authERR(err.message));
                });
        }
    }
}
