import { format, isThisWeek, isToday, isTomorrow } from "date-fns";
import { isDate, isWithinOneWeek, makeNewDate } from "./utility";

//     const addProject = (project) => {
//         addProjectToDialog(project)
//     }

//     const addProjectToDialog = (project) => {

//     }

//     // TODO!
//     const addProjectToSidebar = () => {
//         const projectDiv = document.createElement('div')
//     }


export default class TodoView {
    constructor() {
        this.todoList = document.getElementById('todoList');

        this.dialogBtn = document.getElementById('dialogBtn');
        this.closeDialogBtn = document.getElementById('closeDialogBtn');
        this.addTodoDialog = document.getElementById('addTodoDialog');
        this.todoForm = document.getElementById('todoForm');

        this.themeBtn = document.getElementById('themeBtn');
        this.pageTabs = document.getElementById('pageTabs').getElementsByTagName('button');

        this.defaultTab = document.getElementById('defaultTab');
        this.styleSelectedTab(this.defaultTab);

        this.nameInput = document.getElementById('name');
        this.descInput = document.getElementById('desc');
        this.projectInput = document.getElementById('project');
        this.priorityInput = document.getElementById('priority');
        this.dateInput = document.getElementById('date');

        this.initEventHandlers();
    }

    initEventHandlers() {
        this.themeBtn.addEventListener('click', this.handleChangeTheme);

        this.dialogBtn.addEventListener('click', () => this.handleOpenDialog(this.addTodoDialog));
        this.closeDialogBtn.addEventListener('click', () => this.handleCloseDialog(this.addTodoDialog));
        this.todoForm.addEventListener('submit', () => this.handleSubmitTodo())

        this.nameInput.addEventListener('input', e => this.autoGrowInput(e.target))
        this.descInput.addEventListener('input', e => this.autoGrowInput(e.target))

        Array.from(this.pageTabs).forEach(button => {
            button.addEventListener('click', (e) => this.handleChangePage(e));
        });
    }

    handleSubmitTodo() {
        const todoData = this.getTodoFormInputs();
        this.controller.controlCreateTodo(todoData);
        this.todoForm.reset();
    }

    getTodoFormInputs() {
        const nameInput = document.getElementById('name');
        const descInput = document.getElementById('desc');
        const projectInput = document.getElementById('project');
        const priorityInput = document.getElementById('priority');
        const dateInput = document.getElementById('date');
        const todoData = {
            name: nameInput.value,
            desc: descInput.value,
            dueDate: dateInput.value,
            priority: priorityInput.value,
            project: projectInput.value,
        }

        return todoData;
    }

    displayTodoItems(todoList) {
        this.todoList.innerHTML = '';

        // if todoList is empty, display no todos message
        if (todoList.length === 0) {
            const noTodosMsg = document.createElement('p');
            noTodosMsg.textContent = 'No todos left in sight!';
            this.todoList.appendChild(noTodosMsg);
        }

        todoList.forEach(todo => this.handleAddTodo(todo))
    }

    handleAddTodo(todo) {

        // todo container
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // todo container levels:
        // 1. title + controls
        const todoLv1 = document.createElement('div');
        // 2. description
        const todoLv2 = document.createElement('div');
        // 3. project
        const todoLv3 = document.createElement('div');

        // todo info
        const todoTitle = document.createElement('span');
        const todoDesc = document.createElement('span');
        const todoProject = document.createElement('span');
        const todoDate = document.createElement('span');

        todoTitle.textContent = todo.name;
        todoDesc.textContent = todo.desc;
        todoProject.textContent = `# ${todo.project}`;
        if (isDate(todo.dueDate)) todoDate.textContent = format(todo.dueDate, "d MMM yyyy");


        todoTitle.classList.add('todo-title');
        todoDesc.classList.add('todo-desc');
        todoProject.classList.add('todo-project');
        todoDate.classList.add('todo-date');

        // extra elements
        const check_circle = document.createElement('div');
        check_circle.classList.add('check-circle');

        const more_vert = document.createElement('img');
        more_vert.setAttribute('src', './resources/more_vert_24dp_FILL0_wght400_GRAD0_opsz24.svg');
        more_vert.classList.add('edit-todo-button')

        const line = document.createElement('div');
        line.classList.add('line');

        // appending to todo levels
        todoLv1.appendChild(check_circle);
        todoLv1.appendChild(todoTitle);
        todoLv1.appendChild(todoDate);
        // todoLv1.appendChild(more_vert);
        todoLv2.appendChild(todoDesc);
        todoLv3.appendChild(todoProject);

        // appending levels to todo container
        todoDiv.appendChild(todoLv1)
        todoDiv.appendChild(todoLv2)
        todoDiv.appendChild(todoLv3)

        // appending todo container to todo list
        this.todoList.appendChild(todoDiv);
        this.todoList.appendChild(line);
    }

    displayProjects() {
        const projectDropdown = document.getElementById('project');

        // while dropdown has 2 children (1st child = inbox)
        while (projectDropdown.children[1]) {
            projectDropdown.removeChild(projectDropdown.children[1]);
        }

        const projectList = this.controller.controlGetProjects();
        projectList.forEach((project) => {
            const option = document.createElement('option');
            option.textContent = project;
            projectDropdown.appendChild(option);
        });
    }

    handleOpenDialog(dialog) {
        dialog.showModal();
    }

    handleCloseDialog(dialog) {
        this.clearInputs(dialog);
        dialog.close();
    }

    handleChangeTheme() {
        document.documentElement.classList.toggle('dark');
        document.getElementById('lightModeIcon').classList.toggle('hidden');
        document.getElementById('darkModeIcon').classList.toggle('hidden');
    }

    styleSelectedTab(selectedTab) {
        selectedTab.classList.add('selected');
        const title = document.getElementById('pageTitle');
        title.textContent = selectedTab.textContent;
    }

    handleChangePage(e) {
        Array.from(this.pageTabs).forEach(button => {
            button.classList.remove('selected');
        });
    
        let clickedTab = e.target;
        if (clickedTab.nodeName === 'path') clickedTab = clickedTab.parentElement.parentElement;
        else if (clickedTab.nodeName === 'svg') clickedTab = clickedTab.parentElement;

        this.styleSelectedTab(clickedTab)

        let filteredTodos = [];
        const todoList = this.controller.controlGetTodos();
        switch (clickedTab.textContent) {
            case 'Inbox':
                filteredTodos = todoList.filter((todo) => todo.project.toLowerCase() === 'Inbox'.toLowerCase());
                this.displayTodoItems(filteredTodos);
                break;
            
            case 'Today':
                filteredTodos = todoList.filter((todo) => isToday(todo.dueDate));
                this.displayTodoItems(filteredTodos);
                break;

            case 'Tommorow':
                filteredTodos = todoList.filter((todo) => isTomorrow(todo.dueDate));
                this.displayTodoItems(filteredTodos);
                break;

            case 'Week':
                filteredTodos = todoList.filter((todo) => isWithinOneWeek(todo.dueDate, makeNewDate()));
                this.displayTodoItems(filteredTodos);
                break;

            case 'All':
                this.displayTodoItems(todoList);
                break;
        }
    }

    clearInputs(parentElement) {
        const inputs = Array.from(parentElement.querySelectorAll('input')).concat(Array.from(document.querySelectorAll('textarea')))
        inputs.forEach(input => input.value = "");
    }

    autoGrowInput(element) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }
}