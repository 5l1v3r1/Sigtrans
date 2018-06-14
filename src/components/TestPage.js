import React, {Component} from 'react';
import {getUrl} from "../management/Management";
import dataJson from './dadosLogradouro.json';
class TestPage extends Component {

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     //async handling for ginormous objects
    //     async function asyncForEach(array, callback) {
    //         for (let index = 0; index < array.length; index++) {
    //             await callback(array[index], index, array)
    //         }
    //     }
    //     const start = async (listaDeConteudos) => {
    //         asyncForEach(listaDeConteudos, async (item) => {
    //             // item.idParceiro=idp++;
    //             await fetch(getUrl('api') + 'rua', {
    //                 //o que vai ser feito na request aqui:
    //                 //metodo http
    //                 method: 'POST',
    //                 //headers
    //                 headers: new Headers({'Content-Type': 'application/json'}),
    //                 //corpo da requisição, o que vai ser enviado efetivamente.
    //                 body: JSON.stringify(item),
    //             })
    //             //Aqui vai acontecer quando receber o response do server
    //             //E é aqui que se trata qualquer coisa que tenha que se tratar do response
    //                 .then(response => {
    //                     if (response.ok) {
    //                         return response.json();
    //                     } else {
    //                         console.log(JSON.stringify(item));
    //                         throw new Error("erro");
    //                     }
    //                 })
    //                 //tratar values que o servidor responde
    //                 .then(responseValues => {
    //                     // por exemplo se tu receber algum dado e precisar exibir ele na tela, ou salvar, é aqui que sera feito
    //                     // minhaVariavelLindona = responseValues;
    //                     console.log('ok');
    //                 })
    //                 //se der erro que não for pego ali em cima tratar aqui
    //                 .catch((err) => {
    //                     console.log(err);
    //                 });
    //         });
    //     };
    //     start(dataJson);
    // };

    render() {
        return (
            <div>
                <form onSubmit={console.log('hoje nao')}
                      ref={form => this.form = form}>
                    <input type="submit" value="Submeter"/>
                </form>
            </div>
        );
    }
}

export default TestPage;
