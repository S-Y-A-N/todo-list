"use strict";
(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["index"],{

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/todo.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");



_todo__WEBPACK_IMPORTED_MODULE_0__.Project.create('inbox');

let t1 = _todo__WEBPACK_IMPORTED_MODULE_0__.TODO.create('Apply for job', "", _todo__WEBPACK_IMPORTED_MODULE_0__.Project.get(0), 0, new Date().toLocaleDateString(), false);
console.log(_todo__WEBPACK_IMPORTED_MODULE_0__.Project.get(0).title)
_todo__WEBPACK_IMPORTED_MODULE_0__.DOM.addTodoItem(t1);

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOM: () => (/* binding */ DOM),
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   TODO: () => (/* binding */ TODO)
/* harmony export */ });
const TODO = (function () {

    function create(title, desc = "", project = Project.get(0), priority = 0, dueDate = "", complete = false) {
        const task = { title, desc, project, priority, dueDate, complete };
    
        addToProject(task.project, task)
    
        return task;
    }

    const addToProject = (project, task) => project.list.push(task);

    const toggleComplete = (task) => task.complete = !task.complete;

    return { create }
})();

const Project = (function () {
    let projects = [];


    function create(title) {
        let list = [];
        const project = { title, list}
        projects.push(project);
        return project;
    }

    const get = (index) => projects[index];

    return { create, get }
})();

const DOM = (function () {
    const taskList = document.getElementById('taskList');
    const noTasksMsg = taskList.getElementsByTagName('p')[0];

    const addTodoItem = (todo) => {
        handleNoTasks();
        
        const taskDiv = document.createElement('div');

        const taskProject = document.createElement('span');
        const taskDesc = document.createElement('span');
        const taskDate = document.createElement('span');

        taskProject.textContent = todo.project.title;
        taskDesc.textContent = todo.title;
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
    const isTaskListEmpty = () => TODO.isTaskListEmpty();

    const handleNoTasks = () => {
        if (isTaskListEmpty)
            noTasksMsg.classList.add('hidden');
        else
            noTasksMsg.classList.remove('hidden');
    }

    const extractTodoInfo = () => {
        const title = document.getElementById('project').value;
        const desc = document.getElementById('desc').value;
        const project = document.getElementById('project').value;
        const date = document.getElementById('date').value;
        const priority = document.getElementById('priority').value;

        const todo = TodoObject(title, desc, project, priority, date, );

        addTodoItem(todo);

        closeDialog();
    }

    const clearInputs = () => {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.value = "");
    }

    const closeDialog = () => {
        clearInputs();
        addDialog.close();
    }


    const dialogBtn = document.getElementById('dialogBtn');
    const closeDialogBtn = document.getElementById('closeDialogBtn');
    const addDialog = document.getElementById('addDialog')

    dialogBtn.addEventListener('click', () => addDialog.showModal());
    closeDialogBtn.addEventListener('click', closeDialog);
    submit.addEventListener('click', extractTodoInfo);


    return { addTodoItem }

})();

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUNBd0Q7QUFDbkM7O0FBRXJCLDBDQUFPOztBQUVQLFNBQVMsdUNBQUksNkJBQTZCLDBDQUFPO0FBQ2pELFlBQVksMENBQU87QUFDbkIsc0NBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQSTs7QUFFUDtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLGFBQWE7QUFDYixDQUFDOztBQUVNO0FBQ1A7OztBQUdBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBOztBQUVBOztBQUVBLGFBQWE7QUFDYixDQUFDOztBQUVNO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0EsYUFBYTs7QUFFYixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RvZG8uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgVG9kb09iamVjdCwgRE9NLCBUT0RPLCBQcm9qZWN0IH0gZnJvbSBcIi4vdG9kb1wiO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5cblByb2plY3QuY3JlYXRlKCdpbmJveCcpO1xuXG5sZXQgdDEgPSBUT0RPLmNyZWF0ZSgnQXBwbHkgZm9yIGpvYicsIFwiXCIsIFByb2plY3QuZ2V0KDApLCAwLCBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpLCBmYWxzZSk7XG5jb25zb2xlLmxvZyhQcm9qZWN0LmdldCgwKS50aXRsZSlcbkRPTS5hZGRUb2RvSXRlbSh0MSk7IiwiZXhwb3J0IGNvbnN0IFRPRE8gPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlKHRpdGxlLCBkZXNjID0gXCJcIiwgcHJvamVjdCA9IFByb2plY3QuZ2V0KDApLCBwcmlvcml0eSA9IDAsIGR1ZURhdGUgPSBcIlwiLCBjb21wbGV0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHRhc2sgPSB7IHRpdGxlLCBkZXNjLCBwcm9qZWN0LCBwcmlvcml0eSwgZHVlRGF0ZSwgY29tcGxldGUgfTtcbiAgICBcbiAgICAgICAgYWRkVG9Qcm9qZWN0KHRhc2sucHJvamVjdCwgdGFzaylcbiAgICBcbiAgICAgICAgcmV0dXJuIHRhc2s7XG4gICAgfVxuXG4gICAgY29uc3QgYWRkVG9Qcm9qZWN0ID0gKHByb2plY3QsIHRhc2spID0+IHByb2plY3QubGlzdC5wdXNoKHRhc2spO1xuXG4gICAgY29uc3QgdG9nZ2xlQ29tcGxldGUgPSAodGFzaykgPT4gdGFzay5jb21wbGV0ZSA9ICF0YXNrLmNvbXBsZXRlO1xuXG4gICAgcmV0dXJuIHsgY3JlYXRlIH1cbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBQcm9qZWN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgcHJvamVjdHMgPSBbXTtcblxuXG4gICAgZnVuY3Rpb24gY3JlYXRlKHRpdGxlKSB7XG4gICAgICAgIGxldCBsaXN0ID0gW107XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSB7IHRpdGxlLCBsaXN0fVxuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCBnZXQgPSAoaW5kZXgpID0+IHByb2plY3RzW2luZGV4XTtcblxuICAgIHJldHVybiB7IGNyZWF0ZSwgZ2V0IH1cbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBET00gPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRhc2tMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tMaXN0Jyk7XG4gICAgY29uc3Qgbm9UYXNrc01zZyA9IHRhc2tMaXN0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwJylbMF07XG5cbiAgICBjb25zdCBhZGRUb2RvSXRlbSA9ICh0b2RvKSA9PiB7XG4gICAgICAgIGhhbmRsZU5vVGFza3MoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBjb25zdCB0YXNrUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY29uc3QgdGFza0Rlc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgIHRhc2tQcm9qZWN0LnRleHRDb250ZW50ID0gdG9kby5wcm9qZWN0LnRpdGxlO1xuICAgICAgICB0YXNrRGVzYy50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XG4gICAgICAgIHRhc2tEYXRlLnRleHRDb250ZW50ID0gdG9kby5kdWVEYXRlO1xuXG4gICAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZCgndGFzaycpO1xuXG4gICAgICAgIHRhc2tQcm9qZWN0LmNsYXNzTGlzdC5hZGQoJ3Rhc2stcHJvamVjdCcpO1xuICAgICAgICB0YXNrRGVzYy5jbGFzc0xpc3QuYWRkKCd0YXNrLWRlc2MnKTtcbiAgICAgICAgdGFza0RhdGUuY2xhc3NMaXN0LmFkZCgndGFzay1kYXRlJyk7XG5cbiAgICAgICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrUHJvamVjdCk7XG4gICAgICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0Rlc2MpO1xuICAgICAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcblxuICAgICAgICB0YXNrTGlzdC5hcHBlbmRDaGlsZCh0YXNrRGl2KTtcbiAgICB9XG4gICAgY29uc3QgaXNUYXNrTGlzdEVtcHR5ID0gKCkgPT4gVE9ETy5pc1Rhc2tMaXN0RW1wdHkoKTtcblxuICAgIGNvbnN0IGhhbmRsZU5vVGFza3MgPSAoKSA9PiB7XG4gICAgICAgIGlmIChpc1Rhc2tMaXN0RW1wdHkpXG4gICAgICAgICAgICBub1Rhc2tzTXNnLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBub1Rhc2tzTXNnLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dHJhY3RUb2RvSW5mbyA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBkZXNjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2MnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0JykudmFsdWU7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZScpLnZhbHVlO1xuICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmlvcml0eScpLnZhbHVlO1xuXG4gICAgICAgIGNvbnN0IHRvZG8gPSBUb2RvT2JqZWN0KHRpdGxlLCBkZXNjLCBwcm9qZWN0LCBwcmlvcml0eSwgZGF0ZSwgKTtcblxuICAgICAgICBhZGRUb2RvSXRlbSh0b2RvKTtcblxuICAgICAgICBjbG9zZURpYWxvZygpO1xuICAgIH1cblxuICAgIGNvbnN0IGNsZWFySW5wdXRzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xuICAgICAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC52YWx1ZSA9IFwiXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGNsb3NlRGlhbG9nID0gKCkgPT4ge1xuICAgICAgICBjbGVhcklucHV0cygpO1xuICAgICAgICBhZGREaWFsb2cuY2xvc2UoKTtcbiAgICB9XG5cblxuICAgIGNvbnN0IGRpYWxvZ0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFsb2dCdG4nKTtcbiAgICBjb25zdCBjbG9zZURpYWxvZ0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZURpYWxvZ0J0bicpO1xuICAgIGNvbnN0IGFkZERpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGREaWFsb2cnKVxuXG4gICAgZGlhbG9nQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gYWRkRGlhbG9nLnNob3dNb2RhbCgpKTtcbiAgICBjbG9zZURpYWxvZ0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlRGlhbG9nKTtcbiAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBleHRyYWN0VG9kb0luZm8pO1xuXG5cbiAgICByZXR1cm4geyBhZGRUb2RvSXRlbSB9XG5cbn0pKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9