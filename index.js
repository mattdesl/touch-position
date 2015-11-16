var addEvent = require('add-event-listener')
var offset = require('mouse-event-offset')
var Emitter = require('events/')

function attach(opt) {
    opt = opt||{}
    opt.element = opt.element || window

    var emitter = new Emitter()

    var position = opt.position || [0, 0]
    if (opt.touchstart !== false) {
        addEvent(opt.element, 'mousedown', update)
        addEvent(opt.element, 'touchstart', touchstart)
    }

    addEvent(opt.element, 'mousemove', update)
    addEvent(opt.element, 'touchmove', touchmove)

    emitter.position = position
    emitter.dispose = dispose
    return emitter

    function touchstart(ev) {
        var touch = ev.targetTouches[0]
        update(ev, touch)
    }

    function touchmove(ev) {
        var touch = ev.targetTouches[0]
        update(ev, touch)
    }

    function update(ev, client) {
        var pos = offset(ev, client)
        position[0] = pos.x
        position[1] = pos.y
        emitter.emit('move', ev)
    }

    function dispose() {
        addEvent.removeEventListener(opt.element, 'mousemove', update)
        addEvent.removeEventListener(opt.element, 'mousedown', update)
        addEvent.removeEventListener(opt.element, 'touchmove', touchmove)
        addEvent.removeEventListener(opt.element, 'touchstart', touchstart)
    }
}

module.exports = function(opt) {
    return attach(opt).position
}

module.exports.emitter = function(opt) {
    return attach(opt)
}