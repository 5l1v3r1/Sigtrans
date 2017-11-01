import React, {Component} from 'react'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'

class Map extends Component{

	render(){

		const markers = this.props.markers || [];

		return(
			<GoogleMap
			    defaultZoom={8}
			    defaultCenter={{ lat: -34.397, lng: 150.644 }}
			  >
			    {
			    	markers.map((marker, index) => (
						<Marker {...marker} />
					))
			    }
			  </GoogleMap>
		)

	}
}

export default withGoogleMap(Map)