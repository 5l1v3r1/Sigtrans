/**
 * Created by natal on 13/03/17.

import PubSub from 'pubsub-js';

export default class ErrHandler {
    publicaErros(erros){
        for(var i=0;i<erros.errors.length;i++){
            var erro = erros.errors[i];
            PubSub.publish("erro-validacao",erro);
        }
    }
}*/