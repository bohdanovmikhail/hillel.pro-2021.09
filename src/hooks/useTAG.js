export function useTAG(tagName, attrs, children) {
  const element = document.createElement(tagName);

  if (Array.isArray(attrs) || attrs instanceof HTMLElement) {
    children = attrs;
    attrs = null;
  }

  if (typeof attrs === "string") {
    attrs = {
      class: attrs
    };
  }

  if (attrs) {
    for (const key in attrs) {
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
