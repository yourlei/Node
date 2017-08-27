## events 模块

Nodejs 中的大部分核心API都有使用了异步事件驱动的架构,所有能触发事件的对象都是EventEmitter类的实例. 比如 *net.Server*对象每次接收到请求都会触发事件, *fs.ReadStream*会在文件被打开时触发事件, *stream*当数据可读时触发事件.

## EventEmitter 类

