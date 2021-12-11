import { EventEmitter } from "./EventEmitter";

export class BaseModel extends EventEmitter {
  constructor(initialData) {
    super();

    this._data = new Map();

    if (initialData && typeof initialData === "object") {
      for (const key in initialData) {
        const value = initialData[key];
        this._data.set(key, value);
      }
    }
  }

  get(key) {
    return this._data.get(key);
  }

  set(key, value) {
    this._data.set(key, value);
    this.update();
  }

  update() {
    this.emit("update");
  }

  remove() {
    this.emit("remove");

    this.off("update");
    this.off("remove");
  }

  onUpdate(callBack) {
    this.on("update", callBack);
  }

  onRemove(callBack) {
    this.on("remove", callBack);
  }
}
