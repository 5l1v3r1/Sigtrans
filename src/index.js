//React
import React from 'react';
import ReactDOM from 'react-dom';
//Cookies
// import Cookies from 'js-cookie';
//Components
import App from './App';
import EBox from './components/events/Event_old';
import {Events, OpenEvents} from './components/events/Event'
// import {EventsForm} from './components/events/EventClasses'
import Death from './components/death/Death';
import Home from './components/Home';
import Login from './components/Login';
import DeceasedReports from './components/reports/DeceasedReports'
import Statistic from './components/reports/StatisticReports'
import DataReceive from './components/datareceive/DataReceive'
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
import {events} from './reducers/events';
import {datareceive} from './reducers/datareceive';
import metisMenuReducer from 'react-metismenu/lib/reducers';
//CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/index.css';
import './css/App.css';
import './toolbox/theme.css';
import 'react-table/react-table.css';
// import Test from './components/TestPage'

// function verifyAuth(nextState, replace) {
//     // console.log(nextState.location.pathname);
//     const resultado = matchPattern('/', nextState.location.pathname);
//     const privatePath = resultado.paramValues[0] === undefined;
//
//     if (privatePath && !Cookies.get('auth-token')) {
//         replace('/?msg=Você precisa estar logado');
//     }
// }
//
// function verifyLogin(nextState, replace) {
//     if (Cookies.get('auth-token')) {
//         replace('/home');
//     }
// }

// Create Reducers
const reducers = combineReducers({metisMenuReducer, death, menus, auth, reports, events, datareceive});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/login" component={Login}/>{/*onEnter={verifyLogin}*/}
                    <Route path="/" component={App}>{/*onEnter={verifyAuth}*/}
                        <IndexRoute component={Home}/>
                        <Route path="/obitos" component={Death}/>
                        <Route path="/abertas" component={OpenEvents}/>
                        <Route path="/geral" component={Events}/>
                        <Route path="/dados" component={DataReceive}/>
                        <Route path="/relatorios/obitos" component={DeceasedReports}/>
                        <Route path="/relatorios/estatisticos" component={Statistic}/>
                        <Route path="/criar" component={EBox}/>
                    </Route>
                </Router>
            </Provider>
        </ThemeProvider>
    ),
    document.getElementById('root')
);