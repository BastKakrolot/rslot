import { defineConfig } from 'dumi';
// @ts-ignore
import { version } from './package.json';
export default defineConfig({
  outputPath: 'docs-dist',
  define: {
    'process.env.DUMI_VERSION': version,
  },
  themeConfig: {
    name: 'rslot',
    rtl: true,
    socialLinks: {
      github: 'https://github.com/BastKakrolot/rslot',
    },
    footerConfig: {
      columns: [],
      copyright: `Open-source MIT Licensed | Copyright © 2023-present`,
      bottom: 'Powered by self',
    },
  },
});
