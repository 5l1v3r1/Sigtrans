import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/pure-min.css';
import './css/hamburguer-menu.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router,Route,browserHistory,IndexRoute} from 'react-router';
import Home from './Home';
import AutorBox from './Autor';
import LivroBox from './Livro';

ReactDOM.render(
    (<Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/autor" component={AutorBox}/>
            <Route path="/livro" component={LivroBox}/>
        </Route>
    </Router>),
    document.getElementById('root')
);