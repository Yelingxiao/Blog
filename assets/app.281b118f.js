import{x as u,a1 as s,d as c,I as r,a2 as l,u as d,h as f,l as m,a3 as g,a4 as h,a5 as A,a6 as b,a7 as v,a8 as y,a9 as P,aa as w,ab as _,ac as C,ad as x,ae as R,af as E}from"./chunks/framework.a087d028.js";import{t as i}from"./chunks/theme.cca34f0b.js";const D={extends:i,Layout:()=>{const e={},t=u("img",{src:"https://visitor-badge.laobi.icu/badge?page_id=powerjett.github.io&left_text= 阅 读 ",style:"margin-left: 8px;"});return s(i.Layout,e,{"nav-bar-title-after":()=>s(t)})}};function p(e){if(e.extends){const t=p(e.extends);return{...t,...e,async enhanceApp(a){t.enhanceApp&&await t.enhanceApp(a),e.enhanceApp&&await e.enhanceApp(a)}}}return e}const n=p(D),L=c({name:"VitePressApp",setup(){const{site:e}=d();return f(()=>{m(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),g(),h(),A(),n.setup&&n.setup(),()=>s(n.Layout)}});async function T(){const e=j(),t=V();t.provide(b,e);const a=v(e.route);return t.provide(y,a),t.component("Content",P),t.component("ClientOnly",w),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),n.enhanceApp&&await n.enhanceApp({app:t,router:e,siteData:_}),{app:t,router:e,data:a}}function V(){return C(L)}function j(){let e=r,t;return x(a=>{let o=R(a);return e&&(t=o),(e||t===o)&&(o=o.replace(/\.js$/,".lean.js")),r&&(e=!1),E(()=>import(o),[])},n.NotFound)}r&&T().then(({app:e,router:t,data:a})=>{t.go().then(()=>{l(t.route,a.site),e.mount("#app")})});export{T as createApp};
