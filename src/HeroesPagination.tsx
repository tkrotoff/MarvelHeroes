import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Heroes } from './Heroes';

export function HeroesPagination() {
  const { page: tmp } = useParams<'page'>();
  const pageQueryParam = tmp === undefined ? 0 : Number.parseInt(tmp, 10);

  const [page, setPage] = useState(pageQueryParam);

  useEffect(() => {
    if (pageQueryParam !== page) {
      setPage(pageQueryParam);
    }
  }, [pageQueryParam, page]);

  return (
    <>
      <h1>Marvel Heroes</h1>
      {page === 0 ? (
        <button type="button" className="btn btn-primary me-2" disabled>
          ‹ Previous
        </button>
      ) : (
        <Link to={`/${page - 1}`} className="btn btn-primary me-2">
          ‹ Previous
        </Link>
      )}
      <Link to={`/${page + 1}`} className="btn btn-primary">
        Next ›
      </Link>
      <Heroes page={page} />
    </>
  );
}
