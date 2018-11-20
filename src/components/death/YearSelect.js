import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import {Button as Submit, Col, ControlLabel, Form, Grid, PageHeader, Row,} from 'react-bootstrap';
import Select from 'react-select';
import DeathApi from '../../logics/DeathApi';

class YearSelect extends Component {
  handleOnChange(values, type) {
    this.props.mountForm(type, values);
  }

  componentDidMount() {
    this.props.listTypes('fatorrisco');
    this.props.listTypes('ano');
    this.props.listTypes('fatorgravidade');
    this.props.listTypes('condutarisco');
    this.handleOnChange();
  }

  submitForm(e, form) {
    e.preventDefault();
    this.props.submitForm(form);
  }

  render() {
    const {yearSelect} = this.props;

    const {
      fatorrisco, fatorgravidade, condutarisco, ano, form,
    } = yearSelect;
    return (
      <div className="content" id="content">
        <PageHeader>Cadastro anual - Análise de Óbitos</PageHeader>
        <Form onSubmit={e => this.submitForm(e, form)}>
          <Grid fluid style={{minHeight: '50vh'}}>
            <Row style={{paddingBottom: '2%'}}>
              <Col md={3}>
                <ControlLabel>Ano</ControlLabel>
                <Select
                  onChange={(selected) => {
                    this.handleOnChange(selected, 'ano');
                  }}
                  options={ano}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Col>
            </Row>
            <Row style={{paddingBottom: '5%'}}>
              <Col md={4}>
                <ControlLabel>Fatores de Risco</ControlLabel>
                <Select
                  onChange={(selected) => {
                    this.handleOnChange(selected, 'fatorrisco');
                  }}
                  isMulti
                  options={fatorrisco}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Col>
              <Col md={4}>
                <ControlLabel>Condutas de Risco</ControlLabel>
                <Select
                  onChange={(selected) => {
                    this.handleOnChange(selected, 'condutarisco');
                  }}
                  isMulti
                  options={condutarisco}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Col>
              <Col md={4}>
                <ControlLabel>Fatores/Gravidade</ControlLabel>
                <Select
                  onChange={(selected) => {
                    this.handleOnChange(selected, 'fatorgravidade');
                  }}
                  isMulti
                  options={fatorgravidade}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Col>
            </Row>
            <Row className="pull-right">
              <Col xs={3}>
                <Submit bsStyle="primary" type="submit">
                  Salvar
                </Submit>
              </Col>
            </Row>
            {/* <Row> */}
            {/* <Col md={12}> */}
            {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
            {/* </Col> */}
            {/* </Row> */}
          </Grid>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  yearSelect: state.yearselect,
});

const mapDispatchToProps = dispatch => ({
  listTypes: (selectedType) => {
    dispatch(DeathApi.listTypes(selectedType));
  },
  mountForm: (selectedType, values) => {
    dispatch(DeathApi.mountForm(selectedType, values));
  },
  submitForm: (form) => {
    dispatch(DeathApi.submitFCGAForm(form));
  },
});

const YearSelectContainer = connect(mapStateToProps, mapDispatchToProps)(YearSelect);

export default YearSelectContainer;
