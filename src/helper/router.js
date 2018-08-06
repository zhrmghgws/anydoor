


const fs=require('fs');
const path=require('path');
const promisify=require('util').promisify;
const stat=promisify(fs.stat);
const readdir=promisify(fs.readdir);
//handlebars,第三方模板库
const handlebars=require('handlebars');
//根据文件后缀名,获取Content-Type对应的类型
const mime=require('./mime');
//根据浏览器支持的压缩类型,对需要压缩的文件进行压缩后在传输
const compress=require('./compress');
//设置缓存策略
const isFresh=require('./cache');
//拼接html模板的路径
const tplPath=path.join(__dirname,'../template/dir.tpl');
console.info(`__dirname:::${__dirname}:::::tplPath::::${tplPath}`);
//__dirname:::/Users/lichao/anydoor/src/helper:::::tplPath::::/Users/lichao/anydoor/src/template/dir.tpl

//同步根据模板的路径读取模板source
const source =fs.readFileSync(tplPath);
//使用handlebars生成模板
const template=handlebars.compile(source.toString());


module.exports= async function router(filePath,req,res,config) {
    console.info(`filePath::::${filePath}`);
    try{
        //获取文件状态信息
        const stats= await stat(filePath);
        if(stats.isFile()){
            //根据文件后缀名,获取Content-Type类型
            const contentType=mime(filePath);
            res.statusCode=200;
            res.setHeader('Content-Type',contentType);
            //isFresh为true说明缓存有效,不需要从新请求.
            if(isFresh(stats,req,res)){
                res.statusCode=304;
                res.end();
                return;
            }
            //无缓存,则创建读取文件的流
            let rs=fs.createReadStream(filePath);
            //正则匹配,文件是否需要压缩
            if(filePath.match(config.compress)){
                rs=compress(rs,req,res);
            }
            rs.pipe(res);
        }else if(stats.isDirectory){
            //如果是文件夹,则获取文件夹下所以的子文件.
            const files=await readdir(filePath);
            console.info(`files::::${files}`);
                res.statusCode=200;
                res.setHeader('Content-Type','text/html');
                //获取文件夹相对于工程目录的相对路径
                const dir=path.relative(config.root,filePath);
                console.info(`config.root::::${config.root}::::dir::${dir}`);
                /*例如:
                filePath::::/Users/lichao/anydoor/src/config
                files::::defaultConfig.js
                config.root::::/Users/lichao/anydoor/src::::dir::config
                */
                //生成模板需要的数据
                const data={
                    title:path.basename(filePath),
                    dir:dir?`/${dir}`:'',         
                    files
                };
                //响应带数据的模板
                res.end(template(data));

        }
    }catch(err){
        console.error(err);
        res.statusCode=404;
        res.setHeader('Content-Type','text/plain');
        res.end(`${filePath} is not find`);
    }
};