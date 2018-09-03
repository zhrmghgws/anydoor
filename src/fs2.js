
/*
const fs=require('fs');
//1:读文件
//异步
fs.readFile('./app.js','utf-8',(err,data)=>{
    //回调参数第一个默认都是留给err.
    if(err) throw err;
    console.info(data);
    //data是一个Buffer对象,可以使用buf.toString()或者传入第二个参数"utf-8",就能转成字符串原文输出了.
});
//同步
const data=fs.readFileSync('./event1.js');
console.info(data.toString);

//2:写文件
fs.writeFile('./text','this is a file',{encoding:'utf8'},err=>{
    if(err) throw err;
    console.info('done!');
});

//第一个参数可以接受字符串,number,Buffer,URL ,第二个参数是any,第三个参数options可以是字符串,也可以是对象
最后一个参数就是callback:

function writeFile(path: string | number | Buffer | URL, data: any, options: string | {
    encoding?: string;
    mode?: string | number;
    flag?: string;
}, callback: (err: NodeJS.ErrnoException) => void): void (+1 overload)

//例如:第三个参数直接写'utf8'
fs.writeFile('./text','this is a file','utf8',err=>{
    if(err) throw err;
    console.info('done!');
});
//例如:第二个参数使用buffer,此时编码会被忽略,所以不写编码.
const content=Buffer.form('this is a test two');
fs.writeFile('./text',content,err=>{
    if(err) throw err;
    console.info('写入完毕!');
});

//3:stat:文件的信息
fs.stat('./fs1.js',(err,stats)=>{
    if(err) throw err;
    console.info(stats.isFile());
    console.info(stats.isDirectory());
    console.info(stats);
});
//输出:
true
false
Stats {
  dev: 16777221,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4194304,
  ino: 8610839377,
  size: 1502,
  blocks: 8,
  atimeMs: 1533393804125.2935,
  mtimeMs: 1533393798436.2554,
  ctimeMs: 1533393798436.2554,
  birthtimeMs: 1533392447988.969,
  atime: 2018-08-04T14:43:24.125Z,
  mtime: 2018-08-04T14:43:18.436Z,
  ctime: 2018-08-04T14:43:18.436Z,
  birthtime: 2018-08-04T14:20:47.989Z }

  //rename:改名字
  fs.rename('./text','text.txt',err=>{

  });

  //unlink:删除
  fs.unlink('./text.txt',err=>{});

  //readdir:读取路径下的文件:
  fs.readdir('./',(err,files)=>{
     if(err) throw err;
     console.info(files);
  });
  //输出:
  [ 'app.js',
  'buffer1.js',
  'buffer2.js',
  'config',
  'event1.js',
  'fs1.js',
  'pathDev.js',
  'text' ]

  //mkdir:创建文件夹
  //rmdir:删除文件夹
   
  //watch监听一个文件:
  function watch(filename: PathLike, options: {
    encoding?: BufferEncoding;
    persistent?: boolean;
    recursive?: boolean;//是否递归,循环监听目录下的文件
} 
  //例子:
  fs.watch('./',{
      recursive:true
  },(eventTyep,filename)=>{
      console.info(eventTyep,filename);
  });

  //读取流:
  //readstream:stream流,有方向的数据,数据从一个文件(设备)流向另一个文件(设备),
  //其他的操作文件(readFiel)的方式是将文件一次都放在内存中,然后进行操作.出来在内存中操作,还可以使用stream(流)
  //就像自来水管接水一样,以前都是用桶,接一桶,提过去.用流就相当于使用自来水管,一边流一边给,水龙头放多少水,就流过去多少.
  //生产多少,就消费多少.
  //stream的应用非常广泛:比如最早我们的电脑内存是512M的,但是我们可以看一个2G的电影,像其他的方式理论是,要先将2G的电影
  //放到内存中,这样就没法看了,但是使用流就可以了,一点点往内存中放,一点点看.一边流一边看.
  //用户访问网页,网速慢的时候可以看到也是网页一点点加载出来的.其实用户访问网页也是读一点给一点,不是一次读完再给.
  const rs=fs.createReadStream('./event1.js');
  rs.pipe(process.stdout);
  //steam都有一个水管(pipe)的方法,就是水管里的数据要流向哪里,process.stdout就是标准控制台.

//写入流:
const ws=fs.createWriteStream('./test.txt');
const tid=setInterval(()=>{
    const num=parseInt(Math.random()*10);
    if(num<9){
        ws.write(num+'');
    }else{
        clearInterval(tid);
        ws.end();
    }
},200);
//写入流有finish的监听
ws.on('finish',(err)=>{
    if(err) throw err;
    console.info('写入完毕!');
});

//像文件的读取等一般都使用异步操作,但是如果异步回调很多的话,就会陷入回调地狱的境地.
//使用promisfify来避免回调地狱,上面异步回调的读取文件,就可以像写同步一样.
const promisify=require('util').promisify;
const read=promisify(fs.readFile);
read('./fs1.js').then(data=>{
    console.info(data.toString())
}).catch(err=>{
    console.info(err);
});

//使用promisify将readFile方法包裹以后,使用async await的方式避免回调地狱
const promisify=require('util').promisify;
const read=promisify(fs.readFile);
async function test(){
    try{
        const content=await read('./fs1.js');
        console.info(content.toString());
    }catch(err){
        console.info(err);
    }
}
test();
*/




