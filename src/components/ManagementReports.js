/**
 * Created by natal on 17/10/17.
 */

import React, {Component} from "react";
import DeathApi from '../logics/DeathApi'
import {connect} from 'react-redux';
import {Col, Grid, PageHeader, Row} from 'react-bootstrap';

class ManagementReports extends Component {
    render() {
        return (
            <div>
                <PageHeader>Relatórios Gerenciais</PageHeader>
                <div className="content" id="content">
                    <Grid>
                        <Row style={{height: '80vh'}}>
                            <Col sm={8} style={{height: '50%'}}>
                                Relatorio
                            </Col>
                            <Col sm={3} style={{height: '50%'}}>
                                Opções
                            </Col>
                        </Row>
                    </Grid>
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