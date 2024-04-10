import { TodoObject, DOM, TODO } from "./todo";
import './style.css';

const todo1 = TodoObject('Fitness', 'Play volleyball', new Date().toLocaleDateString(), 'high');

DOM.addTodoItem(todo1);