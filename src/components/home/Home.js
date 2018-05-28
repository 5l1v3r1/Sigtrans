import React, {Component} from 'react';
import {connect} from "react-redux";
import Map from '../map/Map'
import DeathApi from "../../logics/DeathApi";
import HomeApi from "../../logics/HomeApi";
import EventsApi from "../../logics/EventsApi";

// import {PageHeader} from "react-bootstrap";

class Home extends Component {

    delayedShowMarker() {
        setTimeout(() => this.props.delayedShowMarkers(), 2000)
    };

    componentWillMount() {
        this.props.listEvents(this.props.events.loading);
        // this.props.listDeathEvents(this.props.events.loading);
        this.delayedShowMarker();
    };

    componentWillUnmount() {
        this.props.delayedShowMarkers();
    }

    render() {

        let icons = [];
        icons[0] = (require('../../images/SemVitimas.png'));
        icons[1] = (require('../../images/Leve.png'));
        icons[2] = (require('../../images/Grave.png'));
        icons[3] = (require('../../images/Gravissimo.png'));

        return (
            <div>
                {/*<PageHeader>Ocorrências</PageHeader>*/}
                <div className="content" id="content">
                    <Map
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyAzTZTuwTczZL2JedjuYJRiEh2v0BQpgxo"
                        markers={this.props.events.events ? this.props.events.events.map((event) => {
                            /*let max = 1;
                            event.envolvido.forEach((elem) => {
                                if (max < elem.lesoes.id) {
                                    max = elem.lesoes.id;
                                }
                            });*/
                            return {
                                position: {
                                    lat: parseFloat(event.dadosGerais.latitude),
                                    lng: parseFloat(event.dadosGerais.longitude)
                                }
                            }
                        }) : undefined}
                        loadingElement={<div style={{height: '50%'}}/>}
                        containerElement={<div style={{height: '100%'}}/>} mapElement={<div style={{height: '78vh'}}/>}
                        showMarkers={this.props.home.showMarkers} defaultZoom={13}
                        center={{lat: -24.9578, lng:-53.4595}}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        home: state.home,
        events: state.events,
        homeDeath: state.death
    }
};

const mapDispatchToProps = dispatch => {
    return {
        listEvents: (loading) => {
            dispatch(EventsApi.listOpenEvents(loading));
        },
        listOptions: () => {
            dispatch(EventsApi.listEventsOpts());
        },
        listDeathEvents: (loading) => {
            dispatch(DeathApi.listDeaths(loading));
        },
        listDeathOptions: () => {
            dispatch(DeathApi.listDeathsOpts());
        },
        delayedShowMarkers: () => {
            dispatch(HomeApi.delayedShowMarkers())
        }
    }
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;
