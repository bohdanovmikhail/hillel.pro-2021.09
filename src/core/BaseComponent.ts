import { BaseModel } from './BaseModel';

export abstract class BaseComponent<State> {
  protected model: BaseModel<State>;
  protected outElement: HTMLElement;

  constructor(model: BaseModel<State>) {
    this.model = model;
    this.outElement = this._createElements();

    if (!this.outElement) {
      this._error('does not create outElement');
    }

    this.model.onUpdate(() => this.render());
    this.model.onRemove(() => this.outElement.remove());

    this._bindEvents();
    this.render();
  }

  // Реализуем метод отрисовки компонента,
  // при помощи которого наш мини фреймворк будет уведомлять класс
  // о том что необхоидмо обновить данные в интерфейсе
  public abstract render(): void;

  // Реализуем метод который должен создавать все необходимые
  // элементы для компонента
  protected abstract _createElements(): HTMLElement;

  protected abstract _bindEvents(): void;

  get _className(): string {
    // Получаем имя класса который наследует базовый класс
    // class SomeComponent extends BaseComponent {}
    // this.constructor.name === 'SomeComponent'
    return this.constructor.name;
  }

  protected _error(message): never {
    // Выбрасываем ошибку, с информацией о том что наш дочений класс
    // не реализует метод для отрисовки
    throw new Error(`Component ${this._className}: ${message}`);
  }
}
