import { BaseComponent } from "../../core/BaseComponent";
import { TAG, HTML } from "../../hooks";
import "./styles.css";

const todoItemTemplate = `
  // Шаблон для инпута
  <input type="checkbox" />

  // Шаблон для текста
  <span></span>

  // Шаблон для кнопки удаления
  <button>X</button>
`;

export class ToDoItem extends BaseComponent {
  _createElements() {
    const children = HTML(todoItemTemplate);

    [this.__input, this.__text, this.__button] = children;
    return TAG("div", "todo-item", children);
  }

  _bindEvents() {
    this.__input.addEventListener("change", () => {
      this._model.set("done", this.__input.checked);
    });

    this.__button.addEventListener("click", () => {
      this._model.remove();
    });
  }

  render() {
    const done = this._model.get("done");

    this.outElement.classList.toggle("checked", done);
    this.__text.innerHTML = this._model.get("title");
    this.__input.checked = done;
  }
}
