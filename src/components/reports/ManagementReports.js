/**
 * Created by natal on 17/10/17.
 */

import React, {Component} from "react";
import ReportsApi from '../../logics/ReportsApi'
import {connect} from 'react-redux';
import {Col, Grid, PageHeader, Row} from 'react-bootstrap';
import {Axis, Chart, Pie, Series, Tooltip} from 'react-charts';
import Button from 'react-toolbox/lib/button/Button'
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

class ManagementReports extends Component {
    componentWillMount() {
        this.props.makeData();
        const reportTypes = [
            {value: '1', label: 'Por Data'},
            {value: '2', label: 'Por Severidade'},
        ];
        this.props.initializeReports(reportTypes);
    }

    render() {
        return (
            <div>
                <PageHeader>Relatórios Gerenciais</PageHeader>
                <div className="content" id="content">
                    <Grid>
                        <Row style={{height: '80vh'}}>
                            <Col sm={9} style={{height: '100%', borderRight: '1px dotted'}}>
                                {/*<h3>Relatório</h3>*/}
                                <Chart style={{height: '50%'}} data={this.props.reports.data}>
                                    <Axis type="pie"/>
                                    <Series type={Pie} showPoints={false}/>
                                    <Tooltip/>
                                </Chart>
                            </Col>
                            <Col sm={3} style={{height: '50%'}}>
                                <h3>Opções</h3>
                                <Dropdown auto
                                          onChange={this.props.changeReportType}
                                          source={this.props.reports.managementReportTypes ? this.props.reports.managementReportTypes : []}
                                          value={this.props.reports.managementReportType ? this.props.reports.managementReportType : '1'}
                                />
                                <Button onClick={this.props.makeData} raised primary label='Gerar'/>
                            </Col>
                        </Row>
                        {/*<Row>*/}
                        {/*<pre>{JSON.stringify(this.props.reports, null, 2)}</pre>*/}
                        {/*</Row>*/}
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reports: state.reports
    }
};

const mapDispatchToProps = dispatch => {
    return {
        makeData: () => {
            dispatch(ReportsApi.makeData());
        },
        initializeReports: (reportTypes) => {
            dispatch(ReportsApi.initializeReports(reportTypes));
        },
        changeReportType: (value) => {
            dispatch(ReportsApi.changeReportType(value));
        }
    }
};

const ManagementContainer = connect(mapStateToProps, mapDispatchToProps)(ManagementReports);

export default ManagementContainer;