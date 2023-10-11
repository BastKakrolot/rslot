---
nav: 开始
group: 组件
title: Await
atomId: Await
description: 提取于React-Router V6
apiHeader:
  pkg: rslot
  defaultImport: false
  docUrl: https://github.com/BastKakrolot/rslot/blob/master/docs/start/Await.md
  sourceUrl: https://github.com/BastKakrolot/rslot/blob/master/src/Await/index.tsx
---

## Demo

```jsx
import React, { useMemo } from 'react';
import { Button } from 'antd';
import { useBoolean } from 'ahooks';
import { Await } from 'rslot';

const getPromise = (bool) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      bool ? resolve('success') : reject('error');
    }, 2000);
  });

export default function Demo() {
  const [bool, { toggle }] = useBoolean(true);
  const promise = useMemo(() => getPromise(bool), [bool]);
  return (
    <>
      <Button onClick={toggle}>toggle</Button>
      <div>status: {String(bool)}</div>
      <div>
        <span>render: </span>
        <Await
          resolve={promise}
          fallback={<span>loading</span>}
          errorElement={(error) => <span>{error}</span>}
        >
          {(value) => <span>{value}</span>}
        </Await>
      </div>
    </>
  );
}
```

## 参考

[React-Router](https://github.com/remix-run/react-router/tree/main/packages/react-router)

[掘金](https://juejin.cn/post/7268187099525349431#heading-17)
