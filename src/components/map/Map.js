import React, {Component} from 'react'
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'

class Map extends Component {
    render() {
        return (
            <GoogleMap defaultZoom={this.props.defaultZoom || 13}
                       defaultCenter={this.props.center || {lat: -24.9578, lng: -53.4595}}>
                {
                    this.props.showMarkers && this.props.markers && this.props.markers.map((marker, index) => {
                        return (<Marker {...marker} key={index}/>)
                    })
                }
            </GoogleMap>
        )
    }
}

export default withScriptjs(withGoogleMap(Map))