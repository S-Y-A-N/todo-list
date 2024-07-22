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
});