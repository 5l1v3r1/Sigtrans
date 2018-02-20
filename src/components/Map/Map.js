import React, {Component} from 'react'
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps'

class Map extends Component{

	render(){

		const markers = this.props.markers || [];

		console.log(markers);

		return(
			<GoogleMap defaultZoom={this.props.defaultZoom || 13}
					   defaultCenter={this.props.center || {lat: -24.9578, lng:-53.4595}}>
				{
					markers.map((marker, index)=>
                    	<Marker key={index} position={marker.position}/>
					)
				}
			</GoogleMap>
		)

	}
}

export default withScriptjs(withGoogleMap(Map))