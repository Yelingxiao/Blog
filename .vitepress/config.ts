import {defineConfig} from 'vitepress'
import nav from './nav'
import sidebar from './sidebar'

const year = new Date().getFullYear()

export default defineConfig({
  title: 'Ylx',
  titleTemplate: '个人技术博客',
  cleanUrls: true,
  srcDir: './src',
  cacheDir: './.cache',
  outDir: './dist',
  lang: 'zh-CN',
  base: '/blog/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outline: {
      level: 'deep',
      label: '目录'
    },
    lastUpdatedText: '上次更新',
    returnToTopLabel: '返回顶部',
    i18nRouting: false,
    logo: '/assets/logo.svg',
    socialLinks: [
      {icon: 'github', link: 'https://github.com/Yelingxiao'}
    ],
    footer: {
      message: '备案号: 浙ICP备2023000081号',
      copyright: `Copyright © ${year}-present Ylx`
    },
    nav,
    sidebar
  }
})
