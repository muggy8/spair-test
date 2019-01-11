import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
	state = {
		viewport: {
			width: 400,
			height: 400,
			latitude: 37.7577,
			longitude: -122.4376,
			zoom: 8
		}
	}
	render() {
		return (
			<div>
				<ReactMapGL
				// pass over the relavant attributes in case we add more later
				width={this.state.viewport.width}
				height={this.state.viewport.height}
				latitude={this.state.viewport.latitude}
				longitude={this.state.viewport.longitude}
				zoom={this.state.viewport.zoom}

				// handle the onchange event
				onViewportChange={viewport=>this.setState({viewport})}/>
			</div>
		)
	}
}

export default App;
