import { generateUniqueId, isDate, makeNewDate } from "./utility";

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
        this.dueDate = isDate(dueDate) ? dueDate : makeNewDate(dueDate);
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

    createTodo(todoData) {
        const newTodo = new TodoItem(todoData)
        this.todoList.push(newTodo);
        this.saveToLocal();
        return newTodo;
    }

    deleteTodo(todoId) {
        const index = this.todoList.findIndex((todo) => todo.id === todoId);
        if (index !== -1) {
            this.todoList.splice(index, 1);
            this.saveToLocal();
        }
    }

    getTodoById(todoId) {
        const todo = this.todoList.find((todo) => todo.id === todoId)
        if (todo) {
            return todo;
        }
    }

    updateTodo(todoId, todoData) {
        const todo = this.todoList.find((todo) => todo.id === todoId);
        if (todo) {
            todo.name = todoData.name;
            todo.desc = todoData.desc;
            todo.project = todoData.project;
            todo.priority = todoData.priority;
            todo.dueDate = makeNewDate(todoData.dueDate);

            this.saveToLocal();
        }
    }

    todoItemToggleComplete(todoId) {
        const todo = this.todoList.find((todo) => todo.id === todoId);
        if (todo) {
          todo.toggleComplete();
          this.saveToLocal();
        }
    }

    saveToLocal() {
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }
}