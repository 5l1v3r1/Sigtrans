/**
 * Created by natal on 26/05/17.
 */
import React, {Component} from 'react';
import Cookies from 'js-cookie';
// import $ from 'jquery';
// import CustomSelect from './components/CustomSelect';

export default class TestPage extends Component {
    constructor() {
        super();
        this.state = {
            options: {
                AccidentClassification: []
            }
        };
        this.value = 0;
    }

    componentDidMount() {
        const requestInfo = {
            method: 'GET',
            // headers: {
            // 'Csrf-Token': Cookies.get('auth-token'),
            // 'Content-Type': 'application/json; charset=utf-8',
            // Accept: 'application/json',
            // },
            // credentials: 'include',
            // body: JSON.stringify({login: this.login.value, senha: this.senha.value}),
        };
        fetch('https://10.81.81.12:44320/api/Test', requestInfo)
            .then(response => {
                if (response.ok) {
                    console.log("que bom, ate logo");
                    return response.text();
                } else {
                    console.log("DISGRAAAAAAÇÇAAAAA");
                    throw new Error('Não foi possível fazer o login');
                }
            })
            .then(list => {
                Cookies.set("testHTTPS", list);
            });

        // .then(token => {
        //         // localStorage.setItem('auth-token', token);
        //         Cookies.set("auth-token", token);
        //         browserHistory.push('/home');
        //     })
        //         .catch(error => {
        //             this.setState({msg: error.message});
        //         });
        // $.ajax({
        //     url: 'https://qtdl3zjjzi.execute-api.us-west-2.amazonaws.com/prod2/acidenttype',
        //     dataType: 'json',
        //     type: 'GET',
        //     crossDomain: true,
        //     success: function (res) {
        //         this.setState({options: res});
        //     }.bind(this)
        // });
    }

    render() {
        return (
            <div>
                Para bailar la bamba
            </div>
        )
    }
}