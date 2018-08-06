//引入压缩的库'zlib'
const {createGzip,creatDeflate}=require('zlib');
module.exports=(rs,req,res)=>{
    //根据req获取浏览器支持的压缩方式
    const acceptEncoding=req.headers['accept-encoding'];
    //如果获取到压缩方式是null 或者不是gzip或deflate方式(前后带有边界的正则匹配,既必须完全匹配)直接返回rs,不压缩
    if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
        return rs;
    }else if(acceptEncoding.match(/\bgzip\b/)){
        //告诉浏览器,服务端采用的压缩方式是gzip
        res.setHeader('Content-Encoding','gzip');
        return rs.pipe(createGzip());
    }else if(acceptEncoding.match(/\bdeflate\b/)){
        //告诉浏览器,服务端采用的压缩方式是deflate
        res.setHeader('Content-Encoding','deflate');
        return rs.pipe(creatDeflate());
    }
};