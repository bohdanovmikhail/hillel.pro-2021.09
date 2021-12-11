import { ToDoFilter } from "./components/ToDoFilter";
import { ToDoItem } from "./components/ToDoItem";
import { BaseModel } from "./core/BaseModel";

// Главный файл, с которого начинается все приложение
const itemModel = new BaseModel({
  title: "TEST",
  done: false
});
const item = new ToDoItem(itemModel);

const filterModel = new BaseModel({
  filter: null
});
const filter = new ToDoFilter(filterModel);

document.body.append(filter.outElement);
document.body.append(item.outElement);

let iterator = 0;
setInterval(() => {
  itemModel.set("title", `Iterate: ${iterator++}`);
}, 1000);
