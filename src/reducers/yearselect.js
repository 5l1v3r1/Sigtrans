import {List} from 'immutable';

export function yearselect(state = new List(), action) {
  if (action.type === 'LISTDEATHFCGA') {
    const {list, selectedType} = action;
    const treatedList = list.map((item) => {
      const obj = {};
      obj.value = item.id;
      obj.label = item.ano || item.nome;
      obj.dataInsercao = item.dataInsercao;
      return obj;
    });
    console.log(treatedList);
    return Object.assign({}, state, {[selectedType]: treatedList});
  }

  if (action.type === 'MOUNTDEATHYEARFCGAFORM') {
    const {selectedType, values} = action;
    let form = state.form || {};
    let treatedValues;
    if (values) {
      if (selectedType !== 'ano') {
        treatedValues = values.map(item => ({
          id: item.value,
        }));
      } else {
        treatedValues = {
          id: values.value,
        };
      }
    }
    switch (selectedType) {
      case 'fatorrisco':
        form.fatoresRisco = treatedValues;
        break;
      case 'condutarisco':
        form.condutasRisco = treatedValues;
        break;
      case 'fatorgravidade':
        form.fatoresGravidade = treatedValues;
        break;
      case 'ano':
        form.ano = treatedValues;
        break;
      default:
        form = {};
        break;
    }
    Object.keys(form).forEach((key) => {
      if (form[key].length <= 0) {
        delete (form[key]);
      }
    });
    return Object.assign({}, state, {form});
  }
  return state;
}
