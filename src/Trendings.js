import React, { Component } from 'react';
import Lightbox from 'react-images';

class Trendings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			 giphyID: props.giphyID
			,giphyLimit: props.giphyLimit
			,lightboxIsOpen: true
			,currentImage: 9
			,precentScroll: false
		};
		this.handleClick = this.handleClick.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.closeLightbox = this.closeLightbox.bind(this);
		this.updateLightbox = this.updateLightbox.bind(this);
	}
	
	componentDidMount() {	
		let giphyClient = require('giphy-js-sdk-core');
		let client = giphyClient(this.state.giphyID);
		
		//	Trending Gifs 
		//	Parameters are "limit", "rating", and/or "fmt"
		client.trending("gifs", {limit: this.state.giphyLimit})	
			.then((response) => {
				let trendObjs = [];	//	Array of objects
				let urlObjs = [];	//	Array of fixed-height still image URLs
				
				//	Create objects with just properties we want, then
				//	push those objects into the trendObjs array
				for (let i = 0; i < response.data.length; i++) {
					let trendObj = {};
					trendObj.id = response.data[i].id;
					trendObj.url = response.data[i].url;
					trendObj.title = response.data[i].title;
					trendObj.image = response.data[i].images.fixed_height_still;
					trendObjs.push(trendObj); 
					
					//	Following for react-images
					let urlStr = response.data[i].images.fixed_height_still.gif_url;
					let urlObj = {src: urlStr};
					urlObjs.push(urlObj);
				}
				this.setState({trendObjs: trendObjs});
				this.setState({urlObjs: urlObjs});
				/*
				const lightbox = <Lightbox  
					images={this.state.urlObjs}
					isOpen={this.state.lightboxIsOpen} 
					currentImage={this.state.currentImage}
					onClickPrev={this.gotoPrevious} 
					onClickNext={this.gotoNext} 
					onClickImage={this.handleClick}
					onClose={this.closeLightbox}
					preventScroll = {this.state.preventScroll}
				/>;	//*/
				this.updateLightbox();
			})
			.catch((err) => {
				console.log("Trendings.componentDidMount() failed:\n" + err);
			})
	}	//	componentDidMount()
	updateLightbox() {
		const lightbox = <Lightbox  
			images={this.state.urlObjs}
			isOpen={this.state.lightboxIsOpen} 
			currentImage={this.state.currentImage}
			onClickPrev={this.gotoPrevious} 
			onClickNext={this.gotoNext} 
			onClickImage={this.handleClick}
			onClose={this.closeLightbox}
			preventScroll = {this.state.preventScroll}
		/>;
		this.setState({lightbox: lightbox});		
	}
	handleClick(evnt) {
		console.log("\thandleClick(evnt) for id=" + evnt.currentTarget.id);
		this.updateLightbox();
	}
	gotoNext(evnt) {
		if (this.state.currentImage >= this.state.giphyLimit) {
			return;
		}
		this.setState({currentImage: this.state.currentImage + 1});
		this.updateLightbox();
	}
	gotoPrevious(evnt) {
		if (this.state.currentImage <= 1) {
			return;
		}
		this.setState({currentImage: this.state.currentImage - 1});
		this.updateLightbox();
	}
	closeLightbox(evnt) {
		this.setState({lightboxIsOpen: false});
		this.updateLightbox();
	}
	render() {
		return <span>{this.state.lightbox}</span>
	}
}

export default Trendings;