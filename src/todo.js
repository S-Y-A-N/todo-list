export const TODO = (function () {

    function create(name, desc = "", project = Project.get(0), priority = 0, dueDate = "", complete = false) {
        const task = { name, desc, project, priority, dueDate, complete };
    
        addToProject(task.project, task)
    
        return task;
    }

    const addToProject = (project, task) => project.list.push(task);

    const toggleComplete = (task) => task.complete = !task.complete;

    return { create }
})();

export const Project = (function () {
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

export const DOM = (function () {
    const taskList = document.getElementById('taskList');
    const noTasksMsg = taskList.getElementsByTagName('p')[0];

    const addTodoItem = (todo) => {
        handleNoTasks();
        
        const taskDiv = document.createElement('div');

        const taskProject = document.createElement('span');
        const taskDesc = document.createElement('span');
        const taskDate = document.createElement('span');

        taskProject.textContent = todo.project.name;
        taskDesc.textContent = todo.name;
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


    const dialogBtn = document.getElementById('dialogBtn');
    const closeDialogBtn = document.getElementById('closeDialogBtn');
    const submitTask = document.getElementById('submitTask')

    dialogBtn.addEventListener('click', () => addDialog.showModal());
    closeDialogBtn.addEventListener('click', closeDialog);
    submitTask.addEventListener('click', extractTodoInfo);


    return { addTodoItem }

})();