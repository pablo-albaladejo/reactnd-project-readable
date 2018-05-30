import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Loadable from 'react-loading-overlay';

import { Switch, Route } from 'react-router-dom'

import Breadcrumbs from '../../components/Breadcrumbs';

import PostListScreen from '../PostList';
import PostScreen from '../Post';
import NotFoundScreen from '../NotFound';

import { css } from 'aphrodite';
import styles from './styles';

class Home extends Component {

  render() {
    return (
      <Loadable
        active={this.props.isLoading}
        spinner
      >
        <div className={css(styles.container)}>
          <h1 className={css(styles.title)}>Readable</h1>
          <Breadcrumbs />
          <Switch>

            {/* Error */}
            <Route exact path='/error/notfound' component={NotFoundScreen} />
            
            {/* New post */}
            <Route exact path='/new' component={PostScreen} />
            
            {/* Post */}
            <Route exact path='/:category/:id/:action?/' component={PostScreen} />

            {/* PostList */}
            <Route exact path='/:category' component={PostListScreen} />
            <Route exact path='/' component={PostListScreen} />

          </Switch>
        </div>
      </Loadable>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.posts.isFetching || state.categories.isFetching,
  }
}
export default withRouter(connect(mapStateToProps)(Home));
//https://github.com/ReactTraining/react-router/issues/4671#issuecomment-285320076