(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{285:function(e,t,o){"use strict";o.r(t),t.default=[{title:"测试 Markdown",path:"/posts/test-markdown.html",strippedContent:" 常用 Markdown 语法测试。  \x3c!-- more --\x3e  ### 1. 斜体和粗体  使用 \\* 和 \\*\\* 表示斜体和粗体。  示例：  这是 _斜体_，这是 **粗体**。  ### 2. 分级标题  使用 === 表示一级标题，使用 --- 表示二级标题。  示例：  ``` 这是一个一级标题 ============================  这是一个二级标题 --------------------------------------------------  ### 这是一个三级标题 ```  你也可以选择在行首加井号表示不同级别的标题 (H1-H6)，例如：# H1, ## H2, ### H3，#### H4。  ### 3. 外链接  使用 \\[描述](链接地址) 为文字增加外链接。  示例：  这是去往 [本人博客](/) 的链接。  ### 4. 无序列表  使用 \\*，+，- 表示无序列表。  示例：  * 无序列表项 一 * 无序列表项 二 * 无序列表项 三  ### 5. 有序列表  使用数字和点表示有序列表。  示例：  1.  有序列表项 一 2.  有序列表项 二 3.  有序列表项 三  ### 6. 文字引用  使用 > 表示文字引用。  示例：  > 野火烧不尽，春风吹又生。  ### 7. 行内代码块  使用 \\`代码` 表示行内代码块。  示例：  让我们聊聊 `html`。  ### 8. 代码块  使用 四个缩进空格 表示代码块。  示例：      这是一个代码块，此行左侧有四个不可见的空格。  ```js{4} export default {   data () {     return {       msg: 'Highlighted!'     }   } } ```  ### 9. 插入图像  使用 \\!\\[描述](图片链接地址) 插入图像。  示例：   ### 10. 删除线  使用 ~~ 表示删除线。  ~~这是一段错误的文本。~~  ### 11. 表格  | 项目   |   价格 | 数量 | | ------ | -----: | :--: | | 计算机 | \\$1600 |  5   | | 手机   |   \\$12 |  12  | | 管线   |    \\$1 | 234  |  ### 12. 自定义容器  **Input**  ``` ::: tip 提示 This is a tip :::  ::: warning 注意 This is a warning :::  ::: danger 警告 This is a dangerous warning ::: ```  **Output**  ::: tip 提示 This is a tip :::  ::: warning 注意 This is a warning :::  ::: danger 警告 This is a dangerous warning ::: "},{title:"Vue最佳实践",path:"/posts/vue-best-practices.html",strippedContent:" > 记录我在使用 Vue 中发现的一些好的代码实践，希望能够保持更新。🤠  \x3c!-- more --\x3e  ## this 引用  在组件作用域内使用箭头函数可以保证 `this` 永远指向组件本身。  ```js // bad export default {   data() {     return {       msg: 'hello'     }   },   methods: {     hello() {       setTimeout(function() {         console.log(this.msg) // this 指向 window       })     }   } } ```  ```js // good export default {   data() {     return {       msg: 'hello'     }   },   methods: {     hello() {       setTimeout(() => {         console.log(this.msg) // this 指向组件       })     }   } } ```  ## 属性绑定  绑定字符串不需要加冒号。  ```html \x3c!-- bad --\x3e <component :str=\"'hello'\"></component>  \x3c!-- good --\x3e <component str=\"hello\"></component> ```  布尔属性省略值时默认为 `true`。  ```html <my-modal visible></my-modal> \x3c!--等价于--\x3e \x3c!--<my-modal :visible=\"true\"></my-modal>--\x3e ```  绑定无参函数不需要加括号。  ```html \x3c!-- bad，括号多余 --\x3e <button @click=\"onClick()\"></button>  \x3c!-- good，隐式传递了 event 对象 --\x3e <button @click=\"onClick\"></button> ```  只有一行代码的事件函数，可以直接写标签上。  ```html <button @click=\"visible = true\"></button> ```  ## 双向绑定  表单组件一般都支持双向绑定，实际场景中表单组件值发生变化往往要在 `POST or PUT` 请求之后。如果直接在 `v-model` 绑定原始值往往会打破单向数据流。  使用计算属性的 `get/set` 方式可以解决这个问题。（也适用 `.sync`）  ```js export default {   template: `         <div>             <input type=\"radio\" v-model=\"nameVal\" value=\"1\">             <input type=\"radio\" v-model=\"nameVal\" value=\"2\">         </div>`,   data() {     return {       name: ''     }   },   computed: {     nameVal: {       get() {         return this.name       },       set(val) {         this.edit(val)       }     }   },   methods: {     edit(name) {       this.$http.put('/name', { name }).then(data => {         this.name = name       })     }   },   created() {     this.$http.get('/name').then(data => {       this.name = data.name     })   } } ```  ## 释放资源  善用 `destory` 释放原生事件、第三方组件、全局事件总线等。  ```js import bus from 'event-bus' import plugin from 'plugin'  export default {   // ...   created() {     bus.$on('hello', this.hello) // 注册全局事件     window.addEventListener('resize', this.onResize) // DOM 事件     plugin.init() // 第三方组件初始化   },   destoryed() {     bus.$off('hello', this.hello)     window.removeEventListener('resize', this.onResize)     plugin.destory()   } } ```  ## 修饰符  Vue 内置了许多常用修饰符可以让你少写几行代码，提高开发效率。  ```html \x3c!-- 输入字符串转数字 --\x3e <input type=\"text\" v-model.number=\"value\">  \x3c!-- 输入字符串去前后空格 --\x3e <input type=\"text\" v-model.trim=\"value\">  \x3c!-- 监听鼠标按键，支持 left, right, middle --\x3e <button @click.left=\"onLeftClick\">点击鼠标左键</button> <button @click.right=\"onRightClick\">点击鼠标右键</button>  \x3c!-- 停止冒泡，阻止默认行为 --\x3e <button @click.stop.prevent=\"doThis\"></button>  \x3c!-- 键盘按下确认键，支持 keycode 和键别名 --\x3e <input @keyup.13=\"onEnter\">  \x3c!-- 只执行一次事件 --\x3e <button @click.once=\"doThis\"></button>  \x3c!-- 监听原生事件 --\x3e <el-button @click.native=\"doThis\"></el-button> ```  以上是一些常用的修饰符，更多用法可以去文档上找找。  ## 数据请求  切换路由请求数据时，一般都需要兼容两种视图打开方式：路由跳转和直接 URL 输入。  ```js export default {     watch: {         $route() {             this.fetchData()         },     },     methods() {         fetchData() {             // 避免重复请求             if(this.isLoading) return             this.isLoading = true             // 请求数据             // ajax...         }     },     created() {         this.fetchData()     } } ```  路由跳转会触发 `watch -> $route`，如果是未创建的组件还会触发 `create`，直接 URL 只会触发 `created` 钩子。一般在两个位置都执行数据请求，再通过判断避免重复请求，还可以利用 `isLoading` 标记做加载动画。如果使用了 `keep-alive` 组件，还需要考虑 `activated` 钩子。  ## 减少嵌套层级  组件即使未在 `props` 声明，也可以传递一些原生 DOM 属性。  ```html \x3c!-- bad --\x3e <div class=\"content-view\">     <router-view></router-view> </div>  \x3c!-- good --\x3e <router-view class=\"content-view\"></router-view> ```  命名插槽中需要放置多个块时，可以利用 `template` 组件。  ```html \x3c!-- bad --\x3e <my-component>     <div slot=\"hello\">         <div class=\"block1\"></div>         <div class=\"block2\"></div>     </div> </my-component>  \x3c!-- good --\x3e <my-component>     <template slot=\"hello\">         <div class=\"block1\"></div>         <div class=\"block2\"></div>     </template> </my-component> ```  不管是内置组件还是自己的组件，有时候不需要多一层包裹去添加样式，反而因此增加了嵌套层级。  ## 过滤器  过滤器的最佳应用场景应该是值的转换，比如：`Date` 类型日期转字符串、货币、字符截断、markdown 等等。  ```js // 按长度截断文字，补...，中文 = 2 const cnReg = /[\\u4e00-\\u9fa5]/ Vue.filter('ellipsis', (str, len = 10) => {   let i = 0   let j = 0   let ret = ''   const text = String(str).trim()   const max = text.length   while (j < max && i < len) {     const c = text.charAt(j)     ret += c     j += 1     i = cnReg.test(c) ? i + 2 : i + 1   }   return ret === text ? text : `${ret}...` })  // 日期转相对时间 Vue.filter('calendar', value => moment(value).calendar()) ```  也可以作一些业务数据区别展示。  ```js Vue.filter('userRole', value => ['创建者', '管理员', '成员'][value]) ```  ## Props  * 布尔属性默认值为 `false` 可以省略 * 数组最好声明默认值 `[]`，保证数据请求成功前模版里的 `v-for` 不会出错 * 对象也需要注意是否声明了默认值 `{}`，避免模版中使用 `obj.xx` 报错  ```js {     props: {         visible: Boolen, // 默认即为 false         data: Array,     // 需要进行非空判断         data2: {         // 可安全使用 v-for             type: Array,             default: []         },         obj: Object,     // 需要进行非空判断         obj2: {          // 可安全使用 obj.xx             type: Object,             default() {                 return {}             }         }     } } ```  ## v-if  如果模版中绑定了 `obj.xx` 时，需要注意 `obj` 是否是异步数据，默认值是否为 `null`。安全起见，可在组件最外层加 `v-if` 判断。  ```html <template>     <div v-if=\"!!obj\">         <p>{{obj.name}}</p>         <p>{{obj.age}}</p>     </div> </template> <script> export default {     data() {         return {             obj: null         }     } } <\/script> ```  ## 路由  对于经常发生变化的一级、二级菜单导航，可以和路由数据结合起来，按模块划分，视图直接引用对应模块的路由数据来生成导航，减少维护成本。  ```js // routes.js export const settingRoutes = [] export const userRoutes = []  export default [...settingRoutes, ...userRoutes] ```  菜单组件中：  ```html <template>     <ul>         <li v-for=\"item in menus\" :key=\"item.name\">             <router-link :to=\"item\">{{item.text}}</router-link>         </li>     </ul> </template> <script> import { settingRoutes } from '../routes'  export default {     data() {         menus: settingRoutes     } } <\/script> ```  ## 继承和混合  用过`ElementUI`的同学，都知道其 [Dialog 组件](http://element-cn.eleme.io/#/zh-CN/component/dialog) 是不支持垂直居中，只提供了一个`top`属性用于设置组件内容节点到顶部的距离。早期 [1.x](http://element-cn.eleme.io/1.4/#/zh-CN/component/dialog) 版本时 Dialog 组件也不支持`append-to-body`。我们可以通过继承和混合来扩展这些需要的特性。  ```js // dialogEx.js import { Dialog } from 'element-ui'  export default {   name: 'ElDialogEx',   extends: Dialog,   props: {     appendToBody: {       // 把组件插入 body 下       type: Boolean,       default: true     },     center: Boolean // 设置垂直居中   },   computed: {     sizeClass() {       // 这个 sizeClass 计算属性是组件源码里就有的，这里是利用了类名支持字符串拼接的特性，在这个函数里增加了垂直居中的自定义类拼接       return `el-dialog--${this.size}` + this.center ? ' dialog-center ' : ''     }   },   mounted() {     if (this.appendToBody) document.body.appendChild(this.$el)   },   beforeDestroy() {     if (this.appendToBody) this.$el.parentNode.remove(this.$el)   } } ```  之后你又发现，在其他的一些组件中也需要`appendToBody`这个特性，那么就可以把相关的代码写成`mixins`。  ```js // appendToBody.js export default {   props: {     appendToBody: {       // 把组件插入 body 下       type: Boolean,       default: true     }   },   mounted() {     if (this.appendToBody) document.body.appendChild(this.$el)   },   beforeDestroy() {     if (this.appendToBody) this.$el.parentNode.remove(this.$el)   } } ```  现在`dialogEx`组件可以写的更简单。  ```js // dialogEx.js import { Dialog } from 'element-ui' import appendToBody from 'mixins/appendToBody'  export default {   name: 'ElDialogEx',   extends: Dialog,   mixins: [appendToBody],   props: {     center: Boolean // 设置垂直居中   },   computed: {     sizeClass() {       // 这个 sizeClass 计算属性是组件源码里就有的，这里是利用了类名支持字符串拼接的特性，在这个函数里增加了垂直居中的自定义类拼接       return `el-dialog--${this.size}` + this.center ? ' dialog-center ' : ''     }   } } ```  ## 第三方库的集成  第三方库一般是传统的基于 DOM 和原生 js。它们虽然写起来没有使用任何的代码模版，但出于作者的编程经验其实都符合了大众使用预期。  任何一个库一般都会提供以下的接口：  * 使用自定义配置初始化 * 可访问的属性 * 可调用的功能函数 * 事件绑定 * 良好的生命周期钩子  > 如果没有足够的编程经验用原生 js 去写一个插件可能最后就是一团乱麻。这也是 Vue 等众多前端框架的作用，它们约束了一个模块的代码模版，提供了事件管理、生命周期运行、属性和函数的定义，使即使经验不足的人也能写出一个看得过去的模块。  把第三方库转换为一个 Vue 组件，其实就是把这个库的接口挂到 Vue 组件对应的组件选项上去。  ```js import Lib from 'lib'  export default {   props: {     options: Object   },   data() {     return {       instance: null     }   },   methods: {     doSomething(xxx) {       // lib 的操作函数       // 外部使用 $refs 调用       this.instance.doSomething(xxx)     }   },   computed: {     libProp() {       // lib 的可访问属性使用计算属性访问       // 外部使用 $refs 调用       return this.instance.prop     }   },   watch: {     options(val) {       // 监听配置更新，调用 lib 接口更新配置       if (val) this.instance.updateOptions(val)     }   },   mounted() {     // mounted 或者 created 对应 lib 实例化并传入自定义配置     this.instance = new Lib(this.$el, this.options)     // lib 内的事件 $emit 出去，外部监听     this.instance.on('update', (...args) => {       this.$emit('update', ...args)     })   },   destroyed() {     // lib 如果提供了 destroy 等销毁资源的函数一般都会对其内部的 DOM 事件解绑     this.instance.destroy()   } } ```  也可能你想把一个库变为一个 Vue 指令。  ```js import Lib from 'lib'  export default {   install(Vue, option = {}) {     // 存放全局配置     const defaults = option      Vue.directive('my-directive', {       bind(el, { value }) {         // 当前配置混合全局配置         const options = Object.assign({}, defaults, value)         const lib = new Lib(el, options)         el._libInstace = lib // 缓存 lib 实例       },       update(el, { value }, vnode) {         // 更新 lib 配置         el._libInstace.setOptions(value)       },       unbind(el) {         // 销毁 lib         el._libInstace.destroy()         delete el._libInstace       }     })   } } ```  指令有着完善的生命周期钩子，但在数据管理上偏弱。一般用于单一功能的集成，或者只需要一次初始化的插件。  > 指令中可通过 `el` 或 `el.dataset` 进行生命周期间的数据共享。 "},{title:"编写良好的前端组件",path:"/posts/write-good-front-end-component.html",strippedContent:'Vue 和 React 的大红大火，带来的是组件化和数据驱动的开发方式。Demo 很美好，但如果没有一定的实际开发经验积累，总是能把一个功能模块写成浆糊。 依托于 Webpack 等构建工具，使得前端代码具备了后端编程语言的代码组织能力，摆脱了传统的「一泻而下」式的代码编写。至此，作为前端也该对自己的代码有更高的要求。 \x3c!-- more --\x3e  ## 组件职责划分  > 一个组件只做一件事，基于功能做好职责划分。  ### 无状态组件  公司用的是 Vue，最近又接触了下 React。 对比来说，React 由于 jsx 式（js和html混合）的写法，加上构建工具的模块化管理，一个文件中可以有多个组件。还支持纯函数式的**无状态组件**，只是单纯的接受数据渲染 DOM，没有生命周期等额外的概念。  ![无状态组件](http://static.imys.net/no-status-component.jpg)  ```js React // 无状态组件 const noStatus = props => <h1>{props.title}</h1> ```  看起来就像一个简单的模版渲染过程。  Vue 中没有**无状态组件**的概念，但实际上也存在类似功能的组件形式。比如图标组件，只接收 `props` 渲染模版，不做多余的动作。  ```html Vue <template>     <i class="icon" :class="\'icon-\' + name"></i> </template> <script> export default {     props: {         name: String     } } <\/script> ```  ### 端对端组件  端对端组件指的是不需要依赖外部给予，自身就可以负责从数据获取到展示过程的组件。 这类组件在业务开发中也很常见，比如公共的分类选择器。由于到多处调用，如果每次用的时候都由外部请求数据在调用组件展示，那么这个请求数据的代码显然是个重复的逻辑，索性直接就写入到组件内部了。  ![端对端组件](http://static.imys.net/end-to-end-component.jpg)  > 当然端对端组件也有缺陷。就是每次调用不管数据有没有变化，都会重新请求，造成冗余。如何改善，那又是另一个话题了。这篇文章中有提到：[徐飞：复杂单页应用的数据层设计](https://github.com/xufei/blog/issues)  ### UI组件  UI 组件指的是界面扩展类组件，比如：输入框、表格、树、下拉框等。像 Element、Vux 等组件库均属于此类组件。  ![UI组件](http://static.imys.net/ui-component.jpg)  此类组件的特点是：复用性强，只通过 `props`、`events` 和 `slots` 等组件接口与外部通信。 更像是一个对 HTML 的扩展标签。  ### 业务组件  业务组件通常是根据最小业务状态抽象而出，有些业务组件也具有一定的复用性，但大多数是一次性组件。  ![业务组件](http://static.imys.net/service-component.jpg)  之前提到的组件数据或自给自足（端对端组件），或来自 `props`，那么业务组件的数据呢？  1. props 2. global state  只能是以上两种了，如果还是组件内部去请求数据，那么就还是属于端对端组件了。  ### 容器组件  这类组件就是一个盒子，一般当作一个业务子模块的入口，比如一个路由指向的组件。  ![容器组件](http://static.imys.net/container-component.jpg)  通常是这种形式：  ```html <div>     <moduleA></moduleA>     <moduleB></moduleB>     <moduleC></moduleC> </div> ```  * 容器组件内的子组件通常具有业务或数据依赖关系。 * 如果没有使用全局状态管理，那么容器组件就是负责通过 `props` 分发数据到各个子组件，在通过 `events` 处理各个子组件的业务响应。此时容器组件需要做数据请求工作。 * 如果使用了全局状态管理，那么容器内部的业务组件可以自行调用全局状态处理业务。但并不是说此时容器组件什么都不用干了。即使不需要请求数据，还是有许多组件间或一个业务模块内的诸多统筹工作要做。  把上面的各类组件组装到一起就组成一个业务模块。  ![业务模块](http://static.imys.net/module-and-components.jpg)  ## 组件设计原则  ### 尽可能的减少状态  1. 如果一个数据可以由另一个 state 变换得到，那么这个数据就不是一个 state。只需要写一个变换的处理函数，在 Vue 中可以使用计算属性。 2. 如果你的 state 是一个数组，而模版最外层是渲染这个数组，那么你需要做的事是把渲染的项作为一个组件，只接受一个单级对象形式的数据，由外部决定这个组件的展示次数。 3. 如果一个数据是固定的，不会变化的常量，那么这个数据就如同 HTML 固定的站点标题一样，写死或作为全局配置属性等，不属于 state。 4. 如果一个数据需要从外部得到，它应该属于 props。 5. 如果组件和兄弟组件拥有相同的 state，那么这个 state 应该放到更高的层级中，使用 props 传递到两个组件中。  ### 合理的依赖关系  1. 父组件不依赖子组件。要做到当我们把子组件删除后，只是丢失了一个功能，或一个模块等，而不会造成父组件及兄弟组件功能异常。 2. 子组件基于父组件传递 props 作出个性化展示。  ### 扁平化参数  像 HTML 原生元素那样，只接受原始类型（字符串、数值、布尔值和函数）作为属性，避免复杂的对象。当然，数据除外。  ```html \x3c!-- good --\x3e <my-component   label="hello"   :actived="true"   :width="600"   :on-show="show"> </my-component>  \x3c!-- bad --\x3e <my-component :config="myConfig"></my-component> ```  ### 良好的接口设计  1. 把组件内部可以完成的工作做到极致。虽然提倡拥抱变化，但接口不是越多越好。 2. 如果常量变为 props 能应对更多的场景，那么就可以作为 props。原有的常量可作为默认值。 3. 如果组件不能提供调用者所需求的功能，那么这个组件的接口还不够完善。 4. 如果需要为了某一调用者编写大量特定需求的代码，那么可以考虑通过扩展等方式构建一个新的组件。 5. 保证组件的属性和事件足够的给大多数的组件使用。  ## End  设计模式六大原则在组件设计中也有适用的地方。 '},{title:"Webpack按需打包Lodash的几种方式",path:"/posts/webpack-use-lodash.html",strippedContent:" 在数据操作时，Lodash 就是我的弹药库，不管遇到多复杂的数据结构都能用一些函数轻松拆解。  ES6 中也新增了诸多新的对象函数，一些简单的项目中 ES6 就足够使用了，但还是会有例外的情况引用了少数的 Lodash 函数。一个完整的 Lodash 库，即使是压缩后，现最新版本也有 `71k` 的体积。不能为了吃一口饭而买下一个饭店啊。  针对这个问题，其实已经有很多可选方案了。  \x3c!-- more --\x3e  ## 函数模块  Lodash 中的每个函数在 NPM 都有一个单独的发布模块。[NPM: results for ‘lodash’](https://www.npmjs.com/search?q=lodash) 假如你只需要使用`_.isEqual`，那么你只需要安装`lodash.isequal`模块，然后按以下方式引用。  ```js var isEqual = require('lodash.isequal') // or ES6 import isEqual from 'lodash.isequal'  isEqual([1, 2, 3], [1, 2, 3]) // true ```  ## 全路径引用  在你完整安装 Lodash 后，可以按`lodash/函数名`的格式单独引入需要的函数模块。  ```js var difference = require('lodash/difference') // or ES6 import difference from 'lodash/difference'  difference([1, 2], [1, 3]) // [2] ```  ## 使用插件优化  在简单场景下，以上两种方式足以解决问题。而遇到复杂的数据对象时，我们不得不在一个文件中引入多个 Lodash 函数，这样就需要在文件中写多个`require`或`import`相关函数。  ```js import remove from 'lodash/remove' import uniq from 'lodash/uniq' import invokeMap from 'lodash/invokeMap' import sortBy from 'lodash/sortBy' // more... ```  正写到关键处却因为引入一个函数要拉到文件头部去定义引用而打乱了思路，很不爽！  于是我机智的到 Github 去搜索了`webpack`和`lodash`两个关键词的组合，排在首位的 [lodash-webpack-plugin](https://github.com/lodash/lodash-webpack-plugin) 就是为了解决这个问题而生。  使用时需要以下模块，其实除了前两个剩下的一般都已安装了：  ```bash $ npm i -S lodash-webpack-plugin babel-plugin-lodash babel-core babel-loader babel-preset-es2015 webpack ```  **配置：**  ```js webpack.config.js var LodashModuleReplacementPlugin = require('lodash-webpack-plugin') var webpack = require('webpack')  module.exports = {   module: {     loaders: [       {         loader: 'babel',         test: /\\.js$/,         exclude: /node_modules/,         query: {           plugins: ['transform-runtime', 'lodash'],           presets: ['es2015']         }       }     ]   },   plugins: [new LodashModuleReplacementPlugin(), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.optimize.UglifyJsPlugin()] } ```  其中`babel-plugin-lodash`的配置，也就是`plugins: ['lodash']`，并不是一定要在`loaders`中，也可以单独定义`babel`。  ```js webpack.config.js var LodashModuleReplacementPlugin = require('lodash-webpack-plugin') var webpack = require('webpack')  module.exports = {   module: {     loaders: [       {         loader: 'babel',         test: /\\.js$/,         exclude: /node_modules/       }     ]   },   babel: {     presets: ['es2015'],     plugins: ['transform-runtime', 'lodash']   },   plugins: [new LodashModuleReplacementPlugin(), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.optimize.UglifyJsPlugin()] } ```  又或者是`.babelrc`文件中。  以上工作完成了，在每个你需要使用 lodash 函数的文件中只需要引用一次 lodash，即可调用任意函数而不会造成完全打包。  ```js import _ from 'lodash'  _.add(1, 2) // 打包时只会引入这一个函数模块 ```  > 注意：必须要使用 ES2015 的模块引用方式才有效。  ## End  以上即是我目前所知道的几种方式，如果哪位朋友有更好的方式（比如只需要全局引入一次），请一定分享与我！😋 "},{title:"Webpack按需打包Lodash的几种方式",path:"/posts/webpack-use-lodash%20-%20%E5%89%AF%E6%9C%AC.html",strippedContent:" 在数据操作时，Lodash 就是我的弹药库，不管遇到多复杂的数据结构都能用一些函数轻松拆解。  ES6 中也新增了诸多新的对象函数，一些简单的项目中 ES6 就足够使用了，但还是会有例外的情况引用了少数的 Lodash 函数。一个完整的 Lodash 库，即使是压缩后，现最新版本也有 `71k` 的体积。不能为了吃一口饭而买下一个饭店啊。  针对这个问题，其实已经有很多可选方案了。  \x3c!-- more --\x3e  ## 函数模块  Lodash 中的每个函数在 NPM 都有一个单独的发布模块。[NPM: results for ‘lodash’](https://www.npmjs.com/search?q=lodash) 假如你只需要使用`_.isEqual`，那么你只需要安装`lodash.isequal`模块，然后按以下方式引用。  ```js var isEqual = require('lodash.isequal') // or ES6 import isEqual from 'lodash.isequal'  isEqual([1, 2, 3], [1, 2, 3]) // true ```  ## 全路径引用  在你完整安装 Lodash 后，可以按`lodash/函数名`的格式单独引入需要的函数模块。  ```js var difference = require('lodash/difference') // or ES6 import difference from 'lodash/difference'  difference([1, 2], [1, 3]) // [2] ```  ## 使用插件优化  在简单场景下，以上两种方式足以解决问题。而遇到复杂的数据对象时，我们不得不在一个文件中引入多个 Lodash 函数，这样就需要在文件中写多个`require`或`import`相关函数。  ```js import remove from 'lodash/remove' import uniq from 'lodash/uniq' import invokeMap from 'lodash/invokeMap' import sortBy from 'lodash/sortBy' // more... ```  正写到关键处却因为引入一个函数要拉到文件头部去定义引用而打乱了思路，很不爽！  于是我机智的到 Github 去搜索了`webpack`和`lodash`两个关键词的组合，排在首位的 [lodash-webpack-plugin](https://github.com/lodash/lodash-webpack-plugin) 就是为了解决这个问题而生。  使用时需要以下模块，其实除了前两个剩下的一般都已安装了：  ```bash $ npm i -S lodash-webpack-plugin babel-plugin-lodash babel-core babel-loader babel-preset-es2015 webpack ```  **配置：**  ```js webpack.config.js var LodashModuleReplacementPlugin = require('lodash-webpack-plugin') var webpack = require('webpack')  module.exports = {   module: {     loaders: [       {         loader: 'babel',         test: /\\.js$/,         exclude: /node_modules/,         query: {           plugins: ['transform-runtime', 'lodash'],           presets: ['es2015']         }       }     ]   },   plugins: [new LodashModuleReplacementPlugin(), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.optimize.UglifyJsPlugin()] } ```  其中`babel-plugin-lodash`的配置，也就是`plugins: ['lodash']`，并不是一定要在`loaders`中，也可以单独定义`babel`。  ```js webpack.config.js var LodashModuleReplacementPlugin = require('lodash-webpack-plugin') var webpack = require('webpack')  module.exports = {   module: {     loaders: [       {         loader: 'babel',         test: /\\.js$/,         exclude: /node_modules/       }     ]   },   babel: {     presets: ['es2015'],     plugins: ['transform-runtime', 'lodash']   },   plugins: [new LodashModuleReplacementPlugin(), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.optimize.UglifyJsPlugin()] } ```  又或者是`.babelrc`文件中。  以上工作完成了，在每个你需要使用 lodash 函数的文件中只需要引用一次 lodash，即可调用任意函数而不会造成完全打包。  ```js import _ from 'lodash'  _.add(1, 2) // 打包时只会引入这一个函数模块 ```  > 注意：必须要使用 ES2015 的模块引用方式才有效。  ## End  以上即是我目前所知道的几种方式，如果哪位朋友有更好的方式（比如只需要全局引入一次），请一定分享与我！😋 "},{title:"JavaScript 获取输入时的光标位置及场景问题",path:"/posts/cursor-offset-at-input.html",strippedContent:" ## 前言  在输入编辑的业务场景中，可能会需要在光标当前的位置或附近显示提示选项。比如社交评论中的`@user`功能，要确保提示的用户列表总是出现在`@`字符右下方，又或者是在自定义编辑器中 autocomplete 语法提示，都需要获取光标当前的位置作为参照点。  \x3c!-- more --\x3e  ## 两种位置  对于 WEB 开发来讲，当我们提到某某元素的位置，通常是指这个元素相对于父级或文档的像素单位坐标。而对于输入框中光标，就有了额外的区分。  ### 相对于内容  相对于内容，光标位于第几个字符之后，姑且称之为**字符位置**吧。  ### 相对于 UI  相对于 UI，也就是跟普通页面元素一样的**像素位置**了。  ## 插入或替换内容  在前言提到的场景中，也有在光标位置处插入内容的需求，比如对选取文字加粗`text => <strong>text</strong>`等。  ### textarea  `textarea`元素可以很容易获取到选择的一段文字的起止位置。如果当前没有选择文字，则两个位置值都为光标右侧字符的索引，从 0 开始。  ```js // 开始位置 textarea.selectionStart // 结束位置 textarea.selectionEnd ```  对于加粗功能，有了起止位置，就能获取到选择的文字内容，然后对内容进行替换。由于`textarea`不能包含子元素，只有纯文本，所以基于`textarea`实现加粗只能像用 Markdown 标记语法实现。  ```js var selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd) textarea.setRangeText('**' + selectedText + '**') ```  > `textarea.setRangeText(text: String)` 把选中的文字替换为其他内容。  ### contenteditable  也可能我们会使用`contenteditable`属性把一个元素变为可编辑元素。而上面所用的属性和函数都是普通元素所没有的，所以要换一种姿势实现。  还是以加粗功能为例。  ```js // 获取文档中选中区域 var range = window.getSelection().getRangeAt(0) var strongNode = document.createElement('strong') // 选中区域文本 strongNode.innerHTML = range.toString() // 删除选中区 range.deleteContents() // 在光标处插入新节点 range.insertNode(strongNode) ```  基于`contenteditable`的可编辑元素，其中的内容均为子元素，文本为`textNode`，加粗使用 HTML 元素，插入或替换是对元素的操作。  如果想使用操作内容的思路实现会比较麻烦，因为可以获取到的起止位置是基于子元素的。  ```html <div contenteditable>hello<strong>你好</strong><big>w</big>orld</div> ```  假如选中的文字是`你好wor`，调用相关 API 的输出如下。  ```js // 当前在文档中选择的文本，document 和 window 都有这个函数 // var selection = document.getSelection() var selection = window.getSelection() selection.anchorNode // 你好 selection.anchorOffset // 0 selection.focusNode // orld selection.focusOffset // 2  // 或者使用 Range var range = selection.getRangeAt(0) range.startContainer // 你好 range.startOffset // 0 range.endContainer // orld range.endOffset // 2 ```  最终可以获取到起止元素以及选中区域在开始元素内容中的字符位置和在结束元素内容中的字符位置。其中的起止元素均为`textNode`类型，通过`parentNode`获取到包裹元素。  ```js range.startContainer.parentNode // <strong>你好</strong> range.endContainer.parentNode // <div contenteditable>...</div> ```  > 需要注意的是通过`Selection`和`Rang`获取到起止位置是有方向之分的，从左向右选择和从右向左选择得到的值是正好相反的。  ## 基于光标像素位置创建内容  这里就要开始用像素位置，同样分为两种实现来讲。  ### contenteditable  可编辑元素获取光标像素位置就像`textarea`获取光标的字符位置一样简单。  ```js var range = window.getSelection().getRangeAt(0) range.getBoundingClientRect() // { width, height, top, right, bottom, right } ```  这么具体的尺寸值，实现自动完成真是 So easy!  ### textarea  `textarea`其中的内容都是纯文本，在 DOM 中不存在相关的对象，对于像素位置就得另作他想了。  #### 基于行高和字体大小计算  ```js // 1.获取光标结束位置 var end = textarea.selectionEnd // 2.通过匹配光标之前文本中的换行符计算所在行 var row = textarea.value.substring(0, end).match(/\\r\\n|\\r|\\n/).length // 3.计算 top，行高 * 行数 + 上填充 + 边框宽度 var top = lineHeight * (row + 1) + paddingTop + borderWidth // 4.获取光标左侧的文本 var leftText = textarea.value.split(/\\r\\n|\\r|\\n/)[row] // 5.影响一段文字所占宽度的因素太多，除字体大小、中英文、符号、字符间距等，还有字体、浏览器、系统等客观因素 // var left = ... ```  这个方案的思路是没问题的，但是考虑所有问题的成本太高。虽然可以创建测试元素去计算文本宽度，但这个方案本身是从严谨的角度出发的。与其混在一块，直接用取巧的办法更简单。  > ~~这个方案的潜台词是：明明可以靠脸吃饭，却偏偏要靠才华！~~ 🙄  #### 镜像元素  文本不支持定位？那我创建 DOM 好了。  ```js // 光标位置 var end = textarea.selectionEnd // 光标前的内容 var beforeText = textarea.value.slice(0, end) // 光标后的内容 var afterText = textarea.value.slice(end) // 对影响 UI 的特殊元素编码 var escape = function(text) {   return text.replace(/<|>|`|\"|&/g, '?').replace(/\\r\\n|\\r|\\n/g, '<br>') } // 创建镜像内容，复制样式 var mirror = '<div class=\"' + textarea.className + '\">' + escape(beforeText) + '<span id=\"cursor\">|</span>' + escape(afterText) + '</div>' // 添加到 textarea 同级，注意设置定位及 zIndex，使两个元素重合 textarea.insertAdjacentHTML('afterend', mirror) // 通过镜像元素中的假光标占位元素获取像素位置 var cursor = document.getElementById('cursor') cursor.getBoundingClientRect() // { width, height, top, right, bottom, right } ```  ## End  最后悄悄说一句，以上内容不兼容低版本 IE，但是 IE 毕竟主场运行，有些 API 反而是其他浏览器所没有的。就上面提到的案例来说，低版本 IE 也有对应的 API 可用。真是不想在 IE 上去浪费精力了，索性不提。 "},{title:"前端文字的截断处理",path:"/posts/text-truncation.html",strippedContent:"关于前端页面的文字溢出截断的招数已经很常见了。 通常的实现有，前端css控制、后端字数输出控制或者前端js字数处理等。  \x3c!-- more --\x3e  ## 单行文字  单行文字的溢出处理很简单，我通常是使用css来控制，在文字末尾加上`...`。  ```css .ellipsis {   overflow: hidden;   text-overflow: ellipsis;   white-space: nowrap; } ```  给需要文字截断的节点增加一个这样的基础类，然后设置该节点的宽。 同时注意给未来可能会出现溢出的节点也加上此类，再设置最大宽度`max-width`，因为很多奇葩用户的输入是你无法掌控的。 - -！  ## 多行文字  我希望在一个的固定高度的容器中，内容超出后，最后一个文字显示`...`。  如法炮制给多行文字的容器添加`ellipsis`类后，你会发现的确是显示`...`，不过此时文字是一行的。 因为在该类中添加了属性`white-space`，用来定义一个段落如何换行。属性值`nowrap`：禁止文本换行，除非遇到`<br>`。  一番思考后，确定了一个方案。  1. 给固定高度的容器添加`overflow: hidden`； 2. 给容器添加相对定位； 3. 添加伪元素样式，`content:'...'`，绝对定位，然后位置定位在容器末尾。  伪元素的兼容性为IE8，如果需要兼容IE7的可以使用标签代替。  ##  带显示全部的多行文字  类似 QQ 空间、微信、微博那种。  {% jsfiddle imys/wymxhaek/3 html,css,result %}  使用 2 个伪元素加 1 个 a 链接实现。 精妙之处在于使用伪元素遮挡一行文字，让 a 链接位于伪元素之上显示。 "}]}}]);