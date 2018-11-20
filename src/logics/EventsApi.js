/**
 * Created by natal on 05/06/17.
 */
import { getUrl } from '../management/Management';
import {
  addInvolved,
  addVehicle,
  addVia,
  changeDropdown,
  changeInput,
  initializeEvent,
  listAsync,
  listDependentOption,
  listEventsOptions,
  listOpenEvents,
  nestedInputChange,
  removeInvolved,
  removeVehicle,
  removeVia,
  selectOpenEvent,
  toggleEventsModal,
} from '../actions/actionCreator';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
async function start(content, link, fetchType) {
  const returnArray = [];
  console.log('link ', link);
  const res = await asyncForEach(content, async (item) => {
    await fetch(getUrl('api') + link, {
      method: fetchType,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(item),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        console.log(JSON.stringify(item));
        throw new Error('erro');
      })
      .then((responseValues) => {
        returnArray.push({ id: responseValues.data.id });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  console.log(await res);
  return returnArray;
}
async function handleSyncedAsync(data, link, fetchType) {
  const retorno = await start(data, link, fetchType);
  return await retorno;
}

export default class EventsApi {
  static initializeEvent() {
    return dispatch => dispatch(initializeEvent());
  }

  static listOpenEvents(loading, type) {
    let link = `${getUrl('api')}ocorrencias${type ? `/${type}` : ''}`;
    link += '?pageSize=1000';
    return (dispatch) => {
      fetch(link)
        .then((response) => {
          if (response.ok) {
            response.json()
              .then(events => dispatch(listOpenEvents(loading, events.values.length ? events.values : events)));
          } else {
            console.log(`Falha ao receber dados: ${response.status}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  static listEventsOpts() {
    return (dispatch) => {
      fetch(`${getUrl('api')}options`)
        .then((response) => {
          if (response.ok) {
            response.json()
              .then(options => dispatch(listEventsOptions(options)));
          } else {
            console.log(`Falha ao receber opcoes: ${response.status}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  static asyncTypeaheadQuery(query, option, parent, parentType) {
    return (dispatch) => {
      this.onChangeInput(true, `${option}IsLoading`, null);
      this.fetchAsync(dispatch, query, option, parent, parentType);
      this.onChangeInput(undefined, `${option}IsLoading`, null);
    };
  }

  static handleEventsModal() {
    return dispatch => dispatch(toggleEventsModal());
  }

  static selectEvent(id) {
    return dispatch => dispatch(selectOpenEvent(id));
  }

  static onChangeInput(newValue, operator, subMenu) {
    return dispatch => dispatch(changeInput(newValue, operator, subMenu));
  }

  static onChangeDropdown(newValue, operator, subMenu) {
    return dispatch => dispatch(changeDropdown(newValue, operator, subMenu));
  }

  static onNestedInputChange(subMenu, operator, input, id, value, dropdown) {
    return dispatch => dispatch(nestedInputChange(subMenu, operator, input, id, value, dropdown));
  }

  static addInvolved() {
    return dispatch => dispatch(addInvolved());
  }

  static removeInvolved(involved) {
    return dispatch => dispatch(removeInvolved(involved));
  }

  static addVehicle() {
    return dispatch => dispatch(addVehicle());
  }

  static removeVehicle(vehicle) {
    return dispatch => dispatch(removeVehicle(vehicle));
  }

  static addVia() {
    return dispatch => dispatch(addVia());
  }

  static removeVia(Via) {
    return dispatch => dispatch(removeVia(Via));
  }

  static updateEvent(event) {
    return async (dispatch) => {
      // const veiculosId = await handleSyncedAsync(event.veiculos, 'veiculo', 'PUT');
      // event.veiculos = await veiculosId;
      event.dadosGerais.dataHora = new Date(event.dadosGerais.dataHora);
      const resp = await fetch(`${getUrl('api')}ocorrencias/${event.id}`, {
        method: 'PUT',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(event),
      })
        .then((response) => {
          if (response.ok) {
            response.json()
              .then((response) => {
                console.log(response);
                dispatch(this.listOpenEvents(true));
              });
          } else {
            console.log(`Falha ao receber dados: ${response.status}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return resp;
    };
  }

  static saveEvent(event) {
    return async (dispatch) => {
      const veiculosId = await handleSyncedAsync(event.veiculos, 'veiculo', 'POST');
      event.veiculos = await veiculosId;
      event.dadosGerais.dataHora = new Date(event.dadosGerais.dataHora);
      const resp = await fetch(`${getUrl('api')}ocorrencias`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(event),
      })
        .then((response) => {
          if (response.ok) {
            response.json()
              .then((response) => {
                console.log(response);
              });
          } else {
            throw new Error('Falha ao inserir ocorrencia');
          }
        })
        .catch(err => console.log(err));
      return resp;
    };
  }

  static fetchDependentOptions(dependency, type) {
    return (dispatch) => {
      fetch(`${getUrl('api') + type}/byname?municipioId=${dependency.id}`)
        .then((response) => {
          if (response.ok) {
            response.json()
              .then(options => dispatch(listDependentOption(options, 'bairro')));
          } else {
            console.log(`Falha ao receber opcoes: ${response.status}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  static fetchAsync(dispatch, query, option, parent, parentType) {
    fetch(`${getUrl('api') + (option === 'cruzamento' ? 'rua' : option)}/byname?nome=${query.toUpperCase()}`)
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((options) => {
              const newOptions = [];
              if (parent !== undefined) {
                // TODO treat in backend
                options.forEach((item) => {
                  if (parent.id === item[parentType].id) {
                    newOptions.push(item);
                  }
                });
              }
              // console.log(options);
              return dispatch(listAsync(newOptions, option));
            });
        } else {
          console.log(`Falha ao receber opcoes: ${response.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
