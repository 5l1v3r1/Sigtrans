/**
 * Created by natal on 17/10/17.
 */

import React, {Component} from "react";
import DeathApi from '../../logics/DeathApi'
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';

// Form, Modal

class StatisticReports extends Component {

    render() {
        return (
            <div>
                <PageHeader>Relatórios Estatísticos</PageHeader>
                <div className="content" id="content">
                    Em construção
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menus: state.menus,
        death: state.death,
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listDeathEvents: (loading) => {
            dispatch(DeathApi.listDeaths(loading));
        }
    }
};

const StatisticContainer = connect(mapStateToProps, mapDispatchToProps)(StatisticReports);

export default StatisticContainer;
