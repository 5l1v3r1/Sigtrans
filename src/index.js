import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/hamburguer-menu.css';
import './index.css';
import './App.css';
import 'react-table/react-table.css'
import './toolbox/theme.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Router,Route,browserHistory,IndexRoute} from 'react-router';
import EventBox from './Event';
import {EventTable} from './Event';
import Home from './Home';
import theme from './toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

ReactDOM.render((
    <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="/ocorrencias">
                    <Route path="/ocorrencias/abertas" component={EventTable}/>
                    <Route path="/ocorrencias/fechadas" component={EventBox}/>
                </Route>
                <Route path="/livro"/>
            </Route>
        </Router>
    </ThemeProvider>
    ), document.getElementById('root')
);