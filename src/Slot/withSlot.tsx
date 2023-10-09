import React, {createContext, useMemo} from 'react';

export const SlotElementContext = createContext({});

// NOTE: 收集插槽子元素，并注入到「SlotElementContext」当中，供「Slot」组件消费
const withSlot = (CustomComponent) => (props) => {
  const {children: originChildren} = props;
  // 未使用插槽功能的子element

  // 转换为数组，每个元素上均会带一个key属性
  const [slotElementDic, restChildren, slotList] = useMemo(() => {
    const [restChildren, slotList] = [[], []];
    const slotElementDic = React.Children.toArray(originChildren)
      .filter((childElement) => {
        const {props: elementProps} = childElement;
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
          [slotElement.props.slot]: slotElement,
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
