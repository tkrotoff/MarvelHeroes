import React from 'react';

import HeroesPagination from './HeroesPagination';
export * from './HeroesPagination';

// FIXME See React 16 Fragments unsupported https://github.com/airbnb/enzyme/issues/1213
export default class HeroesPaginationEnzymeFix extends HeroesPagination {
  render() {
    return <div>{super.render()}</div>;
  }
}
