/**
 * Created by natal on 17/10/17.
 */

import React, {Component} from "react";
import DeathApi from '../logics/DeathApi'
import {connect} from 'react-redux';
import {PageHeader} from 'react-bootstrap';

// Form, Modal, PageHeader

class ManagementReports extends Component {

    render() {
        return (
            <div>
                <PageHeader>Relatórios Gerenciais</PageHeader>
                <div className="content" id="content">
                    Por Severidade
                    <br/>
                    Óbitos por Data
                    <br/>

                    {/*<Grid>*/}
                    {/*<Row>*/}
                    {/*<Col sm={10}>*/}
                    {/*<Panel header='Gerenciais'>*/}
                    {/*</Panel>*/}
                    {/*</Col>*/}
                    {/*</Row>*/}
                    {/*</Grid>*/}

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

const ManagementContainer = connect(mapStateToProps, mapDispatchToProps)(ManagementReports);

export default ManagementContainer;