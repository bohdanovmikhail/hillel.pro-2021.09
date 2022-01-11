import { BaseComponent } from '../../core/BaseComponent';
import { fromComponent, fromTAG } from '../../helpers';

import { Filter, IFilterState } from './components/Filter';
import { Form, IFormState } from './components/Form';
import { List, IListState } from './components/List';

import './styles.css';
import { BaseModel } from '../../core/BaseModel';

export class ToDo extends BaseComponent<any> {
  private filterModel: BaseModel<IFilterState>;
  private formModel: BaseModel<IFormState>;
  private listModel: BaseModel<IListState>;

  render() {
  }

  _createElements() {
    let formElement, filterElement, listElement;

    [formElement, this.formModel] = fromComponent(Form)({ value: '' });
    [filterElement, this.filterModel] = fromComponent(Filter)({ filter: null });
    [listElement, this.listModel] = fromComponent(List)({ list: [] });

    return fromTAG('div', 'todo-list', [
      formElement,
      filterElement,
      listElement,
    ]);
  }

  _bindEvents() {
    this.formModel.onAction('title', title => this._addItem(title));
    this.filterModel.onUpdate('change', filter => this.model.set('filter', filter));
  }

  _addItem(title) {
    const oldList = this.model.get('list');
    const newItem = { title, done: false };

    this.model.set('list', [
      ...oldList,
      newItem,
    ]);
  }
}
