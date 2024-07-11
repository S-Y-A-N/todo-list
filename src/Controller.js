import { makeNewDate, makeFutureDate } from './utility';


export default class TodoController {
    constructor(todoLogic, projectLogic, view) {
        this.todoLogic = todoLogic;
        this.projectLogic = projectLogic;
        this.view = view;

        this.view.controller = this;
    }

    init() {
        this.loadTodos();
        this.controlTodosDisplay();
        this.controlProjectDisplay();
    }

    loadTodos() {
        const storedTodos = localStorage.getItem('todoList');
        if(storedTodos) {
            this.initStoredTodos();
        } else {
            this.initDefaultTodos();
        }
    }

    initDefaultTodos() {
        const defaultTodos = [
            {
                name: 'Cleanup',
                desc: 'Deep clean bedroom, living room, bathroom, and kitchen.',
                project: 'Chores',
                priority: 'Low',
                dueDate: makeFutureDate(7),
            },
            {
                name: 'Medical Checkup',
                desc: 'Go to my scheduled appointment for examination.',
                project: 'Inbox',
                priority: 'Urgent',
                dueDate: makeFutureDate(3),
            },
            {
                name: 'Study Differential Equations',
                desc: 'Continue through the textbook until page 130.',
                project: 'Math Study',
                priority: 'Important',
                dueDate: makeFutureDate(0),
            }
        ];

        defaultTodos.forEach((todo) => this.todoLogic.createTodo(todo));
    }

    initStoredTodos() {
        const storedTodos = JSON.parse(localStorage.getItem('todoList'));
        storedTodos.forEach((todo) => this.todoLogic.createTodo(todo));
    }

    controlTodosDisplay() {
        const todoList = this.todoLogic.getTodos();
        this.view.displayTodoItems(todoList);
    }
    
    controlProjectDisplay() {
        const projectList = this.projectLogic.getProjects();
        this.view.displayProjects(projectList);
    }

    // todo methods
    controlCreateTodo(todoData) {
        this.todoLogic.createTodo(todoData);
        this.controlTodosDisplay();
    }

    controlDeleteTodo(todoId) {
        this.todoLogic.deleteTodo(todoId);
        this.controlTodosDisplay();
    }

    controlGetTodoById(todoId) {
        return this.todoLogic.getTodoById(todoId)
    }

    controlGetTodos() {
        return this.todoLogic.getTodos();
    }

    controlUpdateTodo(todoId, todoData) {
        this.todoLogic.updateTodo(todoId, todoData);
        this.controlTodosDisplay();
    }

    controlToggleComplete(todoId) {
        this.todoLogic.todoItemToggleComplete(todoId);
        this.controlTodosDisplay();
    }

    // project methods
    controlCreateProject(projectTitle) {
        this.projectLogic.createProject(projectTitle);
        this.controlProjectDisplay();
    }

    controlGetProjects() {
        return this.projectLogic.getProjects();
    }

    controlDeleteProject() {
        this.projectLogic.createProject(projectTitle);
        this.controlProjectDisplay();
    }

    controlRestoreDefaults() {
        localStorage.clear();
        this.todoLogic.clearTodos();
        this.projectLogic.clearProjects();
        this.init();
    }
}