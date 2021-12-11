import { BaseComponent } from "../../core/BaseComponent";
import { component } from "../../helpers/createComponent";
import { TAG } from "../../hooks";
import { ToDoFilter } from "../ToDoFilter";
import { ToDoForm } from "../ToDoForm";

export class ToDoList extends BaseComponent {
  render() {}

  _createElements() {
    const form = component(ToDoForm);
    const filter = component(ToDoFilter);
    this._items = TAG("div", "todo-items");

    return TAG("div", "todo-list", [form, filter, this._items]);
  }
}
