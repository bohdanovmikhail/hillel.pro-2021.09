// Создаем базовый класс, который нам позволит иметь общее поведение,
// для всех компонентов
export class BaseComponent {
  constructor(model) {
    this._model = model;
    this.outElement = this._createElements();

    if (!this.outElement) {
      this._error("does not create outElement");
    }

    this._model.onUpdate(() => this.render());
    this._model.onRemove(() => this.outElement.remove());

    this._bindEvents();
    this.render();
  }

  // Реализуем метод отрисовки компонента,
  // при помощи которого наш мини фреймворк будет уведомлять класс
  // о том что необхоидмо обновить данные в интерфейсе
  render() {
    this._error("does not implement the render() method");
  }

  _createElements() {
    this._error("has no method for creating DOM elements");
  }

  _bindEvents() {}

  get _className() {
    // Получаем имя класса который наследует базовый класс
    // class SomeComponent extends BaseComponent {}
    // this.constructor.name === "SomeComponent"
    return this.constructor.name;
  }

  _error(message) {
    // Выбрасываем ошибку, с информацией о том что наш дочений класс
    // не реализует метод для отрисовки
    throw new Error(`Component ${this._className}: ${message}`);
  }
}
