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
                description: 'Deep clean bedroom, living room, bathroom, and kitchen.',
                project: 'Chores',
                priority: 'Low',
                dueDate: makeFutureDate(7),
            },
            {
                name: 'Medical Checkup',
                description: 'Go to my scheduled appointment for examination.',
                project: 'Inbox',
                priority: 'Urgent',
                dueDate: makeFutureDate(3),
            },
            {
                name: 'Study differential equation',
                description: 'Continue through the textbook (until page 130).',
                project: 'Math Study',
                priority: 'Important',
                dueDate: makeFutureDate(),
            }
        ];

        defaultTodos.forEach((todo) => this.todoLogic.createTodo(todo));
    }

    initStoredTodos() {
        const storedTodos = JSON.parse(localStorage.getItem('todoList'));
        storedTodos.forEach((todo) => this.todoLogic.createTodo(todo));
    }

    controlTodosDisplay() {
        const myTodos = this.todoLogic.getTodos();
        this.view.displayTodoItems(myTodos);
    }
    
    controlProjectDisplay() {
        const myProjects = this.projectLogic.getProjects();
        this.view.displayProjects(myProjects);
    }

    controlCreateTodo(todoData) {
        this.todoLogic.createTodo(todoData);
        this.controlTodosDisplay();
    }

    controlRestoreDefaults() {
        localStorage.clear();
        this.todoLogic.clearTodos();
        this.projectLogic.clearProjects();
        this.init();
    }
}