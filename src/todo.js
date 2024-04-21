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


    const dialogBtn = document.getElementById('dialogBtn');
    dialogBtn.addEventListener('click', () => addDialog.showModal());
    closeDialog.addEventListener('click', () => addDialog.close());
    submit.addEventListener('click', addBookToLibrary);


    return { addTodoItem }

})();