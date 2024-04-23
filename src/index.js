import { TodoObject, DOM, TODO } from "./todo";
import './style.css';

const todo1 = TodoObject('Fitness', 'Play volleyball', new Date().toLocaleDateString(), 3);

DOM.addTodoItem(todo1);
DOM.addTodoItem(todo1);