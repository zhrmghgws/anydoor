//根据process.argv的参数获取到用户命令行输入的参数信息,
//自己获取参数信息在进行判断等操作,比较麻烦.比较常用的开源库是commander 和 yargs

const yargs=require('yargs');
const Server=require('./app');
const argv=yargs
.usage('anywhere[options]')//怎么用
.option('p',{
    alias:'port',//别名
    describe:'端口号',
    default:9527
})
.option('h',{
    alias:'hostname',
    describe:'host',
    default:'127.0.0.1'
})
.option('d',{
    alias:'root',
    describe:'root path',
    default:process.cwd()
})
.version()
.alias('v','version')
.help()
.argv;
const server=new Server(argv);
server.start();

//使用:node src/index.js -p 9999  或者 node src/index.js --port=9999
