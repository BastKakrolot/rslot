---
nav: 开始
group: 组件
title: AwaitWithSlot
atomId: AwaitWithSlot
description: 基于Await与Slot
apiHeader:
  pkg: rslot
  defaultImport: false
  docUrl: https://github.com/BastKakrolot/rslot/blob/master/docs/start/AwaitWithSlot.md
  sourceUrl: https://github.com/BastKakrolot/rslot/blob/master/src/AwaitWithSlot/index.tsx
---

## Demo

```jsx
import React, { useMemo } from 'react';
import { Button } from 'antd';
import { useBoolean } from 'ahooks';
import { AwaitWithSlot, useAsyncError, useAsyncValue } from 'rslot';

const getPromise = (bool) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      bool ? resolve('success') : reject('error');
    }, 2000);
  });

const Error = () => {
  const error = useAsyncError();
  return <span>{error}</span>;
};

const Success = () => {
  const value = useAsyncValue();
  return <span>{value}</span>;
};

export default function Demo() {
  const [bool, { toggle }] = useBoolean(true);
  const promise = useMemo(() => getPromise(bool), [bool]);
  return (
    <>
      <Button onClick={toggle}>toggle</Button>
      <div>status: {String(bool)}</div>
      <div>
        <span>render: </span>
        <AwaitWithSlot resolve={promise}>
          <span slot="fallback">loading</span>
          <Error slot="errorElement" />
          <Success slot="successElement" />
        </AwaitWithSlot>
      </div>
    </>
  );
}
```
