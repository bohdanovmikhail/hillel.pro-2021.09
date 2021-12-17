import { BaseComponent } from '../../../../core/BaseComponent';
import { fromHTML, fromTAG } from '../../../../helpers';
import './styles.css';

const todoFilterTemplate = `
  <button>All</button>
  <button>Done</button>
  <button>Undone</button>
`;

export class Filter extends BaseComponent {
  constructor(model) {
    super(model);

    this._allBtn = null;
    this._doneBtn = null;
    this._undoneBtn = null;
  }

  render() {
    const filterState = this._model.get('filter');

    [null, true, false].forEach((type, index) => {
      const btn = this._buttons[index];
      btn.disabled = filterState === type;
    });
  }

  _createElements() {
    this._buttons = fromHTML(todoFilterTemplate);

    [this._allBtn, this._doneBtn, this._undoneBtn] = this._buttons;

    return fromTAG('div', 'todo-filter', this._buttons);
  }

  _bindEvents() {
    this._allBtn.addEventListener('click', () => this._selectFilter(null));
    this._doneBtn.addEventListener('click', () => this._selectFilter(true));
    this._undoneBtn.addEventListener('click', () => this._selectFilter(false));
  }

  _selectFilter(type) {
    this._model.set('filter', type);
  }
}
