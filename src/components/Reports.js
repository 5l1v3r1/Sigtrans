/**
 * Created by natal on 17/10/17.
 */

import React, {Component} from "react";
import DeathApi from '../logics/DeathApi'
import {connect} from 'react-redux';
import Wizard from 'react-stepzilla';

class Reports extends Component {

    render() {
        const steps = [
            {name: 'Step 1', component: (<div>test</div>)},
            {name: 'Step 2', component: (<div>test2</div>)}
        ];

        return (
            <div className='step-progress'>
                <Wizard steps={steps}/>
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