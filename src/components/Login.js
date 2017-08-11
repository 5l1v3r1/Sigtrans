import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthApi from "../logics/AuthApi";

// import 'whatwg-fetch';

class Login extends Component {

    requestAuth(e) {
        e.preventDefault();
        this.props.requestAuth(this.user.value, this.psw.value);
    }

    render() {
        return (
            <div>
                <div className="login-back">
                    <div className="login-box">
                        <h1 className="header-logo">SIGTRANS</h1>
                        <span>{this.props.location.query.msg ? this.props.location.query.msg : this.props.auth.msg}</span>
                        <form onSubmit={this.requestAuth.bind(this)}>
                            <input type="text" placeholder="Usuário" name="user" required
                                   ref={(input) => this.user = input}/>
                            <input type="password" placeholder="Senha" name="psw" required
                                   ref={(input) => this.psw = input}/>
                            <input type="submit" value="Login"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        requestAuth: (user, psw) => {
            dispatch(AuthApi.rAuth(user, psw));
        }
    }
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;