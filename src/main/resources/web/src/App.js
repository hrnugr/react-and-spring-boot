import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GroupList from './component/GroupList';
import Home from './component/Home';


class App extends Component {
  

  render() {

      return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/groups' exact={true} component={GroupList}/>
          </Switch>
      </Router>
      );
    }
  }


export default App;
