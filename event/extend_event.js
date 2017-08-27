const EventEmitter = require('events');
// extend EventEmitter class
class MyEmitter extends EventEmitter {};
// instance
const myEmitter = new MyEmitter();

myEmitter.on('save', function () {
  // synchronous
  // console.log('emit save event');

	// asynchronous 
	/*setImmediate( () => {
		console.log('emit save event');
	});*/
	process.nextTick( () => {
		console.log('emit save event');
	})
});

myEmitter.on('error', function () {
	console.log('whoops, this is error');
})

myEmitter.emit('save');
myEmitter.emit('error', new Error('whoops'));
// once

myEmitter.once('confirm', function () {
	console.log('this event only one')
});

myEmitter.emit('confirm');

console.log(myEmitter)
