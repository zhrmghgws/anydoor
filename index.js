

// eslint-disable-next-line
console.log('saaaaaa');  
const {argv,argv0,execArgv,execPath,env}=process;
argv.forEach(it=>{
    //执行node index.js --test a=10 b=2
    console.info(`argv:::::: ${it}`);
    });
    
    console.info(`argv0:::::::${argv0}`);
    console.info(`execArgv:::::::${execArgv}`);
    console.info(`execPath:::::::${execPath}`);
    console.info(`env:::::::${env}`);
    console.info(`cwd:::::::${process.cwd()}`);

    setImmediate(()=>{
        console.info('setImmediate');
    });
    setTimeout(()=>{
        console.info('setImmediate');
    },0);
    process.nextTick(()=>{
        console.info('nextTick');
    });
    process.nextTick(()=>{
        console.info('nextTick1111111');
        console.info('nextTick222222');
        console.info('nextTick3333333');
    });
    //上面三个的执行顺序是 nextTick ,setTimeout,setImmediate:
    /*
    观察者优先级

    在每次轮训检查中，各观察者的优先级分别是：

    idle观察者 > I/O观察者 > check观察者。

    idle观察者：process.nextTick

    I/O观察者：一般性的I/O回调，如网络，文件，数据库I/O等

    check观察者：setImmediate，setTimeout

    */
