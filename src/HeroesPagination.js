import React from 'react';
import { Link } from 'react-router-dom';

import Heroes from './Heroes';

export default class HeroesPagination extends React.Component {
  state = {
    page: undefined
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const pageParam = nextProps.match.params.page;
    const page = pageParam !== undefined ? parseInt(pageParam, 10) : 0;
    return page !== prevState.page ? { page } : null;
  }

  render() {
    const { page } = this.state;

    // See Disabled href tag https://stackoverflow.com/q/13955667
    let prevButtonClasses = 'btn btn-primary';
    if (page === 0) prevButtonClasses += ' disabled';

    return (
      <div>
        <h3>Marvel Heroes</h3>
        <Link to={`/${page - 1}`} className={prevButtonClasses}>
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
