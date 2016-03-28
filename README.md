# touch-position

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Gets the current mouse/touch position as a 2-component vector. By default, attaches mouse and touch events to `window`.

```js
var position = require('touch-position')();

//inside your render loop...
function render () {
  drawSprite(position[0], position[1]);
}
```

*Note:* Version 2.x and above no longer supports IE <= 8.

## Usage

[![NPM](https://nodei.co/npm/touch-position.png)](https://nodei.co/npm/touch-position/)

#### `position = touchPosition([opt])`

Returns a `position` array with the mouse or current finger's `[ x, y ]` position. Options:

- `element` the element to attach the events to, defaults to `window`
- `touchstart` whether to change position on `touchstart` and `mousedown` events as well (default true)
- `position` the initial position to start with (i.e. before any events are triggered), default is `[0, 0]`

#### `emitter = touchPosition.emitter([opt])`

The same as above, but returns an `EventEmitter` so you can handle move events:

```js
var touch = require('touch-position').emitter()
touch.on('move', handleMove)

console.log(touch.position) // the current [x,y] position
```

#### `emitter.dispose()`

Removes any attached event listeners from `element` when you no longer need it. After calling this method, `touch.position` will no longer update and the `move` event will stop firing.

```js
var touch = require('touch-position').emitter()

touch.dispose()
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/touch-position/blob/master/LICENSE.md) for details.
