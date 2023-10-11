import { createContext } from 'react';

/**
 * Await上下文用于存promise
 * @type {React.Context<undefined>}
 */

interface AwaitContextProps {
  _data?: any;
  _error?: ErrorEvent;
}

const AwaitContext = createContext<AwaitContextProps>({});

export default AwaitContext;
