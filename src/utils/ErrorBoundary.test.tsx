import React from 'react';
import { render } from '@testing-library/react';

import { ErrorBoundary, withErrorBoundary } from './ErrorBoundary';

function MyComponent({ throwError }: { throwError: boolean }) {
  if (throwError) throw new Error('Oops!');
  return <>Hello, World!</>;
}

test('render() children if no error', () => {
  const { getByText } = render(
    <ErrorBoundary>
      <MyComponent throwError={false} />
    </ErrorBoundary>
  );
  getByText('Hello, World!');
});

test('render() a message if an error occured', () => {
  // FIXME See https://github.com/bvaughn/react-error-boundary/blob/1.2.4/src/__tests__/ErrorBoundary.test.js#L16-L19
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

  const { getByText } = render(
    <ErrorBoundary>
      <MyComponent throwError={true} />
    </ErrorBoundary>
  );
  getByText('Something went wrong');
  getByText('Error: Oops!');

  consoleSpy.mockRestore();
});

describe('withErrorBoundary() ', () => {
  const MyComponentWithHOC = withErrorBoundary(MyComponent);

  test('displayName', () => {
    expect(MyComponentWithHOC.displayName).toEqual('WithErrorBoundary(MyComponent)');

    const FunctionComponent = () => <></>;
    const FunctionComponentWithHOC = withErrorBoundary(FunctionComponent);
    expect(FunctionComponentWithHOC.displayName).toEqual('WithErrorBoundary(FunctionComponent)');

    const FunctionComponentWithDisplayName = () => <></>;
    FunctionComponentWithDisplayName.displayName = 'function component with display name';
    const FunctionComponentWithDisplayNameWithHOC = withErrorBoundary(
      FunctionComponentWithDisplayName
    );
    expect(FunctionComponentWithDisplayNameWithHOC.displayName).toEqual(
      'WithErrorBoundary(function component with display name)'
    );

    const AnonymousComponentWithHOC = withErrorBoundary(() => <></>);
    expect(AnonymousComponentWithHOC.displayName).toEqual('WithErrorBoundary');
  });

  test('render() children if no error', () => {
    const { getByText } = render(<MyComponentWithHOC throwError={false} />);
    getByText('Hello, World!');
  });

  test('render() a message if an error occured', () => {
    // FIXME See https://github.com/bvaughn/react-error-boundary/blob/1.2.4/src/__tests__/ErrorBoundary.test.js#L16-L19
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const { getByText } = render(<MyComponentWithHOC throwError={true} />);
    getByText('Something went wrong');
    getByText('Error: Oops!');

    consoleSpy.mockRestore();
  });
});
