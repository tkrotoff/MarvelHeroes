import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Heroes } from './Heroes';

export function HeroesPagination() {
  const { page: tmp } = useParams<'page'>();
  const pageQueryParam = tmp !== undefined ? Number.parseInt(tmp, 10) : 0;

  const [page, setPage] = useState(pageQueryParam);

  useEffect(() => {
    if (pageQueryParam !== page) {
      setPage(pageQueryParam);
    }
  }, [pageQueryParam, page]);

  return (
    <>
      <h1>Marvel Heroes</h1>
      <Link
        to={`/${page - 1}`}
        className={`btn btn-primary me-2${
          page === 0
            ? ' disabled' // [Disabled href tag](https://stackoverflow.com/q/13955667)
            : ''
        }`}
      >
        ‹ Previous
      </Link>
      <Link to={`/${page + 1}`} className="btn btn-primary">
        Next ›
      </Link>
      <Heroes page={page} />
    </>
  );
}
