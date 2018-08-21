

//中文乱码,使用StringDecoder解决乱码问题
const StringDecoder=require('string_decoder').StringDecoder;
const decoder=new StringDecoder('utf8');
const buf=Buffer.from('中文字符串啊啊 !');
console.info(buf.toString());
console.info(buf.length);
for (let i = 0;i < buf.lenght; i += 5){
    const b =Buffer.allocUnsafe(5);//一个中文占三个字节,所以一次拿5个就会乱码
    buf.copy(b,0,i);
    console.info(b.toString());//输出的是乱码
    console.info(decoder.write(b));//使用StringDecoder,他会自动识别3个是一个中文,然后缓存拼接.
}