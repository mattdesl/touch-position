var addEvent = require('add-event-listener');
var offset = require('mouse-event-offset');
var EventEmitter = require('events').EventEmitter;

function attach (opt) {
  opt = opt || {};
  var element = opt.element || window;

  var emitter = new EventEmitter();

  var position = opt.position || [0, 0];
  if (opt.touchstart !== false) {
    addEvent(element, 'mousedown', update);
    addEvent(element, 'touchstart', updateTouch);
  }

  addEvent(element, 'mousemove', update);
  addEvent(element, 'touchmove', updateTouch);

  emitter.position = position;
  emitter.dispose = dispose;
  return emitter;

  function updateTouch (ev) {
    var touch = ev.targetTouches[0];
    update(touch);
  }

  function update (ev) {
    offset(ev, element, position);
    emitter.emit('move', ev);
  }

  function dispose () {
    addEvent.removeEventListener(element, 'mousemove', update);
    addEvent.removeEventListener(element, 'mousedown', update);
    addEvent.removeEventListener(element, 'touchmove', updateTouch);
    addEvent.removeEventListener(element, 'touchstart', updateTouch);
  }
}

module.exports = function (opt) {
  return attach(opt).position;
};

module.exports.emitter = function (opt) {
  return attach(opt);
};
