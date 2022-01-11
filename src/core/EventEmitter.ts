export class EventEmitter {
  protected handlers: Map<string, Function> = new Map();

  emit(event: string, ...data: any[]): void {
    if (!this.handlers[event]) {
      return;
    }

    this.handlers[event].forEach(handler => handler.apply(null, data));
  }

  on(event: string, handler: Function): void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }

    this.handlers[event].push(handler);
  }

  off(event: string, handler?: Function): void {
    if (!event) {
      return;
    }

    if (!handler) {
      delete this.handlers[event];
      return;
    }

    const handlers = this.handlers[event];
    const index = handlers.indexOf(handler);

    if (index < 0) {
      return;
    }

    handlers.splice(index, 1);
  }
}
