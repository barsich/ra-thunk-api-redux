import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ServiceEditPage from './pages/ServiceEditPage';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/ra-thunk-api-redux/services/:id" component={ServiceEditPage} />
        <Route path="/ra-thunk-api-redux/services" component={ServicesPage} />
        <Route path="/ra-thunk-api-redux" exact>
          <Redirect to="/ra-thunk-api-redux/services" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
