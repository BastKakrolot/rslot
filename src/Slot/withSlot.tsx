import React, {
  ComponentProps,
  createContext,
  FunctionComponent,
  useMemo,
} from 'react';

export const SlotElementContext = createContext({});

// NOTE: 收集插槽子元素，并注入到「SlotElementContext」当中，供「Slot」组件消费
const withSlot =
  (CustomComponent: FunctionComponent) => (props: ComponentProps<any>) => {
    const { children: originChildren } = props;
    // 未使用插槽功能的子element

    // 转换为数组，每个元素上均会带一个key属性
    const [slotElementDic, restChildren, slotList] = useMemo(() => {
      const restChildren: any[] = [];
      const slotList: any[] = [];
      const slotElementDic = React.Children.toArray(originChildren)
        .filter((childElement) => {
          // @ts-ignore
          const { props: elementProps } = childElement;
          if (!elementProps?.slot) {
            restChildren.push(childElement);
          } else {
            slotList.push(elementProps?.slot);
          }

          return elementProps?.slot;
        })
        .reduce(
          (acc, slotElement) => ({
            ...acc,
            // @ts-ignore
            [slotElement?.props.slot]: slotElement,
          }),
          {},
        );
      return [slotElementDic, restChildren, slotList];
    }, [originChildren]);

    return (
      <SlotElementContext.Provider value={slotElementDic}>
        <CustomComponent {...props} slotList={slotList}>
          {restChildren}
        </CustomComponent>
      </SlotElementContext.Provider>
    );
  };

export default withSlot;
