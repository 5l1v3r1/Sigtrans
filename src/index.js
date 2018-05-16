import ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {makeMainRoutes} from "./routes";
import {home} from './reducers/home';
import {menus} from './reducers/menus';
import {death} from './reducers/death';
import {auth} from './reducers/auth';
import {reports} from './reducers/reports';
import {events} from './reducers/events';
import {datareceive} from './reducers/datareceive';
import {genericCrud} from './reducers/genericCrud';
import metisMenuReducer from 'react-metismenu/lib/reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import './css/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/index.css';
import './css/App.css';
import './toolbox/theme.css';
import 'react-table/react-table.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Create Reducers
const reducers = combineReducers({metisMenuReducer, death, menus, auth, reports, events, datareceive, home, genericCrud});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));
const routes = makeMainRoutes(store);

ReactDOM.render(
    routes,
    document.getElementById('root')
);
