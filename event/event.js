const EventEmitter = require('events');
/**
 * create EventEmitter instance
 * class EventEmitter
 */
const ee = new EventEmitter();

/**
 * 单个事件默认的最大监听函数时10个,
 * if n > 10 时会发出 warnning
 * setMaxListeners 可以设置事件的监听函数个数
 */
ee.setMaxListeners(20);

function listener(name, email) {
	console.log('event_1', 'name = ', name, 'email = ', email);
}

// 注册事件
// on(eventName, listenerFunction)
// listenerFunction 可以是命名或是匿名函数
ee.on('event_1', listener);

for (let i = 0; i < 12; i++) {
	ee.on('event_1', () => {
    console.log('the number is ', i);
	});
}

// removeListener(eventname, listenerFuntion)
ee.removeListener('event_1', listener);

ee.on('event_2', function () {
	console.log('event_2', this);
})

// removeAllListeners 移除所有注册的监听事件
ee.emit('event_1');
ee.emit('event_2')
ee.removeAllListeners();
