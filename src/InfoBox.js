import React, { Component } from 'react';
import './InfoBox.css';

class InfoBox extends Component {
	constructor (props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.props.closeInfobox();
	}
	render() {
		if (this.props.infoObj) {
			return (
				<div className='infoBox'>
					<h4 className='ibTitle'>{this.props.infoObj.title}</h4>
					<span className='ibItem'>Width:{this.props.infoObj.width} Height:{this.props.infoObj.height}</span><br />
					<span className='ibItem'>Size: {this.props.infoObj.size}</span><br/ >
					<span className='ibItem'>GIF ID: {this.props.infoObj.id}</span><br/ >
					<span className='ibItem'>Media ID: {this.props.infoObj.mediaID}</span>
					<p><button onClick={this.handleClick}>Close</button></p>
				</div>
			)
		}
		return null;
	}
}
export default InfoBox;