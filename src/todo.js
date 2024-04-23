export function TodoObject(project, desc, dueDate, priority) {
    const todoItem = { project, desc, dueDate, priority };

    TODO.addTask(todoItem);

    return todoItem;
}

export const TODO = (function () {
    let taskList = [];

    const addTask = (task) => taskList.push(task);

    const isEmpty = () => taskList.length === 0;

    console.log(taskList)

    return { addTask, isEmpty }
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

        taskProject.textContent = todo.project;
        taskDesc.textContent = todo.desc;
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
    const isTaskListEmpty = () => TODO.isEmpty();

    const handleNoTasks = () => {
        if (isTaskListEmpty)
            noTasksMsg.classList.add('hidden');
        else
            noTasksMsg.classList.remove('hidden');
    }

    const extractTodoInfo = () => {
        let project = document.getElementById('project').value;
        const desc = document.getElementById('desc').value;
        const date = document.getElementById('date').value;
        const priority = document.getElementById('priority').value;

        if(desc == '' || date == '' || priority == '') return;
        if(project == '') project = 'Default';

        const todo = TodoObject(project, desc, date, priority);

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