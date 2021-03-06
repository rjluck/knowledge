#   变量

[[toc]]

## 变量的定义

通俗：变量是用于存放数据的容器。我们通过变量名获取数据，甚至可以修改数据。
本质：变量是程序在内存中申请的一块用来存放数据的空间。


## 变量的使用

**1.声明变量**
```js
var age;//声明一个名称为age的变量
```
- var 是一个JS关键字，用来声明变量。使用该关键字声明变量后，计算机会自动地为变量分配内存空间，不需要程序员管。
- age是程序员定义的变量名，我们要通过变量名来访问内存中分配的空间。

**2.赋值**
```js
age = 10;//给age这个变量赋值为10
```
- =用来把右边的值赋值给左边的变量空间中
- 变量值是程序员保存到变量空间里的值

**3.变量的初始化**
```js
var age = 10;//声明变量同时赋值为10
```

eg：
```js
var myname = prompt('请输入您的名字');
alert(myname)
```
**4.变量的语法扩展**

- 更新变量

一个变量被重新赋值后，它原有的值就会被覆盖，变量值将以最后一次赋的值为准。

- 声明多个变量

同时声明多个变量时，只需要写一个`var`,多个变量名之间使用英文逗号隔开。
```js
// var age = 18;
// var address = '我家'
// var name ='哈哈哈'

var age =18,
    address = '我家',
    name ='哈哈哈';

var age1 = 10,name1='ss',sex='2';
```

- 声明变量的特殊情况

情况 | 说明 | 结果
---|---|---
var age; console.log(age) | 只声明，不赋值 | undefined
console.log(msg) | 不声明，不赋值 | 报错
info =10;console.log(info) | 不声明,只赋值 | 10


**5.变量命名规范**

- 由字母`(A-Za-z)`、数字`(0-9)`、下划线`(_)`、美元符号`($)`组成,如:userAge.num01,_name
- 严格区分大小写。`var app`;和`var App`;是两个变量。
- 不能以数字开头。 `18age`是错误的
- 不能是关键字、保留字。例如：`var、for、while`
- 变量名必须有意义。MMD BBD 
- 遵守驼峰命名法。首字母小写，后面单词的首字母需要大写。`myName`

变量案例：使用临时变量做中间件，交换两个变量
```js
var temp;
var apple1 = '青苹果';
var apple2 = '红苹果';
temp = apple1;
apple1 = apple2;
apple2 = temp;
```