import { EventEmitter } from './EventEmitter';

export class BaseModel<State, Key extends keyof State = keyof State> extends EventEmitter {
  protected data: Map<any, any> = new Map();
  protected mounted: boolean = false;

  constructor(initialData?: Partial<State>) {
    super();

    if (initialData && typeof initialData === 'object') {
      for (const key in initialData) {
        if (!initialData.hasOwnProperty(key)) {
          continue;
        }

        const value: State[Key] = initialData[key] as unknown as State[Key];
        this.data.set(key, value);
      }
    }
  }

  public get<K extends keyof State>(key: K): State[K] {
    return this.data.get(key);
  }

  public set(key: Key, value: State[Key]): void {
    this.data.set(key, value);

    this.emit('update', key, value);
    this.emit(`update.${key}`, value);
  }

  // TODO remove this method
  public remove(): void {
    this.mounted = false;
    this.emit('remove');

    this.off('update');
    this.off('remove');
  }

  public onUpdate(callBack: Function): void;
  public onUpdate(key: string, callBack: Function): void;
  public onUpdate(key: string | Function, callBack?: Function): void {
    if (typeof key === 'function') {
      callBack = key;
      key = null;
    }

    key = key ? `update.${key}` : 'update';
    this.on(key, callBack);
  }

  public onRemove(callBack): void {
    this.on('remove', callBack);
  }

  // TODO rename to emitAction
  public action(actionName: string, data: any): void {
    this.emit(`action.${actionName}`, data);
  }

  public onAction(name: string, callBack: Function): void {
    this.on(`action.${name}`, callBack);
  }
}
