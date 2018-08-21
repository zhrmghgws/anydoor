//Buffer的实例化
console.info(Buffer.alloc(10));
//<Buffer 00 00 00 00 00 00 00 00 00 00>(size是固定的10)
console.info(Buffer.alloc(6));
//<Buffer 00 00 00 00 00 00>
console.info(Buffer.alloc(5,1));
//<Buffer 01 01 01 01 01>(size是固定的5,并且用1填充)
console.info(Buffer.allocUnsafe(5));
//<Buffer f8 d3 05 04 01> (随机的,所以会有旧数据的不安全性)
console.info(Buffer.from([1,2,3]));
//<Buffer 01 02 03>
console.info(Buffer.from('test'));
//<Buffer 74 65 73 74>(默认是utf-8)
console.info(Buffer.from('test','base64'));
//<Buffer b5 eb 2d>(使用base64编码)

//Buffer的静态方法:byteLength(字节长度), isBuffer(是否是Buffer), concat(Buffer拼接)
console.info(Buffer.byteLength('test'));
//4(字节长度)
console.info(Buffer.byteLength('测试'));
//6(一个中文占3个字节)

console.info(Buffer.isBuffer({}));
//false
console.info(Buffer.isBuffer(Buffer.from([1,2,3])));
//true

const buf1=Buffer.from('this');
const buf2=Buffer.from('is');
const buf3=Buffer.from('a');
const buf4=Buffer.from('buffer');
const buf=Buffer.concat([buf1,buf2,buf3,buf4]);
console.info(buf.toString());
//thisisabuffer

//实例的常用属性和方法:
/*
buf.length,buf.toString(),buf.fill(),buf.equals(),buf.indexof(),buf.copy()
*/
//buf.length 和内容无关,只是buffer的长度.
const buf5=Buffer.from('this is a buffer');
console.info(buf5.length);//16
console.info(buf5.toString());//this is a buffer

const buf6=Buffer.alloc(10);
buf6[2]=5;
console.info(buf6.length);//10

const buf7=Buffer.allocUnsafe(10);
console.info(buf7.length);//10
//fill:填充
console.info(buf7.fill(1,1,5));//<Buffer 00 01 01 01 01 00 00 00 00 00>

//equals比较两个buffer的内容是否一样.
const buf8=Buffer.from('test');
const buf9=Buffer.from('test');
const buf10=Buffer.from('test!!');
console.info(buf8.equals(buf9));//true
console.info(buf8.equals(buf10));//false

//indexOf跟数组一样,找不到返回-1
console.info(buf8.indexOf('s'));//2
console.info(buf8.indexOf('es0'));//-1








