import { BaseComponent } from '../../../../core/BaseComponent';
import { fromTAG, fromHTML } from '../../../../helpers';
import './styles.css';

const todoItemTemplate = `
  // Шаблон для инпута
  <input type="checkbox" />

  // Шаблон для текста
  <span></span>

  // Шаблон для кнопки удаления
  <button>X</button>
`;

export class Item extends BaseComponent {
  render() {
    const done = this._model.get('done');

    this.outElement.classList.toggle('checked', done);
    this._text.innerHTML = this._model.get('title');
    this._input.checked = done;
  }

  _createElements() {
    const children = fromHTML(todoItemTemplate);

    [this._input, this._text, this._button] = children;
    return fromTAG('div', 'todo-item', children);
  }

  _bindEvents() {
    this._input.addEventListener('change', () => {
      this._model.set('done', this._input.checked);
    });

    this._button.addEventListener('click', () => {
      this._model.remove();
    });
  }
}
