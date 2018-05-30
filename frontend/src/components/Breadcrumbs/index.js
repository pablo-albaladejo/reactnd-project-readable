//https://github.com/icd2k3/react-router-breadcrumbs-hoc
//https://github.com/ReactTraining/react-router/issues/4556#issuecomment-341278014

import React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import { css } from 'aphrodite';
import styles from './styles';

const CategoryBreadcrumb = ({ match }) =>
  <span>Category: {match.params.category}</span>; // use match param userId to fetch/display user name

// define some custom breadcrumbs for certain routes (optional)
const routes = [
  { path: '/error/', breadcrumb: null },
  { path: '/error/:type', breadcrumb: 'Error' },
  { path: '/new', breadcrumb: 'New Post' },
  { path: '/:category/:postId', breadcrumb: 'Post details' },
  { path: '/:category', breadcrumb: CategoryBreadcrumb },
];

// map & render your breadcrumb components however you want.
// each `breadcrumb` has the props `key`, `location`, and `match` included!
const Breadcrumbs = ({ breadcrumbs }) => (
  <div className={css(styles.container)}>
    {breadcrumbs.map((breadcrumb, index) => (
      <span key={breadcrumb.key}>
        <NavLink to={breadcrumb.props.match.url} className={css(styles.link)}>
          {breadcrumb}
        </NavLink>
        {(index < breadcrumbs.length - 1) && <i className={css(styles.separator)}> / </i>}
      </span>
    ))}
  </div>
);

export default withBreadcrumbs(routes)(Breadcrumbs);