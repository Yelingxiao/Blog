import {DefaultTheme} from "vitepress"

const sidebar: DefaultTheme.Sidebar = {
  '/web/': [
    {
      text: 'js',
      items: [
        {text: 'script标签defer和async的区别', link: '/web/js/q1'},
      ]
    },
    {
      text: 'html',
      items: [
        {text: '问题1', link: '/web/html/q1'},
      ]
    },
    {
      text: 'css',
      items: [
        {text: '问题1', link: '/web/css/q1'},
      ]
    }
  ],
  '/framework/react/': [
    {
      text: 'react-16.8.6',
      items: [
        {text: 'React中的数据结构', link: '/framework/react/16.8.6/q1'},
        {text: 'ReactDOM.render', link: '/framework/react/16.8.6/q2'},
        {text: 'Component & PureComponent', link: '/framework/react/16.8.6/q3'},
        {text: 'expirationTime 计算', link: '/framework/react/16.8.6/q4'},
        {text: 'expirationTime 的作用', link: '/framework/react/16.8.6/q5'},
        {text: 'React中的&、|、~', link: '/framework/react/16.8.6/q6'},
        {text: '调度相关的全局变量', link: '/framework/react/16.8.6/q7'},
        {text: 'updateContainer', link: '/framework/react/16.8.6/q8'},
        {text: 'scheduleWork', link: '/framework/react/16.8.6/q9'},
        {text: 'React实现的requestIdeaCallback', link: '/framework/react/16.8.6/q10'},
        {text: 'performWork', link: '/framework/react/16.8.6/q11'},
        {
          text: 'renderRoot(渲染阶段)',
          link: '/framework/react/16.8.6/q12',
          items: [
            {text: 'updateMemoComponent', link: '/framework/react/16.8.6/q12-1'},
            {text: 'updateMode', link: '/framework/react/16.8.6/q12-2'},
            {text: 'updateForwardRef', link: '/framework/react/16.8.6/q12-3'},
            {text: 'updatePortalComponent', link: '/framework/react/16.8.6/q12-4'},
            {text: 'updateHostComponent', link: '/framework/react/16.8.6/q12-5'},
            {text: 'updateHostRoot', link: '/framework/react/16.8.6/q12-6'},
            {text: 'updateFunctionComponent', link: '/framework/react/16.8.6/q12-7'},
            {text: 'mountIndeterminateComponent', link: '/framework/react/16.8.6/q12-8'},
            {text: 'updateClassComponent', link: '/framework/react/16.8.6/q12-9'},
            {text: 'reconcileChildren', link: '/framework/react/16.8.6/q12-10'},
            {text: 'renderRoot中对于错误的处理', link: '/framework/react/16.8.6/q12-11'}
          ]
        },
        {text: 'completeWork', link: '/framework/react/16.8.6/q13'},
        {
          text: 'completeRoot(提交阶段)',
          link: '/framework/react/16.8.6/q14',
          items: [
            {text: 'commitBeforeMutationLifecycles', link: '/framework/react/16.8.6/q14-1',},
            {
              text: 'commitAllHostEffects',
              link: '/framework/react/16.8.6/q14-2',
              items: [
                {text: 'commitPlacement 插入', link: '/framework/react/16.8.6/q14-2-1'},
                {text: 'commitWork 更新', link: '/framework/react/16.8.6/q14-2-2'},
                {text: 'Deletion 删除', link: '/framework/react/16.8.6/q14-2-3'},
              ]
            },
            {text: 'commitAllLifeCycles', link: '/framework/react/16.8.6/q14-3',}
          ]
        },
        {
          text: 'React事件系统',
          link: '/framework/react/16.8.6/q15',
          items: [
            {text: '注入平台事件插件', link: '/framework/react/16.8.6/q15-1',},
            {text: 'event事件监听的过程', link: '/framework/react/16.8.6/q15-2',},
            {text: 'event事件对象的生产过程', link: '/framework/react/16.8.6/q15-3',},
            {text: 'event事件触发的过程', link: '/framework/react/16.8.6/q15-4',}
          ]
        },
        {
          text: 'Hooks',
          link: '/framework/react/16.8.6/q16',
          items: [
            {text: 'hook对象', link: '/framework/react/16.8.6/q16-1',},
            {text: 'renderWithHooks', link: '/framework/react/16.8.6/q16-2',},
            {text: 'useReducer && useState', link: '/framework/react/16.8.6/q16-3',},
            {text: 'useCallback', link: '/framework/react/16.8.6/q16-4',},
            {text: 'dispatchAction', link: '/framework/react/16.8.6/q16-5',},
            {text: 'useLayoutEffect && useEffect', link: '/framework/react/16.8.6/q16-6',},
            {text: 'useMemo', link: '/framework/react/16.8.6/q16-7',},
            {text: 'useRef', link: '/framework/react/16.8.6/q16-8',},
            {text: 'useContext', link: '/framework/react/16.8.6/q16-9',},
            {text: 'useImperativeHandle', link: '/framework/react/16.8.6/q16-10',}
          ]
        }
      ]
    },
    {
      text: 'react-18',
      items: [
        {text: '新特性', link: '/framework/react/18/q1'}
      ]
    }
  ],
  '/buildtools/webpack/': [
    {
      text: 'Webpack',
      items: [
        {text: '问题1', link: '/buildtools/webpack/q1'},
        {text: '问题2', link: '/buildtools/webpack/q2'}
      ]
    }
  ],
  '/buildtools/vite/': [
    {
      text: 'Vite',
      items: [
        {text: '问题1', link: '/buildtools/vite/q1'},
        {text: '问题2', link: '/buildtools/vite/q2'}
      ]
    }
  ],
}

export default sidebar
