import React, {
  ComponentProps,
  ComponentRef,
  forwardRef,
  useContext,
} from 'react';

import withSlot, { SlotElementContext } from './withSlot';

function RSlot(props: ComponentProps<any>, ref: ComponentRef<any>) {
  const { name, ...rest } = props;
  const elementDict: Record<any, any> = useContext(SlotElementContext);
  const targetElement = elementDict[name];
  const { props: targetProps } = targetElement || {};
  const targetChildren = targetProps?.children;
  if (typeof targetChildren === 'function') {
    return React.cloneElement(targetElement, {
      ...targetProps,
      ref,
      children: targetChildren({ ...rest }), // 占位组件 Slot 将Container 内部的状态 通过 render props 传出
    });
  }
  return targetElement
    ? React.cloneElement(targetElement, {
        ...rest,
        ...targetProps,
        ref: targetElement.ref ?? ref,
      })
    : null;
}

const Slot = forwardRef(RSlot);
export { Slot, withSlot };
