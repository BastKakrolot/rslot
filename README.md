<div align="center">

<h1>rslot</h1>

一款为配合 React 构建清晰的 UI 结构的库

<!-- SHIELD GROUP -->

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] [![install size][npm-size]][npm-size-url]

[![ docs by dumi][dumi-url]](https://d.umijs.org/) [![Build With father][father-url]](https://github.com/umijs/father/)

<!-- umi url -->

[dumi-url]: https://img.shields.io/badge/docs%20by-dumi-blue
[father-url]: https://img.shields.io/badge/build%20with-father-028fe4.svg

<!-- npm url -->

[npm-image]: https://img.shields.io/npm/v/rslot.svg?style=flat-square&color=deepgreen&label=latest
[npm-url]: https://npmjs.org/package/rslot
[npm-size]: https://img.shields.io/bundlephobia/minzip/rslot?color=deepgreen&label=gizpped%20size&style=flat-square
[npm-size-url]: https://packagephobia.com/result?p=rslot

<!-- Github CI -->

[download-image]: https://img.shields.io/npm/dm/rslot.svg?style=flat-square
[download-url]: https://npmjs.org/package/rslot

</div>

## Usage

### Slot & withSlot

```jsx
import { Slot, withSlot } from 'rslot';

const Template = withSlot((props) => {
  return (
    <div>
      <h1>变身</h1>
      <Slot name="header" />
      <Slot name="content" />
      <Slot name="footer" />
    </div>
  );
});

export default () => {
  return (
    <Template>
      <h3 slot="content">我来组成身体</h3>
      <h2 slot="header">我来组成头部</h2>
      <h4 slot="footer">我来组成脚部</h4>
    </Template>
  );
};
```

### Await

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

### 其他插件

#### 未完待续..

## Options

- [x] 默认插槽
- [x] 具名插槽
- [x] 作用域插槽
- [ ] .....

## LICENSE

MIT
