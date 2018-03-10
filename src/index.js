import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const giphyID = "Gb1KY3Lqu93pXZoqaAAEGxWjUd0Tos8A";
const element = <App giphyID={giphyID} />
ReactDOM.render(element, document.getElementById('root'));
registerServiceWorker();
