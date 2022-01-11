import { ToDo } from './pages/ToDo';
import { fromComponent } from './helpers';

// Главный файл, с которого начинается все приложение
const app = document.getElementById('app');

const [todoElement, todoModel] = fromComponent(ToDo)({
  filter: null,
  list: [],
});

app.append(todoElement);
