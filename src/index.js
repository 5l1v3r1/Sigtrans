//React
import React from 'react';
import ReactDOM from 'react-dom';

//CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/index.css';
import './css/App.css';
import 'react-table/react-table.css'
import './toolbox/theme.css'

// import './css/hamburguer-menu.css';

//Components
import App from './App';
// import TestPage from './TestPage';
import {EGrid} from './components/Event';
import Death from './components/Death';
import Home from './components/Home';
import EBox from './components/Event';

//Router
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

//React Toolbox Themer (PostCSS Issues)
import theme from './toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

//Redux
// import {matchPattern} from 'react-router/lib/PatternUtils';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';

//reducers
import {navegation} from './reducers/menus';
import {death} from './reducers/death';

// function verifyAuth(nextState,replace) {
//     const resultado = matchPattern('/timeline(/:login)',nextState.location.pathname);
//     const enderecoPrivadoTimeline = resultado.paramValues[0] === undefined;
//
//     if(enderecoPrivadoTimeline && localStorage.getItem('auth-token') === null){
//         replace('/?msg=você precisa estar logado para acessar o endereço');
//     }
// }

/**
 * Create Reducers
 */

const reducers = combineReducers({death, navegation});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={App}>
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