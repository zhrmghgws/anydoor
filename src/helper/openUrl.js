const {exec}=require('child_process');

module.exports=url=>{
    //区分mac和windows,用户输入 anydoor url 之后,自动用浏览器打开.
    switch(process.platform){
        case 'darwin'://mac
            exec(`open ${url}`);//mac系统中 open 后面是url 会使用浏览器打开.
            break;
        case 'win32'://windows
            exec(`start ${url}`);//windows中 start 后面是url 会使用浏览器打开.
            break;
    }
};