const EventEmitter = require('events');
class MyEmitter extends EventEmitter {
}
const myEmitter = new MyEmitter();

myEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.info('这个是异步发生的'+a+b);
  });

});

myEmitter.emit('event', 'a', 'b');