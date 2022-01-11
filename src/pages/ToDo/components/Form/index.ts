import { BaseComponent } from '../../../../core/BaseComponent';
import { fromHTML, fromTAG } from '../../../../helpers';

const formTemplate = `
  <input type="text" placeholder="Enter todo action" />

  <button>Add</button>
`;

export interface IFormState {
  value: string;
}

export class Form extends BaseComponent<IFormState> {
  private input: HTMLInputElement;
  private button: HTMLButtonElement;

  public render() {
    this.input.value = this.model.get('value');
  }

  protected _createElements() {
    const controls = fromHTML<[HTMLInputElement, HTMLButtonElement]>(formTemplate);

    [this.input, this.button] = controls;
    return fromTAG('div', 'todo-form', controls);
  }

  protected _bindEvents() {
    this.input.addEventListener('input', () => {
      const value = this.input.value.trim();
      this.model.set('value', value);
    });

    this.button.addEventListener('click', () => {
      const value = this.model.get('value');

      if (!value) {
        return;
      }

      this.model.set('value', '');
      this.model.action('add', value);
    });
  }
}
