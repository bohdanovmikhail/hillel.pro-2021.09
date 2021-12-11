export class EventEmitter {
  constructor() {
    this._handlers = {};
  }

  emit(event, data) {
    if (!this._handlers[event]) {
      return;
    }

    this._handlers[event].forEach((handler) => handler(data));
  }

  on(event, handler) {
    if (!this._handlers[event]) {
      this._handlers[event] = [];
    }

    this._handlers[event].push(handler);
  }

  off(event, handler) {
    if (!event) {
      return;
    }

    if (!handler) {
      delete this._handlers[event];
      return;
    }

    const handlers = this._handlers[event];
    const index = handlers.indexOf(handler);

    if (index < 0) {
      return;
    }

    handlers.splice(index, 1);
  }
}
