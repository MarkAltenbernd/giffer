import React, { Component } from 'react';
import Lightbox from 'react-images';
import InfoBox from './InfoBox.js'

class Trendings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			 giphyID: props.giphyID
			,giphyLimit: props.giphyLimit
			,lightboxIsOpen: false
			,currentImage: 0
			,preventScroll: true
			,showThumbnails: true
			,infoStr: "### infoStr default ###"
		};
		this.onClickImage = this.onClickImage.bind(this);
		this.onClickThumbnail = this.onClickThumbnail.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.closeLightbox = this.closeLightbox.bind(this);
	}
	
	componentDidMount() {	
		let giphyClient = require('giphy-js-sdk-core');
		let client = giphyClient(this.state.giphyID);
		
		//	Trending Gifs 
		//	Parameters are "limit", "rating", and/or "fmt"
		client.trending("gifs", {limit: this.state.giphyLimit})	
			.then((response) => {
				let trendObjs = [];	//	Array of info objects
				let urlObjs = [];	//	Array of fixed-height still image URLs
				
				//	Create objects with just the properties we want, 
				//	then push those objects into the trendObjs array
				for (let i = 0; i < response.data.length; i++) {
					let trendObj = {};
					trendObj.id = response.data[i].id;
					trendObj.url = response.data[i].url;
					trendObj.title = response.data[i].title;
					trendObj.image = response.data[i].images.fixed_height_still;
					trendObjs.push(trendObj); 
					
					//	Following for react-images carousel component
					let urlStr = response.data[i].images.fixed_height_still.gif_url;
					let urlObj = {src: urlStr, caption: trendObj.title, alt: trendObj.id};
					urlObjs.push(urlObj);
				}
				this.setState({trendObjs : trendObjs});
				this.setState({urlObjs : urlObjs});
				this.setState({lightboxIsOpen : true});
			})
			.catch((err) => {
				console.log("Trendings.componentDidMount() failed:\n" + err);
			})
	}	//	componentDidMount()
	
	onClickImage(evnt) {
		//	Retrieve info object corresponding to selected image
		let trendObj = this.state.trendObjs[this.state.currentImage];
		this.setState({infoStr : trendObj.id + " :: " + trendObj.title});
	}
	
	onClickThumbnail(idx) {
		this.setState({currentImage: idx});
	}
	
	gotoNext(evnt) {
		if (this.state.currentImage >= this.state.giphyLimit - 1) {
			return;
		}
		this.setState({currentImage: this.state.currentImage + 1});
	}
	
	gotoPrevious(evnt) {
		if (this.state.currentImage <= 0) {
			return;
		}
		this.setState({currentImage: this.state.currentImage - 1});
	}
	
	closeLightbox(evnt) {
		this.setState({lightboxIsOpen: false});
	}
	
	render() {
		if (this.state.lightboxIsOpen) { 
			console.log("Trendings.render()\n\tthis.state.infoStr=" + this.state.infoStr);
			return (
				<div>
					<Lightbox  
						images={this.state.urlObjs}
						isOpen={this.state.lightboxIsOpen} 
						currentImage={this.state.currentImage}
						showThumbnails={this.state.showThumbnails}
						onClickPrev={this.gotoPrevious} 
						onClickNext={this.gotoNext} 
						onClickImage={this.onClickImage}
						onClickThumbnail={this.onClickThumbnail}
						onClose={this.closeLightbox}
						preventScroll = {this.state.preventScroll}
					/>
					<InfoBox info={this.state.infoStr} />
				</div>
			);
		}
		// Return HTML during development; return null in production
		return (
			<div>
				<h3>Lightbox is <em>NOT</em> open!</h3>
			</div>
		);
	}
}

export default Trendings;