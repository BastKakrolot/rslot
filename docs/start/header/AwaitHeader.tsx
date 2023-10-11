import { ChromeOutlined } from '@ant-design/icons';
import { ApiHeader, DumiSiteProvider } from 'dumi-theme-antd-style';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

export default () => (
  <DumiSiteProvider>
    <Flexbox padding={24}>
      <ApiHeader
        title={'Await'}
        pkg={'rslot'}
        componentName={'Await'}
        description={'提取于React-Router V6'}
        serviceList={[
          {
            label: 'Blog',
            icon: <ChromeOutlined />,
            children: 'Blog',
            url: 'https://blackcell.fun',
          },
        ]}
        docUrl={'https://ant.design/components/button-cn'}
        sourceUrl={
          'https://github.com/ant-design/ant-design/blob/master/components/button/index.ts'
        }
      />
    </Flexbox>
  </DumiSiteProvider>
);
