import { Task, LocalStorage, Project } from "./todo";
import { format } from "date-fns";

export const DOM = (function () {
    const taskList = document.getElementById('taskList');
    const noTasksMsg = taskList.getElementsByTagName('p')[0];

    const addTask = (task) => {
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

        taskProject.textContent = LocalStorage.get(task.project.key).name;
        taskTitle.textContent = task.name;
        if (task.dueDate !== "") taskDate.textContent = format(task.dueDate, "d MMM yyyy");

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
        taskLv1.appendChild(taskDate);
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

    const extractTaskInfo = () => {
        const name = document.getElementById('name').value;
        const desc = document.getElementById('desc').value;
        const date = document.getElementById('date').value;
        const priority = document.getElementById('priority').value;
        const projecSelect = document.getElementById('project');
        const projectKey = projecSelect.options[projecSelect.selectedIndex].getAttribute('data-key');
        const project = LocalStorage.get(projectKey);

        const task = Task.create(name, desc, project, priority, date, false);
        addTask(task);
        closeDialog();
    }

    const clearInputs = () => {
        const inputs = Array.from(document.querySelectorAll('input')).concat(Array.from(document.querySelectorAll('textarea')))
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
        option.setAttribute('data-key', project.key);
        option.textContent = project.name;
        select.appendChild(option);
    }

    // TODO!
    const addProjectToSidebar = () => {
        const projectDiv = document.createElement('div')
    }

    document.getElementById('dialogBtn').addEventListener('click', () => addDialog.showModal());
    document.getElementById('closeDialogBtn').addEventListener('click', closeDialog);
    document.getElementById('taskForm').addEventListener('submit', extractTaskInfo);

    return { addTask, addProject }

})();