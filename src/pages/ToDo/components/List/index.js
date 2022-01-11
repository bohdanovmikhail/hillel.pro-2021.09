import { BaseComponent } from '../../../../core/BaseComponent';
import { fromTAG } from '../../../../helpers';

export class List extends BaseComponent {
  render() {
  }

  _createElements() {
    return fromTAG('div', 'todo-items');
  }
}
