import { RouteComponentProps, match } from 'react-router';
import * as H from 'history';

export default function mockRouteComponentProps<P>(params: P) {
  const props: RouteComponentProps<P> = {
    history: {} as H.History,
    location: {} as H.Location,
    match: {
      params
    } as match<P>,
    staticContext: undefined
  };

  return props;
}
