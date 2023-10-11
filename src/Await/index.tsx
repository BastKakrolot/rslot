import React, { ErrorInfo, PropsWithChildren, Suspense } from 'react';
import AwaitContext from './context';
import { useAsyncError, useAsyncValue } from './hooks';

export interface TrackedPromise extends Promise<any> {
  _tracked?: boolean;
  _data?: any;
  _error?: any;
}
/**
 * promise状态
 */
enum AwaitRenderStatus {
  pending,
  success,
  error,
}

/**
 * promise成功
 */
const ResolveAwait = (props: PropsWithChildren<any>) => {
  const { children } = props;
  const data = useAsyncValue();
  return typeof children === 'function' ? children(data) : children;
};

/**
 * promise失败
 */
const RejectAwait = (props: PropsWithChildren<any>) => {
  const { children } = props;
  const error = useAsyncError();
  return typeof children === 'function' ? children(error) : children;
};

type AwaitErrorBoundaryProps<P = unknown> = React.PropsWithChildren<
  P & {
    errorElement: React.ReactNode;
    resolve: TrackedPromise | any;
  }
>;

type AwaitErrorBoundaryState = {
  error: any;
};

/**
 * 捕获Promise异常组件
 * @link https://github.com/remix-run/react-router/tree/main/packages/react-router
 */
class AwaitErrorBoundary extends React.Component<
  AwaitErrorBoundaryProps,
  AwaitErrorBoundaryState
> {
  constructor(props: PropsWithChildren<AwaitErrorBoundaryProps>) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      '<Await> caught the following error during render',
      error,
      errorInfo,
    );
  }

  render() {
    const { children, errorElement, resolve } = this.props;
    let promise: TrackedPromise | null = null;
    let status;
    if (!(resolve instanceof Promise)) {
      // Didn't get a promise - provide as a resolved promise
      status = AwaitRenderStatus.success;
      promise = Promise.resolve();
      Object.defineProperty(promise, '_tracked', { get: () => true });
      Object.defineProperty(promise, '_data', { get: () => resolve });
    } else if (this.state.error) {
      // Caught a render error, provide it as a rejected promise
      status = AwaitRenderStatus.error;
      const renderError = this.state.error;
      promise = Promise.reject().catch(() => {}); // Avoid unhandled rejection warnings
      Object.defineProperty(promise, '_tracked', { get: () => true });
      Object.defineProperty(promise, '_error', { get: () => renderError });
    } else if ((resolve as TrackedPromise)._tracked) {
      // Already tracked promise - check contents
      promise = resolve;
      status =
        // eslint-disable-next-line no-nested-ternary
        promise._error !== undefined
          ? AwaitRenderStatus.error
          : promise._data !== undefined
          ? AwaitRenderStatus.success
          : AwaitRenderStatus.pending;
    } else {
      // Raw (untracked) promise - track it
      status = AwaitRenderStatus.pending;
      Object.defineProperty(resolve, '_tracked', { get: () => true });
      promise = resolve.then(
        (data) => Object.defineProperty(resolve, '_data', { get: () => data }),
        (error) =>
          Object.defineProperty(resolve, '_error', { get: () => error }),
      );
    }

    if (status === AwaitRenderStatus.error && !errorElement) {
      // No errorElement, throw to the nearest route-level error boundary
      throw promise._error;
    }

    if (status === AwaitRenderStatus.error) {
      // Render via our errorElement
      return (
        <AwaitContext.Provider value={promise}>
          <RejectAwait>{errorElement}</RejectAwait>
        </AwaitContext.Provider>
      );
    }

    if (status === AwaitRenderStatus.success) {
      // Render children with resolved value
      return (
        <AwaitContext.Provider value={promise}>
          {children}
        </AwaitContext.Provider>
      );
    }

    // Throw to the suspense boundary
    throw promise;
  }
}

/**
 * promise完成
 */
const AwaitFulfilled = ({
  resolve,
  children,
  errorElement,
}: AwaitErrorBoundaryProps) => (
  <AwaitErrorBoundary resolve={resolve} errorElement={errorElement}>
    <ResolveAwait>{children}</ResolveAwait>
  </AwaitErrorBoundary>
);

/**
 * Await组件
 */
const Await = ({
  resolve,
  children,
  errorElement,
  fallback,
}: AwaitErrorBoundaryProps<{ fallback: React.ReactNode }>) => (
  <Suspense fallback={fallback}>
    <AwaitFulfilled {...{ resolve, children, errorElement }} />
  </Suspense>
);

export { Await, useAsyncError, useAsyncValue };
