//React
import React from 'react';
// import ReactDOM from 'react-dom';
//Cookies
// import Cookies from 'js-cookie';
//Components
import App from './App';
import EBox from './components/events/Event_old';
import {Events, OpenEvents} from './components/events/Event';
import CRUDTest from './components/custom/GenericCRUD'
import Death from './components/death/Death';
import Home from './components/home/Home';
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
import {Provider} from 'react-redux';

// import Auth from "./components/auth0/Auth";
// const auth = new Auth();

export const makeMainRoutes = (store) => {
    return (
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
                        <Route path="/tiposacidentes" component={CRUDTest}/>
                    </Route>
                </Router>
            </Provider>
        </ThemeProvider>
    );
};
