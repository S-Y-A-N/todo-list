import { DOM, TODO, Project } from "./todo";
import './style.css';
import './sidebar.css';
import './dialog.css'

Project.create('inbox');

let t1 = TODO.create('Apply for job', "", Project.get(0), 0, new Date().toLocaleDateString(), false);
console.log(Project.get(0).title)
DOM.addTodoItem(t1);