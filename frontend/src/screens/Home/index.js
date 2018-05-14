import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom'

import PostListScreen from '../PostList';
import PostScreen from '../Post';

class Home extends Component {

  render() {
    return (
        <Switch>

          {/* Post */}
          <Route path='/post/:id' component={PostScreen} />

          {/* PostList */}
          <Route path='/' component={PostListScreen} />

        </Switch>
    );
  }
}
//https://github.com/ReactTraining/react-router/issues/4671#issuecomment-285320076
export default Home;
