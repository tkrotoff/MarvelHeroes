import { RouteComponentProps } from 'react-router';

// See Recursive Partial<T> in TypeScript 2.1 https://stackoverflow.com/q/41980195
type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export const mockRouteComponentProps = <P>(props: DeepPartial<RouteComponentProps<P>>) =>
  (props as any) as RouteComponentProps<P>;
