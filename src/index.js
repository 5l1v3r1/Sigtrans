//React
import React from 'react';
import ReactDOM from 'react-dom';

//Cookies
import Cookies from 'js-cookie';

//Components
import App from './App';
import {EGrid} from './components/Event';
import Death from './components/Death';
import Home from './components/Home';
import EBox from './components/Event';
import Login from './components/Login';

//Router
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

//React Toolbox Themer (PostCSS Issues)
import theme from './toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

//Redux
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {matchPattern} from 'react-router/lib/PatternUtils';

//reducers
import {navegation} from './reducers/menus';
import {death} from './reducers/death';

//CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/index.css';
import './css/App.css';
import './toolbox/theme.css'
import 'react-table/react-table.css'

//TESTPAGE
// import Test from './TestPage';

function verifyAuth(nextState, replace) {
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
}

// Create Reducers
const reducers = combineReducers({death, navegation});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={Login} onEnter={verifyLogin}/>
                    <Route path="/home" component={App} onEnter={verifyAuth}>
                        <IndexRoute component={Home}/>
                        <Route path="/ocorrencias">
                            <Route path="/ocorrencias/abertas" component={EGrid}/>
                            <Route path="/ocorrencias/fechadas" component={EBox}/>
                        </Route>
                        <Route path="/obitos" component={Death}/>
                    </Route>
                </Router>
            </Provider>
        </ThemeProvider>
    ),
    document.getElementById('root')
);