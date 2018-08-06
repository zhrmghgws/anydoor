const {join,resolve,relative}=require('path');
console.info(join('/user','local','/bin/')); //结果是:/user/local/bin/
console.info(join('/use','../local','bin/'));//结果是:/local/bin/

console.info(resolve('./')); //结果是:/Users/lichao/anydoor/src
console.info(resolve('src/app.js','anydoor/index.js'));
console.info(resolve('src/config','./bbbb'));
console.info(resolve('src/config','/bbbb/aaaaa/'));
console.info(relative('anydoor/src/config','anydoor/typings/globals'));
console.info(process.env.PATH);
console.info(process.env.PATH);
