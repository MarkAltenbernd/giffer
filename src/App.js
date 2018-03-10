import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
	  const rev = "5";
	  console.log("App.render(" + rev + ")");
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
		<h1>Giphy projecet id: <code>{this.props.giphyID}</code></h1>
		
		
      </div>
    );
  }
  
}

export default App;
