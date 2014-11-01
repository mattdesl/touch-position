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
        addEvent(opt.element, 'touchstart', function(ev) {
            var touch = ev.targetTouches[0]
            update(ev, touch)
        })
    }

    addEvent(opt.element, 'mousemove', update)
    addEvent(opt.element, 'touchmove', function(ev) {
        var touch = ev.targetTouches[0]
        update(ev, touch)
    })

    emitter.position = position
    return emitter

    function update(ev, client) {
        var pos = offset(ev, client)
        position[0] = pos.x
        position[1] = pos.y
        emitter.emit('move', ev)
    }
}

module.exports = function(opt) {
    return attach(opt).position
}

module.exports.emitter = function(opt) {
    return attach(opt)
}