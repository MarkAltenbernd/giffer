import React, { Component } from 'react';

class Trendings extends Component {
	render() {
		console.log("in render() of external Trendings class");
		return <h1>from EXTERNAL class: {this.props.giphyID}</h1>;
	}
}

export default Trendings;