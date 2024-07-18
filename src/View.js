import { format, isToday, isTomorrow } from "date-fns";
import { isDate, isWithinOneWeek, makeNewDate } from "./utility";

export default class TodoView {
    constructor() {
        this.todoList = document.getElementById('todoList');

        this.dialogBtn = document.getElementById('dialogBtn');
        this.closeDialogBtn = document.getElementById('closeDialogBtn');
        this.addTodoDialog = document.getElementById('addTodoDialog');
        this.todoForm = document.getElementById('todoForm');

        this.addProjectBtn = document.getElementById('addProjectBtn');
        this.closeProjectDialogBtn = document.getElementById('closeProjectDialogBtn');
        this.addProjectDialog = document.getElementById('addProjectDialog');
        this.projectForm = document.getElementById('projectForm');
        
        this.themeBtn = document.getElementById('themeBtn');
        this.finishedTodosBtn = document.getElementById('finishedTodosBtn');
        this.pageTabs = document.getElementById('pageTabs').getElementsByTagName('button');
        this.projectTabs = document.getElementById('projectTabs').getElementsByTagName('button');

        this.nameInputs = document.getElementsByClassName('name-box');
        this.descInputs = document.getElementsByClassName('desc-box');

        this.initEventHandlers();
    }

    initEventHandlers() {
        // change theme to light/dark mode
        this.themeBtn.addEventListener('click', this.handleChangeTheme);

        // open 'add todo' dialog | cancel | submit todo
        this.dialogBtn.addEventListener('click', () => this.handleOpenDialog(this.addTodoDialog));
        this.closeDialogBtn.addEventListener('click', () => this.handleCloseDialog(this.addTodoDialog));
        this.todoForm.addEventListener('submit', () => this.handleSubmitTodo());

        // open 'add project' dialog | cancel
        this.addProjectBtn.addEventListener('click', () => this.handleOpenDialog(this.addProjectDialog));
        this.closeProjectDialogBtn.addEventListener('click', () => this.handleCloseDialog(this.addProjectDialog));
        this.projectForm.addEventListener('submit', () => this.handleSubmitProject());

        // autogrow the inputs
        Array.from(this.nameInputs).forEach(input => {
            input.addEventListener('input', e => this.autoGrowInput(e.target));
        });

        Array.from(this.descInputs).forEach(input => {
            input.addEventListener('input', e => this.autoGrowInput(e.target));
        });

        // change page to inbox, today, etc...
        Array.from(this.pageTabs).forEach(button => {
            button.addEventListener('click', e => this.handleChangePage(e));
        });

        // change page to 'finished todos'
        this.finishedTodosBtn.addEventListener('click', e => this.handleChangePage(e))
    }

    handleSubmitProject() {
        const projectName = document.getElementById('projectName').value;
        this.controller.controlCreateProject(projectName);
        this.projectForm.reset();
        this.styleSelectedTab(this.defaultTab);
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
        this.todoList.innerHTML = "";
        const selectedTab = document.querySelector('.selected');

        // if TodoLogic!todoList is empty, displays 'no todos' message
        if (todoList.length === 0) {
            this.handleNoTodos();
            return;
        }

        todoList = this.filterTodosByTab(todoList, selectedTab)
        
        // sorts todo list by due date (ascending)
        todoList.sort((todo1, todo2) => makeNewDate(todo1.dueDate) - makeNewDate(todo2.dueDate))


        todoList.forEach(todo => {
            this.handleAddTodo(todo);
        });


        // if View!todoList is empty (all complete), displays 'no todos' message
        if (this.todoList.innerHTML === "") {
            this.handleNoTodos();
        }
    }

    filterTodosByTab(todoList, currentTab) {
        let filteredTodos = todoList;
        if (currentTab.id === 'finishedTodosBtn') {
            filteredTodos = todoList.filter((todo) => todo.complete === true);
            return filteredTodos;
        }
        // else:
        filteredTodos = todoList.filter((todo) => todo.complete === false);

        switch (currentTab.textContent) {
            case 'Inbox':
                filteredTodos = filteredTodos.filter((todo) => todo.project.toLowerCase() === 'Inbox'.toLowerCase());
                break;
            
            case 'Today':
                filteredTodos = filteredTodos.filter((todo) => isToday(todo.dueDate));
                break;

            case 'Tommorow':
                filteredTodos = filteredTodos.filter((todo) => isTomorrow(todo.dueDate));
                break;

            case 'Week':
                filteredTodos = filteredTodos.filter((todo) => isWithinOneWeek(todo.dueDate, makeNewDate()));
                break;

            case 'All':
                break;

            default:
                filteredTodos = filteredTodos.filter((todo) => currentTab.textContent.includes(todo.project));
                break;
        }
        return filteredTodos;
    }

    handleNoTodos() {
        const noTodosMsg = document.createElement('p');
        noTodosMsg.textContent = 'No todos left in sight!';
        this.todoList.appendChild(noTodosMsg);
    }

    handleAddTodo(todo) {

        // todo container
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.id = todo.id;

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
        if (isDate(todo.dueDate)) {
            todoDate.textContent = format(todo.dueDate, "d MMM yyyy");
        }   


        todoTitle.classList.add('todo-title');
        todoDesc.classList.add('todo-desc');
        todoProject.classList.add('todo-project');
        todoDate.classList.add('todo-date');

        // extra elements
        const check_circle = document.createElement('div');
        check_circle.classList.add('check-circle');
        check_circle.addEventListener('click', e => this.handleToggleComplete(e))
        if (todo.complete === true) {
            check_circle.classList.add('mark-complete');
        }

        const editBtn = document.createElement('img');
        editBtn.setAttribute('src', './resources/edit_23dp_E8EAED_FILL0_wght200_GRAD0_opsz24.svg');

        const deleteBtn = document.createElement('img');
        deleteBtn.setAttribute('src', './resources/delete_23dp_E8EAED_FILL0_wght200_GRAD0_opsz24.svg');

        const editDeleteSpan = document.createElement('span');
        editDeleteSpan.id = 'todoEditBtns';
        editDeleteSpan.classList.add('opacity-0')
        editDeleteSpan.appendChild(editBtn);    
        editDeleteSpan.appendChild(deleteBtn);    

        const line = document.createElement('div');
        line.classList.add('line');

        // appending to todo levels
        todoLv1.appendChild(check_circle);
        todoLv1.appendChild(todoTitle);
        todoLv1.appendChild(todoDate);

        todoLv2.appendChild(todoDesc);

        todoLv3.appendChild(editDeleteSpan);
        todoLv3.appendChild(todoProject);

        // appending levels to todo container
        todoDiv.appendChild(todoLv1)
        todoDiv.appendChild(todoLv2)
        todoDiv.appendChild(todoLv3)

        // appending todo container to todo list
        this.todoList.appendChild(todoDiv);
        this.todoList.appendChild(line);

        // todo hovering event listener
        // note: using arrow function, 'this' inside the listener function refers to the class (= the outer scope)
        todoDiv.addEventListener('mouseenter', this.handleTodoHover);
        todoDiv.addEventListener('mouseleave', this.handleTodoHover);
    }

    handleTodoHover(e) {
        const editBtn = this.querySelector('#todoEditBtns');
        if (e.type === "mouseenter") editBtn.classList.remove('opacity-0')
        else editBtn.classList.add('opacity-0')
    }

    displayProjects() {
        // removes all projects from dropdown
        const projectDropdown = document.getElementById('project');
        projectDropdown.innerHTML = ''

        // removes all projects from sidebar
        const projectNav = document.getElementById('projectTabs');
        projectNav.innerHTML = ''

        const projectList = this.controller.controlGetProjects();
        projectList.forEach((project) => {
            // displays projects in dialog dropdown
            const option = document.createElement('option');
            option.textContent = project;
            projectDropdown.appendChild(option);

            // skips displaying 'inbox' in sidebar
            if (project.toLowerCase() === 'inbox') return;

            // displays project in sidebar
            const button = document.createElement('button');
            button.textContent = `# ${project}`;
            projectNav.appendChild(button);
            button.addEventListener('click', e => this.handleChangePage(e));
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
        // remove styling from all unselected tabs
        Array.from(this.pageTabs).forEach(button => {
            button.classList.remove('selected-tab');
            button.classList.remove('selected');
        });

        Array.from(this.projectTabs).forEach(button => {
            button.classList.remove('selected-tab');
            button.classList.remove('selected');
        });

        this.finishedTodosBtn.classList.remove('selected-link');
        this.finishedTodosBtn.classList.remove('selected');

        // add styling to selected tab
        selectedTab.classList.add('selected')

        if (selectedTab.classList.contains('link')) {
            selectedTab.classList.add('selected-link');
        } else {
            selectedTab.classList.add('selected-tab');
        }

        const title = document.getElementById('pageTitle');
        title.textContent = selectedTab.textContent.replace("# ", "");
    }

    handleChangePage(e) {
        let clickedTab = e;
        if (e instanceof PointerEvent) {
            clickedTab = e.target;
            if (clickedTab.nodeName === 'path') clickedTab = clickedTab.parentElement.parentElement;
            else if (clickedTab.nodeName === 'svg') clickedTab = clickedTab.parentElement;
        }

        this.styleSelectedTab(clickedTab)

        const todoList = this.controller.controlGetTodos();
        this.displayTodoItems(todoList);
    }

    handleToggleComplete(e) {
        const todoItem = e.target.parentElement.parentElement;
        this.controller.controlToggleComplete(todoItem.id);
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