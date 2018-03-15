import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Trendings from './Trendings.js';
import registerServiceWorker from './registerServiceWorker';

//	Giphy API ID secured for project 'giffer'
const giphyID = "Gb1KY3Lqu93pXZoqaAAEGxWjUd0Tos8A";

//	Number of GIFs to retrieve in one call
const giphyLimit = 16;		//	Initially for 4x4 grid

const element = <App />;
ReactDOM.render(
	element, 
	document.getElementById('root')
);

const list = <Trendings giphyID={giphyID} giphyLimit={giphyLimit} />;
ReactDOM.render(
	list, 
	document.getElementById('list')
);

registerServiceWorker();
