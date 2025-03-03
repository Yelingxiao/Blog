import {DefaultTheme} from "vitepress"

const nav: DefaultTheme.NavItem[] = [
  {text: '导航', link: '/guide'},
  {text: '前端基础', link: '/web/js/q1'},
  {
    text: '前端框架',
    items: [
      {
        text: 'React.js',
        link: '/framework/react/16.8.6/q1',
      }
    ]
  },
  {
    text: '构建工具',
    items: [
      {
        text: 'Webpack',
        link: '/buildtools/webpack/q1'
      },
      {
        text: 'Vite',
        link: '/buildtools/vite/q1'
      }
    ]
  },
  {text: 'Node.js', link: '/node/node'},
  {text: '计算机基础', items: [
    {
      text: '浏览器工作原理与实践',
      link: '/computer/chrome/q1'
    },
    {
      text: '数据结构与算法',
      link: '/computer/algorithms/01'
    }
  ]},
  {text: '踩坑记录', link: '/record/record'}
]

export default nav
