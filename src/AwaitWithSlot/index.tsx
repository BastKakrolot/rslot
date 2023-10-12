import React from 'react';
import { Await } from '../Await';
import { Slot, withSlot } from '../Slot';

const AwaitWithSlot = withSlot((props) => {
  return (
    <Await
      errorElement={<Slot name={'errorElement'} />}
      fallback={<Slot name={'fallback'} />}
      resolve={props.resolve}
    >
      <Slot name={'successElement'} />
    </Await>
  );
});

export default AwaitWithSlot;
