---
nav:
  title: 开始
  order: 0
group:
  title: 示例
---

# Slot

```jsx
import { Slot, withSlot } from 'rslot';

const Template = withSlot((props) => {
  return (
    <div>
      <div>header</div>
      <Slot name="header" />
      <Slot name="content" />
      <Slot name="footer" />
    </div>
  );
});

export default () => {
  return (
    <div>
      <Template>
        <h1 slot="header">header</h1>
        <h2 slot="content">content</h2>
        <h3 slot="footer">footer</h3>
      </Template>
    </div>
  );
};
```
