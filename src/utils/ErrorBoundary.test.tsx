import React from 'react';
import * as Sentry from '@sentry/browser';
import { render } from '@testing-library/react';

import { ErrorBoundary, withErrorBoundary } from './ErrorBoundary';

jest.mock('@sentry/browser');

function MyComponent({ throwError }: { throwError: boolean }) {
  if (throwError) throw new Error('Oops!');
  return <>Hello, World!</>;
}

test('render children if no error', () => {
  const { getByText } = render(
    <ErrorBoundary>
      <MyComponent throwError={false} />
    </ErrorBoundary>
  );
  getByText('Hello, World!');
});

describe('if an error occured', () => {
  let consoleSpy: jest.SpyInstance;
  beforeAll(() => {
    // FIXME https://github.com/bvaughn/react-error-boundary/blob/1.2.4/src/__tests__/ErrorBoundary.test.js#L16-L19
    consoleSpy = jest.spyOn(console, 'error').mockImplementation();
  });
  afterAll(() => {
    consoleSpy.mockRestore();
  });

  test('render message + report button', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <MyComponent throwError={true} />
      </ErrorBoundary>
    );
    getByText('Something went wrong');
    getByText('Error: Oops!');
    getByText('Report feedback');
  });

  test('user clicks on report button', () => {
    (Sentry.captureException as jest.Mock).mockImplementation(
      () => '0ba18e2ea9cf41f8914246ef3d41e7a6'
    );

    const { getByText } = render(
      <ErrorBoundary>
        <MyComponent throwError={true} />
      </ErrorBoundary>
    );

    const button = getByText('Report feedback');
    button.click();
    expect(Sentry.showReportDialog).toHaveBeenCalledWith({
      eventId: '0ba18e2ea9cf41f8914246ef3d41e7a6'
    });
  });
});

describe('withErrorBoundary()', () => {
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

  test('render children if no error', () => {
    const { getByText } = render(<MyComponentWithHOC throwError={false} />);
    getByText('Hello, World!');
  });

  test('render a message if an error occured', () => {
    // FIXME https://github.com/bvaughn/react-error-boundary/blob/1.2.4/src/__tests__/ErrorBoundary.test.js#L16-L19
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const { getByText } = render(<MyComponentWithHOC throwError={true} />);
    getByText('Something went wrong');
    getByText('Error: Oops!');

    consoleSpy.mockRestore();
  });
});
