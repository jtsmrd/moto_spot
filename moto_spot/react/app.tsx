import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/app.css';
import Home from './components/Home';
import Map from './components/Map';
// start the Stimulus application
// import './bootstrap';
import MapContainer from './components/MapContainer';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MainAppBar from './components/MainAppBar';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <MainAppBar />
                <MapContainer />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root'),
);
