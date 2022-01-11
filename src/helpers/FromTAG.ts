type OneOrArray<T> = T | T[];
type Children = OneOrArray<string | HTMLElement>;
type Attrs = {
  [key: string]: string;
};

export function fromTAG(tagName: string, children?: Children): HTMLElement;
export function fromTAG(tagName: string, className: string, children?: Children): HTMLElement;
export function fromTAG(tagName: string, attrs: Attrs, children?: Children): HTMLElement;
export function fromTAG(tagName: string, attrs?: string | Attrs | Children, children?: Children): HTMLElement {
  const element = document.createElement(tagName);

  if (Array.isArray(attrs) || attrs instanceof HTMLElement) {
    children = attrs;
    attrs = null;
  }

  if (typeof attrs === 'string') {
    attrs = {
      class: attrs,
    };
  }

  if (attrs) {
    for (const key in attrs) {
      if (!attrs.hasOwnProperty(key)) {
        continue;
      }

      const value = attrs[key];

      if (value) {
        element.setAttribute(key, value);
      }
    }
  }

  if (children) {
    if (!Array.isArray(children)) {
      children = [children];
    }

    children.forEach((child) => element.append(child));
  }

  return element;
}
