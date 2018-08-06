/*缓存:
缓存header:判断本地是否失效:
1:
expires(老式的):绝对时间,但是因为时区的原因,已经用的很少了.
Cache-Control:返回的相对时间,

2:
If-Modified-Since/Last-Modified:上次给的时间之后改过吗? / 最近一次更改的时间.

3:
If-None-Math/ETag:校验ETag,类似生成hash进行校验.

*/
const {cache}=require('../config/defaultConfig');
function refreshRes(stats,res) {
    const{maxAge,expires,cacheControl,lastModified,etag}=cache;
    if(expires){
        //告诉浏览器一个未来确定的过期时间.
        res.setHeader('Expires',(new Date(Date.now()+maxAge*1000).toUTCString));
    }
    if(cacheControl){
        //告诉浏览器一个相对的过期时间(保质期).
        res.setHeader('Cache-Control',`public, max-age=${maxAge}`);
    }
    if(lastModified){
        //告诉浏览器,文件的最近的修改时间
        res.setHeader('Last-Modified',stats.mtime.toUTCString());
    }
    if(etag){
        //告诉浏览器这个文件的类似hash值是否一致.
        res.setHeader('ETag',`${stats.size}-${stats.mtime}`);
    }
}
//返回false表示需要重新响应数据
module.exports=function isFresh(stats,req,res) {
    //根据支持的缓存方式,将缓存的标志添加到响应头中,带给浏览器.
    refreshRes(stats,res);
    //获取本次浏览器带过来缓存文件是否过期的信息
    const lastModified=req.headers['if-modified-since'];
    const etag=req.headers['if-none-match'];
    //浏览器没有任何改文件的缓存信息,既表示应该是第一次请求这个文件
    if(!lastModified && !etag){
        return false;
    }
    //浏览器有该文件的缓存,但是缓存文件的最近一次修改时间不一致,说明文件修改过了,不能使用缓存,需要重新响应数据
    if(lastModified && lastModified!==res.getHeader('Last-Modified')){
        return false;
    }
    //浏览器有该文件的缓存,但是缓存文件的唯一性的值不一致,说明文件修改过了,不能使用缓存,需要重新响应数据
    if(etag && etag!==res.getHeader('ETag')){
        return false;
    }
    return true;
};