import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
	var rev = null;	//	Do not show logo
	rev = "45";		//	Revision  - remove for production	
	if (!rev) return null;  
    return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="App-title">Trending Giphies</h1>
				<h3>Revision {rev}</h3>
			</header>
		</div>
    );
  }
  
}

export default App;
