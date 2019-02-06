import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Heroes } from './Heroes';

export interface QueryParams {
  page?: string;
}

export interface Props extends RouteComponentProps<QueryParams> {}

export const HeroesPagination: React.FunctionComponent<Props> = props => {
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const pageParam = props.match.params.page;
    const pageFromProps = pageParam !== undefined ? parseInt(pageParam, 10) : 0;
    if (pageFromProps !== page) {
      setPage(pageFromProps);
    }
  }, [props.match.params.page]);

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
};
