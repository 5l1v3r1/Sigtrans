//React
import React from 'react';
import ReactDOM from 'react-dom';

//CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/font-awesome-4.7.0/css/font-awesome.min.css';
// import './css/hamburguer-menu.css';
import './index.css';
import './App.css';
import 'react-table/react-table.css'
import './toolbox/theme.css'

//Components
import App from './App';
import EBox from './Event';
import {EGrid} from './Event';
import Deaths from './Death';
import Home from './Home';

//Router
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

//React Toolbox Themer (PostCSS Issues)
import theme from './toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

ReactDOM.render((
        <ThemeProvider theme={theme}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="/ocorrencias">
                        <Route path="/ocorrencias/abertas" component={EGrid}/>
                        <Route path="/ocorrencias/fechadas" component={EBox}/>
                    </Route>
                    <Route path="/obitos" component={Deaths}/>
                </Route>
            </Router>
        </ThemeProvider>
    ), document.getElementById('root')
);