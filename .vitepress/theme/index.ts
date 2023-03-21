import {h, createElementVNode} from 'vue'
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  Layout: () => {
    const props: Record<string, any> = {}
    const ImageVNode = createElementVNode(
      'img',
      {
        src: 'https://visitor-badge.laobi.icu/badge?page_id=powerjett.github.io&left_text= 阅 读 ',
        style: 'margin-left: 8px;'
      }
    )
    return h(DefaultTheme.Layout, props, {
      'nav-bar-title-after': () => h(ImageVNode)
    })
  }
}
