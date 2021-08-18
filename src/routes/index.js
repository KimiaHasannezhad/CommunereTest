import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../utility/history'
import MapSection from '../containers/MapSection'

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <MapSection />
        </Route>
        <Route path="/map">
          <MapSection />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes