/**
 * Created by natal on 17/10/17.
 */

import React, {Component} from "react";
import ReportsApi from '../../logics/ReportsApi'
import {connect} from 'react-redux';
import {Col, Grid, PageHeader, Row} from 'react-bootstrap';
import {CSVLink} from 'react-csv';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Button from 'react-toolbox/lib/button/Button';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';

// import {Axis, Chart, Pie, Series, Tooltip} from 'react-charts';

class ManagementReports extends Component {

    componentWillMount() {
        this.props.initializeReports();
    }

    render() {
        const today = new Date();
        return (
            <div className='clearfix'>
                <PageHeader>Relatórios de Óbitos</PageHeader>
                <div className="content" id="content">
                    <Grid>
                        <Row style={{height: '80vh'}}>
                            <Col sm={8} style={{height:'100%', borderRight: '1px dotted'}}>
                                {
                                    this.props.reports.reportTypeName?(
                                        <div style={{height: '100%', width:'100%'}}>
                                            <h3>{this.props.reports.reportTypeName}</h3>
                                            <ResponsiveContainer width="100%" height="80%">
                                                <BarChart data={this.props.reports.reportData}
                                                          margin={{top: 5, right: 5, left: 5, bottom: 5}}>
                                                    <XAxis dataKey="name"/>
                                                    <YAxis/>
                                                    <CartesianGrid strokeDasharray="5 5"/>
                                                    <Tooltip/>
                                                    <Bar dataKey="value" fill="#3f51b5"/>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                        ):
                                        <h3>Selecione o Tipo do Relatório</h3>
                                }
                            </Col>
                            <Col sm={4}>
                                <h3>Tipo de relatório</h3>
                                <Dropdown auto onChange={(value)=>this.props.changeReportType(value)}
                                          source={this.props.reports.reportTypes?this.props.reports.reportTypes:[]}
                                          value={this.props.reports.reportType}
                                />
                                <DatePicker label='Data de Inicio' locale='pt' cancelLabel='Cancelar'
                                            onChange={(value)=>this.props.handleDatePick(value, 'date1')}
                                            value={this.props.reports.date1} maxDate={this.props.reports.date2}
                                            inputFormat={(value) => `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}
                                            sundayFirstDayOfWeek
                                />
                                {/*// const min_datetime = new Date(new Date(today).setDate(1));*/}
                                <DatePicker label='Data Final' locale='pt' cancelLabel='Cancelar'
                                            onChange={(value)=>this.props.handleDatePick(value, 'date2')}
                                            value={this.props.reports.date2} maxDate={today}
                                            minDate={this.props.reports.date1?new Date(new Date(this.props.reports.date1).setDate(this.props.reports.date1.getDate()-1)):undefined}
                                            inputFormat={(value) => `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`}
                                            sundayFirstDayOfWeek
                                />
                                <Button onClick={()=>this.props.makeData(this.props.reports.reportType)}
                                        disabled={!this.props.reports.reportType}
                                        raised primary label='Gerar'
                                />
                               <CSVLink data={this.props.reports.reportData?this.props.reports.reportData:[]}
                                        filename={this.props.reports.reportTypeName+".csv"}
                                        target="_blank" separator={";"} className="paddingLeft2Px"
                                >
                                    <Button raised accent label='Baixar CSV'
                                            disabled={!this.props.reports.reportData}
                                    />
                               </CSVLink>
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
        reports: state.reports
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleDatePick:(value, picker)=>{
            dispatch(ReportsApi.handleDatePick(value, picker));
        },
        makeData: (reportType) => {
            dispatch(ReportsApi.makeData(reportType));
        },
        initializeReports: () => {
            dispatch(ReportsApi.initializeReports());
        },
        changeReportType: (value) => {
            dispatch(ReportsApi.changeReportType(value));
        }
    }
};

const ManagementContainer = connect(mapStateToProps, mapDispatchToProps)(ManagementReports);

export default ManagementContainer;