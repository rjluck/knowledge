#   jQuery常用API

[[toc]]

## jQuery选择器

### 1.基本选择器

原生JS获取元素方式很多,复杂,而且兼容性情况不一致，因此`jQuery`给我们做了封装，使获取元素统一标准。

语法格式:`$("选择器")`

里面选择器直接写CSS选择器即可,但是要加引号。

名称 | 用法 | 描述
---|---|---
ID选择器 | $("#id") | 获取指定ID的元素
全选选择器 | $("*") | 匹配所有元素
类选择器 | $(".class") | 获取同一类class的元素
类选择器 | $(".class") | 获取同一类class的元素
标签选择器 | $("div") | 获取同一标签的所有元素
并集选择器 | $("div,p,li") | 获取多个元素
交集选择器 | $("li.current") | 交集元素

### 2.层级选择器

名称 | 用法 | 描述
---|---|---
子代选择器 | $("ul>li") | 使用>号，获取亲儿子层级的元素;注意，并不会获取孙子层级的元素
后代选择器 | $("ul li") | 使用空格,代表后代选择器,获取ul下的所有li元素,包括孙子等


### 3.隐式迭代(重点)

遍历内部DOM元素(伪数组形式存储)的过程就叫做隐式迭代。

简单理解:给匹配到的所有元素进行循环遍历，执行相应的方法,而不用我们再进行循环，简化我们的操作，方便我们调用。

eg:
```html
<body>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <div>111</div>
    <script>
        $("div").css("background", "pink");
        //隐式迭代就是把匹配的所有元素内部进行遍历循环,给每一个元素添加css这个方法
    </script>
</body>
```

### 4.筛选选择器

语法 | 用法 | 描述
---|---|---
:first | $("li:first") | 获取第一个li元素
:last | $("li:last") | 获取最后一个li元素
:eq(index) | $("li:eq(2)") | 获取到的li元素中，选择索引号为2的元素,索引号index从0开始
:odd | $("li:odd") | 获取到的li元素中，选择索引号为奇数的元素
:even | $("li:even") | 获取到的li元素中，选择索引号为偶数的元素

eg：
```js
  $(function () {
            $("ul li:first").css("color", red)
            $("ul li:eq(2)").css("color", blue)
            $("ul li:odd").css("color", yellow)
            $("ul li:even").css("color", pink)
})
```


### 5.筛选方法(重点)

语法 | 用法 | 说明
---|---|---
parent() | $("li").parent() | 查找父级
children(selector) | $("ul").children("li") | 相当于$("ul>li"),最近一级(亲儿子)
find(selector) | $("ul").find("li") | 相当于$("ul li"),后代选择器
siblings(selector) | $(".first").siblings("li") | 查找兄弟节点,不包括自己本身
nextAll([expr]) | $(".first").nextAll() | 查找当前元素之后所有的同辈元素
prevAll([expr]) | $(".last").prevAll() | 查找当前元素之前所有的同辈元素
hasClass(class) | $("div").hasClass("protected") | 检查当前的元素是否含有某个特定的类,如果有，则返回true
eq(index) | $("li").eq(2) | 相当于$("li:eq(2)"),index从0开始


eg:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="current"></div>
    <div></div>
    <ol>
        <li>111</li>
        <li class="item">111</li>
        <li>1111</li>
        <li>111</li>
    </ol>
    <script>
        $(function () {
            //1.查找兄弟元素
            $("ol .item").siblings("li").css("color", "red");
            //2.第n个元素
            //(1)利用选择器的方式选择
            $("ol li:eq(2)").css("color", "blue");
            //(2)利用选择方法的方式选择--推荐
            $("ol li").eq(2).css("color", "blue");

            //3.判断是否有某个类名
            $("div:first").hasClass("current");//true
            $("div:last").hasClass("current");//false
        })
    </script>
</body>

</html>
```


### 6.排他思想

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./js/jquery.min.js"></script>
</head>

<body>
    <button>按钮</button>
    <button>按钮</button>
    <button>按钮</button>
    <button>按钮</button>
    <button>按钮</button>
    <button>按钮</button>
    <button>按钮</button>
    <script>
        $(function () {
            //隐式迭代,给所有的按钮都绑定了点击事件
            $("button").click(function () {
                //当前元素变化背景颜色
                $(this).css("background", "pink")
                //其余的兄弟去掉背景颜色  隐式迭代
                $(this).siblings("button").css("background", "")
            })
        })
    </script>
</body>

</html>
```

### 7.链式编程

链式编程是为了节省代码量,看起来更优雅。

```js
$(this).css("color","red").sibling().css("color","");
```

使用链式编程一定注意是哪个对象执行样式。





## jQuery样式操作

### 1.操作CSS方法

jQuery可以使用css方法来修改简单元素样式;也可以操作类,修改多个样式。

1.参数只写属性名,则是返回属性值

```js
$(this).css("color")
```

2.参数是**属性名**,**属性值**,**逗号分隔**,是设置一组样式，**属性必须加引号**,值如果是数字可以不用跟单位和引号

```
$(this).css("color","red")
```

3.参数可以是对象形式,方便设置多组样式。属性名和属性值用冒号隔开，属性可以不用加引号，

如果是复合属性则必须采取驼峰命名法，如果值不是数字，需要加引号
```js
$(this).css({"color":"white","fontSize":"20px"})
```

### 2.设置类样式方法

作用等同于以前的`classList`,可以操作类样式,注意操作类里面的参数不要加点。

#### (1)添加类

```js
$('div').addClass("current");
```


#### (2)删除类

```js
$('div').removeClass("current");
```

#### (3)切换类

```js
$('div').toggleClass("current");
```

eg:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./js/jquery.min.js"></script>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        a {
            text-decoration: none;
        }

        li {
            list-style: none;
        }

        .current {
            background-color: red;
        }

        div {
            height: 100px;
            width: 100px;
            background-color: greenyellow;
            transition: all 0.5s;
        }

        .removeborder {
            border: 5px solid #ccc;
        }

        .rotate {
            transform: rotate(360deg);
        }
    </style>
</head>

<body>
    <div class="removeborder"></div>
    <script>
        $(function () {
            $("div").click(function () {
                $(this).addClass("current"); //添加类
                $(this).removeClass("removeborder"); //删除类
                $(this).toggleClass("rotate"); //切换类
            })
        })
    </script>
</body>
</html>
```

### 3.类操作与className区别

原生JS中className会覆盖元素原先里面的类名。

```html
<body>
    <div class="one"></div>
    <script>
        var one = document.querySelector(".one");
        one.className = "two";
    </script>
</body>
```

`jQuery`里面类操作只是对指定类进行操作,不影响原先的类名.

```html
<body>
    <div class="one"></div>
    <script>
        $(".one").addClass('two');//addClass追加类名,不影响以前的类名
        $(".one").removeClass('one');//removeClass删除指定类名,不影响其他的类名
    </script>
</body>
```




## jQuery效果

`jQuery`给我们封装了很多动画效果,最常见的如下:

显示隐藏

- show()
- hide()
- toggle()

滑动

- slideDown()
- slideUp()
- slideToggle()

淡入淡出

- fadeIn()
- fadeOut()
- fadeToggle()
- fadeTo()

自定义动画

- animate()

### 1.显示隐藏效果

#### 显示语法规范

`show([speed],[easing],[fn])`


#### 隐藏语法规范

`hide([speed],[easing],[fn])`


#### 切换语法规范

`toggle([speed],[easing],[fn])`


#### 显示/隐藏/切换参数

- 参数都可以省略,无动画直接显示
- `speed`:三种预定速度之一的字符串(`show`,`normal`,`fast`)或表示动画时长的毫秒数值(如:1000)
- `easing`:(Optional)用来指定切换效果,默认是`swing`,可用参数`linear`。
- `fn`:回调函数,在动画完成时执行函数,每个函数执行一次

eg：
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/jquery.min.js"></script>
    <style>
        div {
            height: 100px;
            width: 100px;
            background-color: greenyellow;
        }
    </style>
</head>

<body>
    <button>显示</button>
    <button>隐藏</button>
    <button>切换</button>
    <div></div>
    <script>
        $(function () {
            //
            $("button").eq(0).click(function () {
                $("div").show(1000, function () {
                    alert(1)
                })
            })
            $("button").eq(1).click(function () {
                //$("div").hide("fast")
                $("div").hide(1000, function () {
                    alert(1)
                })
            })
            $("button").eq(2).click(function () {
                $("div").toggle(1000)
            })
        })
    </script>
</body>
</html>
```

> 一般情况下，我们都不加参数直接显示隐藏就可以了



### 2.滑动效果

#### 下滑效果语法规范

`slideDown([speed],[easing],[fn])`

#### 上滑效果语法规范

`slideUp([speed],[easing],[fn])`


#### 滑动切换效果语法规范

`slideToggle([speed],[easing],[fn])`


#### 下滑/上滑/滑动切换效果语法规范

- 参数都可以省略
- `speed`:三种预定速度之一的字符串(`show`,`normal`,`fast`)或表示动画时长的毫秒数值(如:1000)
- `easing`:(Optional)用来指定切换效果,默认是`swing`,可用参数`linear`。
- `fn`:回调函数,在动画完成时执行函数,每个函数执行一次

eg:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/jquery.min.js"></script>
    <style>
        div {
            height: 200px;
            width: 100px;
            background-color: greenyellow;
        }
    </style>
</head>

<body>
    <button>下拉滑动</button>
    <button>上拉滑动</button>
    <button>切换滑动</button>
    <div></div>
    <script>
        $(function () {
            $("button").eq(0).click(function () {
                $("div").slideDown();//下滑
            })
            $("button").eq(1).click(function () {
                $("div").slideUp();//上拉
            })
            $("button").eq(2).click(function () {
                $("div").slideToggle(500);//滑动切换
            })
        })
    </script>
</body>
</html>
```


### 3.事件切换

`hover([over],out)`

- `over`:鼠标移到元素上要触发的函数(相当于`mouseenter`)
- `out`:鼠标移出元素要触发的函数(相当于`mouseleave`)

eg：
```js
 //1.事件切换 hover 就是鼠标经过和离开的复合写法
 // $(".nav>li").hover(function () {
 //     $(this).children("ul").slideDown(200);
 // }, function () {
 //     $(this).children("ul").slideUp(200);
 // })

 //2.事件切换 hover 如果只写一个函数,那么鼠标经过和离开都会触发这个函数
 $(".nav>li").hover(function () {
    $(this).children("ul").slideToggle();
 })
```

### 4.动画队列及其停止排队方法

#### 动画或效果队列

动画或者效果一旦触发就会执行,如果多次触发,就造成多个动画或者效果排队执行。

#### 停止排队

`stop()`

- `stop()`方法用于停止动画或效果。
- 注意:`stop()`写到动画或者效果的前面,相当于停止结束上一次的动画。

```js
  $(".nav>li").hover(function () {
    //stop 方法必须写到动画的前面
    $(this).children("ul").stop().slideToggle();
  })
```

### 5.淡入淡出效果

#### 淡入效果语法规范

`fadeIn([speed],[easing],[fn])`

#### 淡出效果语法规范

`fadeOut([speed],[easing],[fn])`

#### 淡入淡出切换效果语法规范

`fadeToggle([speed],[easing],[fn])`

#### 淡入/淡出/切换效果参数

- 参数都可以省略
- `speed`:三种预定速度之一的字符串(`slow`,`normal`,`fast`)或表示动画时长的毫秒数值(如:1000)
- `easing`:(Optional)用来指定切换效果,默认是`swing`,可用参数`linear`。
- `fn`:回调函数,在动画完成时执行函数,每个函数执行一次

#### 渐进方式调整到指定的不透明度

`fadeTo(speed,opacity,[easing],[fn])`

- opacity透明度必须先,取值0~1之间
- speed:三种预定速度之一的字符串(`slow`,`normal`,`fast`)或表示动画时长的毫秒数值(如:1000),必须写
- easing:(Optional)用来指定切换效果,默认是`swing`,可用参数`linear`。
- `fn`:回调函数,在动画完成时执行函数,每个函数执行一次

eg:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/jquery.min.js"></script>
    <style>
        div {
            height: 200px;
            width: 100px;
            background-color: greenyellow;
        }
    </style>
</head>

<body>
    <button>淡入效果</button>
    <button>淡出效果</button>
    <button>淡入淡出切换</button>
    <button>修改透明度</button>
    <div></div>
    <script>
        $(function () {
            $("button").eq(0).click(function () {
                $("div").fadeIn(1000);//淡入
            })
            $("button").eq(1).click(function () {
                $("div").fadeOut(1000);//淡出
            })
            $("button").eq(2).click(function () {
                $("div").fadeToggle()
            })
            $("button").eq(3).click(function () {
                $("div").fadeToe(1000, 0.5)
            })
        })
    </script>
</body>
```

### 6.自定义动画 animate

#### 语法

`animate(params,[speed],[easing],[fn])`

参数：

- `params`:想要更改的样式属性,以对象形式传递,必须写。属性名可以不用带引号，如果是复合属性则需要采取驼峰命名法 `borderLeft`。其余参数都可以省略。
- `speed`:三种预定速度之一的字符串(`slow`,`normal`,`fast`)或表示动画时长的毫秒数(如：1000)
- `easing`:(Optional)用来指定切换效果,默认是`swing`,可用参数`linear`.
- `fn`:回调函数,在动画完成执行的函数,每个元素执行一次。


eg：
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="js/jquery.min.js"></script>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        div {
            width: 200px;
            height: 200px;
            background-color: greenyellow;
            position: absolute;
        }
    </style>
    <script>
        $(function () {
            $("button").click(function () {
                $("div").animate({
                    left: 200,
                    top: 300,
                    opacity: .4
                }, 500);
            })
        })
    </script>
</head>
<body>
    <button>动起来</button>
    <div></div>
</body>
</html>
```



## jQuery属性操作

### 1.设置或获取元素固有属性值 prop()

所谓元素固有属性就是元素本身自带的属性,比如`<a>`元素里面的`href`，比如`<input>`元素里面的`type`

#### 获取属性语法

`prop("属性")`

#### 设置属性语法

`prop("属性","属性值")`

eg:
```html
<body>
    <a href="aaa">111</a>
    <input type="checkbox" checked>
    <script>
        $(function () {
            //1.element.prop("属性名")  获取元素固有的属性值
            $("a").prop("href")
            console.log('$("a").prop("href")', $("a").prop("href"))
            $("a").prop("title", "挺好");

            $("input").change(function () {
                console.log($(this).prop('checked'))
            })
        })
    </script>
</body>
```

### 2.设置或获取元素自定义属性值 attr()

用户自己给元素添加的属性,我们称为自定义属性。比如给`div`添加`index="1"`

#### 获取属性语法

`attr("属性")`  类似原生`getAttribute()`

#### 设置属性语法

`attr("属性","属性值")` 类似原生`setAttribute()`

该方法也可以获取H5自定义属性

eg:
```html
<body>
    <div index="1" data-index="2">222</div>
    <script>
        $(function () {
            console.log('$("div").attr("index")', $("div").attr("index"));//1
            $("div").attr("index", 6)
            console.log('$("div").attr("data-index")', $("div").attr("data-index"));//2
        })
    </script>
</body>
```

### 3.数据缓存 data()

`data()` 方法可以在指定的元素上存取数据,并不会修改`DOM`元素结构。一旦页面刷新,之前存放的数据都将被移除。

#### 附加数据语法

`data("属性","属性值")`  向被选元素附加数据

#### 获取数据性语法

`data("属性")` 向被选元素获取数据

同时,还可以获取`HTML5`自定义属性`data-index`，得到的是数字型

eg:
```html
<body>
    <span>123</span>
    <div data-index="11"></div>
    <script>
        $(function () {
            $("span").data("username", "andy");
            console.log($("span").data("username"));//andy
            console.log($("div").data("index"));//11
        })
    </script>
</body>
```




## jQuery文本属性值

主要针对元素的**内容**还有**表单的值**操作

### 1.普通元素内容 html()  

相当于原生`innerHTML`

- 获取元素内容 `html()`
- 设置元素内容 `html("内容")`


### 2.普通元素文本内容 text()  

相当于原生`inneText`

- 获取元素文本内容 `text()`
- 设置元素文本内容 `text("内容")`


### 3.表单的值 val()

相当于原生`value`

- 获取表单元素的值 `val()`
- 设置表单元素的值 `val("内容")`

eg:
```html
<body>
    <div><span>我是内容</span></div>
    <input type="text" value="请输入">
    <script>
        //1.获取设置元素内容 html()
        console.log($("div").html());
        $("div").html("222");
        console.log($("div").html());
        //2.获取设置元素文本内容 text()
        console.log($("div").text());
        $("div").text("2232");
        console.log($("div").text());
        //3.获取设置表单值 val()
        console.log($("input").val());
        $("input").val("666");
        console.log($("input").val());
    </script>
</body>
```







## jQuery元素操作

主要是遍历、创建、添加、删除元素操作。

### 1.遍历元素

`jQuery`隐式迭代是对同一类元素做了同样的操作。如果想要给同一类元素做不同操作，就需要用到遍历。

**语法1**
```js
$("div").each(function(index,domEle){xxx})
```
- `each`方法遍历匹配的每一个元素。主要用`DOM`处理，`each`每一个
- 里面的回调函数有2个参数:`index`是每个元素的索引号,`demEle`是每个**DOM元素对象,不是jQuery对象**
- 所以要想使用`jQuery`方法,需要给这个`dom`元素转换为`jQuery`对象`$(domEle)`



**语法2**
```js
$.each(object,function(index,element){xxx})
```

- `$.each()`方法可用于遍历任何对象。主要用于数据处理，比如数组，对象
- 里面的函数有2个参数:`index`是每个元素的索引号;`element`遍历内容


eg：
```html
<body>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <script>
        $(function () {
            $("div").css("color", "red");
            //如果针对同一类元素做不同操作,需要用到遍历元素(类似for,但是比for强大)
            //1.each 方法遍历元素
            var arr = ["red", "green", "blue"];
            var sum = 0;
            $("div").each(function (index, domEle) {
                //回调函数第一个参数 一定是索引号
                //回调函数第二个参数 一定是dom元素对象
                console.log(index)
                console.log(domEle)
                //domEle.css("color"); dom对象没有css方法
                $(domEle).css("color", arr[index]);
                sum += parseInt($(domEle).text());
            })

            //2.$.each() 方法遍历元素  主要用于遍历数据，处理数据
            $.each($("div"), function (i, ele) {
                console.log(i)
                console.log(ele)
            })

            $.each(arr, function (i, ele) {
                console.log(i)
                console.log(ele)
            })

            $.each({ name: "andy", age: 18 }, function (i, ele) {
                console.log(i);//  name age
                console.log(ele);// andy  18
            })
        })
    </script>
</body>
```


### 2.创建元素

**语法**

`$("<li></li>")`

动态的创建一个`<li>`

### 3.添加元素

**内部添加**

- `element.append("内容")` 把内容放入匹配元素内部最**后面**,类似原生`appendChild`

- `element.prepend("内容")` 把内容放入匹配元素内部最**前面**

>内部添加元素,生成之后，它们是父子关系


**外部添加**

- `element.after("内容")`把内容放入目标元素后面

- `element.before("内容")` 把内容放入目标元素前面

>外部添加元素,生成之后，它们是兄弟关系


### 4.删除元素

- `element.remove()`  删除匹配的元素(本身)
- `element.empty()`  删除匹配的元素集合中所有的子节点
- `element.html("")`  清空匹配的元素集合中所有的子节点

eg：
```html
<body>
    <ul>
        <li>原先的li</li>
    </ul>
    <div class="test">原先的div</div>
    <script>
        $(function () {
            //1.创建元素
            var li = $("<li>后来创建的li</li>");
            var div = $("<div>后来的div</div>")
            //2.添加元素
            //(1)内部添加
            $("ul").append(li);//内部添加并且放到内容的最后面
            $("ul").prepend(li);//内部添加并且放到内容的最前面
            //(2)外部添加
            $("div").after(div);
            $("div").before(div);
            //3.删除元素
            //$("ul").remove();
            $("ul").empty();
            $("ul").html("");
        })
    </script>
</body>
```



## jQuery尺寸、位置操作

### 1.jQuery尺寸

语法 | 用法
---|---
width()/height() | 取得匹配元素宽度和高度值,只算`width`/`height`
innerWidth()/innderHeight() | 取得匹配元素宽度和高度值,包含`padding`
outerWidth()/outerHeight() | 取得匹配元素宽度和高度值,包含`padding`、`border`
outerWidth(true)/outerHeight(true) | 取得匹配元素宽度和高度值,包含`padding`、`border`、`margin`

eg:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: pink;
            padding: 10px;
            border: 15px solid red;
            margin: 20px;
        }
    </style>
    <script src="./js/jquery.min.js"></script>
</head>
<body>
    <div></div>
    <script>
        $(function () {
            //1.width()/height()
            console.log('width()', $("div").width());//200
            console.log('height()', $("div").height());//200
            //2.innerWidth()/innerHeight()    padding
            console.log('innerWidth()', $("div").innerWidth());//220
            console.log('innerHeight()', $("div").innerHeight());//220
            //3.outerWidth()/outerHeight()   padding+border
            console.log('outerWidth()', $("div").outerWidth());//250
            console.log('outerHeight()', $("div").outerHeight());//250
            //4.outerWidth(true)/outerHeight(true)  padding+border+margin
            console.log('outerWidth(true)', $("div").outerWidth(true));//290
            console.log('outerHeight(true)', $("div").outerHeight(true));//290
        })
    </script>
</body>
</html>
```

- 以上参数为空,则是获取相应值,返回的是数字型。
- 如果参数为数字,则是修改相应值。
- 参数可以不必写单位。


### 2.jQuery位置 

位置主要有三个

- `offset()`
- `position()`
- `scrollTop()`/`scrollLeft()`


#### (1) offset()设置或获取元素偏移

- `offset()`方法设置或返回被选元素相对于**文档**的偏移坐标,跟父级没有关系。
- 该方法有2个属性`left`、`top`。 `offset().top`用于获取距离文档顶部的距离,`offset().left`用于获取距离文档左侧的距离
- 可以设置元素的偏移:`offset({top:10,left:30})`
eg：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }
        .father {
            width: 400px;
            height: 400px;
            background-color: pink;
            margin: 100px;
            overflow: hidden;
            position: relative;
        }
        .son {
            width: 150px;
            height: 150px;
            background-color: purple;
            position: absolute;
            left: 10px;
            top: 10px;
        }
    </style>
    <script src="./js/jquery.min.js"></script>
</head>
<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <script>
        $(function () {
            //1.获取设置距离文档的位置(偏移)
            console.log($(".son").offset());//{top: 110, left: 110}
            $(".son").offset({
                top: 200,
                left: 200
            })
        })
    </script>
</body>
</html>
```

#### (2) position()获取元素偏移

- `position()`方法用于返回被选元素相对于**带有定位的父级**偏移坐标,如果父级都没有定位,则以文档为准。

eg:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        .father {
            width: 400px;
            height: 400px;
            background-color: pink;
            margin: 100px;
            overflow: hidden;
            position: relative;
        }

        .son {
            width: 150px;
            height: 150px;
            background-color: purple;
            position: absolute;
            left: 10px;
            top: 10px;
        }
    </style>
    <script src="./js/jquery.min.js"></script>
</head>
<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <script>
        $(function () {
            //获取距离带有定位父级位置(偏移),如果么有带有定位的父级元素,则以文档为准
            console.log($(".son").position());//{top: 10, left: 10}
            //这个方法只能获取，不能设置
        })
    </script>
</body>
</html>
```

#### (3) scrollTop()/scrollLeft() 设置或获取元素被卷去的头部和左侧

- `scrollTop()`方法设置或返回被选元素被卷去的头部

eg：
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        .back {
            position: fixed;
            width: 50px;
            height: 50px;
            background-color: yellow;
            right: 30px;
            bottom: 100px;
            display: none;
        }

        .container {
            width: 200px;
            height: 2000px;
            background-color: pink;
            margin: 400px auto;
        }
    </style>
    <script src="./js/jquery.min.js"></script>
</head>

<body>
    <div class="back">返回顶部</div>
    <div class="container"></div>
    <script>
        $(function () {
            //设置
            $(document).scrollTop(100)
            //页面滚动事件
            var boxTop = $(".container").offset().top;
            $(window).scroll(function () {
                console.log('$(document).scrollTop()', $(document).scrollTop())
                if ($(document).scrollTop() >= boxTop) {
                    $(".back").fadeIn();
                } else {
                    $(".back").fadeOut();
                }
            });

            //返回顶部
            $(".back").click(function () {
                //1.无动画返回顶部
                //$(document).scrollTop(0);

                //2.有动画返回顶部
                //核心原理:使用animate动画返回顶部
                //animate动画函数里面有个scrollTop属性,可以设置位置
                //但是是元素做动画,因此$("body,html").animate({scrollTop:0})
                $("body,html").stop().animate({ scrollTop: 0 })
            })
        })
    </script>
</body>

</html>
```