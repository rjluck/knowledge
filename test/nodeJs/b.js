

var foo = 'bbb';
console.log('exports', exports);//{}
exports.foo = 'hello';
exports.add = function (x, y) {
    return x + y;
}