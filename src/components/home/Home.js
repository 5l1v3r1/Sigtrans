import React, {Component} from 'react';
import {connect} from "react-redux";
import Map from '../map/Map'
import DeathApi from "../../logics/DeathApi";
import HomeApi from "../../logics/HomeApi";

// import {PageHeader} from "react-bootstrap";

class Home extends Component {

    delayedShowMarker() {
        setTimeout(() => this.props.delayedShowMarkers(), 2000)
    };

    componentDidMount() {
        if (!this.props.homeDeath.deathEvents) {
            this.props.listDeathEvents(this.props.homeDeath.loading);
            this.props.listDeathOptions();
        }
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
                        markers={this.props.homeDeath.deathEvents ? this.props.homeDeath.deathEvents.map((event) => {
                            let max = 0;
                            event.involved.forEach((elem) => {
                                if (max < elem.InjuryLevel) {
                                    max = elem.InjuryLevel;
                                }
                            });
                            return {
                                position: {lat: parseFloat(event.general.lat), lng: parseFloat(event.general.lng)},
                                icon: {url: icons[max - 1]}
                            }
                        }) : undefined}
                        loadingElement={<div style={{height: '100%'}}/>}
                        containerElement={<div style={{height: '100%'}}/>} mapElement={<div style={{height: '78vh'}}/>}
                        showMarkers={this.props.home.showMarkers} defaultZoom={3}
                        center={{lat: 40.056869, lng: -103.343486}}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        homeDeath: state.death,
        home: state.home
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
        delayedShowMarkers: () => {
            dispatch(HomeApi.delayedShowMarkers())
        }
    }
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;