"use strict";
(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([[57],{

/***/ 407:
/***/ (() => {


;// CONCATENATED MODULE: ./src/todo.js
const TODO = (function () {

    function create(title, desc = "", project = Project.get(0), priority = 0, dueDate = "", complete = false) {
        const task = { title, desc, project, priority, dueDate, complete };
    
        addToProject(task.project, task)
    
        return task;
    }

    const addToProject = (project, task) => project.list.push(task);

    const toggleComplete = (task) => task.complete = !task.complete;

    return { create }
})();

const Project = (function () {
    let projects = [];


    function create(title) {
        let list = [];
        const project = { title, list}
        projects.push(project);
        return project;
    }

    const get = (index) => projects[index];

    return { create, get }
})();

const DOM = (function () {
    const taskList = document.getElementById('taskList');
    const noTasksMsg = taskList.getElementsByTagName('p')[0];

    const addTodoItem = (todo) => {
        handleNoTasks();
        
        const taskDiv = document.createElement('div');

        const taskProject = document.createElement('span');
        const taskDesc = document.createElement('span');
        const taskDate = document.createElement('span');

        taskProject.textContent = todo.project.title;
        taskDesc.textContent = todo.title;
        taskDate.textContent = todo.dueDate;

        taskDiv.classList.add('task');

        taskProject.classList.add('task-project');
        taskDesc.classList.add('task-desc');
        taskDate.classList.add('task-date');

        taskDiv.appendChild(taskProject);
        taskDiv.appendChild(taskDesc);
        taskDiv.appendChild(taskDate);

        taskList.appendChild(taskDiv);
    }
    const isTaskListEmpty = () => TODO.isTaskListEmpty();

    const handleNoTasks = () => {
        if (isTaskListEmpty)
            noTasksMsg.classList.add('hidden');
        else
            noTasksMsg.classList.remove('hidden');
    }

    const extractTodoInfo = () => {
        const title = document.getElementById('project').value;
        const desc = document.getElementById('desc').value;
        const project = document.getElementById('project').value;
        const date = document.getElementById('date').value;
        const priority = document.getElementById('priority').value;

        const todo = TodoObject(title, desc, project, priority, date, );

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


    const dialogBtn = document.getElementById('dialogBtn');
    const closeDialogBtn = document.getElementById('closeDialogBtn');
    const addDialog = document.getElementById('addDialog')

    dialogBtn.addEventListener('click', () => addDialog.showModal());
    closeDialogBtn.addEventListener('click', closeDialog);
    submit.addEventListener('click', extractTodoInfo);


    return { addTodoItem }

})();
;// CONCATENATED MODULE: ./src/index.js





Project.create('inbox');

let t1 = TODO.create('Apply for job', "", Project.get(0), 0, new Date().toLocaleDateString(), false);

// DOM.addTodoItem(t1);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(407));
/******/ }
]);