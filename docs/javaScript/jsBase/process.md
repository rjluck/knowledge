# 流程控制

[[toc]]

在一个程序执行过程中，各条代码的执行顺序对程序的结果是有直接影响的。很多时候我们要通过控制代码的执行顺序来实现我们要完成的功能。

简单理解：流程控制就是来控制我们的代码按照什么结构顺序来执行。

流程控制主要有三种结构：

- 顺序结构
- 分支结构
- 循环结构

## 顺序结构

顺序结构是程序中最简单、最基本的流程控制，它没有特定的语法结构，程序会按照**代码的先后顺序，依次执行**，程序中大多数的代码都是这样执行的。

## 分支结构

由上到下执行代码的过程中，根据不同的条件，执行不同的路径代码（执行代码多选一的过程），从而得到不同的结果。

JS中有两种分支语句：

- if语句

**if语法结构：**
```js
//条件成立执行代码，否则什么也不做
if(条件表达式){
    //执行语句
}
```

**if else语法结构(双分支语句)：**
```js
//条件成立执行if里面代码，否则执行else里面的代码
if(条件表达式){
    //[如果] 条件成立执行的代码
}else{
    //[否则] 执行的代码
}
```

**if else if语法结构(多分支语句)：**
```js
//适合于检查多重条件
if(条件表达式1){
    //语句1
}else if(条件表达式2){
     //语句2
}else if(条件表达式3){
     //语句3
     ......
}else{
    //以上条件都不成立执行此处代码
}
```

### 三元表达式 ? :

三元表达式也能做一些简单的条件选择。有三元运算符组成的式子成为三元表达式。

语法结构：
```js
条件表达式?表达式1:表达式2
//如果条件表达式结果为真,则返回 表达式1的值
//如果条件表达式结果为假,则返回 表达式2的值
```
```js
var num = 10;
var result = num >5?'是的':'不是的';//是的
//等价于下面
if(num >5){
    result = '是的'
}else{
    result = '不是的'
}
```
eg:数字补0
```js
var time = prompt('请输入一个0~59之间的一个数字');
var result = time < 10 ? '0'+ time : time;
alert(result)
```

- switch语句

`switch`语句也是多分支语句，它用于基于不同的条件来执行不同的代码。当要针对变量设置一系列的特定值的选项时，就可以使用`switch`

语法结构：
```js
switch(表达式){
    case value1:
        // 表达式 等于 value1 时要执行的代码
        break;
    case value2:
        // 表达式 等于 value2 时要执行的代码
        break;
    ...
    default:
        // 表达式 不等于任何一个value时要执行的代码
}
```

eg:
```js
switch(8){
    case 1:
        console.log('这是1')
        break;
    case 2:
        console.log('这是2')
        break;
    case 3:
        console.log('这是3')
        break;
    default:
         console.log('没有匹配到结果')
}
```
switch注意事项：
```js
//1.我们开发里面，表达式经常写成变量
//2.我们num值 和 case里面的值匹配的时候是 全等 必须是值和数据类型一致 num===1
//3.break 如果当前的case里面没有break,则不会退出switch，会继续执行下一个case,即使不匹配
var num = 3;
switch(num){
    case 1:
        console.log(1);
        break;
    case 2:
        console.log(2);
        break;
}
```

- switch语句和if else if 语句的区别

(1)一般情况下，它们两个语句可以互相替换

(2)switch...case语句通常处理case为比较确定值的情况，而if...else...语句更加灵活，常用于范围判断(大于等于某个范围)

(3)switch语句进行条件判断后直接执行到程序的条件语句，效率更高。而if...else语句有几种条件，就得判断多少次。

(4)当分支比较少时，if...else语句的执行效率比switch语句高。

(5)当分支比较多时，switch语句的执行效率比较高，而且结构更清晰。



## 循环结构

- 在实际问题中，有许多具有**规律性的重复操作**，因此在程序中要完成这类操作就需要**重复执行某些语句**

在JS中，主要有三种类型的循环语句:

- for循环
- while循环
- do...while循环

在程序中，一组被重复执行的语句被称之为**循环体**，能否继续重复执行，取决于循环的**终止条件**。由循环体及循环的终止条件组成的语句，被称之为**循环语句**。

### 1.for循环

语法结构：
```js
for(初始化变量;条件表达式;操作表达式){
    //循环体
}
```

eg:打印100句“你好吗”
```js
for(var i = 1; i<=100 ; i++){
    //循环体
    console.log('你好吗')
}
//for循环执行过程：
/*
1.首先执行里面的计数器变量 var i=1 .但是这句话在for循环里面只执行一次 
2.去 i<=100 来判断是否满足条件。如果满足条件  就去执行循环体  不满足条件退出循环
3.最后去执行 i++ , i++是单独写的代码 递增  第一轮结束
4.接着去执行 i<=100 如果满足条件 就去执行 循环体  不满足条件退出循环  第二轮
*/
```

eg:求1-100之间所有整数的累加和
```js
var sum=0;
for(var i = 1; i<=100 ; i++){
    //循环体
   //sum=sum+i
   sum += i;
}
console.log(sum);//5050
```

eg:一行打印5个 &
```js
var str = '';
for(var i = 1; i<=5 ; i++){
    str = str + '&'
}
console.log(str);//&&&&&
```

### 2.双重for循环

循环嵌套是指在一个循环语句中再定义一个循环语句的语法结构。

语法结构：
```js
for(外层初始化变量;外层条件表达式;外层操作表达式){
    for(外层初始化变量;外层条件表达式;外层操作表达式){
    //循环体
    }
}
/*
1.外层循环循环一次，里面的循环执行全部
*/
```
eg:
```js
for(var i=1;i<=3;i++){
    console.log('这是外层循环第'+i+'次')
    for(var j=1;j<=3;j++){
    console.log('这是里层循环第'+j+'次')
}
}
```

eg:打印5行5列

```js
// &&&&&
// &&&&&
// &&&&&
// &&&&&
// &&&&&
var str = '';
for(var i=1;i<=5;i++){//外层循环负责打印5行
    for(var j=1;j<=5;j++){//里&层循环负责一行打印5个
        str = str + '&'
    }
    //如果一行打印完毕5个&就要另起一行  加  \n
    str = str + '\n'
}
```
eg:打印倒三角形

```js
// &&&&&&&&&&
// &&&&&&&&&
// &&&&&&&&
// &&&&&&&
// &&&&&&
// &&&&&
// &&&&
// &&&
// &&
// &
var str = '';
for(var i=1;i<=10;i++){//外层循环负责打印5行
    for(var j=i;j<=10;j++){//里层循环负责一行打印i个
        str = str + '&'
    }
    str = str + '\n'
}
```
eg:九九乘法表
```js
var str = '';
for(var i=1;i<=9;i++){//外层循环控制列数
    for(var j=1;j<=i;j++){//里层循环控制每一行的个数
        //str = str + '&'
        str += j + 'x' + i + '=' + i*j + '\t';
    }
    str += '\n'
}
```


### 3.while循环

while 语句可以在条件表达式为真的前提下，循环执行指定的一段代码，直到表达式不为真时结束循环。

while语句的语法结构如下：
```js
while(条件表达式){
    //循环体代码
}
```
eg:
```js
var num = 1;
while(num <= 100){
   console.log('好')
   num++
}
```
eg:计算 1~100之间所有整数的和
```js
var j = 1;
var sum = 0;
while(j <= 100){
    sum += j;
    j++;
}
console.log(sum);//5050
```



### 4.do while循环

它其实是`while`语句的一个变体。该循环会先执行一次代码块，然后对条件表达式进行判断，如果条件为真，就会重复执行循环体，否则退出循环。

`do while` 循环体至少执行一次

语法结构：
```js
do{
    //循环体 条件表达式为 true时重复执行循环体代码
}while(条件表达式)
```

eg:
```js
var i = 1;
do{
   console.log('how are you?');
   i++;
}while( i <= 100)
```
eg:计算 1~100 之间所有整数的和
```js
var sum = 0;
do{
  sum += j;
   j++;
}while( j <= 100)
console.log(sum);//5050
```


### 5.continue break关键字

**continue关键字**

continue关键字用于立即**跳出本次循环，继续下一次循环**(本次循环体中continue之后的代码就会少执行)
```js
for(var i = 1; i <= 5; i++){
    if(i == 3){
        continue;//退出本次循环,直接跳到 i++
    }
    console.log('第' + i + '次循环')
}
```
eg:求 1~100之间，除了能被7整除之外的整数和
```js
var sum = 0;
for(var i = 1; i <= 100; i++){
    if(i%7 == 0){
        continue;//退出本次循环,直接跳到 i++
    }
    sum += i;
}
console.log(sum)
```


**break关键字**

break关键字用于立即**跳出整个循环**(循环结束)
```js
for(var i = 1; i <= 5; i++){
    if(i == 3){
        break;//退出整个循环
    }
    console.log('第' + i + '次循环')
}
```