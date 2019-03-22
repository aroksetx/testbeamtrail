import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FirebaseAppContainer from './containers/FirebaseAppContainer';
import ServerAppContainer from './containers/ServerAppContainer';


function AppRouter() {
    return (
        <Router>
                <Route path="/" exact component={FirebaseAppContainer} />
                <Route path="/server" exact component={ServerAppContainer} />
        </Router>
    );
}

export default AppRouter;
