---
nav:
  title: 开始
  order: 0
group:
  title: 组件
  order: -1
title: Slot 插槽
atomId: Slot, withSlot
description: 基于React实现的插槽
apiHeader:
  pkg: rslot
  defaultImport: false
  docUrl: https://github.com/BastKakrolot/rslot/blob/master/docs/start/index.md
  sourceUrl: https://github.com/BastKakrolot/rslot/blob/master/src/Slot/index.tsx
---

:::warning
`Slot` 只有包裹在使用了 `withSlot` 的高阶组件中里面才能正常使用。
:::

:::info
`withSlot` 生成的组件一级子节点中使用 `slot` 属性才能被正常插入具名插槽中，其他节点会进入 `children` 中实现基础默认插槽。
:::

## Demo

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

## API

### SlotProps 插槽属性

| 名称 | 类型   | 描述         |
| ---- | ------ | ------------ |
| name | string | 具名插槽名称 |

### HOC 高阶组件

| 名称     | 类型                                       | 描述         |
| -------- | ------------------------------------------ | ------------ |
| withSlot | (ElementType) => ForwardRefExoticComponent | 具名插槽名称 |
