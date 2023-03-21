import{_ as s,c as a,o as n,N as l}from"./chunks/framework.a087d028.js";const p="/assets/react-b1.gif",o="/assets/react-b2.gif",b=JSON.parse('{"title":"React中的&、|、~","description":"","frontmatter":{},"headers":[],"relativePath":"framework/react/16.8.6/q6.md"}'),e={name:"framework/react/16.8.6/q6.md"},t=l(`<h1 id="react中的-、-、" tabindex="-1">React中的&amp;、|、~ <a class="header-anchor" href="#react中的-、-、" aria-label="Permalink to &quot;React中的&amp;、|、~&quot;">​</a></h1><h2 id="运算符" tabindex="-1">“&amp;”运算符 <a class="header-anchor" href="#运算符" aria-label="Permalink to &quot;“&amp;”运算符&quot;">​</a></h2><p>“&amp;”运算符（位与）用于对两个二进制操作数逐位进行比较，并根据下表所示的换算表返回结果。</p><table><thead><tr><th>第一个数的位值</th><th>第二个数的位值</th><th>运算结果</th></tr></thead><tbody><tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>0</td><td>0</td><td>0</td></tr></tbody></table><blockquote><p>在位运算中，数值 1 表示 true，0 表示 false，反之亦然。</p></blockquote><p>12 和 5 进行位与运算，则返回值为 4。</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">//返回值4</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><br>下图以算式的形式解析了 12 和 5 进行位与运算的过程。通过位与运算，只有第 3 位的值为全为 true，故返回 true，其他位均返回 false。</p><p><img src="`+p+`" alt=""></p><h2 id="运算符-1" tabindex="-1">“|”运算符 <a class="header-anchor" href="#运算符-1" aria-label="Permalink to &quot;“|”运算符&quot;">​</a></h2><p>“|”运算符（位或）用于对两个二进制操作数逐位进行比较，并根据如表格所示的换算表返回结果。</p><table><thead><tr><th>第一个数的位值</th><th>第二个数的位值</th><th>运算结果</th></tr></thead><tbody><tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>0</td><td>0</td><td>0</td></tr></tbody></table><p>12 和 5 进行位或运算，则返回值为 13。</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">//返回值13</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>下图以算式的形式解析了 12 和 5 进行位或运算的过程。通过位或运算，除第 2 位的值为 false 外，其他位均返回 true。</p><p><img src="`+o+`" alt=""></p><h2 id="运算符-2" tabindex="-1">“~”运算符 <a class="header-anchor" href="#运算符-2" aria-label="Permalink to &quot;“~”运算符&quot;">​</a></h2><p>“~”运算符（位非）用于对一个二进制操作数逐位进行取反操作。</p><ul><li>第 1 步：把运算数转换为 32 位的二进制整数。</li><li>第 2 步：逐位进行取反操作。</li><li>第 3 步：把二进制反码转换为十进制浮点数。</li></ul><p>非运算的真值表:</p><table><thead><tr><th>a</th><th>NOT a</th></tr></thead><tbody><tr><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td></tr></tbody></table><p><br>对 12 进行位非运算，则返回值为 -13。</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">( </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;"> )</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">//返回值-13</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><br>下图以算式的形式解析了对 12 进行位非运算的过程。</p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">base</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">  = </span><span style="color:#F78C6C;">00000000000000000000000000001100</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">base</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">               </span><span style="color:#FFCB6B;">--------------------------------</span></span>
<span class="line"><span style="color:#89DDFF;">~</span><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">base</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> = </span><span style="color:#F78C6C;">11111111111111111111111111110011</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">base</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> = -</span><span style="color:#F78C6C;">13</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">base</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><br>位非运算实际上就是对数字进行取负运算，再减 1。例如：</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">( </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">12</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">//返回true</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="react中sideeffect的设计" tabindex="-1">React中SideEffect的设计 <a class="header-anchor" href="#react中sideeffect的设计" aria-label="Permalink to &quot;React中SideEffect的设计&quot;">​</a></h2><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Don&#39;t change these two values. They&#39;re used by React Dev Tools.</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> NoEffect </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*              */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b000000000000</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> PerformedWork </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*         */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b000000000001</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// You can change the rest (and add more).</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Placement </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*             */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b000000000010</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 2</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Update </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*                */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b000000000100</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 4</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> PlacementAndUpdate </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*    */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b000000000110</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 6</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Deletion </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*              */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b000000001000</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 8</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> ContentReset </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*          */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b000000010000</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 16</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Callback </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*              */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b000000100000</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 32</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> DidCapture </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*            */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b000001000000</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 63</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Ref </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*                   */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b000010000000</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 128</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Snapshot </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*              */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b000100000000</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 256</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Passive </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*               */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b001000000000</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 512</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Passive &amp; Update &amp; Callback &amp; Ref &amp; Snapshot</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> LifecycleEffectMask </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*   */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b001110100100</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 932</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Union of all host effects</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> HostEffectMask </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*        */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b001111111111</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 1023</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> Incomplete </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*            */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b010000000000</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 1024</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> ShouldCapture </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/*         */</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0b100000000000</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 2048</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>在源码中，随处可见的代码如下</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">workInProgress</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">effectTag </span><span style="color:#89DDFF;">|=</span><span style="color:#A6ACCD;"> PerformedWork</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>一开始 effectTag是NoEffect， 经过 | 运算，变成了0b000000000001,如果再 |</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">workInProgress</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">effectTag </span><span style="color:#89DDFF;">|=</span><span style="color:#A6ACCD;"> Placement</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>经过 | 运算，变成了0b000000000011,</p><p>这样，这个effectTag就具备了 Placement 和 PerformedWork的性质</p><p>比如判断当前是否具有Placement特性</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">workInProgress</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">effectTag </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;"> Placement </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Placement</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>即 0b000000000011 &amp; 0b000000000010 结果是 0b000000000010</p>`,38),c=[t];function r(y,i,C,D,A,F){return n(),a("div",null,c)}const m=s(e,[["render",r]]);export{b as __pageData,m as default};
