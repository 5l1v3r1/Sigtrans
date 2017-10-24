//React
import React from 'react';
import ReactDOM from 'react-dom';
//Cookies
// import Cookies from 'js-cookie';
//Components
import App from './App';
import EBox, {EGrid} from './components/Event';
import Death from './components/Death';
import Home from './components/Home';
import Login from './components/Login';
import Management from './components/ManagementReports'
import Statistic from './components/StatisticReports'
//Router
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
//React Toolbox Themer (PostCSS Issues)
import theme from './toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
//Redux
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
// import {matchPattern} from 'react-router/lib/PatternUtils';
//reducers
import {menus} from './reducers/menus';
import {death} from './reducers/death';
import {auth} from './reducers/auth';
import {reports} from './reducers/reports';
//CSS
import './css/wizard.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/index.css';
import './css/App.css';
import './toolbox/theme.css';
import 'react-table/react-table.css';

//TESTPAGE
// import Test from './TestPage';

/*function verifyAuth(nextState, replace) {
    // console.log(nextState.location.pathname);
    const resultado = matchPattern('/', nextState.location.pathname);
    const privatePath = resultado.paramValues[0] === undefined;

    if (privatePath && !Cookies.get('auth-token')) {
        replace('/?msg=Você precisa estar logado');
    }
}

function verifyLogin(nextState, replace) {
    if (Cookies.get('auth-token')) {
        replace('/home');
    }
}*/

// Create Reducers
const reducers = combineReducers({death, menus, auth, reports});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={Login}/>{/*onEnter={verifyLogin}*/}
                    <Route path="/home" component={App}>{/*onEnter={verifyAuth}*/}
                        <IndexRoute component={Home}/>
                        <Route path="/ocorrencias">
                            <Route path="/ocorrencias/abertas" component={EGrid}/>
                            <Route path="/ocorrencias/fechadas" component={EGrid}/>
                            <Route path="/ocorrencias/criar" component={EBox}/>
                        </Route>
                        <Route path="/obitos" component={Death}/>
                        <Route path="/relatorios">
                            <Route path="/relatorios/gerenciais" component={Management}/>
                            <Route path="/relatorios/estatisticos" component={Statistic}/>
                        </Route>
                    </Route>
                </Router>
            </Provider>
        </ThemeProvider>
    ),
    document.getElementById('root')
);