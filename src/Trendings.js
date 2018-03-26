import React, { Component } from 'react';
import './Trendings.css';
import Lightbox from 'react-images';
import InfoBox from './InfoBox.js'

class Trendings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			 giphyID: props.giphyID
			,giphyLimit: props.giphyLimit
			,lightboxIsOpen: false
			,infoboxIsOpen: false
			,currentImage: 0
			,preventScroll: false
			,showThumbnails: true
			,infoStr: ""
		};
		this.onClickImage = this.onClickImage.bind(this);
		this.onClickThumbnail = this.onClickThumbnail.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.closeLightbox = this.closeLightbox.bind(this);
		this.closeInfobox = this.closeInfobox.bind(this);
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
		this.setState({infoboxIsOpen: true});
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
		this.setState({infoboxIsOpen: false});
		this.setState({infoStr: null});
		this.setState({lightboxIsOpen: false});
	}
	closeInfobox() {
		this.setState({infoboxIsOpen: false});
		this.setState({infoStr: null});
	}
	
	render() {
		//If infobox is open, always show it . . . 
		if (this.state.infoboxIsOpen) {
				return <InfoBox info={this.state.infoStr} closeInfobox={this.closeInfobox} />
		}
		//	. . . but if infoxbox is closed and lightboxIsOpen,
		//	show the lightbox . . .
		if (this.state.lightboxIsOpen) { 
			return (
				<div>
					<Lightbox  
						images={this.state.urlObjs}
						isOpen={this.state.lightboxIsOpen} 
						currentImage={this.state.currentImage}
						showThumbnails={this.state.showThumbnails}
						preventScroll = {this.state.preventScroll}
						onClickPrev={this.gotoPrevious} 
						onClickNext={this.gotoNext} 
						onClickImage={this.onClickImage}
						onClickThumbnail={this.onClickThumbnail}
						onClose={this.closeLightbox}
					>
					</Lightbox>
				</div>
			);
		}
		//	. . . but if neither is open, show nothing
		return null;
	}
}

export default Trendings;