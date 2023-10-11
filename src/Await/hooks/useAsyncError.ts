import React from 'react';
import AwaitContext from '../context';

/**
 * Returns the error from the nearest ancestor <Await /> value
 * 获取error信息
 */
const useAsyncError = () => {
  const value = React.useContext(AwaitContext);
  return value?._error;
};

export default useAsyncError;
