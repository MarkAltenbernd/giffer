import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//	Giphy API ID secured for project 'giffer'
const giphyID = "Gb1KY3Lqu93pXZoqaAAEGxWjUd0Tos8A";
const giphyLimit = 16;		//	Number of GIFs to retrieve in one call

const element = <App giphyID={giphyID} giphyLimit={giphyLimit} />
ReactDOM.render(element, document.getElementById('root'));
registerServiceWorker();
