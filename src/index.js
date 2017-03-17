import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/pure-min.css';
import './css/hamburguer-menu.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router,Route,browserHistory,IndexRoute} from 'react-router';
import EventBox from './Event';
import Home from './Home';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/ocorrencias" component={EventBox}>
                <Route path="/ocorrencias/abertas" component={EventBox}/>
                <Route path="/ocorrencias/fechadas" component={EventBox}/>
            </Route>
            <Route path="/livro"/>
        </Route>
    </Router>
    ), document.getElementById('root')
);