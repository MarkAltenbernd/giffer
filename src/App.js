import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Trendings from './Trendings.js';

class App extends Component {
  render() {
	  const rev = "12";		//	Revision version
	  console.log("App.render(" + rev + ")");	//	Trace progress
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
		
		<Trendings giphyID={this.props.giphyID} giphyLimit={this.props.giphyLimit} />
		
		
      </div>
    );
  }
  
}

export default App;
