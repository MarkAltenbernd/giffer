import React, { Component } from 'react';
import './InfoBox.css';

class InfoBox extends Component {
	constructor (props) {
		super(props);
		this.state = {info: this.props.info}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.props.closeInfobox();
	}
	render() {
		let locStr = this.props.info;
		if (locStr) {
			return (
				<div className='info'>
					<h4>{locStr}</h4>
					<button onClick={this.handleClick}>Close</button>
				</div>
			)
		}
		return null;
	}
}
export default InfoBox;