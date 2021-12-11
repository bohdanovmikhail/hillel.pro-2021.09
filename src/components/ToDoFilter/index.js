import { BaseComponent } from "../../core/BaseComponent";
import { TAG, HTML } from "../../hooks";
import "./styles.css";

const todoFilterTemplate = `
  <button>All</button>
  <button>Done</button>
  <button>Undone</button>
`;

export class ToDoFilter extends BaseComponent {
  render() {
    [null, true, false].forEach((type, index) => {
      const btn = this._buttons[index];
      btn.disabled = this._model.get("filter") === type;
    });
  }

  _createElements() {
    this._buttons = HTML(todoFilterTemplate);

    [this._allBtn, this._doneBtn, this._undoneBtn] = this._buttons;
    return TAG("div", "todo-filter", this._buttons);
  }

  _bindEvents() {
    this._allBtn.addEventListener("click", () => this._selectFilter(null));
    this._doneBtn.addEventListener("click", () => this._selectFilter(true));
    this._undoneBtn.addEventListener("click", () => this._selectFilter(false));
  }

  _selectFilter(type) {
    this._model.set("filter", type);
  }
}
