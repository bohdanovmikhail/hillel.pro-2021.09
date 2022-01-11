export function fromHTML<T>(html: string, data = {}): T {
  for (const key in data) {
    const value = data[key];

    html = html.replace(`{{${key}}}`, value);
  }

  const creator = document.createElement('div');
  creator.innerHTML = html;

  if (!creator.children.length) {
    return null;
  }

  if (creator.children.length === 1) {
    return creator.children[0] as unknown as T;
  }

  // @ts-ignore
  return [...creator.children];
}
