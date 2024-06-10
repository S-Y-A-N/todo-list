import { DOM, TODO, Project } from "./todo";
import './style.css';
import './sidebar.css';
import './dialog.css'

Project.create('inbox');

let t1 = TODO.create('Apply for job', "", Project.get(0), 0, new Date().toLocaleDateString(), false);
console.log(Project.get(0).title)
DOM.addTodoItem(t1);


// visaul
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

document.getElementById('name').addEventListener('input', e => auto_grow(e.target))
document.getElementById('desc').addEventListener('input', e => auto_grow(e.target))