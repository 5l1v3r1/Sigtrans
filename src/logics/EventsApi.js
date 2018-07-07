/**
 * Created by natal on 05/06/17.
 */
import {getUrl} from '../management/Management';
import {
    addInvolved,
    addVehicle,
    changeDropdown,
    changeInput,
    listEventsOptions,
    listOpenEvents,
    nestedInputChange,
    removeInvolved,
    removeVehicle,
    selectOpenEvent,
    toggleEventsModal,
    addVia,
    removeVia,
    initializeEvent,
    listAsync,
    listDependentOption
} from '../actions/actionCreator'

export default class EventsApi {

    static initializeEvent(){
        return dispatch => {
            return dispatch(initializeEvent())
        }
    }

	static listOpenEvents(loading) {
		return dispatch => {
            fetch(getUrl('api')+'ocorrencias')
                .then(response => {
                    if (response.ok)
                        response.json()
                            .then(events => {
                                return dispatch(listOpenEvents(loading, events.values));
                            });
                    else {
                        console.log('Falha ao receber dados: ' + response.status);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            // dispatch(listOpenEvents(loading))

		}
	}

	static listEventsOpts() {
		return dispatch => {
			fetch(getUrl('api')+'options')
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

    static asyncTypeaheadQuery(query, option, parent, parentType){
        return dispatch => {
            this.onChangeInput(true, option+'IsLoading', null);
            this.fetchAsync(dispatch, query, option, parent, parentType);
            this.onChangeInput(undefined, option+'IsLoading', null);
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

	static onChangeDropdown(newValue, operator, subMenu) {
		return dispatch => {
			return dispatch(changeDropdown(newValue, operator, subMenu));
		}
	}

	static onNestedInputChange(subMenu, operator, input, id, value, dropdown){
		return dispatch => {
			return dispatch(nestedInputChange(subMenu, operator, input, id, value, dropdown));
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

    static addVia() {
        return dispatch => {
            return dispatch(addVia());
        }
    }

    static removeVia(Via) {
        return dispatch => {
            return dispatch(removeVia(Via));
        }
    }

    static updateEvent(event) {
        return dispatch => {
        	fetch(getUrl('api') + 'ocorrencias/' + event.id, {
                method: 'PUT',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify(event),
            })
                .then(response =>{
                    if (response.ok)
                        response.json()
                            .then(response => {
                                console.log(response);
                                dispatch(this.listOpenEvents(true));
                            });
                    else {
                        console.log('Falha ao receber dados: ' + response.status);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    static saveEvent(event){
        return dispatch => {
            let veiculosId=[], envolvidosId=[];

            event.veiculos.forEach(veiculo=>{
                fetch(getUrl('api') + 'veiculo', {
                    method: 'POST',
                    headers: new Headers({'content-type': 'application/json'}),
                    body: JSON.stringify(veiculo),
                })
                    .then(response =>{
                        if (response.ok)
                            response.json()
                                .then(response => {
                                    console.log(response);
                                    veiculosId.push(response.data.id)
                                });
                        else {
                            alert('Falha ao inserir veiculo ' + veiculo.placa + ': response.status');
                            throw new Error('Falha ao inserir veiculo ' + veiculo.placa + ': response.status')
                        }
                    })
                    .catch((err) => {
                        throw new Error(JSON.stringify(err));
                    });
            });

            event.envolvidos.forEach(envolvido=>{
                fetch(getUrl('api') + 'envolvido', {
                    method: 'POST',
                    headers: new Headers({'content-type': 'application/json'}),
                    body: JSON.stringify(envolvido),
                })
                    .then(response =>{
                        if (response.ok)
                            response.json()
                                .then(response => {
                                    console.log(response);
                                    envolvidosId.push(response.data.id)
                                });
                        else {
                            alert('Falha ao inserir envolvido');
                            throw new Error('Falha ao inserir envolvido');
                        }
                    })
                    .catch((err) => {
                        throw new Error(JSON.stringify(err));
                    });
            });

            event.veiculos=veiculosId;
            event.envolvidos=envolvidosId;
            console.log(JSON.stringify(event, null, 4));

            fetch(getUrl('api') + 'ocorrencias/', {
                method: 'POST',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify(event),
            })
                .then(response =>{
                    if (response.ok)
                        response.json()
                            .then(response => {
                                console.log(response);
                            });
                    else {
                        alert('Falha ao inserir ocorrencia');
                        throw new Error('Falha ao inserir ocorrencia');
                    }
                })
                .catch((err) => {
                    throw new Error(JSON.stringify(err));
                });
        }
    }

    static fetchDependentOptions(dependency, type){

        return dispatch => {
            fetch(getUrl('api') + type +'/byname?municipioId='+dependency.id)
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(options => {
                                return dispatch(listDependentOption(options, 'bairro'));
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

    static fetchAsync(dispatch, query, option, parent, parentType){
        fetch(getUrl('api')+(option==="cruzamento"?"rua":option)+'/byname?nome='+query.toUpperCase())
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(options => {
                            let newOptions=[];
                            if(parent!==undefined){
                                // TODO treat in backend
                                options.forEach((item) => {
                                    if (parent.id === item[parentType].id) {
                                        newOptions.push(item);
                                    }
                                });
                            }
                            // console.log(options);
                            return dispatch(listAsync(newOptions, option));
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
