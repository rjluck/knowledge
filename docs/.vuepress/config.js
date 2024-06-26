// let sidebar = {

//     // 打开Thought主页链接时生成下面这个菜单
//     '/Thought': [
//         // ['/Thought/', '随笔首页'],
//         {
//             title: '游记',
//             children: [
//                 ['/Thought/Travels/beiPing', '北平游记'],
//             ]
//         },
//         {
//             title: '年终回顾',
//             children: [
//                 ['/Thought/YearReview/2018', '2018年'],
//                 ['/Thought/YearReview/2019', '2019年']
//             ]
//         },
//     ],
//     '/': [
//         "/", //指的是根目录的md文件 也就是 README.md 里面的内容
//         "apiword",
//         "api",
//         "error"
//     ],
// };

let sidebar = {
  '/html/': [
    {
      title: 'HTML基础', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        { title: 'HTML基础', path: '/html/base' },
        { title: 'HTML进阶', path: '/html/high' },
      ]
    },
  ],
  '/browser/': [
    {
      title: '浏览器缓存', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        { title: 'webStorage', path: '/browser/cache/webStorage' },
      ]
    },
  ],
  '/vue/': [
    {
      title: 'Vue2', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '',  // ''空字符串代表主页，显示README.md中的内容
        '/vue/vue2/base',
        '/vue/vue2/component',
        '/vue/vue2/route',
        '/vue/vue2/vuex',
        '/vue/vue2/ajax',
        '/vue/vue2/core'
      ]
    },
    {
      title: 'Vue3', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '/vue/vue3/base',
        '/vue/vue3/compositionAPI',
        '/vue/vue3/otherComAPI',
        '/vue/vue3/component',
        '/vue/vue3/route',
        '/vue/vue3/other',
        '/vue/vue3/pinia',
      ]
    },
  ],
  '/typeScript/': [
    {
      title: 'TypeScript简介', // 侧边栏名称
      collapsable: false, // false为默认展开菜单, 默认值true是折叠,
      sidebarDepth: 1,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
      children: [
        // ''空字符串代表主页，显示README.md中的内容
        ['', 'TypeScript简介'],//使用数组为侧边栏起别名，前边是md名称，后边是链接显示的文字
        ['tsVSjs', 'TypeScript Vs JavaScript']//使用数组为侧边栏起别名，前边是md名称，后边是链接显示的文字
      ]
    },
    {
      title: 'TypeScript基础', // 侧边栏名称
      collapsable: false, // 可折叠
      // children: [
      //     '/typeScript/dataType', // 你的md文件地址·
      //     '/typeScript/typeInference',
      //     '/typeScript/unionType',
      //     '/typeScript/interface',
      // ]
      children: [
        { title: '数据类型', path: '/typeScript/dataType' },
        { title: '类型推论', path: '/typeScript/typeInference' },
        { title: '联合类型', path: '/typeScript/unionType' },
        { title: '交叉类型', path: '/typeScript/crossType' },
        { title: '函数类型', path: '/typeScript/function' },
      ]
    },
    {
      title: 'TypeScript进阶', // 侧边栏名称
      collapsable: false, // 可折叠
      children: [
        { title: '类', path: '/typeScript/class' },
        { title: '接口', path: '/typeScript/interface' },
        { title: '泛型', path: '/typeScript/generics' },
        { title: '高级类型', path: '/typeScript/highType' },
      ]
    }
  ],
  '/javaScript/': [
    {
      title: 'JavaScript简介', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '',  // ''空字符串代表主页，显示README.md中的内容
        '/javaScript/introduction'
      ]
    },
    {
      title: 'JavaScript基础', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '/javaScript/jsBase/variate', // 你的md文件地址
        '/javaScript/jsBase/dataType',
        '/javaScript/jsBase/operator',
        '/javaScript/jsBase/process',
        '/javaScript/jsBase/array',
        '/javaScript/jsBase/function',
        '/javaScript/jsBase/scope',
        '/javaScript/jsBase/parse',
        '/javaScript/jsBase/object',
        '/javaScript/jsBase/type',
      ]
    },
    {
      title: 'Web APIs', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '/javaScript/webAPIs/',
        '/javaScript/webAPIs/DOM',
        '/javaScript/webAPIs/DOMHigh',
        '/javaScript/webAPIs/DOMEg',
        '/javaScript/webAPIs/BOM',
        '/javaScript/webAPIs/BOMEg',
        '/javaScript/webAPIs/PC',
        '/javaScript/webAPIs/PCEg',
        '/javaScript/webAPIs/Mobile',
        '/javaScript/webAPIs/MobileEg',
        '/javaScript/webAPIs/Store',
      ]
    },
    {
      title: 'JavaScript高级', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '/javaScript/jsHigh/object',
        '/javaScript/jsHigh/constructor',
        '/javaScript/jsHigh/funcAdvance',
        '/javaScript/jsHigh/regular',
        '/javaScript/jsHigh/ES6',
        '/javaScript/jsHigh/eg',
      ]
    }

  ],
  '/jQuery/': [
    {
      title: 'jQuery', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '',
        '/jQuery/API',
        '/jQuery/Event',
        '/jQuery/Other',
        '/jQuery/Eg'
      ]
    },
  ],
  '/nodeJs/': [
    {
      title: 'nodeJS', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '',
        '/nodeJs/start',
        '/nodeJs/javaScript',
        '/nodeJs/web',
        '/nodeJs/module',
        '/nodeJs/express'
      ]
    },
  ],
  '/mongoDB/': [
    {
      title: 'MongoDB', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '',
      ]
    },
  ],
  '/webInterview/': [
    {
      title: 'JavaScript', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '/webInterview/js',
      ]
    },
  ],
  '/applet/': [
    {
      title: '微信小程序', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '/applet/wx/base',
        '/applet/wx/component',
        '/applet/wx/customComponent',
        '/applet/wx/API',
        '/applet/wx/grammar',
        '/applet/wx/other',
        '/applet/wx/case',
      ]
    },
  ],
  '/webpack/': [
    {
      title: 'webpackV4', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '/webpack/V4/base',
      ]
    },
    {
      title: 'webpackV5-测试1', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '/webpack/V5/base',
      ]
    },
  ],
  '/uniApp/': [
    {
      title: 'uniApp', // 侧边栏名称
      collapsable: true, // 可折叠
      children: [
        '/uniApp/base',
      ]
    }
  ]
}

module.exports = {
  title: '荣佳主页', //显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: '荣佳的前端记录',// meta 中的描述文字，用于SEO
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ['link', { rel: 'icon', href: '/img/logo.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
  ],
  themeConfig: {
    logo: '/img.jpg',  //网页顶端导航栏左上角的图标
    // activeHeaderLinks: false,
    //sidebarDepth: 4,//这是嵌套标题链接，自动显示当前激活（导航）页面标题的链接，即显示深度（h1-h6的深度）
    lastUpdated: 'Last Updated',// 文档更新时间：每个文件git最后提交的时间
    displayAllHeaders: false,// 侧边栏只会显示由当前活动页面的标题（headers）组成的链接，你可以将 themeConfig.displayAllHeaders 设置为 true 来显示所有页面的标题链接：
    // 顶部导航栏
    nav: [
      { text: '主页', link: '/' }, //格式一：直接跳转，'/'为不添加路由，跳转至首页
      {
        text: '分类', //格式二：添加下拉菜单，link指向的文件路径
        ariaLabel: '分类',   //用于识别的label
        items: [//点击标签会跳转至link的markdown文件生成的页面
          { text: 'HTML', link: '/html/' },
          { text: '浏览器', link: '/browser/' },
          { text: 'Vue', link: '/vue/' },
          { text: 'MongoDB', link: '/MongoDB/' },
          { text: 'nodeJs', link: '/nodeJs/' },
          { text: 'JQuery', link: '/jQuery/' },
          { text: 'JavaScript', link: '/javaScript/' },
          { text: 'TypeScript', link: '/typeScript/' },
          { text: 'Web面试题', link: '/webInterview/' },
          { text: '小程序', link: '/applet/' },
          { text: 'Webpack', link: '/webpack/' },
          { text: 'uniApp', link: '/uniApp/base' },
        ]
      },
      { text: '关于', link: '/about/' },
      { text: 'Github', link: 'https://github.com/rjluck/rongjia-knowledge' },//格式三：跳转至外部网页，需http/https前缀
    ],
    // 侧边栏菜单( 一个模块对应一个菜单形式 ) ,为以下路由添加侧边栏
    // sidebar: ['/', '/about/', '/study/'],
    // 添加侧边栏,该语法表示使用当前页面标题自动生成侧边栏
    // sidebar: 'auto',
    editLinks: false,
    sidebar: sidebar, //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}