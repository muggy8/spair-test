import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';
const mapBoxToken = "pk.eyJ1IjoibXVnZ3k4IiwiYSI6ImNqcXMyYTk5cTB0Zms0MnA2eG95emFzZDUifQ.dVHK4TIMjLdMvJFUGRm7vQ"
const translinkApiToken = "FSQN1BNI3ScaOXO4srsG"

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

	constructor(props){
		super(props)

		// this is scoped to the constructor and therefore the resize function is private to this instance
		const onWindowResize = ()=>{
			let newViewport = Object.assign({}, this.state.viewport)
			newViewport.width = document.documentElement.clientWidth
			newViewport.height = document.documentElement.clientHeight
			this.setState({viewport: newViewport})
		}

		this.componentDidMount = ()=>{
			window.addEventListener("resize", onWindowResize)
			onWindowResize()
		}

		this.componentWillUnmount = ()=>{
			window.removeEventListener("resize", onWindowResize)
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
				mapboxApiAccessToken={mapBoxToken}

				// handle the onchange event
				onViewportChange={viewport=>this.setState({viewport})}/>
			</div>
		)
	}
}

export default App;
