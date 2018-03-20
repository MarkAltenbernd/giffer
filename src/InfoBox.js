import React, { Component } from 'react';

class InfoBox extends Component {
	constructor (props) {
		super(props);
		console.log("InfoBox.constructor():\n\tthis.props.info=" + this.props.info);
		this.state = {info: this.props.info}
	}
	render() {
		let locStr = this.props.info;
		console.log("InfoBox.render():\n\tthis.state.info=" + locStr);
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