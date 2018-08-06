const path=require('path');
const mimeType={
    'css':'text/css',
    'gif':'image/gif',
    'html':'text/html',
    'ico':'image/x-icon',
    'jpeg':'image/jpeg',
    'jpg':'image/jpeg',
    'js':'text/javascript',
    'json':'application/json',
    'pdf':'application/pdf',
    'png':'image/png',
    'svg':'image/svg+xml',
    'swf':'application/x-shockwave-flash',
    'tiff':'image/tiff',
    'txt':'text/plain',
    'wav':'audio/x-wav',
    'wma':'audio/x-ms-wma',
    'wmv':'video/x-ms-wmv',
    'xml':'text/xml'
};
module.exports=(filepath)=>{
    let ext=path.extname(filepath)
    .split('.')
    .pop()//从数组中删除最后一个元素,并返回改元素
    .toLowerCase();
    if(!ext){
        ext=filepath;
    }
    return mimeType[ext] || mimeType['txt'] ;
};