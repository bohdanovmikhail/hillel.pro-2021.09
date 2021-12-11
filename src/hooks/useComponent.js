import { BaseModel } from "../core/BaseModel";

export function useComponent(klass, initialData) {
  const model = new BaseModel(initialData);
  const component = new klass(model);

  return [component.outElement, model];
}
