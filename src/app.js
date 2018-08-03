/// <reference path="../typings/globals/node/index.d.ts"/>
const http= require('http');
const chalk=require('chalk');
const conf=require('./config/defaultConfig');
const path=require('path');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    const filePath=path.join(conf.root,req.url);
    fs.stat(filePath,(err,stats)=>{
        if(err){
            res.statusCode=404;
            res.setHeader('Content-Type','text/plain');
            res.end(`${filePath} is not find`);
            return;
        }
        if(stats.isFile()){
            res.statusCode=200;
            res.setHeader('Content-Type','text/plain');
            fs.createReadStream(filePath).pipe(res);
            res.end(filePath);
        }
    });
    
});
server.listen(conf.port,conf.hostname,()=>{
    const addr=`http://${conf.hostname}:${conf.port}`;
    console.info(`server started at ${chalk.green(addr)}`);
});