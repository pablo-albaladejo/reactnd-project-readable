import React, { Component } from 'react';

import { Table } from 'reactstrap';
import moment from 'moment';

import { connect } from 'react-redux';
import { getAllPosts } from './actions/posts';

class App extends Component {

  componentWillMount() {

    this.props.dispatch(getAllPosts());

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
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Votes</th>
              <th>Title</th>
              <th>User</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.posts.map((post, index) => {
              return (
                <tr onClick={() => { alert(post.id) }}>
                  <td>{index + 1}</td>
                  <td>{post.voteScore}</td>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{moment(post.timestamp).fromNow()}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  let posts = [];

  Object.keys(state.posts).forEach(post_id => {
    let post = state.posts[post_id];
    posts.push(post);
  });

  console.log(posts);
  return {
    posts,
  }
}
export default connect(mapStateToProps)(App);
