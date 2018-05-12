import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom'

import PostListScreen from '../PostList';
import PostDetailScreen from '../PostDetail';

class Home extends Component {

  componentWillMount() {

    /*     ServiceFacade.getAllCategories()
          .then(categories => {
            console.log("categories");
            console.log(categories);
          }).catch(err => {
            console.warn(err);
          });
    
          ServiceFacade.getAllPosts()
          .then(posts => {
            console.log("posts");
            console.log(posts);
          }).catch(err => {
            console.warn(err);
          });
    
          ServiceFacade.getAllComments("8xf0y6ziyjabvozdd253nd")
          .then(comments => {
            console.log("comments");
            console.log(comments);
          }).catch(err => {
            console.warn(err);
          }); */
  }

  render() {
    return (
      <div>
        <Switch>
          
          {/* PostList */}
          <Route exact path='/' component={PostListScreen} />

          {/* Post */}
          <Route exact path='/post/:id' component={PostDetailScreen} />

        </Switch>
      </div>
    );
  }
}
export default Home;
