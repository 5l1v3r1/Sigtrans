import React, {Component} from 'react';
import {getUrl} from "../management/Management";
import dataJson from './dadoszera';

class TestPage extends Component {

    handleSubmit = (e) => {
      e.preventDefault();
      async function asyncForEach(array, callback) {
          for (let index = 0; index < array.length; index++) {
              await callback(array[index], index, array)
          }
      }
      const start = async (listaDeConteudos) => {
          asyncForEach(listaDeConteudos, async (item) => {
            item.dadosGerais.dataHoraSigtrans = (new Date()).toISOString()
              await fetch(getUrl('api') + 'ocorrencias', {
                  method: 'POST',
                  headers: new Headers({'Content-Type': 'application/json'}),
                  body: JSON.stringify(item),
              })
                  .then(response => {
                      if (response.ok) {
                          return response.json();
                      } else {
                          console.log(JSON.stringify(item));
                          throw new Error("erro");
                      }
                  })
                  .then(responseValues => {
                      console.log(responseValues);
                  })
                  .catch((err) => {
                      console.log(err);
                  });
          });
      };
      start(dataJson);
    };

    render() {
      return (
            <div>
                <form onSubmit={(e)=>this.handleSubmit(e)}
                      ref={form => this.form = form}>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default TestPage;
