import React from 'react';
import AwaitContext from '../context';
/**
 * Returns the error from the nearest ancestor <Await /> value
 * 获取success值
 */
const useAsyncValue = () => {
  const value = React.useContext(AwaitContext);
  return value?._data;
};

export default useAsyncValue;
