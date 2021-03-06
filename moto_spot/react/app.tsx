import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './styles/app.css';
// start the Stimulus application
// import './bootstrap';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MainAppBar from './components/MainAppBar';
import Footer from './components/Footer';
import Home from './components/Home';
import Profile from './components/Profile';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <MainAppBar />
                <Switch>
                    <Redirect exact from={'/'} to={'/home'} />
                    <Route path={'/home'} component={Home} />
                    <Route path={'/profile'} component={Profile} />
                </Switch>
                <Footer />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root'),
);
