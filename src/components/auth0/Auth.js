// src/Auth/Auth.js

import auth0 from 'auth0-js';

export default class Auth {

    auth0 = new auth0.WebAuth({
        domain: 'sigtrans.auth0.com',
        clientID: '4MSmgf3mefNiKf8J2qZoLxo5YQUP4NHp',
        redirectUri: 'http://localhost:3001/obitos',
        audience: 'https://sigtrans.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
    });

    login() {
        this.auth0.authorize();
    }
}
