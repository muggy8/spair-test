import React, { Component } from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import axios from 'axios'
// import GtfsRealtimeBindings from 'gtfs-realtime-bindings'
// import logo from './logo.svg';
import './App.css';
const mapBoxToken = "pk.eyJ1IjoibXVnZ3k4IiwiYSI6ImNqcXMyYTk5cTB0Zms0MnA2eG95emFzZDUifQ.dVHK4TIMjLdMvJFUGRm7vQ"

class App extends Component {

	state = {
		viewport: {
			width: 400,
			height: 400,
			latitude: 49.22160433166661,
			longitude: -123.06265682276278,
			zoom: 11
		},
		busses: []
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

		let isMounted = false
		const fetchBusData = async()=>{
			if (!isMounted){
				return
			}
			let markerData = await axios.get("/api/transit-data")
			this.setState({busses: markerData.data.entity})
			setTimeout(fetchBusData, 15000) // translink's api updates once ever 30 seconds appearently so we can use this to update it at half the interval so we can get fast data but not waste too many requests
		}

		this.componentDidMount = ()=>{
			isMounted = true
			window.addEventListener("resize", onWindowResize)
			onWindowResize()
			fetchBusData()
		}

		this.componentWillUnmount = ()=>{
			isMounted = false
			window.removeEventListener("resize", onWindowResize)
		}

		// fetch the data from the translink api and constructors cant be async sadly


	}
	render() {
		let busMarkers = []

		let bounds = this.state.srcMap && this.state.srcMap.getBounds()
		if (bounds){
			let maxNorth = bounds.getNorth()
			let maxSouth = bounds.getSouth()
			let maxEast = bounds.getEast()
			let maxWest = bounds.getWest()
			this.state.busses.filter(bus=>{
				let lng = bus.vehicle.position.longitude
				let lat = bus.vehicle.position.latitude
				return lng >= maxWest && lng <= maxEast && lat <= maxNorth && lat >= maxSouth
			}).forEach(bus=>{
				busMarkers.push((<Marker key={bus.id} longitude={bus.vehicle.position.longitude} latitude={bus.vehicle.position.latitude}>
				</Marker>))
			})
		}

		let map = (
			<ReactMapGL
			// pass over the relavant attributes in case we add more later
			width={this.state.viewport.width}
			height={this.state.viewport.height}
			latitude={this.state.viewport.latitude}
			longitude={this.state.viewport.longitude}
			zoom={this.state.viewport.zoom}
			mapboxApiAccessToken={mapBoxToken}

			// handle the onchange event
			ref={ref=>(this.mapRef = ref)}
			onLoad={()=>this.setState({srcMap: this.mapRef.getMap()})}
			onViewportChange={viewport=>this.setState({viewport})}>
				{busMarkers}
			</ReactMapGL>
		)

		return map
	}
}

export default App;
