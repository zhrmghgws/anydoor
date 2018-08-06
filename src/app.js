/// <reference path="../typings/globals/node/index.d.ts"/>

const http= require('http');
const chalk=require('chalk');
const conf=require('./config/defaultConfig');
const path=require('path');
const router=require('./helper/router');
const openUrl=require('./helper/openUrl');

class Server{
    
    constructor(config){
        //将从命令行到的的参数和我们的参数默认值进行合并.
        this.conf=Object.assign({},conf,config);
    }
    start(){
        //创建服务
        const server=http.createServer((req,res)=>{
            console.info(`root::::${this.conf.root}::::req.url:::${req.url}`);
            //root(process.cwd()):/Users/lichao/anydoor/src 既app.js所在的目录.
            //req.url拼接本地路由
            const filePath=path.join(this.conf.root,req.url);
            //根据本地路由,展示文件或文件夹
            router(filePath,req,res,this.conf);
        });
        //服务开启后的监听
        server.listen(this.conf.port,this.conf.hostname,()=>{
            const addr=`http://${this.conf.hostname}:${this.conf.port}`;
            console.info(`server started at ${chalk.green(addr)}`);
            openUrl(addr);//服务开启之后,自动打开用户输入的url.
        });
    }
}

module.exports=Server;