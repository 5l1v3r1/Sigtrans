import React, {Component} from 'react';
import {connect} from 'react-redux';
import DataApi from "../../logics/DataApi";
import {Col, Grid, PageHeader, Row} from 'react-bootstrap';
import Submit from '../custom/CustomSubmit';

class DataReceive extends Component {

    onFormSubmit(e) {
        e.preventDefault();
        console.log(this.props.data.files);
    }

    render() {
        return (
            <div>
                <PageHeader>Entrada de Dados</PageHeader>
                <div className="content" id="content">
                    <h4 style={{color: 'var(--secondary-color)'}}>
                        Lembre-se de formatar os dados antes de enviar.
                    </h4>
                    <br/>
                    <form onSubmit={this.onFormSubmit.bind(this)}>
                        <Grid>
                            <Row>
                                <Col md={8}>
                                    <input type="file" accept='.csv,.xls,.xslx,.xlt'
                                           height='100%' width='100%' multiple
                                           onChange={(e) => this.props.handleChange(e.target.files)}/>
                                </Col>
                                <Col md={4}>
                                    <Submit label='Enviar'/>
                                </Col>
                            </Row>
                        </Grid>
                    </form>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.datareceive,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleChange: (files) => {
            dispatch(DataApi.handleFiles(files));
        }
    }
};

const DataReceiveContainer = connect(mapStateToProps, mapDispatchToProps)(DataReceive);

export default DataReceiveContainer;