import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import Cookies from 'js-cookie';
// import 'whatwg-fetch';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {msg: this.props.location.query.msg};
    }

    requestAuth(event) {
        event.preventDefault();
        const requestInfo = {
            method: 'POST',
            headers: {
                'Csrf-Token': Cookies.get("auth-token"),
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({login: this.login.value, senha: this.senha.value}),
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
                // localStorage.setItem('auth-token', token);
                Cookies.set("auth-token", token);
                browserHistory.push('/home');
            })
            .catch(error => {
                this.setState({msg: error.message});
            });
    }

    render() {
        return (
            <div>
                <div className="login-back">
                    <div className="login-box">
                        <h1 className="header-logo">SIGTRANS</h1>
                        <span>{this.state.msg}</span>
                        <form onSubmit={this.requestAuth.bind(this)}>
                            <input type="text" ref={(input) => this.login = input}/>
                            <input type="password" ref={(input) => this.senha = input}/>
                            <input type="submit" value="Login"/>
                        </form>
                </div>
                </div>
            </div>
        );
    }
}
