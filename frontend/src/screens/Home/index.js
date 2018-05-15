import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom'

import Breadcrumbs from '../../components/Breadcrumbs';

import PostListScreen from '../PostList';
import PostScreen from '../Post';

class Home extends Component {

  render() {
    return (
      <div>
        <Breadcrumbs />
        <Switch>

          {/* Post */}
          <Route path='/posts/:id' component={PostScreen} />

          {/* PostList */}
          <Route path='/:category' component={PostListScreen} />
          <Route path='/' component={PostListScreen} />
      
        </Switch>
      </div>

    );
  }
}
//https://github.com/ReactTraining/react-router/issues/4671#issuecomment-285320076
export default Home;
