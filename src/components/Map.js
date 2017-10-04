import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
import React, {Component} from 'react';

class MapContainer extends Component {
    render() {

        const style = {
            width: '100%',
            height: '100%'
        };
        const initialCenter = {
            lat: -24.959565,
            lng: -53.458563
        };

        return (
            <Map google={this.props.google}
                 zoom={15}
                 style={style}
                 initialCenter={initialCenter}
                 clickableIcons={false}
            >
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'}/>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAzTZTuwTczZL2JedjuYJRiEh2v0BQpgxo"
})(MapContainer)