import React, { Component } from 'react';
import './InfoBox.css';

class InfoBox extends Component {
	constructor (props) {
		super(props);
		this.state = {info: this.props.info}
	}
	render() {
		let locStr = this.props.info;
		if (locStr) {
			return (
				<div className='info'>
					<h4>{locStr}</h4>
					<p><button>Close</button></p>
				</div>
			)
		}
		return null;
	}
}
export default InfoBox;