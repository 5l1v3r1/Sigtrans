/**
 * Created by natal on 17/04/17.
 */

import React, {Component} from "react";
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import MultiInput from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';
import DeathApi from '../../logics/DeathApi'
import {Col, Form, Grid, PageHeader, Panel, Row} from 'react-bootstrap';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import Input from "../custom/CustomInput";
import Select from "../custom/CustomSelect";
import Map from "../map/Map";
import Factor from "./Factor";
import matchSorter from 'match-sorter';

class Death extends Component {

	componentDidMount() {
        this.props.listDeathEvents(this.props.deaths.loading);
		this.props.listDeathOptions();
	}

	render() {
		return (
			<div>
				<PageHeader>Ocorrencias fatais</PageHeader>
				<div className="content" id="content">
					<DeathEventsGrid
						data={this.props.deaths.deathEvents}
						deathAnalysis={this.props.deaths.selectedEvent?this.props.deaths.selectedEvent.deathAnalysis:{}}
						options={this.props.deaths.deathOptions}
						loading={this.props.deaths.loading}
						showModal={this.props.deaths.showModal}
						selectedEvent={this.props.deaths.selectedEvent}
						selectedEventID={this.props.deaths.selectedEventID}
						handleToggleModal={this.props.handleToggleModal}
						selectEvent={this.props.selectEvent}
						onChangeInput={this.props.onChangeInput}
					/>
				</div>
			</div>
		);
	}

}

//make new js file for both grids
class DeathEventsGrid extends Component {

	buttonToggleModal(id) {
		this.props.handleToggleModal();
		this.props.selectEvent(id);
	}

	render() {

		const columns = [
			{
				Header: 'Data',
				id: 'date',
                accessor: d => d.general.date,
				filterMethod: (filter, rows) =>
					matchSorter(rows, filter.value, {keys: ["date"]}),
				filterAll: true
			}, {
				Header: 'Rua',
				id: 'street',
                accessor: d => d.general.street,
				filterMethod: (filter, rows) =>
					matchSorter(rows, filter.value, {keys: ["street"]}),
				filterAll: true

			}, {
				Header: 'Numero/KM',
				id: 'number',
                accessor: d => d.general.number,
				filterMethod: (filter, row) =>
					row[filter.id].startsWith(filter.value)
			}, {
				Header: 'Cruzamento com',
				id: 'crossRoad',
                accessor: d => d.general.cross,
				filterMethod: (filter, rows) =>
					matchSorter(rows, filter.value, {keys: ["crossRoad"]}),
				filterAll: true
			}, {
				Header: 'Bairro',
				id: 'neighborhood',
                accessor: d => d.general.Neighborhood,
				filterMethod: (filter, rows) =>
					matchSorter(rows, filter.value, {keys: ["neighborhood"]}),
				filterAll: true
			}, {
				Header: 'Referencia',
				id: 'reference',
                accessor: d => d.general.Reference,
				filterMethod: (filter, rows) =>
					matchSorter(rows, filter.value, {keys: ["reference"]}),
				filterAll: true
			}, {
				Header: 'Situação',
                id: 'id',
				accessor: d=>d.deathAnalysis.status,
				filterable: false,
				Cell: props => (
					<Button style={{color: 'black'}} icon="edit" primary id={props.original.id}
							onClick={() => this.buttonToggleModal(props.original.id)}/>
				)
			}
		];
        const actions = [
            {label: "Fechar", onClick: this.props.handleToggleModal},
            {label: "Salvar", onClick: this.props.handleToggleModal}
        ];
        let counter = false;

		return (
			<div className="content" id="content">
				<ReactTable
					previousText='Anterior' nextText='Proximo'
					loadingText='Carregando...' pageText='Pagina'
					noDataText='Sem dados correspondentes' ofText='de'
					rowsText='linhas' className="-striped -highlight"
					data={this.props.data} loading={(this.props.loading === undefined)}
					columns={columns} defaultPageSize={10} filterable
					defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
					getTrProps={(state, rowInfo) => {
                        counter=!counter;
                        return rowInfo ? {
                            style: {
                                backgroundColor: rowInfo.original.deathAnalysis.status >= 1 ? (
                                    rowInfo.original.deathAnalysis.status <= 1 ? 'lightgreen': 'lightyellow'
                                ) : 'inherit',
                                boxShadow: 'none'
                            },
                            onMouseOver: (ref) => ref.target.parentElement.style.boxShadow = 'inset 0 0 0 99999px rgba(0,0,0,0.05)',
                            onMouseOut: (ref) => ref.target.parentElement.style.boxShadow = 'none',
                        } : {};
					}}
					getTdProps={() => ({style: {textAlign: "center"}})}
				/>

				<Dialog active={this.props.showModal === !(undefined)}
						actions={actions} type='fullscreen'
						className="custom-modal"
						onEscKeyDown={this.props.handleToggleModal}
						onOverlayClick={this.props.handleToggleModal}
						title='Análise do Óbito'>
					{
						this.props.deathAnalysis ?
							<DeathAnalysis
								onChangeInput={this.props.onChangeInput}
								selectedEvent={this.props.selectedEvent}
								options={this.props.options}
								deathAnalysis={this.props.deathAnalysis}
							/> : undefined
					}
				</Dialog>
			</div>
		);

	}

}

//make new js file
class DeathAnalysis extends Component {

	render() {

        let mapCenter = this.props.selectedEvent ? {
            lat: parseFloat(this.props.selectedEvent.general.lat),
            lng: parseFloat(this.props.selectedEvent.general.lng)
        } : {
            lat: 0,
            lng: 0
        };
        let marker=mapCenter.lat!==0?[{position:mapCenter}]:[];
		let padding = {
			paddingLeft: '2px'
		};
		let padding5px = {
			paddingLeft: '5px'
		};

		let counter = 1;
        let victimList = [
            {name: "Motociclista / Garupa", id: "M"},
            {name: "Pedestre", id: "P"},
            {name: "Ciclista", id: "B"},
            {name: "Condutor veículo leve", id: "Cc"},
            {name: "Passageiro veículo leve", id: "Cp"},
            {name: "Cond. / passag. ônibus", id: "O"},
            {name: "Cond. / passag. veículo pesado", id: "V"}
        ];
        let victimsGroup = victimList.map((item) => {
            return (
				<div key={item.id}>
					<Col md={3}>
						<Input value={this.props.deathAnalysis[item.id] ? this.props.deathAnalysis[item.id].amount:''}
							   id={item.id} label={item.name} type="number" min='0'
							   onChange={(e)=>this.props.onChangeInput(e.target.value, 'amount', item.id)}
						/>
					</Col>
					<Col md={3} style={(counter++)%2?{borderRight: "thin solid #eeeeee"}:{}}>
						<Select value={this.props.deathAnalysis[item.id]?this.props.deathAnalysis[item.id].situation:0}
								options={[
                                    {id: 1, value: "Vítima Fatal"},
                                    {id: 2, value: "Vítima Grave"}
                                ]}
								disabled={this.props.deathAnalysis[item.id]?this.props.deathAnalysis[item.id].amount<=0:true}
                                onChange={(e)=>this.props.onChangeInput(e.target.value, 'situation', item.id)}
								label="Situação"
						/>
					</Col>
				</div>
            )
        });

		let factorList = [
			{name: 'Velocidade', id: 'speed'},
			{name: 'Alcool', id: 'alcohol'},
			{name: 'Infraestrutura', id: 'infrastructure'},
			{name: 'Veiculo', id: 'vehicle'},
			{name: 'Fadiga', id: 'fatigue'},
			{name: 'Visibilidade', id: 'visibility'},
			{name: 'Drogas', id: 'drugs'},
			{name: 'Celulares', id: 'cellphone'}
		];
		let factors = factorList.map((item) => {
			return (
				<div key={item.id}>
					<Factor values={this.props.deathAnalysis[item.id]}
							style={padding} factor={item.name} itemId={item.id}
							responsible={(item.id!=="infrastructure" && item.id!=="visibility")}
							specification={(item.id === "speed" || item.id === "infrastructure")}
							options={this.props.options.involved.involvedVehiclePositions}
                            onChangeInput={this.props.onChangeInput} max={10} step={2}
					/>
				</div>
			)
		}, this);

        let conductsList = [
			{name: 'Avanço de Sinal', id: 'signalAdvance'},
			{name: 'Condutor sem habilitação', id: 'noLicence'},
			{name: 'Transitar em local proibido', id: 'transitProhibited'},
			{name: 'Transitar em local Improprio', id: 'transitImproper'},
			{name: 'Mudança de pista sem sinalização prévia', id: 'laneChange'},
			{name: 'Distância mínima não respeitada', id: 'minimalDistance'},
			{name: 'Converter / Cruzar sem dar preferência', id: 'conversionPreference'},
			{name: 'Não dar preferência ao pedestre na faixa', id: 'pedestrianPreference'},
			{name: 'Falta de Atenção', id: 'lackOfAttention'}
		];
        let conducts = conductsList.map((item) => {
			return (
				<div key={item.id}>
					<Factor values={this.props.deathAnalysis[item.id]}
							style={padding} factor={item.name} itemId={item.id} responsible
							options={this.props.options.involved.involvedVehiclePositions}
                            onChangeInput={this.props.onChangeInput} max={10} step={2}
					/>
				</div>
			)
			// onChange={(value) => this.props.slider = value}
		}, this);

        let gravityList = [
            {name: 'Cinto de Segurança', id: 'securityBelt'},
			{name: 'Veículo sem "crash protection"', id: 'crashProtection'},
			{name: 'Fatores Pré-hospitalares', id: 'preHosp'},
			{name: 'Objetos Lateriais à Via', id: 'sideObjects'},
			{name: 'Capacete', id: 'helmet'},
		];
        let gravity = gravityList.map((item) => {
			return (
				<div key={item.id}>
					<Factor values={this.props.deathAnalysis[item.id]}
							style={padding} factor={item.name} itemId={item.id}
							options={this.props.options.involved.involvedVehiclePositions}
							responsible={(item.id === "helmet" || item.id === "securityBelt" )}
                            onChangeInput={this.props.onChangeInput} max={5} step={1}
					/>
				</div>
			)
		}, this);

		let Involved = this.props.selectedEvent.involved.map((involved) => {
			return (
				<Panel header={"Envolvido: " + involved.Name} eventKey={involved.id} key={involved.id} collapsible>
					<Col md={4}>
						<Input value={involved.Name} type="text" readOnly disabled
							   id="involvedName" required="required"
							   label="Nome"/>
					</ Col>
					<Col md={2}>
						<Input value={involved.Age} type="number" readOnly disabled
							   id="involvedAge" required="required"
							   label="Idade"/>
					</ Col>
					<Col md={2}>
						<Select value={involved.Sex} id="involvedSex" readOnly disabled
								name="involvedSex"
								options={this.props.options.involved.involvedSexes}
								label="Sexo"/>
					</ Col>
					<Col md={4}>
						<Select value={involved.Situation} readOnly disabled
								id="involvedSituation"
								name="involvedSituation"
								options={this.props.options.involved.involvedSituations}
								label="Situação"/>
					</Col>
					<Col md={4}>
						<Select value={involved.VehiclePosition} readOnly disabled
								id="involvedVehiclePosition"
								name="involvedVehiclePosition"
								options={this.props.options.involved.involvedVehiclePositions}
								label="Posição no Veículo"/>
					</Col>
					<Col md={4}>
						<Select value={involved.SecurityCondition} readOnly disabled
								id="involvedSecurityCondition"
								name="involvedSecurityCondition"
								options={this.props.options.involved.involvedSecurityConditions}
								label="Condição de segurança"/>
					</Col>
					<Col md={4}>
						<Select value={involved.InjuryLevel} readOnly disabled
								id="involvedInjuryLevel"
								name="involvedInjuryLevel"
								options={this.props.options.involved.involvedInjuryLevels}
								label="Gravidade da lesão"/>
					</Col>
				</Panel>
			)
		}, this);

		return (
			<Grid fluid>
				<Form>
					{/*general*/}
					<Panel>
						<Col md={6}>
							<h4>Identificação do Acidente</h4>
							<Col md={4} style={padding}>
								<Input type="date" name="deathDate" id="date"
									   label="Data" readOnly
									   value={this.props.selectedEvent.general.date}
								/>
							</Col>
							<Col md={4} style={padding5px}>
								<Input type="time" name="deathTime" id="deathTime"
									   label="Hora" readOnly
								/>
							</Col>
							<Col md={4} style={padding5px}>
								<Input type="text" name="accidentType" id="accidentType"
									   label="Tipo do Acidente" readOnly
									   value={this.props.options.statisticData.accidentTypes[this.props.selectedEvent.statisticData.accidentType]['value']}
								/>
							</Col>
							<Col md={8} style={padding}>
								<Input type="text" name="eventAddress1"
									   id="eventAddress1" placeholder="Endereço 1"
									   label="Local da Ocorrência" readOnly
									   value={this.props.selectedEvent.general.street}
								/>
							</Col>
							<Col md={4} style={padding5px}>
								<Input type="text" name="severity" id="severity"
									   label="Severidade" readOnly
									   value={this.props.options.statisticData.accidentClassifications[this.props.selectedEvent.statisticData.accidentClassification - 1]['value']}

								/>
							</Col>
							<Col md={8} style={padding}>
								<Input type="text" name="eventCross"
									   id="eventCross" placeholder="Cruzamento"
									   label="Cruzamento" readOnly
									   value={this.props.selectedEvent.general.cross}
								/>
							</Col>
							<Col md={4} style={padding}>
								<Input type="text" name="eventAddressNumber1"
									   id="eventAddressNumber1" placeholder="Numero"
									   label="Número" readOnly
									   value={this.props.selectedEvent.general.number}
								/>
							</Col>
						</Col>
						{/*Map*/}
						<Col md={6}>
							<Row className="mapRow">
								<Map center={mapCenter} markers={marker} defaultZoom={15} showMarkers={true}
                                     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzTZTuwTczZL2JedjuYJRiEh2v0BQpgxo"
                                     loadingElement={<div style={{ height: `100%` }} />}
                                     containerElement={<div style={{height:'100%'}}/>}
                                     mapElement={<div style={{height:'100%'}}/>}
								/>
							</Row>
						</Col>
					</Panel>
					{/*Fatores*/}
					<Panel>
						<h4>Fatores de Risco <small>(FR-EA)</small></h4>
						{factors}
					</Panel>
					<Panel>
						<h4>Condutas de Risco <small>(CLR-EA)</small></h4>
						{conducts}
					</Panel>
					<Panel>
						<h4>Fatores / Gravidade <small>(FG)</small></h4>
						{gravity}
					</Panel>
					<Panel>
						<h4>Grupo de Vítimas <small>(GV)</small></h4>
						{victimsGroup}
					</Panel>
				{/*victims*/}
					<Panel>
						<h4>Informações sobre as vítimas</h4>
						{Involved}
					</Panel>
					<Panel>
						<h4>Informações dos Parceiros</h4>
						<MultiInput type='text' multiline
                                    label='Informações dos Parceiros' name="partnerInfo" id="partnerInfo"
                                    hint='Informações dos parceiros sobre a ocorrência'
									value={this.props.deathAnalysis.additionalInfos?this.props.deathAnalysis.additionalInfos.partnerInfo:''}
									onChange={(value)=>this.props.onChangeInput(value, 'partnerInfo', 'additionalInfos')} />
                        <MultiInput type='text' multiline
                                    label='Ações' name="actionsToBeTaken" id="actionsToBeTaken"
                                    hint='Ações a serem tomadas, decorrentes da análise'
                                    value={this.props.deathAnalysis.additionalInfos?this.props.deathAnalysis.additionalInfos.actionsToBeTaken:''}
                                    onChange={(value)=>this.props.onChangeInput(value, 'actionsToBeTaken', 'additionalInfos')} />
					</Panel>
				</Form>
			</Grid>
		)

	}

}

const mapStateToProps = state => {
	return {
		deaths: state.death
	}
};

const mapDispatchToProps = dispatch => {

	return {
		listDeathEvents: (loading) => {
			dispatch(DeathApi.listDeaths(loading));
		},
		listDeathOptions: () => {
			dispatch(DeathApi.listDeathsOpts());
		},
		handleToggleModal: (showModal, id) => {
			dispatch(DeathApi.handleDeathModal(showModal, id));
		},
        selectEvent: (event) => {
            dispatch(DeathApi.selectEvent(event));
        },
        onChangeInput: (newValue, operator, subMenu) => {
            dispatch(DeathApi.onChangeInput(newValue, operator, subMenu));
        },
	}

};

const DeathContainer = connect(mapStateToProps, mapDispatchToProps)(Death);

export default DeathContainer;
