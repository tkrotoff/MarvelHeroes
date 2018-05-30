import React from 'react';
import { Link } from 'react-router-dom';

import Heroes from './Heroes';

export default class HeroesPage extends React.Component {
  state = {
    page: undefined
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('HeroesPage.getDerivedStateFromProps()');
    const pageParam = nextProps.match.params.page;
    const page = pageParam !== undefined ? parseInt(pageParam, 10) : 0;
    return page !== prevState.page ? { page } : null;
  }

  render() {
    const { page } = this.state;

    return (
      <div>
        <h3>Marvel Heroes</h3>
        <Link to={`/${page - 1}`} disabled={page === undefined || page === 0} className="btn btn-primary">
          &laquo; Previous
        </Link>{' '}
        <Link to={`/${page + 1}`} className="btn btn-primary">
          Next &raquo;
        </Link>
        {page !== undefined ? <Heroes page={page} /> : null}
      </div>
    );
  }
}
