/**
 * Created by natal on 17/10/17.
 */

import React, {Component} from "react";
import DeathApi from '../logics/DeathApi'
import {connect} from 'react-redux';
import {Col, Grid, PageHeader, Panel, Row} from 'react-bootstrap';

// Form, Modal

class StatisticReports extends Component {

    render() {
        return (
            <div>
                <PageHeader>Relatórios Estatísticos</PageHeader>
                <div className="content" id="content">
                    <Grid>
                        <Row>
                            <Col sm={10}>
                                <Panel header='Estatísticos'>
                                    Por Ocorrência (abertas, por data, por condutor, por vítima...)
                                    <br/>
                                    Por Bairro
                                    <br/>
                                    Por Rua
                                    <br/>
                                    Por Cruzamento
                                    <br/>
                                    Por Horário
                                    <br/>
                                    Por dia da semana
                                    <br/>
                                    Por Idade
                                    <br/>
                                    Por Severidade
                                    <br/>
                                    Por Sexo
                                    <br/>
                                    Por Tipo de Acidente
                                    <br/>
                                    Por Tipo de Veiculo
                                    <br/>
                                    Pela Placa do Veículo
                                    <br/>
                                    Por Habilitação (não habilitado,cassado...)
                                    <br/>
                                    Por condição de Segurança
                                    <br/>
                                    Por Conduta Provável
                                </Panel>
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

const StatisticContainer = connect(mapStateToProps, mapDispatchToProps)(StatisticReports);

export default StatisticContainer;