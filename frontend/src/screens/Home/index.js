import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom'

import Breadcrumbs from '../../components/Breadcrumbs';

import PostListScreen from '../PostList';
import PostScreen from '../Post';
import NotFoundScreen from '../NotFound';

class Home extends Component {

  render() {
    return (
      <div>
        <Breadcrumbs />
        <Switch>

          {/* Post */}
          <Route exact path='/posts/:id' component={PostScreen} />

          {/* PostList */}
          <Route exact path='/:category' component={PostListScreen} />
          <Route exact path='/' component={PostListScreen} />
      
          {/* Error */}
          <Route exact path='/error/notfound' component={NotFoundScreen} />
          <Redirect from="/:other" to="/error/notfound" />

        </Switch>
      </div>

    );
  }
}
//https://github.com/ReactTraining/react-router/issues/4671#issuecomment-285320076
export default Home;
