import { BaseComponent } from '../../../../core/BaseComponent';
import { fromHTML, fromTAG } from '../../../../helpers';
import './styles.css';

const todoFilterTemplate = `
  <button>All</button>
  <button>Done</button>
  <button>Undone</button>
`;

export interface IFilterState {
  filter: null | true | false;
}

export class Filter extends BaseComponent<IFilterState> {
  private buttons: HTMLButtonElement[];
  private allBtn: HTMLButtonElement;
  private doneBtn: HTMLButtonElement;
  private undoneBtn: HTMLButtonElement;

  render() {
    const filterState = this.model.get('filter');

    [null, true, false].forEach((type, index) => {
      const btn = this.buttons[index];
      btn.disabled = filterState === type;
    });
  }

  protected _createElements(): HTMLElement {
    this.buttons = fromHTML<HTMLButtonElement[]>(todoFilterTemplate);

    [this.allBtn, this.doneBtn, this.undoneBtn] = this.buttons;

    return fromTAG('div', 'todo-filter', this.buttons);
  }

  protected _bindEvents() {
    this.allBtn.addEventListener('click', () => this.selectFilter(null));
    this.doneBtn.addEventListener('click', () => this.selectFilter(true));
    this.undoneBtn.addEventListener('click', () => this.selectFilter(false));
  }

  private selectFilter(type) {
    this.model.set('filter', type);
  }
}
