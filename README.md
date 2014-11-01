# touch-position

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Gets the current mouse/touch position as a 2-component vector. By default, attaches mouse and touch events to `window`.

```js
var position = require('touch-position')()

//inside your render loop...
function render() {
    drawSprite( position[0], position[1] )
}
```

## Usage

[![NPM](https://nodei.co/npm/touch-position.png)](https://nodei.co/npm/touch-position/)

#### `touchPosition([opt])`

Returns a vector with the mouse or touch [x, y] on the window. Options:

- `element` the element to attach the events to, defaults to `window`
- `touchstart` whether to change position on `touchstart` and `mousedown` events as well (default true)

#### `touchPosition.emitter([opt])`

The same as above, but returns an `EventEmitter` so you can handle move events:

```js
var touch = require('touch-position').emitter()
touch.on('move', handleMove)

console.log( touch.position ) // the current [x,y] position
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/touch-position/blob/master/LICENSE.md) for details.
