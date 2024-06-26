# 其他

[[toc]]

## 使用npm包

### 小程序对npm的支持与限制

目前，小程序中已经支持使用`npm`安装第三方包，从而提高小程序的开发效率。


因为`node_modules`目录中的包不会参与小程序项目的编译、上传和打包，因此在小程序项目中药使用的`npm`包，必须走一遍 **构建npm** 的过程。

![image](/imgs/applet/wx/wx185.png)


在构建成功以后，默认会在小程序项目根目录，也就是`node_modules`统计目录下生成`miniprogram_npm`目录，里面存放着构建完成以后的`npm`包，也就是小程序运行过程中真正使用的包。

**构建 npm的整个过程：**

（1）生成package.json文件

`npm init -y` 用于管理项目依赖

（2）安装依赖

（3）工具--> 构建 npm


> 注意事项：
> - 小程序运行在微信内部，因为运行环境的特殊性，这就导致**并不是所有的包都能在小程序中使用**
> - 我们在小程序中提到的包指专为小程序定制的`npm`包，简称 小程序`npm`包，在使用包之前需要先确定该包是否支持小程序
> - 开发者如果需要发布小程序包，需要参考官网规范：https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html



但是，在小程序中使用`npm`包有如下3个限制：
- 不支持依赖于`Node.js`内置库的包
- 不支持依赖于浏览器内置对象的包
- 不支持依赖于`C++`插件的包

> 总结：虽然npm上的包有千千万，但是能供小程序使用的包却“为数不多”


### 自定义构建npm

在实际的开发中，随着项目的功能越来越多、项目越来越复杂，文件目录也变得很繁琐，为了方便进行项目的开发，开发人员通常会对目录结构进行调整优化，例如：将小程序源码放到`miniprogram`目录下。

这时候需要开发者在`project.config.json`中指定`node_modules`的位置 和 目标 `miniprogram_npm`的位置。

具体配置如下：
- 配置`project.config.json`的`miniprogramRoot`指定小程序源码的目录
- 配置`project.config.json`的`setting.packNpmManually`为`true`，开启自定义`node_modules`和`miniprogram_npm`位置的构建`npm`方式
- 配置`project.config.json`的`setting.packNpmRelationList`项，指定`packageJsonPath`和`miniprogramNpmDistDir`的位置


project.config.json
```json
{
  "appid": "wx80131c4bf23feb01",
  "compileType": "miniprogram",
  "libVersion": "3.3.4",
  "packOptions": {
    "ignore": [],
    "include": []
  },
  "miniprogramRoot": "miniprogram/",
  "setting": {
    "packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./miniprogram"
      }
    ],
    "useCompilerPlugins": [
      "sass"
    ],
    "coverView": true,
    "es6": true,
    "postcss": true,
    "minified": true,
    "enhance": true,
    "showShadowRootInWxmlPanel": true,
    "babelSetting": {
      "ignore": [],
      "disablePlugins": [],
      "outputPath": ""
    }
  },
  "condition": {},
  "editorSetting": {
    "tabIndent": "insertSpaces",
    "tabSize": 2
  },
  "srcMiniprogramRoot": "miniprogramRoot/"
}
```










### Vant Weapp

#### 什么是Vant Weapp

`Vant Weapp`是有赞前端团队开源的一套**小程序UI组件库**，助力开发者快速搭建小程序应用。它所使用的是`MIT开源许可协议`，对商业使用比较友好。

官方文档地址：https://youzan.github.io/vant-weapp

#### 安装Vant Weapp组件库
在小程序项目中，安装`Vant`组件库主要分为如下3步：
- 通过npm安装（建议指定版本为@1.3.3）
- 构建npm包
- 修改app.json

详细步骤：https://youzan.github.io/vant-weapp/#/quickstart


#### 使用Vant Weapp 组件

安装完Vant Weapp组件库之后，可以在`app.json`的`usingComponents`节点中引入需要的组件，即可在wxml中直接使用组件。示例代码如下：


app.json 或 页面.json
```js
"usingComponents": {
  "van-button": "@vant/weapp/button/index"
}
```

页面.wxml
```html
<van-button type="primary">主要按钮</van-button>
```



> 注意：
> -  在使用`van-image`图片组件时，如果需要渲染本地的图片，不能使用 `../`,需要相对于小程序的源码的目录来查找图片才可

```html
<!-- 可正常展示图片 -->
<!-- <image src="../../assets/a.png"> -->

<!-- 不能正常展示图片 -->
<!-- <van-image width="100" height="100" src="../../assets/a.png"> -->

  <!-- 能正常展示图片 -->
<!-- <van-image width="100" height="100" src="/assets/a.png"> -->
```



在使用`Vant`提供的组件时，只需要两个步骤：
- 将组件在`app.json`中进行全部注册 或者 `index.json`中进行局部注册
- 在引入组件后，可以在`wxml`中直接使用组件


> 注意事项：
> - 将`app.json`中的`"style":"V2"` 去除，小程序的新版基础组件强行加上了许多样式，难以覆盖，不关闭将造成部分组件样式混乱。



#### Vant Weapp 组件样式覆盖

`Vant Weapp`基于微信小程序的机制，为开发者提供了3种修改组件样式的方法：
- 解除样式隔离：在页面中使用`Vant Weapp`组件时，可直接在页面的样式文件中覆盖样式
- 使用外部样式类：需要注意的是普通样式类 和 外部样式类 的优先级是未定义的，使用时需要添加 `!important` 保证外部样式类的优先级
- 使用`CSS`变量：在页面或全局对多个组件的样式做批量修改以进行主题样式的定制


> 注意事项：
> - 在自定义组件中如果需要  vant Weapp 组件的样式，需要解除样式隔离， shared






#### 定制全局主题样式

（1）CSS变量

Vant Weapp 使用**CSS变量**来实现定制主题。关于CSS变量的基本用法，请参考MDN文档：https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties


```css
html{
  /* 定义CSS变量 */
  --main-color:#C00000;
}

.box1,.box2{
  /* background-color:#C00000*/
  background-color:var(--main-color)
}

.box3{
  /* color:#C00000 */
  color:var(--main-color)
}
```


（2）app.wxss写入CSS变量

在`app.wxss`中，写入`CSS`变量，即可对全局生效：


app.wxss
```css
page{
  --button-danger-background-color:#C00000;
  --button-danger-border-color:#C00000;
}
```

官网：https://youzan.github.io/vant-weapp/#/theme下的【配置文件】







## 分包

小程序的代码通常是由许多页面、组件以及资源等组成，随着小程序功能的增加，代码量也会逐渐增加，梯级过大就会导致用户打开速度变慢，影响用户的使用体验。



###  定义

分包指的是把一个**完整的小程序项目**，按照需求**划分不同的子包**，在构建时打包成不同的分包，用户在使用时**按需进行加载**。


分包的好处：
- 可以**优化小程序首次启动的下载时间**
- 在多团队共同开发时可以更好的**解耦协作**


分包加载是一种xcx优化技术。将小程序不同功能的代码，分别打包成不同的子包，在构建时打包成不同的分包，用户在使用时按需进行家长，在构建小程序分包项目时，构建回输出一个或多个分包。**每个使用分包小程序必定含有一个主包**。
  
 ![image](/imgs/applet/wx/wx186.png)


### 分包前项目的构成
 分包前，小程序项目中**所有的页面**和资源都被打包到了一起，导致整个项目体积过大，影响小程序首次启动的下载时间。
 ![image](/imgs/applet/wx/wx171.png)


### 分包后项目的构成
 分包后，小程序项目由**1个主包+多个分包**组成：
 - 主包：一般只包含项目的**启动页面**或**tabBar页面**、以及所有分包都需要用到的一些**公共资源**
 - 分包：只包含和当前分包有关的页面和私有资源

  ![image](/imgs/applet/wx/wx172.png)

### 分包的加载规则

- 在小程序启动时，默认会**下载主包**并**启动主包内页面**
  - `tabBar`页面需要放到主包中
- 当用户进入分包内某个页面时，**客户端会把对应分包下载下来**，下载完成后再进行展示
  - 非`tabBar`页面可以按照功能的不同，划分为不同的分包之后，进行按需下载


### 分包的体积限制
目前，小程序分包的大小有以下两个限制
- 整个小程序所有分包大小不超过**20M**(主包+所有分包)
- 单个分包/主包大小不能超过**2M**


### 使用分包

#### 配置方法

小程序如果需要进行分包加载，需要在`app.json`中，通过`subPackages`或`subpackages`定义分包结构

每个分包结构含三个常用字段：
- `root`：分包的根目录，该目录下的所有文件都会被打包成一个独立的包
- `name`：分包的别名，用于在代码中引用该分包
- `pages`：指定当前分包中包含哪些页面


![image](/imgs/applet/wx/wx173.png)



eg:配置 商品模块 分包，分包包含：商品列表、商品详情两个页面

app.json
```json
{
  "entryPagePath": "pages/index/index",
  "pages": [
    "pages/index/index",
    "pages/cate/cate",
    "pages/cart/cart",
    "pages/profile/profile",
    "pages/market/market",
    "pages/list/list",
    "pages/detail/detail"
  ],
  "window": {
    "navigationBarTitleText": "嘟嘟",
    "navigationBarBackgroundColor": "#f3514f",
    "enablePullDownRefresh": false,
    "backgroundColor": "#efefef",
    "backgroundTextStyle": "light"
  },
  "tabBar": {
    "selectedColor": "#f3514f",
    "color": "#666",
    "backgroundColor": "#efefef",
    "borderStyle": "black",
    "position": "bottom",
    "list": [
      {
        "text": "首页",
        "pagePath": "pages/index/index",
        "iconPath": "/assets/tabbar/index.png",
        "selectedIconPath": "/assets/tabbar/index-active.png"
      },
      {
        "text": "分类",
        "pagePath": "pages/cate/cate",
        "iconPath": "/assets/tabbar/cate.png",
        "selectedIconPath": "/assets/tabbar/cate-active.png"
      },
      {
        "text": "购物车",
        "pagePath": "pages/cart/cart",
        "iconPath": "/assets/tabbar/cart.png",
        "selectedIconPath": "/assets/tabbar/cart-active.png"
      },
      {
        "text": "促销",
        "pagePath": "pages/market/market",
        "iconPath": "/assets/tabbar/profile.png",
        "selectedIconPath": "/assets/tabbar/profile-active.png"
      },
      {
        "text": "我的",
        "pagePath": "pages/profile/profile",
        "iconPath": "/assets/tabbar/profile.png",
        "selectedIconPath": "/assets/tabbar/profile-active.png"
      }
    ]
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json",
  "lazyCodeLoading": "requiredComponents",
  "usingComponents": {
    "custom-checkbox": "./components/custom-checkbox/custom-checkbox",
    "van-button": "@vant/weapp/button/index"
  },
  "subPackages": [
      {
        "root": "modules/goodModule",
        "name": "goodModule",
        "pages": [
            "pages/list/list",
            "pages/detail/detail"
        ]
      }
  ]
}
```



主包页面跳转到分包页面
```html
<!-- 如果需要跳转到分包页面，需要在路径之前添加上分包的根目录路径 root  路径才可以 -->
<navigator url="/modules/goodModule/pages/list/list">点击跳转到列表</navigator>
```




#### 打包原则

- `tabBar`页面必须在主包内
- 最外层的`pages`字段，属于主包包含的页面
- 小程序会按`subpackages`的配置进行分包，`subpackages`之外的目录将被打包到主包中
- 分包之间不能互相嵌套,`subpackages`的根目录不能是另外一个`subpackages`内的子目录




#### 引用原则

- 主包无法引用分包内的私有资源，但分包可以引用主包内的公共资源
- 主包之间不能相互引用私有资源
- 分包与分包之间资源无法相互引用，分包异步化时不受此条限制



### 独立分包

#### 定义

独立分包本质上也是分包，只不过它比较特殊，**可以独立于主包和其他分包而单独运行**。

从独立分包中页面进入小程序时，不需要下载主包，当用户进入普通分包或主包内页面时，主包才会被下载。

开发者可以将功能相对独立的页面配置到独立分包中，因为独立分包不依赖主包就可以独立运行，可以很大程度提高分包页面的启动速度。

![image](/imgs/applet/wx/wx174.png)

#### 独立分包和普通分包的区别

最主要的区别：**是否依赖于主包才能运行**
- 普通分包必须依赖于主包才能运行
- 独立分包可以在不下载主包的情况下，独立运行

#### 独立分包的应用场景
开发者可以按需，将某些**具有一定功能独立性的页面**配置到**独立分包**中。原因如下：
- 当小程序从普通的分包页面启动时，需要首先下载主包
- 而独立分包**不依赖主包**即可运行，**可以很大程度上提升分包页面的启动速度**

> 注意：一个小程序中可以有多个独立分包

#### 独立分包的配置方法
- 比普通分包的配置多了一个`independent:true`
- 给`subPackages`定义的分包结构添加`independent`字段，即可声明对应分包为独立分包
  
![image](/imgs/applet/wx/wx175.png)



> 注意事项：
> - 独立分包中不能依赖主包合其他分包中的资源
> - 主包中的`wxss`对独立分包无效
> - `App`只能在主包内定义，独立分包中不能定义`App`,会造成无法预期的行为






#### 引用规则
独立分包和普通分包以及主包之间，是**相互隔离**的，**不能相互引用彼此的资源**
- 主包无法引用独立分包内的私有资源
- 独立分包之间，不能相互引用私有资源
- 独立分包和普通分包之间，不能相互引用私有资源
- **特别注意**：独立分包中不能引用主包内的公共资源







### 分包预下载


分包预下载指访问小程序某个页面时，**由框架自动预下载可能需要的分包** （预先下载其他分包中的代码和资源），当用户需要访问分包中的页面时，已经预先下载的代码和资源可直接使用，从而提升进入后续分包页面时的启动速度，进而提高用户的使用体验。


#### 配置分包预下载
**预下载分包的行为，会在进入指定的页面时触发**。在`app.json`中，使用`preloadRule`字段定义分包的预下载规则，示例代码如下：

![image](/imgs/applet/wx/wx176.png)



preloadRule是一个对象，对象的`key`表示访问那个路径时进行预下载，`value`是进入此页面的预下载配置，具有两个配置项：
- `packages`：进入页面后预下载分包的`root`或`name`,`__APP__`表示主包
- `netWork`：在指定网络下预下载，可选值为：`all`(不限网络)、`wifi`(仅wifi下预下载)



app.json

packages 写分包别名
```json
  "preloadRule": {
      "pages/index/index":{
          "network": "all",
          "packages": ["goodModule"]
      }
  }
```

packages 也可以写分包路径
```json
  "preloadRule": {
      "pages/index/index":{
          "network": "all",
          "packages": ["modules/goodModule"]
      },
      "modules/marketModule/pages/market/market":{
        "network": "all",
        "packages": ["__APP__"]  
    }
  }
```

访问独立分包时，预下载主包，`__APP__`代表主包
```json
  "preloadRule": {
      "modules/marketModule/pages/market/market":{
        "network": "all",
        "packages": ["__APP__"]  
    }
  }
```


完整代码
```json
{
  "entryPagePath": "pages/index/index",
  "pages": [
    "pages/index/index",
    "pages/cate/cate",
    "pages/cart/cart",
    "pages/profile/profile",
    "pages/market/market",
    "pages/list/list",
    "pages/detail/detail"
  ],
  "window": {
    "navigationBarTitleText": "嘟嘟",
    "navigationBarBackgroundColor": "#f3514f",
    "enablePullDownRefresh": false,
    "backgroundColor": "#efefef",
    "backgroundTextStyle": "light"
  },
  "tabBar": {
    "selectedColor": "#f3514f",
    "color": "#666",
    "backgroundColor": "#efefef",
    "borderStyle": "black",
    "position": "bottom",
    "list": [
      {
        "text": "首页",
        "pagePath": "pages/index/index",
        "iconPath": "/assets/tabbar/index.png",
        "selectedIconPath": "/assets/tabbar/index-active.png"
      },
      {
        "text": "分类",
        "pagePath": "pages/cate/cate",
        "iconPath": "/assets/tabbar/cate.png",
        "selectedIconPath": "/assets/tabbar/cate-active.png"
      },
      {
        "text": "购物车",
        "pagePath": "pages/cart/cart",
        "iconPath": "/assets/tabbar/cart.png",
        "selectedIconPath": "/assets/tabbar/cart-active.png"
      },
      {
        "text": "促销",
        "pagePath": "pages/market/market",
        "iconPath": "/assets/tabbar/profile.png",
        "selectedIconPath": "/assets/tabbar/profile-active.png"
      },
      {
        "text": "我的",
        "pagePath": "pages/profile/profile",
        "iconPath": "/assets/tabbar/profile.png",
        "selectedIconPath": "/assets/tabbar/profile-active.png"
      }
    ]
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json",
  "lazyCodeLoading": "requiredComponents",
  "usingComponents": {
    "custom-checkbox": "./components/custom-checkbox/custom-checkbox",
    "van-button": "@vant/weapp/button/index"
  },
  "subPackages": [
      {
        "root": "modules/goodModule",
        "name": "goodModule",
        "pages": [
            "pages/list/list",
            "pages/detail/detail"
        ]
      },
      {
        "root": "modules/marketModule",
        "name": "marketModule",
        "pages": [
            "pages/market/market"
        ],
        "independent":true
      }
  ],
  "preloadRule": {
      "pages/index/index":{
          "network": "all",
          "packages": ["goodModule"]
      },
      "modules/marketModule/pages/market/market":{
        "network": "all",
        "packages": ["__APP__"]  
    }
  }
}
```









#### 分包预下载的限制
同一个分包中的页面享有**共同的预下载大小限额2M**，例如：
![image](/imgs/applet/wx/wx177.png)


## 开发能力


### 获取微信头像

当小程序需要让用户完善个人资料时，我们可以通过微信提供的头像、昵称填写能力快速完善。

![image](/imgs/applet/wx/wx187.png)

想使用微信提供的头像填写能力，需要两步：
- 将`button`组件`open-type`的值设置为`chooseAvatar`
- 通过`bindchooseavatar`事件回调获取到头像信息的临时路径



index.wxml
```html
<view>
    <button class="btn" open-type="chooseAvatar" bindchooseavatar="chooseavatar">
        <image class="avatar" src="{{avatarUrl}}" mode=""/>
    </button>
</view>
```

index.js
```js
Page({
    /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'../../assets/index/1.png'
  },

  // 获取微信头像
  chooseavatar(event){
    console.log('event',event);
    // 目前获取的微信头像是临时路径，临时路径是有失效时间的，在实际开发中，需要将临时路径上传到公司的服务器
    console.log('222',event.detail.avatarUrl);
    this.setData({
        avatarUrl:event.detail.avatarUrl
    })
  }
})
```


### 获取微信昵称

当小程序需要让用户完善个人资料时，我们可以通过微信提供的头像、昵称填写能力快速完善。

![image](/imgs/applet/wx/wx188.png)

想使用微信提供的昵称填写能力，需要三步：
- 通过`form`组件中包裹住`input`以及`form-type`为`submit`的`button`组件
- 需要将`input`组件`type`的值设置为`nickname`，当用户输入框输入时，键盘上方会展示微信昵称
- 给`form`绑定`submit`事件，在事件处理函数中通过事件对象获取用户昵称


index.wxml
```html
<form bindsubmit="submitFun">
    <!-- 如果添加了name属性，form组件就会自动收集带有name属性的表单元素的值 -->
    <input  type="nickname" name="nickname" placeholder="请输入昵称"/>
    <!-- 如果将 form-type="submit" ，就将按钮变为提交按钮，在点击提交按钮的时候，会触发表单的提交事件bindsubmit-->
    <button type="primary" plain form-type="submit">点击获取昵称</button>
</form>
```

index.js
```js
Page({
  // 获取微信昵称
  submitFun(event){
    console.log('event',event);
    console.log('event',event.detail.value.nickname);
  }
})
```



### 转发功能

转发功能，主要帮助用户更流畅地与好友分享内容和服务

![image](/imgs/applet/wx/wx189.png)

实现转发功能，有两种方式：
- 方式1：页面js文件必须声明`onShareAppMessage`事件监听函数，并自定义转发内容。只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮。
```js
Page({
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
```
- 方式2：通过给`button`组件设置属性`open-type="share"`,可以在用户点击按钮后触发`Page.onShareAppMessage`事件监听函数。
  
```js
Page({
  /**
   * 监听页面按钮的转发
   */
  onShareAppMessage(obj) {
    console.log(obj)
    // 形参 obj.from 转发来源，from为menu时，target为undefined，否则 target 有值

    // 可以自定义返回内容，在转发时展示
    return {
      title:'这是一个非常神奇的页面',
      path:'/pages/cate/cate',
      imageUrl:'../../assets/index/2.png'
    }
  }
})
```

### 分享到朋友圈

小程序页面默认不能被分享到朋友圈，开发者需主动设置“分享到朋友圈”才可以，实现分享到朋友圈需满足两个条件：
- 页面必须设置允许“发送给朋友”，页面js文件声明`onShareAppMessage`事件监听函数
- 页面必须设置允许“分享到朋友圈”，页面js文件声明`onShareTimeline`事件监听函数


![image](/imgs/applet/wx/wx190.png)

```js
Page({
    /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
        title:'这是一个非常神奇的页面',
        path:'/pages/cate/cate',
        imageUrl:'../../assets/index/2.png'
      }
  },

  // 监听右上角 分享到朋友圈 按钮
  onShareTimeline(){
    // 可以自定义
    return{
        title:'帮我砍一下',
        query:'id=1',
        imageUrl:'../../assets/index/3.png'
    }
  }
})
```


### 手机号验证组件

手机号验证组件，用于帮助开发者向用户发起手机号申请，必须经过用户同意后，才能获得由平台验证后的手机号，进而为用户提供相应服务。

手机号验证组件分为两种：
- 手机号快速验证组件：微信平台会对号码进行验证，但不保证实时验证
```html
<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">手机号快速验证组件</button>
```
- 手机号实时验证组件：在每次请求时，平台均会对用户选择的手机号进行实时验证
```html
<button open-type="getRealtimePhoneNumber" bindgetrealtimephonenumber="getrealtimephonenumber">手机号实时验证组件</button>
```

> 注意事项：
> - 目前该接口针对非个人开发者，且完成了认证的小程序开放（不包含海外主体）
> - 两种验证组件需要付费使用，每个小程序账号将有1000次体验额度

```js
Page({
  getPhoneNumber(event){
    // 通过事件对象，可以看到，在event.detail 中可以获取到 code
    // code 动态令牌，可以使用code换取用户的手机号
    // 真正开发中，需要将code发送给后端，后端在接收到code以后，也需要调用API，换取用户的真正手机号，在换取成功以后，会将手机号返回给前端。
    console.log('event',event);
  },
  getrealtimephonenumber(event){
    console.log('event',event);
  },
})
```


### 客服功能

小程序为开发者提供了客服能力，同时为客服人员提供移动端、网页端客服工作台便于及时处理消息


使用方式：
- 需要将`button`组件`open-type`的值设置为`contact`,当用户点击后就会进入客服会话
- 在微信公众后台，绑定后的客户账号，可以登录 网页端客服 或 移动端小程序客服 进行接收、发送客服消息


![image](/imgs/applet/wx/wx191.png)

```html
<button open-type="contact">联系客服</button>
```



## VsCode 开发小程序项目

在进行项目开发的时候，有人可能不习惯微信开发者工具进行开发，而是习惯使用`VsCode`等编辑器。但是VsCode对小程序开发支持的不是很友好，如果想通过`Vscode`开发小程序项目，需要安装以下插件：
- `WXML-Language Service`，针对wxml文件，自动补全，高亮等效果
- `prettier`，代码格式化
- 微信小程序开发工具，提供小程序预览、打包上传，代码补全，语法高亮，项目模板等功能
- 微信小程序助手-Y，快速创建/删除page和component文件结构
- 小程序开发助手（overtrue,可选），代码提示，语法高亮
- 其他...

> 使用VsCode开发小程序项目时，如果需要预览、调式小程序，依然需要借助微信开发者工具


局部配置（只对当前项目生效）：
- 在项目根目录下新建`.vscode`文件夹
- 在`.vscode`文件夹中新建`settings.json`文件
- 在项目根目录下新建`.prettierrd`文件，用于格式化

全局配置
- 设置---> settings ---> open File


> 注意事项：
> 项目根目录`.vscode`文件夹中`settings.json`文件只对当前项目生效
>
> 如果想配置项生效，还需要注意：
> 在`VaCode`中只能打开当前一个小程序项目，不能同时打开多个小程序项目，且项目目录请勿嵌套打开！

## 通用模块封装

### 为什么进行模块封装

在进行项目开发的时候，我们经常的会频繁的使用到一些API。例如：`wx.showToast()`、`wx.showModal`等消息提示API，这些API的使用方法如下：
```js
wx.showToast({
  title:'微信提示框', // 提示的内容
  icon:'success', // 提示图标
  duration:2000, // 提示的延迟时间
  mask:true  // 是否显示透明蒙层，防止触摸穿透
})


wx.showModal({
  title:'提示', // 提示的标题
  content:'您确定执行该操作吗？', // 提示的内容
  confirmColor:'#f3514f', // 确定按钮的样式
  // 接口调用结束的回调函数（调用成功、失败都会执行）
  complete({confirm,cancel}){
    if(confirm){
      console.log('用户点击了确定')
      return;
    }
    if(cancel){
      console.log('用户点击了取消')
      return;
    }
  }
})
```


如果每次使用的时候，都直接调用这些`API`，会导致代码冗余，为了减少代码冗余，我们需要将这些`API`封装成公共方法，封装后的使用方式如下：
```js
// wx.showToast() 封装后的调用方式
toast()
toast({title:'数据加载失败...',mask:true})


// wx.showModal() 封装后的调用方式
const res = await modal({
  title:'提示',
  content:'鉴权失败，请重新登录'
})

// 用户点击了确定
if(res){
  // ...
}else{
  // ...
}
```

### 消息提示模块封装

基本使用：
- `wx.showToast()` 消息提示框是在项目中频繁使用的一个小程序`API`,常用来给用户进行消息提示反馈，使用方式如下：
```js
wx.showToast({
  title:'微信提示框', // 提示的内容
  icon:'success', // 提示图标
  duration:2000, // 提示的延迟时间
  mask:true  // 是否显示透明蒙层，防止触摸穿透
})
```  


封装思路：
- 创建一个`toast`方法，对`wx.showToast()`方法进行封装
- 调用该方法时，传递对象作为参数
  - 如果没有传递任何参数，设置一个空对象`{}`作为默认参数
  - 从对象中包含`title`、`icon`、`duration`、`mask`参数，并给参数设置默认值
- 在需要显示弹出框的时候调用`toast`方法，并传入相关的参数，有两种参数方式：
  - 不传递参数，使用默认值
  - 传入部分参数，覆盖默认的参数


调用方式：
- 模块化的方式导入使用
```js
import {toast} from './extendApi'

toast()
toast({title:'数据加载失败',mask:true})
```
- 将封装的模块挂载到`wx`全局对象上
```js
wx.toast()
wx.toast({title:'数据加载失败',mask:true})
```

实现步骤：
- 在`utils`目录下新建`extendApi.js`文件
- 对`wx.showToast()`方法进行封装


落地代码：

utils/extendApi.js
```js

// 在使用toast方法时，可以传入参数，也可以不传参数
/**
 * 如果需要传入参数，要传入对象作为参数
 * const toast = (oprions={})=>{}
 * 
 * 如果用户传入了对象作为参数
 * 在形参位置通过解构的方式获取用户传入的参数，同时设置默认值
 * const toast = ({title='数据加载中...',icon='none',duration=2000,mask=true}={})=>{}
 */

const toast = ({title='数据加载中...',icon='none',duration=2000,mask=true}={})=>{
    wx.showToast({
        title, // 提示的内容
        icon, // 提示图标
        duration, // 提示的延迟时间
        mask // 是否显示透明蒙层，防止触摸穿透
      })
}


// 如果有很多.js文件，都需要调用toast方法
// 每次使用都需要导入 toast，然后进行调用，太麻烦
// 可以将toast方法挂载到wx全局对象上
wx.toast = toast



// 如果其他.js文件，需要使用toast方法
// 需要先导入toast，然后进行调用才可以
export {toast}
```

app.js
```js
// import {toast} from  './utils/extendApi'

import './utils/extendApi' //执行该文件，将toast方法挂载到全局对象wx上

App({
})

```



### 模态对话框封装

基本使用：
- `wx.showModal()`模态对话框也是在项目中频繁使用的一个小程序API，通常用于向用户询问是否执行一些操作，例如：询问用户是都真的需要退出、是否确认删除等等。

```js
wx.showModal({
  title:'提示', // 提示的标题
  content:'您确定执行该操作吗？', // 提示的内容
  confirmColor:'#f3514f',
  // 接口调用结束的回调函数（调用成功、失败都会执行）
  complete({confirm,cancel}){
    confirm && console.log('点击了确定')
    cancel && console.log('点击了取消')
  }
})
```


封装思路：
- 对`wx.showModal()`方法进行封装，封装后的新方法叫`modal`
- 调用该方法时，传递对象作为参数，对象的参数统`wx.showModal()`参数一致
- 封装的`modal`方法的内部通过`Promise`返回用户执行的操作（确定和取消，都通过`resolve`返回）
- 在需要调用模态对话框的时候调用`modal`方法，并传入相关的参数，有两种参数方式：
  - 不传递参数，使用默认参数
  - 传递参数，覆盖默认的参数


调用方式：
- 模块化的方式导入使用
- 将封装的模块挂载到`wx`全局对象身上

实现步骤：
- 在`extendApi.js`文件中新建`modal`方法，方法内部
- `modal`方法，方法内部用来处理封装的逻辑


落地代码：

utils/extendApi.js
```js

// 在使用toast方法时，可以传入参数，也可以不传参数
/**
 * 如果需要传入参数，要传入对象作为参数
 * const toast = (oprions={})=>{}
 * 
 * 如果用户传入了对象作为参数
 * 在形参位置通过解构的方式获取用户传入的参数，同时设置默认值
 * const toast = ({title='数据加载中...',icon='none',duration=2000,mask=true}={})=>{}
 */

const toast = ({title='数据加载中...',icon='none',duration=2000,mask=true}={})=>{
    wx.showToast({
        title, // 提示的内容
        icon, // 提示图标
        duration, // 提示的延迟时间
        mask // 是否显示透明蒙层，防止触摸穿透
      })
}

// 在使用modal方法时，可以传入参数，也可以不传参数
/**
 * 如果传递参数，参数需要是一个对象，对象中的属性需要和wx.showModal 参数保持一致
 * 如果不传递参数，默认值就是空对象
 */
const modal = (options={})=>{
    // 在方法内部需要通过Promise返回用户的操作
    // 如果用户点击了确定，需要通过 resolve 返回 true
    // 如果用户点击了取消，需要通过 resolve 返回 false
    return new Promise((resolve)=>{
        // 默认的参数
        const defaultOpt ={
            title:'提示', // 提示的标题
            content:'您确定执行该操作吗？', // 提示的内容
            confirmColor:'#f3514f'
        }

        // 通过 Object.assign 方法将参数进行合并
        const opts = Object.assign({},defaultOpt,options)
        wx.showModal({
            ...opts,
            complete({confirm,cancel}){
                confirm && resolve(true)
                cancel && resolve(false)
            }
        })


    })
}




// 如果有很多.js文件，都需要调用toast方法
// 每次使用都需要导入 toast，然后进行调用，太麻烦
// 可以将toast方法挂载到wx全局对象上
wx.toast = toast
wx.modal = modal


// 如果其他.js文件，需要使用toast方法
// 需要先导入toast，然后进行调用才可以
export {toast,modal}
```






### 封装本地存储同步API

思路分析：
- 在小程序中，经常需要将一些数据存储到本地，方便多个页面的读取使用，例如：将用户的登录状态、用户的个人信息存储到本地。
- 小程序提供了同步、异步两类API来实现本地存储操作。例如：`wx.setStorageSync、wx.setStorage`等方法

```js
try{
  wx.setStorageSync(key,value)
} catch(err) {
  console.error(`存储指定${key}数据发生错误：`, err)
}


wx.setStorage({
  key:'key',
  data:'data',
  success(res)=>{},
  fail(err)=>{}
})

```

如果直接使用这些API，会比较麻烦，通常情况下，我们需要对本地存储方法进行封装。



实现步骤：
- 在`utils`目录下，新建`storage.js`文件
- 在该文件中，封装对本地数据进行存储、获取、删除、清除的方法


落地代码
```js
/**
 * 存储数据
 * key 本地缓存中指定的key
 * value 需要缓存的数据
*/
export const setStorage = (key,value)=>{
  try{
    wx.setStorageSync(key,value)
  }catch(err){
    console.error(`存储指定${key}数据发生错误：`, err)
  }
}


/**
 * 从本地读取对应key的数据
*/
export const getStorage = (key)=>{
  try{
    const value = wx.getStorageSync(key)
    if(value){
      return value
    }
  }catch(err){
    console.error(`获取指定${key}数据发生错误：`, err)
  }
}

/**
 * 从本地移除对应key的数据
*/
export const removeStorage = (key)=>{
  try{
    wx.removeStorageSync(key)
  }catch(err){
    console.error(`移除指定${key}数据发生错误：`, err)
  }
}

/**
 * 从本地清空全部的数据
*/
export const clearStorage = ()=>{
  try{
    wx.clearStorageSync()
  }catch(err){
    console.error(`清空本地存储发生错误：`, err)
  }
}
```


app.js
```js
import {setStorage,getStorage,removeStorage,clearStorage} from './utils/storage';



```



### 封装本地存储异步API



思路分析：
- 使用`Promise`封装异步存储API

```js
wx.setStorage({
  key:'key',
  data:'data',
  success(res){},
  fail(err){},
  complete(res){}
})
```



使用方式：
```js
// 异步将数据存储到本地
asyncSetStorage(key,data)

// 异步从本地读取指定key的数据
asyncGetStorage(key)

// 异步从本地移除指定key的数据
asyncRemoveStorage(key)

// 异步从本地移除、清空全部的数据
asyncClearStorage()
```


落地代码：

utils/storage.js
```js
 /**  异步存储 */

  /**
   * @description 异步将数据存储到本地
   * @param {*} key 本地缓存中指定的key
   * @param {*} data 需要缓存的数据
   */
  export const asyncSetStorage = (key,data)=>{
    return new Promise((resolve)=>{
        wx.setStorage({
            key,
            data,
            complete(res){
                resolve(res)
            }
        })
    })
  }

  /**
   * @description 异步从本地获取指定key的数据
   * @param {*} key 
   */
  export const asyncGetStorage = (key)=>{
    return new Promise((resolve)=>{
        wx.getStorage({
            key,
            complete(res){
                resolve(res)
            }
        })
    })
  }

    /**
   * @description 异步从本地移除指定key的数据
   * @param {*} key 
   */
  export const asyncRemoveStorage = (key)=>{
    return new Promise((resolve)=>{
        wx.removeStorage({
            key,
            complete(res){
                resolve(res)
            }
        })
    })
  }


      /**
   * @description 异步从本地移除全部缓存的数据
   */
  export const asyncClearStorage = ()=>{
    return new Promise((resolve)=>{
        wx.clearStorage({
            complete(res){
                resolve(res)
            }
        })
    })
  }
```

app.js
```js
import {asyncSetStorage,asyncGetStorage,asyncRemoveStorage,asyncClearStorage} from './utils/storage';

asyncSetStorage('name','jjj').then((res)=>{
  console.log(res)
})

```



## 网络请求封装

### 为什么要封装wx.request

小程序大多数API都是异步API，如`wx.request()`、`wx.login()`等。这类API接口通常都接收一个`Object`对象类型的参数，参数中可以按需指定以下字段来接收接口调用结果：

| 参数名   | 类型     | 必填 | 说明                                         |
| -------- | -------- | ---- | -------------------------------------------- |
| success  | function | 否   | 调用成功的回调函数                           |
| fail     | function | 否   | 调用失败的回调函数                           |
| complete | function | 否   | 调用结束的回调函数（调用成功、失败都会执行） |


```js
wx.request({
  // 接口调用成功的回调函数
  success(){},

  // 接口调用失败的回调函数
  fail(){},
  // 接口调用结束的回调函数（调用成功、失败都会执行）
  complete(){}
})
```



如果采用这种回调函数的方法接收返回的值，可能会出现多层`success`套用的情况，容易出现回调地狱问题。


为了解决这个问题，小程序基础库从2.10.2版本起，异步API支持`callback & promise`两种调用方式。

当接口参数`Object`对象中不包含`success/fail/complete`时，将默认返回`promise`,否则仍按回调方式执行，无返回值。


但是部分接口如`downloadFile`、`request`、`uploadFile`等本身就有返回值，因此不支持`promise`调用方式，它们的`promisify`需要开发者自行封装。


`Axios`是我们日常开发中常用的一个基于`promise`的网络请求库。我们可以参考`Axios`的使用方式来封装自己的网络请求模块，咱们看一下使用的方式：

[网络请求模块封装 mina-request](https://www.npmjs.com/package/mina-request)



### 请求封装-request方法

思路分析：在封装网络请求模块的时候，采用`Class`类来进行封装，采用类的方式封装代码更具可复用性，也方便添加新的方法和属性，提高代码的扩展性。


我们先创建一个class类，同时定义`constructor`构造函数
```js
// 创建 WxRequest 类
class WxRequest(){
  constructor(){}
}
```

我们在 WxRequest 类内部封装一个 `request`实例方法
- `request`实例方法中需要使用`Promise`封装`wx.request`,也就是使用`Promise`处理`wx.request`的返回结果
- `request`实例方法接收一个`options`对象作为形参，`options`参数和调用`wx.request`时传递的请求配置项一致
  - 接口调用成功时，通过`resolve`返回响应数据
  - 接口调用失败时，通过`reject`返回错误原因



封装request

utils/request.js
```js
/**
 * 创建 WxRequest 类
 * 通过类的方式进行封装，会让代码更加具有复用性
 * 也可以方便添加新的属性和方法
 */
class WxRequest{
    // 用于创建和初始化类的属性及方法
    constructor(){

    }

    // request 实例方法接收一个对象类型的参数
    // 属性值和wx.request 方法调用时传递参数保持一致
    request(options){
        // 需要使用 Promise封装wx.request 处理异步请求
        return new Promise((resolve,reject)=>{
            wx.request({
                ...options,
                // 当接口调用成功时会触发 success 回调函数
                success:(res)=>{
                    resolve(res)
                },
                // 当接口调用失败时会触发 fail 回调函数
                fail:(err)=>{
                    reject(err)
                }
            })
        })
    }
}



// --------------------------------- 以下时实例化的代码 -----------------------------------
// 目前写到同一个文件中，是为了方便进行测试，以后会提取成多个文件


//  对 WxRequest 进行实例化
const instance = new WxRequest()

//  将  WxRequest实例进行暴露出去，方便在其他文件中国进行使用
export default instance;
```



在其他模块中引入封装后的文件后，我们期待通过`request()`方式发起请求，以`promise`的方式返回参数
```js
// 导入创建的实例
import instance from '../../utils/wx-request'

Page({

  // 点击按钮触发 handler方法
  // 调用方式1 async await  
  async handler(){
    // 通过实例调用 request 方法发送请求
    const res = await instance.request({
      url:'https://gmall-prod.atguigu.cn/mall-api/index/findBanner',
      method:'GET'
    })

    console.log(res)
  },

  // 调用方式2 then
  handler1(){
    // 通过实例调用 request 方法发送请求
   instance.request({
      url:'https://gmall-prod.atguigu.cn/mall-api/index/findBanner',
      method:'GET'
    }).then((res)=>{
      console.log(res)
    })


  }
})
```





### 请求封装-设置请求参数

思路分析：
- 在发起网络请求时，需要配置一些请求参数，其中有一些参数我们可以设置为默认参数，例如：请求方法、超时时长等，因此我们在封装时我们要定义一些默认的参数。

```js
// 默认参数对象
defaults = {
  baseURL:'',
  url:'',
  data:null,
  method:'GET',
  header:{
    'Content-type':'application/json'  // 设置数据的交互格式
  },
  timeout:60000
}
```


但是不同项目，请求参数的设置是不同的，我们还需要允许在进行实例化的时候，传入参数，对默认的参数进行修改。例如：
```js
// 对WxRequest进行实例化
const instance = new WxRequest({
  baseURL:'',
  timeout:10000
})

```


在通过实例调用 request 实例方法时也会传入相关的请求参数
```js
const res = await instance.request({
  url:'/index/findBanner',
  method:'GET'
})
```

从而得出结论：请求参数的设置有三种方式
- 默认参数：在`WxRequest`类中添加`defaults`实例属性来设置默认值
- 实例化时参数：在对`WxRequest`类进行实例化时传入相关的参数，需要在`constructor`构造函数形参进行接收
- 调用实例方法时传入请求参数

默认参数和自定义参数的合并操作，通常会在`constructor`中进行。

因此我们就在`constructor`中将开发者传入的相关参数和`defaults`默认值进行合并，需要传入的配置项覆盖默认配置项


request.js
```js

/**
 * 创建 WxRequest 类
 * 通过类的方式进行封装，会让代码更加具有复用性
 * 也可以方便添加新的属性和方法
 */
class WxRequest{

    // 定义实例属性，用来设置默认请求参数
    defaults = {
        baseURL:'', // 基准路径
        url:'',
        data:null,
        method:'GET',
        // 请求头
        header:{
          'Content-type':'application/json'  // 设置数据的交互格式
        },
        timeout:60000 // 小程序默认超时时长1min
    }
    // 用于创建和初始化类的属性及方法
    // 在实例化时传入的参数，会被 constructor 形参进行接收
    constructor(params={}){
        this.defaults = Object.assign({},this.defaults,params)
    }

    // request 实例方法接收一个对象类型的参数
    // 属性值和wx.request 方法调用时传递参数保持一致
    request(options){
        // 注意：需要先合并完整的请求地址（baseURL + url）
        // https://gmall-prod.atguigu.cn/mall-api/index/findBanner
        options.url = this.defaults.baseURL + options.url

        // 合并请求参数
        options = {...this.defaults,...options}

        // 需要使用 Promise封装wx.request 处理异步请求
        return new Promise((resolve,reject)=>{
            wx.request({
                ...options,
                // 当接口调用成功时会触发 success 回调函数
                success:(res)=>{
                    resolve(res)
                },
                // 当接口调用失败时会触发 fail 回调函数
                fail:(err)=>{
                    reject(err)
                }
            })
        })
    }
}



// --------------------------------- 以下时实例化的代码 -----------------------------------
// 目前写到同一个文件中，是为了方便进行测试，以后会提取成多个文件


//  对 WxRequest 进行实例化
const instance = new WxRequest({
    baseURL:'https://gmall-prod.atguigu.cn/mall-api',
    timeout:15000
})

//  将  WxRequest实例进行暴露出去，方便在其他文件中国进行使用
export default instance;
```


index.js
```js
// 导入创建的实例
import instance from '../../utils/request'
Page({
    async handler(){
        const res = await instance.request({
            url:'/index/findBanner',
            method:'GET'
          })
      
          console.log(res)
    }
})

```



### 请求封装-请求快捷方法

思路分析：
- 每次发送请求时都使用`request()`方法即可，但是项目中的接口地址有很多，不是很简洁
```js
const res = await instance.request({
    url:'/index/findBanner',
    method:'GET'
})
```

所以我们在`request()`基础上封装一些快捷方法，简化`request()`的调用。

需要封装4个快捷方法，分别是`get`、`delete`、`post`、`put`，它们的调用方式如下：
```js
instance.get('请求地址','请求参数','请求配置')
instance.delete('请求地址','请求参数','请求配置')
instance.post('请求地址','请求参数','请求配置')
instance.put('请求地址','请求参数','请求配置')
```

这4个请求方法，都是通过实例化的方法进行调用，所以需要`Request`类中暴露出来`get`、`delete`、`post`、`put`方法。每个方法接收三个参数，分别是：接口地址、请求参数以及其他参数。


这4个快捷方法，本质上其实还是调用`request`方法，我们只要在方法内部组织好参数，调用`request`发送请求即可。


request.js
```js
class WxRequest{
  // coding...

  // 封装 GET 实例方法
  get(url,data={},config={}){
    return this.request(Object.assign({url,data,method:'GET'},config))
  }

  
  // 封装 DELETE 实例方法
  delete(url,data={},config={}){
    return  this.request(Object.assign({url,data,method:'DELETE'},config))
  }


  // 封装 POST 实例方法
  post(url,data={},config={}){
    return  this.request(Object.assign({url,data,method:'POST'},config))
  }

  // 封装 PUT 实例方法
  put(url,data={},config={}){
    return  this.request(Object.assign({url,data,method:'PUT'},config))
  }
}
```


index.js
```js
// 导入创建的实例
import instance from '../../utils/request'
Page({
    async handler(){
        const res = await instance.get('/index/findBanner',{test:1})
        console.log(res)
    }
})
```


> 注意事项：
> - 在使用`wx.request`发送网络请求时，只要成功接收到服务器返回，无论`statusCode`是多少，都会进入`success`回调，开发者根据业务逻辑对返回值进行判断。
> - 什么时候会有`fail`回调函数？ 一般只有网络出现异常、请求超时等时候才会走`fail`回调。



### 请求封装-定义请求/响应拦截器

思路分析：
- 为了方便统一处理请求参数以及服务器响应结果，为`WxRequest`添加拦截器功能，拦截器包括**请求拦截器** 和 **响应拦截器**
- **请求拦截器**本质上是在请求之前调用的函数，用来对请求参数进行新增和修改
- **响应拦截器**本质上是在请求之后调用的函数，用来对响应数据做点什么

> 注意：不管成功响应还是失败响应，都会执行响应拦截器。

拦截器的使用方式：
```js
// 请求拦截器
instance.interceptors.request = (config)=>{
  // 在发送请求之前做点什么

  return config
}


// 响应拦截器
instance.interceptors.response = (response)=>{
  // 对响应数据做点什么
  return response
}
```




实现拦截器的思路：
- 在`WxRequest`类内部定义`interceptors`实例属性，属性中需要包含`request`以及`response`方法
- 是否通过实例调用了拦截器
  - 是：实例调用的拦截器覆盖默认拦截器
  - 否：定义默认拦截器
- 在发送请求之前，调用请求拦截器
- 在服务器响应以后，调用响应拦截器
  - 不管成功、失败响应，都需要调用响应拦截器
  - 在响应拦截器，我们需要判断是请求成功还是失败，然后进行不同的业务逻辑处理。（eg:请求成功以后将数据简化返回，网络出现异常则给用户进行网络异常提示。）

响应拦截器封需求：
- 如果请求成功，将响应成功的数据传递给响应拦截器，同时在传递的数据中新增`isSuccess:true`字段，表示请求成功。
- 如果请求失败，将响应失败的数据传递给响应拦截器，同时在传递的数据中新增`isSuccess:false`字段，表示请求失败。


使用请求拦截器：
- 在发送请求时，购物车列表、收货地址、更新头像等接口，都需要进行权限验证，因此我们需要在请求拦截器中判断本地是否存在访问令牌`token`,如果存在就需要在请求头中添加`token`字段。


使用响应拦截器：
- 在使用`wx.request`发送网络请求时。只要成功接收到服务器返回，无论`statusCode`是多少，都会进入`success`回调。因此开发者根据业务逻辑对返回值进行判断。
  - 业务状态码 200，说明接口请求成功，服务器成功返回了数据
  - 业务状态码 208，说明没有`token`或者`token`过期失效，需要登录或者重新登录
  - 业务状态码 其他，说明请求或者响应出现了异常


落地代码：

utils/request.js
```js
/**
 * 创建 WxRequest 类
 * 通过类的方式进行封装，会让代码更加具有复用性
 * 也可以方便添加新的属性和方法
 */
class WxRequest{

    // 定义实例属性，用来设置默认请求参数
    defaults = {
        baseURL:'', // 基准路径
        url:'',
        data:null,
        method:'GET',
        // 请求头
        header:{
          'Content-type':'application/json'  // 设置数据的交互格式
        },
        timeout:60000 // 小程序默认超时时长1min
    }

    // 定义拦截器对象
    // 需要包含 请求拦截器以及响应拦截器
    interceptors = {
        // 请求拦截器
        request:(config)=>{
            return config
        },

        // 响应拦截器
        response:(response)=>{
            return response
        }

    }

    // 用于创建和初始化类的属性及方法
    // 在实例化时传入的参数，会被 constructor 形参进行接收
    constructor(params={}){
        this.defaults = Object.assign({},this.defaults,params)
    }

    // request 实例方法接收一个对象类型的参数
    // 属性值和wx.request 方法调用时传递参数保持一致
    request(options){
        // 注意：需要先合并完整的请求地址（baseURL + url）
        // https://gmall-prod.atguigu.cn/mall-api/index/findBanner
        options.url = this.defaults.baseURL + options.url

        // 合并请求参数
        options = {...this.defaults,...options}

        // 在请求发送之前，调用请求拦截器，新增和修改请求参数
        options = this.interceptors.request(options)


        // 需要使用 Promise封装wx.request 处理异步请求
        return new Promise((resolve,reject)=>{
            wx.request({
                ...options,
                // 当接口调用成功时会触发 success 回调函数
                success:(res)=>{
                    // 不管是成功响应还是失败响应，都需要调用响应拦截器
                    // 响应拦截器需要接收服务器响应的数据，然后对数据进行逻辑处理，处理好以后进行返回
                    // 然后再通过 resolve 将返回的数据抛出去


                    // 在给响应拦截器传递参数时，需要将请求参数也一起传递
                    // 方便进行代码的调试或者其他逻辑处理，需要先合并参数
                    // 然后将合并的参数传递给响应拦截器
                    const mergeRes = Object.assign({},res,{config:options,isSuccess:true})


                    // resolve(res)
                    resolve(this.interceptors.response(mergeRes))
                },
                // 当接口调用失败时会触发 fail 回调函数
                fail:(err)=>{
                    // 不管是成功响应还是失败响应，都需要调用响应拦截器
                    // reject(err)
                    const mergeErr = Object.assign({},err,{config:options,isSuccess:false})
                    reject(this.interceptors.response(mergeErr))
                }
            })
        })
    }

    // 封装 GET 实例方法
    get(url,data={},config={}){
        return this.request(Object.assign({url,data,method:'GET'},config))
    }

    
    // 封装 DELETE 实例方法
    delete(url,data={},config={}){
        return this.request(Object.assign({url,data,method:'DELETE'},config))
    }


    // 封装 POST 实例方法
    post(url,data={},config={}){
        return this.request(Object.assign({url,data,method:'POST'},config))
    }

    // 封装 PUT 实例方法
    put(url,data={},config={}){
        return this.request(Object.assign({url,data,method:'PUT'},config))
    }
}


export default WxRequest
```

utils/http.js
```js
// --------------------------------- 以下时实例化的代码 -----------------------------------

import  WxRequest from './request'
import { getStorage,clearStorage } from './storage'
import { modal,toast } from './extendApi'
//  对 WxRequest 进行实例化
const instance = new WxRequest({
    baseURL:'https://gmall-prod.atguigu.cn/mall-api',
    timeout:15000
})


// 配置请求拦截器
instance.interceptors.request = (config)=>{
    // 在发送请求之前做些什么

    // 在发送请求之前，需要先判断本地是否存在访问令牌 token 
    const token = getStorage('token')
    if(token){
        config.header['token'] = token;
    }

    // 如果存在token,就需要在请求头中添加token字段
    return config
}

// 配置响应拦截器
instance.interceptors.response = async (response)=>{
    console.log('response',response)
    const { isSuccess,data } = response;
    if(!isSuccess){
        wx.showToast({
            title:'网络异常测试',
            icon:'error'
        })
    }

    // 判断服务器响应的业务代码
    switch(data.code){
        // 如果后端返回的业务状态码是200，说明请求成功，服务器成功返回了数据
        case 200:
            return data
        // 业务状态码 208，说明没有`token`或者`token`过期失效，需要登录或者重新登录
        case 208:
            const res = await modal({
                content:'鉴权失败，请重新登录',
                showCancel:false  // 不显示取消按钮
            })

            if(res){
                // 清楚之前失效的token及本地存储的所有信息
                clearStorage()

                wx.navigateTo({
                  url: '/pages/login/login',
                })
            }

            return Promise.reject(response)
        default:
            toast({
                title:'程序出现异常，请联系客服或稍后重试'
            })
            return Promise.reject(response)
    }
    // 在服务器响应之后做些什么
    // return response
    // return data
}



//  将  WxRequest实例进行暴露出去，方便在其他文件中国进行使用
export default instance;
```


pages/index/index.js
```js
// 导入创建的实例
import instance from '../../utils/http'
Page({
    async handler(){
        // const res = await instance.request({
        //     url:'/index/findBanner',
        //     method:'GET'
        //   })

        const res = await instance.get('/index/findBanner',{test:1}).catch((err)=>{

        })
        console.log(res)
    }
})
```


### 请求封装-添加并发请求

思路分析：
- 前端并发请求是指在前端页面同时向后端发起多个请求的情况。当一个页面需要请求多个接口获取数据时，为了提高页面的加载速度和用户体验，可以同时发起多个请求，这些请求之间就是并发的关系。


我们通过两种方式发起多个请求：
- 使用`async`和`await`方式
- 使用`Promise.all()` 方式


首先使用`async`和`await`方式发送请求，使用`async`和`await`能够控制异步任何以同步的流程执行，代码如下，这时候就会产生一个问题，当第一个请求执行完以后，才能执行第二个请求，这样就会造成请求的堵塞，影响渲染的速度，如下图：
```js
// 导入创建的实例
import instance from '../../utils/http'
Page({
    async handler(){
        await instance.get('/index/findBanner')
        await instance.get('/index/findBanner')
        await instance.get('/index/findBanner')
        await instance.get('/index/findBanner')
    }
})
```

`Promise.all()` 能够将多个异步请求同时进行发送，也就是并行发送，并不会造成请求的堵塞
```js
// 导入创建的实例
import instance from '../../utils/http'
Page({
    async handler(){
        // 
        await Promise.all([instance.get('/index/findBanner'),instance.get('/index/findBanner'),instance.get('/index/findBanner')，instance.get('/index/findBanner')])


        // 也可用封装的实例all方法
        // await instance.all(instance.get('/index/findBanner'),instance.get('/index/findBanner'),instance.get('/index/findBanner')，instance.get('/index/findBanner'))
    }
})
```



### 请求封装-添加loading

思路分析：
- 在封装时添加`loading`效果，从而提高用户使用体验
  - 在请求发送之前，需要通过`wx.showLoading`展示`loading`效果
  - 当服务器响应数据以后，需要调用`wx.hideLoading`隐藏`loading`效果

> 要不要将`loading`添加到`WxRequest`内部？
> - 在类内部进行添加，方便多个项目直接使用类提供的`loading`效果，也方便统一优化`wx.showLoading`使用体验。但是不方便自己来进行`loading`个性化定制。
> - 如果想自己来控制`loading`效果，带来更丰富的交互体验，就不要将`loading`封装到内部类，但是需要开发者自己来优化`wx.showLoading`使用体验，每个项目都要写一份。


大家可以按照自己的业务需求进行封装，在项目中我们会选择第一种方式。不过也会通过属性控制是否展示`loading`,从而方便类使用者自己控制`loading`显示。


`loading`的展示和隐藏会存在以下问题：
- 每次请求都会执行`wx.showLoading()`,但是页面中只会显示一个，后面的`loading`会将前面的覆盖。
- 同时发起多次请求，只要有一个请求成功响应就会调用`wx.hideLoading()`,导致其他请求还没完整，也不会`loading`。
- 请求过快 或 一个请求在另一个请求后立即触发，这时候会出现`loading`闪烁问题。


我们通过**队列**的方式解决这三个问题：首先在类中新增一个实例属性`queue`,初始值是一个空数组。
- 发送请求之前，判断`queue`,如果是空数组则显示`loading`,然后立即向`queue`新增请求标识。
- 在`complete`中每次请求成功结束，从`queue`中移除一个请求标识，`queue`为空时隐藏`loading`。
- 为了解决网络请求过快产生`loading`闪烁问题,可以使用定时器来做判断即可。


在实际开发中，有的接口可能不需要显示`loading`效果，或者开发者希望自己来控制`loading`的样式与交互，那么就需要关闭默认的`loading`效果。这时候我们就需要一个开关来控制`loading`显示。
- 类内部设置默认请求参数`isLoading`属性，默认值是`true`,在类内部根据`isLoading`属性做判断即可。
- 某个接口不需要显示`loading`效果，可以在发送请求的时候，新增请求配置`isLoading`设置为`false`。
- 整个项目都不需要显示`loading`效果，可以在实例化的时候，传入`isLoading`配置为`false`。


落地代码：

utils/request.js
```js

/**
 * 创建 WxRequest 类
 * 通过类的方式进行封装，会让代码更加具有复用性
 * 也可以方便添加新的属性和方法
 */
class WxRequest{

    // 定义实例属性，用来设置默认请求参数
    defaults = {
        baseURL:'', // 基准路径
        url:'',
        data:null,
        method:'GET',
        // 请求头
        header:{
          'Content-type':'application/json'  // 设置数据的交互格式
        },
        timeout:60000, // 小程序默认超时时长1min
        isLoading:true // 控制是否使用默认的 loading,默认值true表示使用默认的loading
    }

    // 定义拦截器对象
    // 需要包含 请求拦截器以及响应拦截器
    interceptors = {
        // 请求拦截器
        request:(config)=>{
            return config
        },

        // 响应拦截器
        response:(response)=>{
            return response
        }
    }

    // 定义数组队列
    // 初始值需要设置一个空数组，用来存储请求队列、存储请求标识
    queue = []

    // 用于创建和初始化类的属性及方法
    // 在实例化时传入的参数，会被 constructor 形参进行接收
    constructor(params={}){
        this.defaults = Object.assign({},this.defaults,params)
    }

    // request 实例方法接收一个对象类型的参数
    // 属性值和wx.request 方法调用时传递参数保持一致
    request(options){
        // 如果有新的请求，就清除上一次定时器
        this.timerId && clearTimeout(this.timerId)
        // 注意：需要先合并完整的请求地址（baseURL + url）
        // https://gmall-prod.atguigu.cn/mall-api/index/findBanner
        options.url = this.defaults.baseURL + options.url

        // 合并请求参数
        options = {...this.defaults,...options}

        if(options.isLoading){
            // 在请求发送之前，添加loading效果
            // 判断 queue 队列是否为空，如果是空，就提示 loading，如果不是空，就不显示 loading
            this.queue.length ===0 && wx.showLoading()
            // 然后立即向 queue 数组队列中添加请求标识
            // 每个标识代表是一个请求，标识是自定义的
            this.queue.push('request')
        }
      


        // 在请求发送之前，调用请求拦截器，新增和修改请求参数
        options = this.interceptors.request(options)


        // 需要使用 Promise封装wx.request 处理异步请求
        return new Promise((resolve,reject)=>{
            wx.request({
                ...options,
                // 当接口调用成功时会触发 success 回调函数
                success:(res)=>{
                    // 不管是成功响应还是失败响应，都需要调用响应拦截器
                    // 响应拦截器需要接收服务器响应的数据，然后对数据进行逻辑处理，处理好以后进行返回
                    // 然后再通过 resolve 将返回的数据抛出去


                    // 在给响应拦截器传递参数时，需要将请求参数也一起传递
                    // 方便进行代码的调试或者其他逻辑处理，需要先合并参数
                    // 然后将合并的参数传递给响应拦截器
                    const mergeRes = Object.assign({},res,{config:options,isSuccess:true})


                    // resolve(res)
                    resolve(this.interceptors.response(mergeRes))
                },
                // 当接口调用失败时会触发 fail 回调函数
                fail:(err)=>{
                    // 不管是成功响应还是失败响应，都需要调用响应拦截器
                    // reject(err)
                    const mergeErr = Object.assign({},err,{config:options,isSuccess:false})
                    reject(this.interceptors.response(mergeErr))
                },
                // 当接口调用结束的回调函数（调用成功、失败都会执行）
                complete:()=>{
                    if(options.isLoading){
                        // 每次从 queue 队列中删除一个标识
                        this.queue.pop()
                        this.queue.length===0 && this.queue.push('request')
                        this.timerId = setTimeout(()=>{
                            this.queue.pop()
                            // 在删除标识以后，需要判断目前 queue 数组是否为空
                            // 如果是空，说明并发请求完成了，就需要隐藏loading
                            this.queue.length===0 && wx.hideLoading()

                            clearTimeout(this.timerId)
                        },1)
                    }
                }
            })
        })
    }

    // 封装 GET 实例方法
    get(url,data={},config={}){
        return this.request(Object.assign({url,data,method:'GET'},config))
    }

    
    // 封装 DELETE 实例方法
    delete(url,data={},config={}){
        return this.request(Object.assign({url,data,method:'DELETE'},config))
    }


    // 封装 POST 实例方法
    post(url,data={},config={}){
        return this.request(Object.assign({url,data,method:'POST'},config))
    }

    // 封装 PUT 实例方法
    put(url,data={},config={}){
        return this.request(Object.assign({url,data,method:'PUT'},config))
    }

    // 用来处理并发请求
    all(...promise){
        // 通过展开运算符接收传递的参数
        // 那么展开运算符会将传入的参数转成数组
        promise.all(promise)
    }
}


export default WxRequest

```


utils/http.js
```js
// --------------------------------- 以下时实例化的代码 -----------------------------------

import  WxRequest from './request'
import { getStorage,clearStorage } from './storage'
import { modal,toast } from './extendApi'
//  对 WxRequest 进行实例化
const instance = new WxRequest({
    baseURL:'https://gmall-prod.atguigu.cn/mall-api',
    timeout:15000,
    // isLoading:false // 如果整个项目都不需要loading,此处设置为false即可
})


// 配置请求拦截器
instance.interceptors.request = (config)=>{
    // 在发送请求之前做些什么

    // 在发送请求之前，需要先判断本地是否存在访问令牌 token 
    const token = getStorage('token')
    if(token){
        config.header['token'] = token;
    }

    // 如果存在token,就需要在请求头中添加token字段
    return config
}

// 配置响应拦截器
instance.interceptors.response = async (response)=>{
    console.log('response',response)
    const { isSuccess,data } = response;
    if(!isSuccess){
        wx.showToast({
            title:'网络异常测试',
            icon:'error'
        })
    }

    // 判断服务器响应的业务代码
    switch(data.code){
        // 如果后端返回的业务状态码是200，说明请求成功，服务器成功返回了数据
        case 200:
            return data
        // 业务状态码 208，说明没有`token`或者`token`过期失效，需要登录或者重新登录
        case 208:
            const res = await modal({
                content:'鉴权失败，请重新登录',
                showCancel:false  // 不显示取消按钮
            })

            if(res){
                // 清楚之前失效的token及本地存储的所有信息
                clearStorage()

                wx.navigateTo({
                  url: '/pages/login/login',
                })
            }

            return Promise.reject(response)
        default:
            toast({
                title:'程序出现异常，请联系客服或稍后重试'
            })
            return Promise.reject(response)
    }
    // 在服务器响应之后做些什么
    // return response
    // return data
}



//  将  WxRequest实例进行暴露出去，方便在其他文件中国进行使用
export default instance;
```

pages/index/index.js
```js
// 导入创建的实例
import instance from '../../utils/http'
Page({
    async handler(){
        const res = await instance.get('/index/findBanner',null,{isLoading:false})
        console.log('99',res)
    }
})
```


## 封装uploadFile

思路分析：
- `wx.uploadFile`也是我们在开发中常用的一个`API`,用来将本地资源上传到服务器。

例如：在获取微信头像以后，将微信头像上传到公司服务器。
```js
wx.uploadFile({
  url:'',// 必填项，开发者服务器地址
  filePath:'',// 必填项，要上传文件资源的路径（本地路径）
  name:'',// 必填项，文件对应的key,开发者在服务端可以通过这个key获取文件二进制内容
})
```


在了解API以后，我们直接对`wx.uploadFile`进行封装即可。
- 首先在`WxRequest`类内部创建`upload`实例方法，实例方法接收四个属性：
```js
/**
 * 文件上传接口封装
 * url 文件上传地址
 * filePath 要上传文件资源的路径
 * name 文件对应的key
 * config 其他配置项
 * 
*/
upload(url,filePath,name,config={}){
  return this.request(
    Object.assign({url,filePath,name,method:'UPLOAD'},config)
  )
}
```
- 这时我们需要在`request`实例方法，对`method`进行判断，如果是`UPLOAD`，则调用`wx.uploadFile`上传API
```js
request(options){
  // coding...

}
```



封装后的落地代码：


pages/index/index.wxml
```html
<view>
    <button class="btn" open-type="chooseAvatar" bindchooseavatar="chooseavatar">
        <image class="avatar" src="{{avatarUrl}}" mode=""/>
    </button>
</view>
```
pages/index/index.js
```js
// 导入创建的实例
import instance from '../../utils/http'
Page({
    data: {
        avatarUrl:'../../assets/index/1.png'
    },
    // 获取微信头像
    async chooseavatar(event){
        console.log('event',event);
        // 目前获取的微信头像是临时路径，临时路径是有失效时间的，在实际开发中，需要将临时路径上传到公司的服务器
        // console.log('222',event.detail.avatarUrl);
        const {avatarUrl} = event.detail
        const res = await instance.upload('/fileUpload',avatarUrl,'file')
        this.setData({
            avatarUrl:res.data
        })

        // wx.uploadFile({
        //   filePath: event.detail.avatarUrl,
        //   name: 'file',
        //   url: 'https://',
        //   success:(res)=>{
        //     //  服务器返回的数据时JSON字符串，在使用的时候，需要进行转换JSON.parse进行转换
        //     res.data = JSON.parse(res.data)
        //     console.log('123',res)

        //     this.setData({
        //         avatarUrl:res.data.data
        //     })
        //   }
        // })

        // this.setData({
        //     avatarUrl:event.detail.avatarUrl
        // })
    }
})
```


utils/request.js
```js

/**
 * 创建 WxRequest 类
 * 通过类的方式进行封装，会让代码更加具有复用性
 * 也可以方便添加新的属性和方法
 */
class WxRequest{

    // 定义实例属性，用来设置默认请求参数
    defaults = {
        baseURL:'', // 基准路径
        url:'',
        data:null,
        method:'GET',
        // 请求头
        header:{
          'Content-type':'application/json'  // 设置数据的交互格式
        },
        timeout:60000, // 小程序默认超时时长1min
        isLoading:true // 控制是否使用默认的 loading,默认值true表示使用默认的loading
    }

    // 定义拦截器对象
    // 需要包含 请求拦截器以及响应拦截器
    interceptors = {
        // 请求拦截器
        request:(config)=>{
            return config
        },

        // 响应拦截器
        response:(response)=>{
            return response
        }
    }

    // 定义数组队列
    // 初始值需要设置一个空数组，用来存储请求队列、存储请求标识
    queue = []

    // 用于创建和初始化类的属性及方法
    // 在实例化时传入的参数，会被 constructor 形参进行接收
    constructor(params={}){
        this.defaults = Object.assign({},this.defaults,params)
    }

    // request 实例方法接收一个对象类型的参数
    // 属性值和wx.request 方法调用时传递参数保持一致
    request(options){
        // 如果有新的请求，就清除上一次定时器
        this.timerId && clearTimeout(this.timerId)
        // 注意：需要先合并完整的请求地址（baseURL + url）
        // https://gmall-prod.atguigu.cn/mall-api/index/findBanner
        options.url = this.defaults.baseURL + options.url

        // 合并请求参数
        options = {...this.defaults,...options}

        // 上传文件自带loading所以不需要自定义
        if(options.isLoading && options.method !== 'UPLOAD'){
            // 在请求发送之前，添加loading效果
            // 判断 queue 队列是否为空，如果是空，就提示 loading，如果不是空，就不显示 loading
            this.queue.length ===0 && wx.showLoading()
            // 然后立即向 queue 数组队列中添加请求标识
            // 每个标识代表是一个请求，标识是自定义的
            this.queue.push('request')
        }
      


        // 在请求发送之前，调用请求拦截器，新增和修改请求参数
        options = this.interceptors.request(options)


        // 需要使用 Promise封装wx.request 处理异步请求
        return new Promise((resolve,reject)=>{
            if(options.method ==='UPLOAD'){
                wx.uploadFile({
                  ...options,
                  success:(res)=>{
                    // 需要将服务器返回的JSON字符串通过JSON.parse 转成对象
                    res.data = JSON.parse(res.data)

                    // 合并参数
                    const mergeRes = Object.assign({},res,{config:options,isSuccess:true})
                    resolve(this.interceptors.response(mergeRes))
                  },
                  fail:(err)=>{
                    // 合并参数
                    const mergeErr = Object.assign({},err,{config:options,isSuccess:false})
                    resolve(this.interceptors.response(mergeErr))
                  }
                })
            }else{
                wx.request({
                    ...options,
                    // 当接口调用成功时会触发 success 回调函数
                    success:(res)=>{
                        // 不管是成功响应还是失败响应，都需要调用响应拦截器
                        // 响应拦截器需要接收服务器响应的数据，然后对数据进行逻辑处理，处理好以后进行返回
                        // 然后再通过 resolve 将返回的数据抛出去
    
    
                        // 在给响应拦截器传递参数时，需要将请求参数也一起传递
                        // 方便进行代码的调试或者其他逻辑处理，需要先合并参数
                        // 然后将合并的参数传递给响应拦截器
                        const mergeRes = Object.assign({},res,{config:options,isSuccess:true})
    
    
                        // resolve(res)
                        resolve(this.interceptors.response(mergeRes))
                    },
                    // 当接口调用失败时会触发 fail 回调函数
                    fail:(err)=>{
                        // 不管是成功响应还是失败响应，都需要调用响应拦截器
                        // reject(err)
                        const mergeErr = Object.assign({},err,{config:options,isSuccess:false})
                        reject(this.interceptors.response(mergeErr))
                    },
                    // 当接口调用结束的回调函数（调用成功、失败都会执行）
                    complete:()=>{
                        if(options.isLoading){
                            // 每次从 queue 队列中删除一个标识
                            this.queue.pop()
                            this.queue.length===0 && this.queue.push('request')
                            this.timerId = setTimeout(()=>{
                                this.queue.pop()
                                // 在删除标识以后，需要判断目前 queue 数组是否为空
                                // 如果是空，说明并发请求完成了，就需要隐藏loading
                                this.queue.length===0 && wx.hideLoading()
    
                                clearTimeout(this.timerId)
                            },1)
                        }
                    }
                })
            }
         
        })
    }

    // 封装 GET 实例方法
    get(url,data={},config={}){
        return this.request(Object.assign({url,data,method:'GET'},config))
    }

    
    // 封装 DELETE 实例方法
    delete(url,data={},config={}){
        return this.request(Object.assign({url,data,method:'DELETE'},config))
    }


    // 封装 POST 实例方法
    post(url,data={},config={}){
        return this.request(Object.assign({url,data,method:'POST'},config))
    }

    // 封装 PUT 实例方法
    put(url,data={},config={}){
        return this.request(Object.assign({url,data,method:'PUT'},config))
    }

    // 用来处理并发请求
    all(...promise){
        // 通过展开运算符接收传递的参数
        // 那么展开运算符会将传入的参数转成数组
        promise.all(promise)
    }

    // upload 实例方法,用来对wx.uploadFile 进行封装
    upload(url,filePath,name,config={}){
        return this.request(Object.assign({url,filePath,name,method:'UPLOAD'},config))
    }
}


export default WxRequest
```

utils/https.js
```js
// --------------------------------- 以下时实例化的代码 -----------------------------------

import  WxRequest from './request'
import { getStorage,clearStorage } from './storage'
import { modal,toast } from './extendApi'
//  对 WxRequest 进行实例化
const instance = new WxRequest({
    baseURL:'https://gmall-prod.atguigu.cn/mall-api',
    timeout:15000,
    // isLoading:false // 如果整个项目都不需要loading,此处设置为false即可
})


// 配置请求拦截器
instance.interceptors.request = (config)=>{
    // 在发送请求之前做些什么

    // 在发送请求之前，需要先判断本地是否存在访问令牌 token 
    const token = getStorage('token')
    if(token){
        config.header['token'] = token;
    }

    // 如果存在token,就需要在请求头中添加token字段
    return config
}

// 配置响应拦截器
instance.interceptors.response = async (response)=>{
    console.log('response',response)
    const { isSuccess,data } = response;
    if(!isSuccess){
        wx.showToast({
            title:'网络异常测试',
            icon:'error'
        })
    }

    // 判断服务器响应的业务代码
    switch(data.code){
        // 如果后端返回的业务状态码是200，说明请求成功，服务器成功返回了数据
        case 200:
            return data
        // 业务状态码 208，说明没有`token`或者`token`过期失效，需要登录或者重新登录
        case 208:
            const res = await modal({
                content:'鉴权失败，请重新登录',
                showCancel:false  // 不显示取消按钮
            })

            if(res){
                // 清楚之前失效的token及本地存储的所有信息
                clearStorage()

                wx.navigateTo({
                  url: '/pages/login/login',
                })
            }

            return Promise.reject(response)
        default:
            toast({
                title:'程序出现异常，请联系客服或稍后重试'
            })
            return Promise.reject(response)
    }
    // 在服务器响应之后做些什么
    // return response
    // return data
}

//  将  WxRequest实例进行暴露出去，方便在其他文件中国进行使用
export default instance;
```


> 注意！！！
> 
> 此处是根据[学习视频](https://www.bilibili.com/video/BV1LF4m1E7kB/?p=118&spm_id_from=pageDriver&vd_source=46043ae66b9cbf88ed957e04e481ddc0)
>
> 教程中封装的网络请求模块发布到了npm,可以使用npm包实现功能,`npm install mina-request`。
> - 安装后构建npm
> - 其余步骤参考文档开发即可,[mina-request](https://www.npmjs.com/package/mina-request)


http.js
```js
import  WxRequest from 'mina-request';

import { getStorage,clearStorage } from './storage'
import { modal,toast } from './extendApi'
//  对 WxRequest 进行实例化
const instance = new WxRequest({
    baseURL:'https://gmall-prod.atguigu.cn/mall-api',
    timeout:15000,
    // isLoading:false // 如果整个项目都不需要loading,此处设置为false即可
})


// 配置请求拦截器
instance.interceptors.request = (config)=>{
    // 在发送请求之前做些什么
    // 在发送请求之前，需要先判断本地是否存在访问令牌 token 
    const token = getStorage('token')
    if(token){
        config.header['token'] = token;
    }

    // 如果存在token,就需要在请求头中添加token字段
    return config
}

// 配置响应拦截器
instance.interceptors.response = async (response)=>{
    console.log('response',response)
    const { isSuccess,data } = response;
    if(!isSuccess){
        wx.showToast({
            title:'网络异常测试',
            icon:'error'
        })
        return Promise.reject(response)
    }

    // 判断服务器响应的业务代码
    switch(data.code){
        // 如果后端返回的业务状态码是200，说明请求成功，服务器成功返回了数据
        case 200:
            return data
        // 业务状态码 208，说明没有`token`或者`token`过期失效，需要登录或者重新登录
        case 208:
            const res = await modal({
                content:'鉴权失败，请重新登录',
                showCancel:false  // 不显示取消按钮
            })
            if(res){
                // 清楚之前失效的token及本地存储的所有信息
                clearStorage()
                wx.navigateTo({
                  url: '/pages/login/login',
                })
            }
            return Promise.reject(response)
        default:
            toast({
                title:'程序出现异常，请联系客服或稍后重试'
            })
            return Promise.reject(response)
    }
    // 在服务器响应之后做些什么
    // return response
    // return data
}

//  将  WxRequest实例进行暴露出去，方便在其他文件中国进行使用
export default instance;
```


## 设置环境变量

在实际开发中，不同的开发环境，调用的接口地址是不一样的。

例如：开发环境需要调用开发版的接口地址，生产环境需要调用正式版的接口地址。


这时候，我们就可以使用小程序提供的`wx.getAccountInfoSync()`接口，用来获取当前账号信息，在账号信息中包含着小程序当前环境版本。

| 环境版本 | 合法值  |
| :------- | :-----: |
| 开发版   | develop |
| 体验版   |  trial  |
| 正式版   | release |


落地代码：

utils/env.js
```js
// 配置当前小程序项目的环境变量

// 获取当前小程序的账号信息
const { miniProgram } = wx.getAccountInfoSync()

// 获取小程序的版本
const { envVersion } = miniProgram;

let env = {
    baseUrl:'https://gmall-prod.atguigu.cn/mall-api'
}

switch(envVersion){
    // 开发版本
    case 'develop':
        env.baseUrl = 'https://gmall-prod.atguigu.cn/mall-api'
        break;
    // 体验版
    case 'trail':
        env.baseUrl = 'https://gmall-prod.atguigu.cn/mall-api'
        break;
    // 正式版
    case 'release':
        env.baseUrl = 'https://gmall-prod.atguigu.cn/mall-api'
        break;
    default:
        env.baseUrl = 'https://gmall-prod.atguigu.cn/mall-api'
        break;
}


export { env }
```

utils/https.js
```js
// --------------------------------- 以下时实例化的代码 -----------------------------------
// import  WxRequest from 'mina-request'  // 如果通过npm安装了此包
import  WxRequest from './request'
import { getStorage,clearStorage } from './storage'
import { modal,toast } from './extendApi'
import {env} from './env'


//  对 WxRequest 进行实例化
const instance = new WxRequest({
    // baseURL:'https://gmall-prod.atguigu.cn/mall-api',
    baseURL:env.baseUrl,
    timeout:15000,
    // isLoading:false // 如果整个项目都不需要loading,此处设置为false即可
})


// 配置请求拦截器
instance.interceptors.request = (config)=>{
    // 在发送请求之前做些什么
    // 在发送请求之前，需要先判断本地是否存在访问令牌 token 
    const token = getStorage('token')
    if(token){
        config.header['token'] = token;
    }
    // 如果存在token,就需要在请求头中添加token字段
    return config
}

// 配置响应拦截器
instance.interceptors.response = async (response)=>{
    console.log('response',response)
    const { isSuccess,data } = response;
    if(!isSuccess){
        wx.showToast({
            title:'网络异常测试',
            icon:'error'
        })
        return Promise.reject(response)
    }

    // 判断服务器响应的业务代码
    switch(data.code){
        // 如果后端返回的业务状态码是200，说明请求成功，服务器成功返回了数据
        case 200:
            return data
        // 业务状态码 208，说明没有`token`或者`token`过期失效，需要登录或者重新登录
        case 208:
            const res = await modal({
                content:'鉴权失败，请重新登录',
                showCancel:false  // 不显示取消按钮
            })
            if(res){
                // 清楚之前失效的token及本地存储的所有信息
                clearStorage()
                wx.navigateTo({
                  url: '/pages/login/login',
                })
            }
            return Promise.reject(response)
        default:
            toast({
                title:'程序出现异常，请联系客服或稍后重试'
            })
            return Promise.reject(response)
    }
}

//  将  WxRequest实例进行暴露出去，方便在其他文件中国进行使用
export default instance;
```


## 接口调用方式说明

思路分析：
- 在开发中，我们会将所有的网络请求方法放置在`api`目录下统一管理，然后按照模块功能来划分成对应的文件，在文件中将接口封装成一个个方法单独导出，例如：
```js
// 导入封装的 网络请求模块实例http.js
import http from '../utils/http'

/***
 * 用来获取首页轮播图数据
 * 
 */
// export const reqSwiperData = ()=>{
//    return  http.get('/index/findBanner')
// }

export const reqSwiperData = ()=>http.get('/index/findBanner')

```

 这样做有以下几点好处：
 - 易于维护：一个文件就是一个模块，一个方法就是一个功能，清晰明了，查找方便
 - 便于复用：哪里使用，哪里导入，可以在任何一个业务组件中导入需要的方法
 - 团队合作：分工合作


落地代码：

api/index.js
```js
// 导入封装的 网络请求模块实例
import http from '../utils/http'

/***
 * 用来获取首页轮播图数据
 */
export const reqSwiperData = ()=>{
   return  http.get('/index/findBanner')
}
```


pages/index/index.js
```js
// 导入接口API函数
import {reqSwiperData} from '../../api/index.js'
Page({
  async handler(){
    const res =  await reqSwiperData()
    console.log('99',res)
  }
})
```