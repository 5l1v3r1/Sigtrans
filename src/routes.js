// React
import React from 'react';
// import ReactDOM from 'react-dom';
// Cookies
// import Cookies from 'js-cookie';
// Components
import {
  browserHistory, IndexRoute, Redirect, Route, Router,
} from 'react-router';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import { Provider } from 'react-redux';
import App from './App';
import { Events, OpenEvents, DeathEvents as Death, CreateEvent } from './components/events/Event';
import GenericCRUD from './components/custom/GenericCRUD';
import TestPage from './components/TestPage';
import Home from './components/home/Home';
import Login from './components/Login';
import DeceasedReports from './components/reports/DeceasedReports';
import Statistic from './components/reports/StatisticReports';
import DataReceive from './components/datareceive/DataReceive';
// Router
// React Toolbox Themer (PostCSS Issues)
import theme from './toolbox/theme';
// Redux
import PageNotFound from './components/custom/PageNotFound';

// import Auth from "./components/auth0/Auth";
// const auth = new Auth();

export const makeMainRoutes = store => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Login} />
        <Route path="pagenotfound" component={PageNotFound} />
        <Route path="sig" component={App}>
          {/* onEnter={verifyAuth} */}
          <IndexRoute component={Home} />
          <Route path="obitos" component={Death} />
          <Route path="abertas" component={OpenEvents} />
          <Route path="geral" component={Events} />
          <Route path="test" component={TestPage} />
          <Route path="dados" component={DataReceive} />
          <Redirect from="relatorios" to="/sig/relatorios/obitos" />
          <Route path="relatorios">
            <Route path="obitos" component={DeceasedReports} />
            <Route path="estatisticos" component={Statistic} />
          </Route>
          <Route path="criar" component={CreateEvent} />
          <Route path="cadastro">
            <Route path="alteracoes" component={GenericCRUD} />
          </Route>
          <Route path="404" component={PageNotFound} />
          <Redirect from="*" to="404" />
        </Route>
        <Redirect from="*" to="/pagenotfound" />
      </Router>
    </Provider>
  </ThemeProvider>
);
