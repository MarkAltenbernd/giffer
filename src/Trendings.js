import React, { Component } from 'react';

class Trendings extends Component {
	render() {
		let context = "class Trendings";	//	Trace progress
		//console.log("in render() of external " + context);
		
		let giphyClient = require('giphy-js-sdk-core')
		let client = giphyClient(this.props.giphyID)
		
		//	Trending Gifs 
		//	Parameters are "limit", "rating", and/or "fmt"
		client.trending("gifs", {limit: this.props.giphyLimit})	
			.then((response) => {
				console.log("Trendings Promise resolved; response:" + response);
				for (let prop in response.data) {
					console.log("\t" + prop + ": " + response.data[prop]);
					for (let prop2 in response.data[prop]) {
						console.log("\t\t" + prop2 + ": " + response.data[prop][prop2]);
					}
				}
			})
			.catch((err) => {
				console.log("Trendings Promise failed:\n" + err);
			})
		return <h1>from EXTERNAL {context}, Giphy ID: {this.props.giphyID}</h1>;
	}
}

export default Trendings;