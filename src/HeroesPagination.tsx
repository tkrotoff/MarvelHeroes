import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import Heroes from './Heroes';

export interface QueryParams {
  page?: string;
}

export interface Props extends RouteComponentProps<QueryParams> {}

export interface State {
  page: number;
}

export default class HeroesPagination extends React.Component<Props, State> {
  state: State = {
    page: 0
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
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
      <>
        <h3>Marvel Heroes</h3>
        <Link to={`/${page - 1}`} className={prevButtonClasses}>
          &laquo; Previous
        </Link>{' '}
        <Link to={`/${page + 1}`} className="btn btn-primary">
          Next &raquo;
        </Link>
        <Heroes page={page} />
      </>
    );
  }
}
