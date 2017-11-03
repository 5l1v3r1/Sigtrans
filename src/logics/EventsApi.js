/**
 * Created by natal on 05/06/17.
 */
import {getUrl} from '../management/Management';
import {
    addInvolved,
    addVehicle,
    changeInput,
    listEventsOptions,
    listOpenEvents,
    removeInvolved,
    removeVehicle,
    selectOpenEvent,
    toggleEventsModal
} from '../actions/actionCreator'

export default class EventsApi {
	static listOpenEvents(loading) {
		return dispatch => {
            fetch(getUrl('carAccidents'))
                .then(response => {
                    if (response.ok)
                        response.json()
                            .then(events => {
                                let treatedEvents = events.map(function (event) {
                                    let vehicles = event.vehicles.map(function (vehicle) {
                                        return ({
                                            id: vehicle.id,
                                            licensePlate: (vehicle.licensePlate && vehicle.licensePlate !== null) ? vehicle.licensePlate : '',
                                            city: (vehicle.city.name && vehicle.city.name !== null) ? vehicle.city.name : '',
                                            state: (vehicle.city.state.name && vehicle.city.state.name !== null) ? vehicle.city.state.name : '',
                                            brand: (vehicle.brand && vehicle.brand !== null) ? vehicle.brand : '',
                                            model: (vehicle.model && vehicle.model !== null) ? vehicle.model : '',
                                            degreeOfDamage: (vehicle.degreeOfDamage.id && vehicle.degreeOfDamage.id !== null) ? vehicle.degreeOfDamage.id : '',
                                            vehicleType: (vehicle.vehicleType.id && vehicle.vehicleType.id !== null) ? vehicle.vehicleType.id : '',
                                            licenseLevel: (vehicle.licenseLevel && vehicle.licenseLevel !== null) ? vehicle.licenseLevel.id : '',
                                            firstLicense: (vehicle.firstLicense && vehicle.firstLicense !== null) ? vehicle.firstLicense : '',
                                            expireDate: (vehicle.expireDate && vehicle.expireDate !== null) ? vehicle.expireDate : ''
                                        })
                                    });
                                    let involveds = event.involved.map(function (involved) {
                                        return ({
                                            id: involved.id,
                                            name: (involved.name) ? involved.name : '',
                                            age: involved.age ? involved.age : '',
                                            sex: involved.sex.id ? involved.sex.id : '',
                                            street: involved.address.street ? involved.address.street : '',
                                            number: involved.address.number ? involved.address.number : '',
                                            crossRoad: involved.address.crossRoad ? involved.address.crossRoad : '',
                                            neighborhood: involved.address.neighborhood.name ? involved.address.neighborhood.name : '',
                                            city: involved.address.neighborhood.city.name ? involved.address.neighborhood.name : '',
                                            state: involved.address.neighborhood.city.state.name ? involved.address.neighborhood.city.state.name : '',
                                            reference: involved.address.reference ? involved.address.reference : '',
                                            geolocation: involved.address.geoLocation ? involved.address.geoLocation : {
                                                lat: '',
                                                lng: ''
                                            },
                                            mothersName: involved.mothersName ? involved.mothersName : '',
                                            situation: involved.situation.id ? involved.situation.id : '',
                                            positionOnTheVehicle: involved.positionOnTheVehicle.id ? involved.positionOnTheVehicle.id : '',
                                            vehicleType: involved.vehicleType.id ? involved.vehicleType.id : '',
                                            securityCondition: involved.securityCondition.id ? involved.securityCondition.id : '',
                                            injuryLevel: involved.injuryLevel.id ? involved.injuryLevel.id : '',
                                            evolutions: involved.evolutions ? involved.evolutions : '',
                                            // probableConducts: involved.,
                                        })
                                    });

                                    return ({
                                        id: event.id,
                                        partner: event.partner,
                                        general: {
                                            date: event.date ? event.date : '',
                                            street: event.address.street ? event.address.street : '',
                                            number: event.address.number ? event.address.number : '',
                                            crossRoad: event.address.crossRoad ? event.address.crossRoad : '',
                                            neighborhood: event.address.neighborhood.name ? event.address.neighborhood.name : '',
                                            city: event.address.neighborhood.city.name ? event.address.neighborhood.city.name : '',
                                            state: event.address.neighborhood.city.state.name ? event.address.neighborhood.city.state.name : '',
                                            reference: event.address.reference ? event.address.reference : '',
                                            geolocation: event.address.geoLocation ? event.address.geoLocation : {
                                                lat: '',
                                                lng: ''
                                            },
                                            // lat: event.address.geoLocation ? event.address.geoLocation.lat : '',
                                            // lng: event.address.geoLocation ? event.address.geoLocation.long : ''

                                        },
                                        statisticData: {
                                            accidentType: event.statisticData.accidentType ? event.statisticData.accidentType.id : '',
                                            accidentClassification: event.statisticData.accidentClassification ? event.statisticData.accidentClassification : '',
                                            pavementType: event.statisticData.pavementType ? event.statisticData.pavementType.id : '',
                                            roadSurface: event.statisticData.roadSurface ? event.statisticData.roadSurface.id : '',
                                            roadCondition: event.statisticData.roadCondition ? event.statisticData.roadCondition.id : '',
                                            roadProfile: event.statisticData.roadProfile ? event.statisticData.roadProfile.id : '',
                                            climaticCondition: event.statisticData.climaticCondition ? event.statisticData.climaticCondition.id : '',
                                            verticalSignaling: event.statisticData.trafficSignCondition ? event.statisticData.trafficSignCondition : '',
                                            horizontalSignaling: event.statisticData.trafficPaintCondition ? event.statisticData.trafficPaintCondition.id : '',
                                            roadDirection: event.statisticData.roadDirection ? event.statisticData.roadDirection.id : '',
                                            visibility: event.statisticData.visibility ? event.statisticData.visibility.id : '',
                                            zone: event.statisticData.zone ? event.statisticData.zone.id : '',
                                            probableCause: event.statisticData.probableCause ? event.statisticData.probableCause.id : '',
                                            otherInformation: event.statisticData.otherInformation ? event.statisticData.otherInformation : '',
                                            // roadState: event.statisticData.roadState.id,
                                        },
                                        vehicles: vehicles,
                                        involved: involveds
                                    })
                                });
                                return dispatch(listOpenEvents(loading, treatedEvents));
                            });
                    else {
                        console.log('Falha ao receber dados: ' + response.status);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            dispatch(listOpenEvents(loading))

		}
	}

	static listEventsOpts() {
		return dispatch => {
			// fetch('https://ocorrencias-teste-api.herokuapp.com/api/options')
            fetch(getUrl('options'))
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(options => {
                                return dispatch(listEventsOptions(options));
                            })
                    }
                    else {
                        console.log('Falha ao receber opcoes: ' + response.status);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }


	static handleEventsModal() {
		return dispatch => {
			return dispatch(toggleEventsModal())
		}
	}

	static selectEvent(id) {
		return dispatch => {
			return dispatch(selectOpenEvent(id));
		}
	}

	static onChangeInput(newValue, operator, subMenu) {
		return dispatch => {
			return dispatch(changeInput(newValue, operator, subMenu));
		}
	}

	static addInvolved() {
		return dispatch => {
			return dispatch(addInvolved());
		}
	}

	static removeInvolved(involved) {
		return dispatch => {
			return dispatch(removeInvolved(involved));
		}
	}

	static addVehicle() {
		return dispatch => {
			return dispatch(addVehicle());
		}
	}

	static removeVehicle(vehicle) {
		return dispatch => {
			return dispatch(removeVehicle(vehicle));
		}
	}

}
