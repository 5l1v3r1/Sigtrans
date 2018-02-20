import React, {Component} from 'react';
// import {PageHeader} from 'react-bootstrap';
import Map from './Map/Map'
import {connect} from "react-redux";
import DeathApi from "../logics/DeathApi";


class Home extends Component {

    componentWillMount() {
        this.props.listDeathEvents(this.props.deathState.loading);
        this.props.listDeathOptions();
    }

    render() {
        return (
            <div>
                {/*<PageHeader/>*/}
                <div className="content" id="content">
                    <Map loadingElement={<div style={{ height: `100%` }} />}
                         containerElement={<div style={{height:'100%'}}/>}
                         mapElement={<div style={{height:'80vh'}}/>}
                         defaultZoom={1}
                         googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzTZTuwTczZL2JedjuYJRiEh2v0BQpgxo"
                         markers={
                             this.props.deathState.deathEvents?this.props.deathState.deathEvents.map((event)=> {
                                 return{
                                    position:{lat:parseFloat(event.general.lat), lng:parseFloat(event.general.lng)}
                                 }
                            }):false
                         }
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        deathState: state.death
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listDeathEvents: (loading) => {
            dispatch(DeathApi.listDeaths(loading));
        },
        listDeathOptions: () => {
            dispatch(DeathApi.listDeathsOpts());
        },
        // handleToggleModal: (showModal, id) => {
        //     dispatch(DeathApi.handleDeathModal(showModal, id));
        // },
        // selectEvent: (event) => {
        //     dispatch(DeathApi.selectEvent(event));
        // },
        // onChangeInput: (newValue, operator, subMenu) => {
        //     dispatch(DeathApi.onChangeInput(newValue, operator, subMenu));
        // },
    }
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;