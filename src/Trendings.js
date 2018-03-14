import React, { Component } from 'react';

class Trendings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			 giphyID: props.giphyID
			,giphyLimit: props.giphyLimit
		};
	}
	componentDidMount() {
		
		let giphyClient = require('giphy-js-sdk-core');
		let client = giphyClient(this.state.giphyID);
		
		//	Trending Gifs 
		//	Parameters are "limit", "rating", and/or "fmt"
		client.trending("gifs", {limit: this.state.giphyLimit})	
			.then((response) => {
				let trenders = [];	//	Array of objects
				let trendItems = [];//	Array of list items
				
				//	Create objects with just properties we want, then
				//	push those objects into the trenders array
				for (let i = 0; i < response.data.length; i++) {
					let trendObj = {};
					trendObj.id = response.data[i].id;
					trendObj.url = response.data[i].url;
					trendObj.title = response.data[i].title;
					trendObj.image = response.data[i].images.fixed_height_still;
					trenders.push(trendObj); 
				}
				//	Use the objects to create a bundle of tags and 
				//	put them into an array to be returned
				trendItems = trenders.map((tObj) => 
					<div key={tObj.id}>
						<hr />
						<li key={tObj.id}>
							<h4>{tObj.title}</h4>
							<img className="gifImage" 
									src={tObj.image.gif_url}
									alt={tObj.title}
							/>							
						</li>				
					</div>
				);
				this.setState({trendItems: trendItems});
			})
			.catch((err) => {
				console.log("Trendings Promise failed:\n" + err);
			})
	}
	render() {
		return (
			<ul>{this.state.trendItems}</ul>
		);
	}
}

export default Trendings;