import { generateUniqueId, isDate } from "./utility";

class TodoItem {
    constructor({
        name,
        desc,
        project,
        priority,
        dueDate,
        complete
    }) {
        this.id = generateUniqueId();
        this.name = name;
        this.desc = desc;
        this.project = project;
        this.priority = priority;
        this.dueDate = isDate(dueDate) ? dueDate : "";
        this.complete = complete || false;
    }

    toggleComplete() {
        this.complete = !this.complete;
    }
}

export default class TodoLogic {
    constructor() {
        this.todoList = [];
    }

    getTodos() {
        return this.todoList;
    }

    clearTodos() {
        this.todoList = [];
    }

    isTodoListEmpty() {
        return this.todoList.length === 0;
    }

    createTodo(data) {
        const newTodo = new TodoItem(data)
        this.todoList.push(newTodo);
        this.saveToLocal();
        return newTodo;
    }

    saveToLocal() {
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }
}