"use strict";
(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([[57],{

/***/ 658:
/***/ (() => {


;// CONCATENATED MODULE: ./src/todo.js
const TODO = (function () {

    function create(name, desc = "", project = Project.get(0), priority = 0, dueDate = "", complete = false) {
        const task = { name, desc, project, priority, dueDate, complete };
    
        addToProject(task.project, task)
    
        return task;
    }

    const addToProject = (project, task) => project.list.push(task);

    const toggleComplete = (task) => task.complete = !task.complete;

    return { create }
})();

const Project = (function () {
    let projects = [];


    function create(name) {
        let list = [];
        const project = { name, list }
        projects.push(project);
        return project;
    }

    const get = (index) => projects[index];

    return { create, get }
})();
;// CONCATENATED MODULE: ./src/dom.js


const DOM = (function () {
    const taskList = document.getElementById('taskList');
    const noTasksMsg = taskList.getElementsByTagName('p')[0];

    const addTodoItem = (todo) => {
        handleNoTasks();
        
        // task container
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        // task container levels
        const taskLv1 = document.createElement('div');
        const taskLv2 = document.createElement('div');
        const taskLv3 = document.createElement('div');

        // task info
        const taskProject = document.createElement('span');
        const taskTitle = document.createElement('span');
        const taskDate = document.createElement('span');

        taskProject.textContent = todo.project.name;
        taskTitle.textContent = todo.name;
        taskDate.textContent = todo.dueDate;

        taskProject.classList.add('task-project');
        taskTitle.classList.add('task-title');
        taskDate.classList.add('task-date');

        // extra elements
        const check_circle = document.createElement('div');
        check_circle.classList.add('check-circle');

        const more_vert = document.createElement('img');
        more_vert.setAttribute('src', './resources/more_vert_24dp_FILL0_wght400_GRAD0_opsz24.svg');
        more_vert.classList.add('edit-task-button')

        const line = document.createElement('div');
        line.classList.add('line');

        // appending to task levels
        taskLv1.appendChild(check_circle);
        taskLv1.appendChild(taskTitle);
        taskLv3.appendChild(taskProject);
        // taskLv1.appendChild(taskDate);
        taskLv1.appendChild(more_vert);

        // appending levels to task container
        taskDiv.appendChild(taskLv1)
        taskDiv.appendChild(taskLv2)
        taskDiv.appendChild(taskLv3)

        // appending task container to task list
        taskList.appendChild(taskDiv);
        taskList.appendChild(line);
    }
    const isTaskListEmpty = () => TODO.isTaskListEmpty();

    const handleNoTasks = () => {
        if (isTaskListEmpty)
            noTasksMsg.classList.add('hidden');
        else
            noTasksMsg.classList.remove('hidden');
    }

    const extractTodoInfo = () => {
        const name = document.getElementById('name').value;
        const desc = document.getElementById('desc').value;
        // const project = document.getElementById('project').value;
        const date = document.getElementById('date').value;
        const priority = document.getElementById('priority').value;

        const todo = TODO.create(name, desc, Project.get(0), priority, date, false);

        addTodoItem(todo);

        closeDialog();
    }

    const clearInputs = () => {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.value = "");
    }

    const closeDialog = () => {
        clearInputs();
        addDialog.close();
    }

    const addProject = (project) => {
        addProjectToDialog(project)
    }

    const addProjectToDialog = (project) => {
        const select = document.getElementById('project');
        const option = document.createElement('option');
        option.textContent = project.name;
        select.appendChild(option);
    }

    const addProjectToSidebar = () => {
        const projectDiv = document.createElement('div')
    }

    document.getElementById('dialogBtn').addEventListener('click', () => addDialog.showModal());
    document.getElementById('closeDialogBtn').addEventListener('click', closeDialog);
    document.getElementById('submitTask').addEventListener('click', extractTodoInfo);

    return { addTodoItem, addProject }

})();
;// CONCATENATED MODULE: ./src/index.js







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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(658));
/******/ }
]);