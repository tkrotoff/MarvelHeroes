import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Heroes } from './Heroes';

export interface QueryParams {
  page?: string;
}

interface Props extends RouteComponentProps<QueryParams> {}

export function HeroesPagination(props: Props) {
  const tmp = props.match.params.page;
  const pageQueryParam = tmp !== undefined ? parseInt(tmp, 10) : 0;

  const [page, setPage] = useState(pageQueryParam);

  useEffect(() => {
    if (pageQueryParam !== page) {
      setPage(pageQueryParam);
    }
  }, [pageQueryParam, page]);

  // See [Disabled href tag](https://stackoverflow.com/q/13955667)
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
