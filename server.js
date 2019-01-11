const express = require("express")
const GtfsRealtimeBindings = require("gtfs-realtime-bindings")
const argv = require("yargs").argv
const request = require('request')

const devPort = 5000
const depPort = 80
const translinkApiToken = "FSQN1BNI3ScaOXO4srsG"

const server = express()

server.get("/api/transit-data", async function(req, res){

	let requestSettings = {
		method: "GET",
		url: `http://gtfs.translink.ca/gtfsposition?apikey=${translinkApiToken}`,
		encoding: null
	}

	request(requestSettings, function (error, response, body) {
		res.status(response.statusCode)
		if (!error && response.statusCode == 200) {
			let feed = GtfsRealtimeBindings.FeedMessage.decode(body)
			res.json(feed)
			res.end()
		}
		else {
			res.send(error)
			res.end
		}
	})

})

server.use(express.static("build"))

if (argv.hasOwnProperty("dev") || argv.hasOwnProperty("d")){
	server.listen(devPort)
	console.log("listening on port", devPort)
}
else if (argv.port){
	let customPort = argv.port
	server.listen(customPort)
	console.log("listening on port", customPort)
}
else {
	server.listen(depPort)
	console.log("listening on port", depPort)
}
