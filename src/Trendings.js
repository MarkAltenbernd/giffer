import React, { Component } from 'react';

class Trendings extends Component {
	render() {
		let context = "class Trendings";	//	Trace progress
		//console.log("in render() of external " + context);
		
		let giphyClient = require('giphy-js-sdk-core');
		let client = giphyClient(this.props.giphyID);
		
		//	Trending Gifs 
		//	Parameters are "limit", "rating", and/or "fmt"
		client.trending("gifs", {limit: this.props.giphyLimit})	
			.then((response) => {
				let trenders = [];
				//	Create objects with just properties we want, then
				//	push those objects into an array
				for (let i = 0; i < response.data.length; i++) {
					let trendObj = {};
					trendObj.id = response.data[i].id;
					trendObj.url = response.data[i].url;
					trendObj.title = response.data[i].title;
					trendObj.image = response.data[i].images.fixed_height_Still;
					trenders.push(trendObj);
				}
				//	Trace to console just so we can track progress of project
				for (let i = 0; i < trenders.length; i++) {
					console.log("\t" + (i + 1) + ": " + trenders[i].id + " - - - " + trenders[i].title);
				}
			})
			.catch((err) => {
				console.log("Trendings Promise failed:\n" + err);
			})
		return <h1>from EXTERNAL {context}, Giphy ID: {this.props.giphyID}</h1>;
	}
}

export default Trendings;