import { BaseModel } from '../core/BaseModel';

export function fromComponent(Component, Model = BaseModel) {
  return function (initialData = {}) {
    const model = new Model(initialData);
    const component = new Component(model);

    return [component.outElement, model];
  };
}
