import React, {Component} from 'react';
import {connect} from "react-redux";
import Map from '../map/Map'
import DeathApi from "../../logics/DeathApi";
import HomeApi from "../../logics/HomeApi";
import {PageHeader} from "react-bootstrap";

class Home extends Component {

    delayedShowMarker(showMarkers){
        setTimeout(() => this.props.delayedShowMarkers(showMarkers), 3000)
    };

    componentDidMount() {
        this.props.listDeathEvents(this.props.homeDeathState.loading);
        this.props.listDeathOptions();
        this.delayedShowMarker(this.props.home.showMarkers);
    };

    render() {
        let icons=[];
        icons.push('../../images/SemVitimas.png');
        icons.push('../../images/Leve.png');
        icons.push('../../images/Grave.png');
        icons.push('../../images/Gravissimo.png');
        return (
            <div>
                <PageHeader>Ocorrências</PageHeader>
                <div className="content" id="content">
                    <Map defaultZoom={2} showMarkers={this.props.home.showMarkers}
                         googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyAzTZTuwTczZL2JedjuYJRiEh2v0BQpgxo"
                         markers={this.props.homeDeathState.deathEvents?this.props.homeDeathState.deathEvents.map((event) => {
                             let max = 0;
                             event.involved.forEach((elem)=>{
                                if (max<elem.InjuryLevel){
                                    max = elem.InjuryLevel;
                                }
                             });
                             return {
                                 position: {lat: parseFloat(event.general.lat), lng: parseFloat(event.general.lng)},
                                 icon: {
                                     url:icons[max-1]
                                }
                             }
                         }):undefined}
                         loadingElement={<div style={{height: '100%'}}/>}
                         containerElement={<div style={{height: '100%'}}/>}
                         mapElement={<div style={{height: '65vh'}}/>}

                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        homeDeathState: state.death,
        home:state.home
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
        delayedShowMarkers: (showMarkers)=>{
            dispatch(HomeApi.delayedShowMarkers(showMarkers))
        }
    }
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;