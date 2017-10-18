import React, {Component} from 'react';
import {PageHeader} from 'react-bootstrap';

export default class Home extends Component {
    render() {
        return (
            <div>
                <PageHeader>Bem Vindo</PageHeader>
                <div className="content" id="content">
                    Sigtrans
                </div>
            </div>

        );
    }
}