import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Heroes } from './Heroes';

export function HeroesPagination() {
  const { page: tmp } = useParams();
  const pageQueryParam = tmp !== undefined ? parseInt(tmp, 10) : 0;

  const [page, setPage] = useState(pageQueryParam);

  useEffect(() => {
    if (pageQueryParam !== page) {
      setPage(pageQueryParam);
    }
  }, [pageQueryParam, page]);

  // [Disabled href tag](https://stackoverflow.com/q/13955667)
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
