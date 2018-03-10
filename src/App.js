import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Trendings from './Trendings.js';

class App extends Component {
  render() {
	  const rev = "6";
	  console.log("App.render(" + rev + ")");
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
		
		<Trendings giphyID={this.props.giphyID} />
		
		
      </div>
    );
  }
  
}

export default App;
