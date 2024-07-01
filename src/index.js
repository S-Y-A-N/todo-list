import './style.css';
import './sidebar.css';
import './dialog.css';

import TodoLogic from './TodoLogic';
import ProjectLogic from './ProjectLogic';
import TodoView from './View';
import TodoController from './Controller';

document.addEventListener('DOMContentLoaded', () => {
    const todoLogic = new TodoLogic();
    const projectLogic = new ProjectLogic();
    const view = new TodoView();

    const controller = new TodoController(todoLogic, projectLogic, view);
    controller.init();
})


// Visual DOM stuff

// function check_circle_done() {
//     this.classList.toggle('check-circle-done');
//     const todoTitle = this.nextSibling;
//     if (this.classList.contains('check-circle-done')) {
//         todoTitle.style.textDecoration = 'line-through';
//     } else {
//         todoTitle.style.textDecoration = 'none';
//     }

// }

// function todo_hover(e) {
//     const editBtn = this.getElementsByClassName('edit-todo-button')[0];
//     if (e.type === "mouseenter") editBtn.classList.add('visible')
//     else editBtn.classList.remove('visible')
// }

// document.getElementsByClassName('check-circle')[0].addEventListener('click', check_circle_done);

// // on todo hover
// const todos = document.getElementsByClassName('todo');
// Array.from(todos).forEach(todo => {
//     todo.addEventListener('mouseenter', todo_hover);
//     todo.addEventListener('mouseleave', todo_hover);
//     console.log(todos)
// });