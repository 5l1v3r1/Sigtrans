import React, {Component} from 'react'
import Input from "./CustomInput";
import Select from "./CustomSelect";
import {Col, Panel, Row} from 'react-bootstrap';
import Button from 'react-toolbox/lib/button/Button';

export class General extends Component {
    onChangeInput(newValue, operator) {
        let subMenu = this.props.subMenu;
        this.props.onChangeInput(newValue, operator, subMenu);
    }

    render() {
        return (
            <Row className="form-group">
                <br/>
                <Row>
                    <Col sm={4}>
                        <Input value={this.props.data.date} type="date"
                               id="date" required="required"
                               onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                               label="Data"/>
                    </Col>
                    <Col sm={4}>
                        <Input value={this.props.data.street} type="text"
                               id="street" required="required"
                               onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                               label="Rua"/>
                    </Col>
                    <Col sm={4}>
                        <Input value={this.props.data.number} type="text"
                               id="number" required="required"
                               onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                               label="Numero"/>
                    </Col>
                </Row>

                <Row>
                    <Col sm={4}>
                        <Input value={this.props.data.cross} type="text"
                               id="cross" required="required"
                               onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                               label="Cruzamento"/>
                    </Col>
                    <Col sm={4}>
                        <Input value={this.props.data.lat} type="number"
                               id="lat" required="required"
                               onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                               label="Latitude"/>
                    </Col>
                    <Col sm={4}>
                        <Input value={this.props.data.lng} type="number"
                               id="lng" required="required"
                               onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                               label="Longitude"/>
                    </Col>
                </Row>

                <Row>
                    <Col sm={12}>
                        <Input value={this.props.data.middleName} type="text"
                               id="middleName" required="required"
                               onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                               label="Nome do meio / Inicial"/>
                    </Col>
                </Row>

            </Row>
        )
    }
}

export class StatisticData extends Component {
    onChangeInput(newValue, operator) {
        let subMenu = this.props.subMenu;
        this.props.onChangeInput(newValue, operator, subMenu);
    }

    render() {
        return (
            <Row className="form-group">
                <br/>
                <Row>
                    <Col xs={4} md={4} sm={4}>
                        <Select value={this.props.data.accidentType}
                                id="accidentType" name="accidentType"
                                onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                options={this.props.options.accidentTypes}
                                label="Tipo de Acidente"/>
                    </Col>
                    <Col xs={4} md={4} sm={4}>
                        <Select value={this.props.data.pavementType}
                                id="pavementType" name="pavementType"
                                onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                options={this.props.options.pavementTypes}
                                label="Tipo de Pavimento"/>
                    </Col>
                    <Col xs={4} md={4} sm={4}>
                        <Select value={this.props.data.surface}
                                id="surface" name="surface"
                                onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                options={this.props.options.surfaces}
                                label="Superficie"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} md={4} sm={4}>
                        <Select value={this.props.data.accidentClassification}
                                id="accidentClassification" name="accidentClassification"
                                onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                options={this.props.options.accidentClassifications}
                                label="Classificação do acidente"/>
                    </Col>
                    <Col xs={4} md={4} sm={4}>
                        <Select value={this.props.data.roadState}
                                id="roadState" name="roadState"
                                onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                options={this.props.options.roadStates}
                                label="Estado da pista"/>
                    </Col>
                    <Col xs={4} md={4} sm={4}>
                        <Select value={this.props.data.roadProfile}
                                id="roadProfile" name="roadProfile"
                                onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                options={this.props.options.roadProfiles}
                                label="Perfil da pista"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} md={4} sm={4}>
                        <Select value={this.props.data.roadCondition}
                                id="roadCondition" name="roadCondition"
                                onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                options={this.props.options.roadConditions}
                                label="Condição da pista"/>
                    </Col>
                    <Col xs={4} md={4} sm={4}>
                        <Select value={this.props.data.climaticCondition}
                                id="climaticCondition" name="climaticCondition"
                                onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                options={this.props.options.climaticConditions}
                                label="Condição climática"/>
                    </Col>
                    <Col xs={4} md={4} sm={4}>
                        <Select value={this.props.data.verticalSignaling}
                                id="verticalSignaling" name="verticalSignaling"
                                onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                options={this.props.options.verticalSignals}
                                label="Sinalização vertical"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} md={4} sm={4}>
                        <Select value={this.props.data.horizontalSignaling}
                                id="horizontalSignaling" name="horizontalSignaling"
                                onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                options={this.props.options.horizontalSignals}
                                label="Sinalização horizontal"/>
                    </Col>
                    <Col xs={4} md={4} sm={4}>
                        <Select value={this.props.data.direction}
                                id="direction" name="direction"
                                onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                options={this.props.options.directions}
                                label="Direção"/>
                    </Col>
                    <Col xs={4} md={4} sm={4}>
                        <Select value={this.props.data.zone}
                                id="zone" name="zone"
                                onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                options={this.props.options.zones}
                                label="Zona"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} md={4} sm={4}>
                        <Select value={this.props.data.cause}
                                id="cause" name="cause"
                                onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                options={this.props.options.causes}
                                label="Causa provável"/>
                    </Col>
                    <Col className="control-label" xs={8}>
                        <Input value={this.props.data.additionalInfo} type="text"
                               id="additionalInfo" required="required"
                               onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                               label="Informações adicionais"/>
                    </Col>
                </Row>
            </Row>
        )
    }
}

export class Vehicles extends Component {

    onChangeInput(newValue, operator) {
        let subMenu = this.props.subMenu;
        this.props.onChangeInput(newValue, operator, subMenu);
    }

    render() {
        let vehicles = this.props.selectedEvent ?
            this.props.selectedEvent.map((involved) => {
                return (
                    <Panel header={"Envolvido: " + involved.Name} eventKey={involved.id} key={involved.id} collapsible>
                        <Col xs={11} md={11} sm={11}>
                            <Col sm={4}>
                                <Input value={involved.Name} type="text"
                                       id="involvedName" required="required"
                                       onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                       label="Nome"/>
                            </ Col>
                            <Col sm={2}>
                                <Input value={involved.Age} type="number"
                                       id="involvedAge" required="required"
                                       onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                       label="Idade"/>
                            </ Col>
                            <Col sm={2}>
                                <Select value={involved.Sex} id="involvedSex"
                                        name="involvedSex"
                                        options={this.props.options.involvedSexes}
                                        onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                        label="Sexo"/>
                            </ Col>
                            <Col sm={4}>
                                <Select value={involved.Situation}
                                        id="involvedSituation"
                                        name="involvedSituation"
                                        options={this.props.options.involvedSituations}
                                        onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                        label="Situação"/>
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.VehiclePosition}
                                        id="involvedVehiclePosition"
                                        name="involvedVehiclePosition"
                                        options={this.props.options.involvedVehiclePositions}
                                        onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                        label="Posição no Veículo"/>
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.SecurityCondition}
                                        id="involvedSecurityCondition"
                                        name="involvedSecurityCondition"
                                        options={this.props.options.involvedSecurityConditions}
                                        onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                        label="Condição de segurança"/>
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.InjuryLevel}
                                        id="involvedInjuryLevel" name="involvedInjuryLevel"
                                        options={this.props.options.involvedInjuryLevels}
                                        onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                        label="Gravidade da lesão"/>
                            </Col>
                        </Col>
                    </Panel>
                )
            }, this) : undefined;
        return (
            <Row className="form-group">
                <br/>
                <Col md={10}>
                    {vehicles}
                </Col>
                <Col md={2}>
                    <Button icon='add'
                            label='Adicionar veiculo'
                            onClick={() => console.log('add vehicle')}
                    />
                </Col>
            </Row>
        )
    }
}

export class Involved extends Component {
    onChangeInput(newValue, operator) {
        let subMenu = this.props.subMenu;
        this.props.onChangeInput(newValue, operator, subMenu);
    }

    render() {
        let involved = this.props.selectedEvent ?
            this.props.selectedEvent.map((involved) => {
                return (
                    <Panel header={"Envolvido: " + involved.Name} eventKey={involved.id} key={involved.id} collapsible>
                        <Col>
                            <Col sm={4}>
                                <Input value={involved.Name} type="text"
                                       id="involvedName" required="required"
                                       onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                       label="Nome"/>
                            </ Col>
                            <Col sm={2}>
                                <Input value={involved.Age} type="number"
                                       id="involvedAge" required="required"
                                       onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                       label="Idade"/>
                            </ Col>
                            <Col sm={2}>
                                <Select value={involved.Sex} id="involvedSex"
                                        name="involvedSex"
                                        options={this.props.options.involvedSexes}
                                        onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                        label="Sexo"/>
                            </ Col>
                            <Col sm={4}>
                                <Select value={involved.Situation}
                                        id="involvedSituation"
                                        name="involvedSituation"
                                        options={this.props.options.involvedSituations}
                                        onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                        label="Situação"/>
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.VehiclePosition}
                                        id="involvedVehiclePosition"
                                        name="involvedVehiclePosition"
                                        options={this.props.options.involvedVehiclePositions}
                                        onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                        label="Posição no Veículo"/>
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.SecurityCondition}
                                        id="involvedSecurityCondition"
                                        name="involvedSecurityCondition"
                                        options={this.props.options.involvedSecurityConditions}
                                        onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                        label="Condição de segurança"/>
                            </Col>
                            <Col sm={4}>
                                <Select value={involved.InjuryLevel}
                                        id="involvedInjuryLevel"
                                        name="involvedInjuryLevel"
                                        options={this.props.options.involvedInjuryLevels}
                                        onChange={(e) => this.onChangeInput(e.target.value, e.target.id)}
                                        label="Gravidade da lesão"/>
                            </Col>
                        </Col>
                    </Panel>
                )
            }, this) : undefined;

        return (
            <Row className="form-group">
                <br/>
                <Col md={10}>
                    {involved}
                </Col>
                <Col md={2}>
                    <Button icon='add'
                            label='Adicionar envolvido'
                            onClick={() => console.log('add involved')}
                    />
                </Col>
                <pre>{console.log(JSON.stringify(this.props.selectedEvent, null, 4))}</pre>
            </Row>
        )
    }
}
