import { TODO, Project } from "./todo";
import { DOM } from "./dom";

import './style.css';
import './sidebar.css';
import './dialog.css'

Project.create('Inbox');
Project.create('Todo app');
DOM.addProject(Project.get(0));
DOM.addProject(Project.get(1));

let t1 = TODO.create('Work on this shitty todo app :(', "", Project.get(0), 0, new Date().toLocaleDateString(), false);
DOM.addTodoItem(t1);








// Visual DOM stuff
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

function change_theme() {
    document.documentElement.classList.toggle('dark');
    document.getElementById('lightModeIcon').classList.toggle('hidden');
    document.getElementById('darkModeIcon').classList.toggle('hidden');
}

function change_page(e) {
    Array.from(pageTabs).forEach(button => {
        button.classList.remove('selected');
    });

    let clickedTab = e.target;
    if (clickedTab.nodeName === 'path') clickedTab = clickedTab.parentElement.parentElement;
    else if (clickedTab.nodeName === 'svg') clickedTab = clickedTab.parentElement;

    const title = document.getElementById('pageTitle');
    title.textContent = e.target.textContent;
    
    clickedTab.classList.add('selected')
}

function check_circle_done(e) {
    e.target.classList.toggle('check-circle-done')
}

function task_hover(e) {
    const editBtn = this.getElementsByClassName('edit-task-button')[0];
    if(e.type === "mouseenter") editBtn.classList.add('visible')
    else editBtn.classList.remove('visible')
}

// event listeners
document.getElementById('name').addEventListener('input', e => auto_grow(e.target))
document.getElementById('desc').addEventListener('input', e => auto_grow(e.target))

document.getElementById('themeBtn').addEventListener('click', change_theme)

document.getElementsByClassName('check-circle')[0].addEventListener('click', check_circle_done);

// on task hover
const tasks = document.getElementsByClassName('task');

Array.from(tasks).forEach(task => {
    task.addEventListener('mouseenter', task_hover);
    task.addEventListener('mouseleave', task_hover);
})

// page changing via sidebar tabs
const pageTabs = document.getElementById('pageTabs').getElementsByTagName('button');

Array.from(pageTabs).forEach(button => {
    button.addEventListener('click', change_page)
});