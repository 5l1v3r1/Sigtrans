/**
 * Created by natal on 17/10/17.
 */

import React, {Component} from "react";
import DeathApi from '../logics/DeathApi'
import {connect} from 'react-redux';

class Reports extends Component {

    render() {
        return (
            <div className='step-progress'>
                okay
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

const ReportsContainer = connect(mapStateToProps, mapDispatchToProps)(Reports);

export default ReportsContainer;