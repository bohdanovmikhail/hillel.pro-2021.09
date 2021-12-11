// Создаем функцию которая преобразует текстовый шаблон html документа,
// в DOM елементы
export function useHTML(html, data = {}) {
  for (const key in data) {
    const value = data[key];

    html = html.replace(`{{${key}}}`, value);
  }

  const creator = document.createElement("div");
  creator.innerHTML = html;

  if (!creator.children.length) {
    return null;
  }

  if (creator.children.length === 1) {
    return creator.children[0];
  }

  return [...creator.children];
}
