var position = require('./')();
var css = require('dom-css');
var loop = require('raf-loop');

var div = document.createElement('div');
document.body.appendChild(div);

css(div, {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: '-25px -25px',
  width: 50,
  height: 50,
  background: 'red'
});

loop(update).start();

// So page does not scroll on mobile
window.addEventListener('touchstart', function (ev) {
  ev.preventDefault();
});

function update () {
  css(div, {
    left: position[0],
    top: position[1]
  });
}
