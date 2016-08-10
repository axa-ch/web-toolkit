class Emitter {
  constructor() {
    this.on = this.on.bind(this)
    this.emit = this.emit.bind(this)
    this.events = {}
  }

  on(eventName, cb) {
    // lazy pollute events map
    if (!(eventName in this.events)) {
      this.events[eventName] = []
    }
    this.events[eventName].push(cb)
  }

  emit(eventName, ...args) {
    if (eventName in this.events) {
      this.events[eventName].map((fx) =>
        fx.apply(this, args)
      )
    }
  }
}

export default Emitter
