import { format, isToday, isTomorrow } from "date-fns";
import { isDate, isWithinOneWeek, makeNewDate } from "./utility";

export default class TodoView {
  constructor() {
    this.todoList = document.getElementById("todoList");

    this.dialogBtn = document.getElementById("dialogBtn");
    this.closeDialogBtn = document.getElementById("closeDialogBtn");
    this.addTodoDialog = document.getElementById("addTodoDialog");
    this.todoForm = document.getElementById("todoForm");

    this.addProjectBtn = document.getElementById("addProjectBtn");
    this.closeProjectDialogBtn = document.getElementById(
      "closeProjectDialogBtn",
    );
    this.addProjectDialog = document.getElementById("addProjectDialog");
    this.projectForm = document.getElementById("projectForm");

    this.collapseProjectsBtn = document.getElementById("collapseProjectsBtn");

    this.settingsDialog = document.getElementById("settingsDialog");
    this.openSettingsBtn = document.getElementById("openSettingsBtn");
    this.closeSettingsBtn = document.getElementById("closeSettingsBtn");
    this.deleteAllBtn = document.getElementById("deleteAll");
    this.restoreDefaultsBtn = document.getElementById("restoreDefaults");

    this.themeBtn = document.getElementById("themeBtn");
    this.finishedTodosBtn = document.getElementById("finishedTodosBtn");
    this.pageTabs = document
      .getElementById("pageTabs")
      .getElementsByTagName("button");
    this.projectTabs = document
      .getElementById("projectTabs")
      .getElementsByTagName("button");

    this.nameInputs = document.getElementsByClassName("name-box");
    this.descInputs = document.getElementsByClassName("desc-box");

    this.initEventHandlers();
  }

  initEventHandlers() {
    this.themeBtn.addEventListener("click", () => this.handleChangeTheme());

    this.dialogBtn.addEventListener("click", () =>
      this.handleOpenDialog(this.addTodoDialog),
    );

    this.closeDialogBtn.addEventListener("click", () =>
      this.handleCloseDialog(this.addTodoDialog),
    );

    this.todoForm.addEventListener("submit", (e) => this.handleSubmitTodo(e));

    this.addProjectBtn.addEventListener("click", () =>
      this.handleOpenDialog(this.addProjectDialog),
    );

    this.closeProjectDialogBtn.addEventListener("click", () =>
      this.handleCloseDialog(this.addProjectDialog),
    );

    this.projectForm.addEventListener("submit", (e) =>
      this.handleSubmitProject(e),
    );

    Array.from(this.nameInputs).forEach((input) => {
      input.addEventListener("input", (e) => this.autoGrowInput(e.target));
    });

    Array.from(this.descInputs).forEach((input) => {
      input.addEventListener("input", (e) => this.autoGrowInput(e.target));
    });

    Array.from(this.pageTabs).forEach((button) => {
      button.addEventListener("click", (e) => this.handleChangePage(e));
    });

    this.finishedTodosBtn.addEventListener("click", (e) =>
      this.handleChangePage(e),
    );

    this.collapseProjectsBtn.addEventListener("click", () =>
      this.handleCollapseProjects(),
    );

    this.openSettingsBtn.addEventListener("click", () =>
      this.handleOpenDialog(this.settingsDialog),
    );

    this.closeSettingsBtn.addEventListener("click", () =>
      this.handleCloseDialog(this.settingsDialog),
    );

    this.deleteAllBtn.addEventListener("click", () => this.handleDeleteAll());

    this.restoreDefaultsBtn.addEventListener("click", () =>
      this.handleRestoreDefaults(),
    );
  }

  handleSubmitProject(e) {
    const submitter = e.submitter;
    if (submitter.id === "project-create-button") {
      this.handleCreateProjectSubmit();
    } else if (submitter.id === "project-update-button") {
      this.handleUpdateProjectSubmit();
    }
  }

  handleCreateProjectSubmit() {
    const projectName = this.getProjectFormInput();
    this.controller.controlCreateProject(projectName);
    this.todoForm.reset();
  }

  handleUpdateProjectSubmit() {
    const selectedProject = document.querySelector(".selected-project");
    const oldName = selectedProject.textContent.slice(2);
    const newName = this.getProjectFormInput();

    this.controller.controlUpdateProject(oldName, newName);
    this.projectForm.reset();

    const todoList = this.controller.controlGetTodos();
    todoList.forEach((todo) => {
      if (todo.project === oldName) {
        todo.project = newName;
        this.controller.controlUpdateTodo(todo.id, todo);
      }
    });
  }

  handleSubmitTodo(e) {
    const submitter = e.submitter;
    if (submitter.id === "todo-create-button") {
      this.handleCreateTodoSubmit();
    } else if (submitter.id === "todo-update-button") {
      this.handleUpdateTodoSubmit();
    }
  }

  handleCreateTodoSubmit() {
    const todoData = this.getTodoFormInputs();
    this.controller.controlCreateTodo(todoData);
    this.todoForm.reset();
  }

  handleUpdateTodoSubmit() {
    const selectedTodo = document.querySelector(".selected-todo");
    const newData = this.getTodoFormInputs();
    this.controller.controlUpdateTodo(selectedTodo.id, newData);
    this.todoForm.reset();
  }

  getProjectFormInput() {
    const projectInput = document.getElementById("projectName");
    return projectInput.value;
  }

  setProjectFormInput(projectName) {
    const projectInput = document.getElementById("projectName");
    projectInput.value = projectName;
  }

  getTodoFormInputs() {
    const nameInput = document.getElementById("name");
    const descInput = document.getElementById("desc");
    const projectInput = document.getElementById("project");
    const priorityInput = document.getElementById("priority");
    const dateInput = document.getElementById("date");

    const todoData = {
      name: nameInput.value,
      desc: descInput.value,
      dueDate: dateInput.value,
      priority: priorityInput.value,
      project: projectInput.value,
    };

    return todoData;
  }

  setTodoFormInputs(todoData) {
    const nameInput = document.getElementById("name");
    const descInput = document.getElementById("desc");
    const projectInput = document.getElementById("project");
    const priorityInput = document.getElementById("priority");
    const dateInput = document.getElementById("date");

    console.log(todoData);
    nameInput.value = todoData.name;
    descInput.value = todoData.desc;
    projectInput.value = todoData.project;
    priorityInput.value = todoData.priority;
    dateInput.value = format(todoData.dueDate, "yyyy-MM-dd");
  }

  displayTodoItems(todoList) {
    this.todoList.innerHTML = "";
    const selectedTab = document.querySelector(".selected");
    this.styleSelectedTab(selectedTab);

    // if TodoLogic!todoList is empty, displays 'no todos' message
    if (todoList.length === 0) {
      this.handleNoTodos();
      return;
    }

    todoList = this.filterTodosByTab(todoList, selectedTab);

    // sorts todo list by due date (ascending)
    todoList.sort(
      (todo1, todo2) => makeNewDate(todo1.dueDate) - makeNewDate(todo2.dueDate),
    );

    todoList.forEach((todo) => {
      this.handleAddTodo(todo);
    });

    // if View!todoList is empty, displays 'no todos' message
    if (this.todoList.innerHTML === "") {
      this.handleNoTodos();
    }
  }

  filterTodosByTab(todoList, currentTab) {
    let filteredTodos = todoList;

    if (currentTab.id === "finishedTodosBtn") {
      filteredTodos = todoList.filter((todo) => todo.complete === true);
      return filteredTodos;
    }
    // else:
    filteredTodos = todoList.filter((todo) => todo.complete === false);

    switch (currentTab.textContent) {
      case "Inbox":
        filteredTodos = filteredTodos.filter(
          (todo) => todo.project.toLowerCase() === "Inbox".toLowerCase(),
        );
        break;

      case "Today":
        filteredTodos = filteredTodos.filter((todo) => isToday(todo.dueDate));
        break;

      case "Tommorow":
        filteredTodos = filteredTodos.filter((todo) =>
          isTomorrow(todo.dueDate),
        );
        break;

      case "Week":
        filteredTodos = filteredTodos.filter((todo) =>
          isWithinOneWeek(todo.dueDate, makeNewDate()),
        );
        break;

      case "All":
        break;

      default:
        filteredTodos = filteredTodos.filter((todo) =>
          currentTab.textContent.includes(todo.project),
        );
        break;
    }
    return filteredTodos;
  }

  handleNoTodos() {
    const noTodosMsg = document.createElement("p");
    noTodosMsg.textContent = "No todos left in sight!";
    this.todoList.appendChild(noTodosMsg);
  }

  handleAddTodo(todo) {
    // todo container
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.id = todo.id;

    // todo container levels:
    // 1. title + controls
    const todoLv1 = document.createElement("div");
    // 2. description
    const todoLv2 = document.createElement("div");
    // 3. project
    const todoLv3 = document.createElement("div");

    // todo info
    const todoTitle = document.createElement("span");
    const todoDesc = document.createElement("span");
    const todoProject = document.createElement("span");
    const todoDate = document.createElement("span");
    const todoPriority = document.createElement("span");

    todoTitle.textContent = todo.name;
    todoDesc.textContent = todo.desc;
    todoProject.textContent = `# ${todo.project}`;

    if (isDate(todo.dueDate)) {
      todoDate.textContent = format(todo.dueDate, "d MMM yyyy");
    }

    todoTitle.classList.add("todo-title");
    todoDesc.classList.add("todo-desc");
    todoProject.classList.add("todo-project");
    todoDate.classList.add("todo-date");

    if (todo.priority.toLowerCase() !== "priority") {
      todoPriority.textContent = todo.priority;
      todoPriority.classList.add("todo-priority");
      if (todo.priority.toLowerCase() === "urgent")
        todoPriority.classList.add("p1");
      else if (todo.priority.toLowerCase() === "important")
        todoPriority.classList.add("p2");
      else todoPriority.classList.add("p3");
    }

    // toggle todo complete component
    const check_circle = document.createElement("div");
    check_circle.classList.add("check-circle");
    check_circle.addEventListener("click", (e) => this.handleToggleComplete(e));
    if (todo.complete === true) {
      check_circle.classList.add("mark-complete");
    }

    // edit todo component
    const editBtn = document.createElement("span");
    editBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h43.92l427.93-427.92-43.93-43.93L200-243.92V-200Zm-40 40v-100.77l527.23-527.77q6.15-5.48 13.57-8.47 7.43-2.99 15.49-2.99t15.62 2.54q7.55 2.54 13.94 9.15l42.69 42.93q6.61 6.38 9.04 14 2.42 7.63 2.42 15.25 0 8.13-2.74 15.56-2.74 7.42-8.72 13.57L260.77-160H160Zm600.77-556.31-44.46-44.46 44.46 44.46ZM649.5-649.5l-21.58-22.35 43.93 43.93-22.35-21.58Z"/></svg>';
    editBtn.addEventListener("click", (e) => this.handleEditTodo(e));

    // delete todo component
    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12Q683-160 655.38-160H304.62ZM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-720ZM392.31-280h40v-360h-40v360Zm135.38 0h40v-360h-40v360ZM280-720v520-520Z"/></svg>';
    deleteBtn.addEventListener("click", (e) => this.handleDeleteTodo(e));

    const editDeleteSpan = document.createElement("span");
    editDeleteSpan.classList.add("todo-edit-buttons");
    editDeleteSpan.classList.add("opacity-0");
    editDeleteSpan.appendChild(editBtn);
    editDeleteSpan.appendChild(deleteBtn);

    const line = document.createElement("div");
    line.classList.add("line");

    // appending to todo levels
    todoLv1.appendChild(check_circle);
    todoLv1.appendChild(todoTitle);
    todoLv1.appendChild(todoPriority);
    todoLv1.appendChild(todoDate);

    todoLv2.appendChild(todoDesc);

    todoLv3.appendChild(editDeleteSpan);
    todoLv3.appendChild(todoProject);

    // appending levels to todo container
    todoDiv.appendChild(todoLv1);
    todoDiv.appendChild(todoLv2);
    todoDiv.appendChild(todoLv3);

    // appending todo container to todo list
    this.todoList.appendChild(todoDiv);
    this.todoList.appendChild(line);

    // todo hovering event listener
    // note: using arrow function, 'this' inside the listener function refers to the class (= the outer scope)
    todoDiv.addEventListener("mouseenter", this.handleTodoHover);
    todoDiv.addEventListener("mouseleave", this.handleTodoHover);
  }

  handleDeleteTodo(e) {
    let todoItem = e.target;
    if (todoItem.nodeName === "path")
      todoItem =
        todoItem.parentElement.parentElement.parentElement.parentElement
          .parentElement;
    else if (todoItem.nodeName === "svg")
      todoItem =
        todoItem.parentElement.parentElement.parentElement.parentElement;
    this.controller.controlDeleteTodo(todoItem.id);
  }

  handleEditTodo(e) {
    let todoItem = e.target;
    if (todoItem.nodeName === "path")
      todoItem =
        todoItem.parentElement.parentElement.parentElement.parentElement
          .parentElement;
    else if (todoItem.nodeName === "svg")
      todoItem =
        todoItem.parentElement.parentElement.parentElement.parentElement;

    todoItem.classList.add("selected-todo");
    const submitter = document.querySelector(".todo-submit-button");
    submitter.id = "todo-update-button";

    const oldData = this.controller.controlGetTodoById(todoItem.id);
    this.setTodoFormInputs(oldData);
    this.handleOpenDialog(this.addTodoDialog);
  }

  handleToggleComplete(e) {
    const todoItem = e.target.parentElement.parentElement;
    this.controller.controlToggleComplete(todoItem.id);
  }

  handleTodoHover(e) {
    const editBtn = this.querySelector(".todo-edit-buttons");
    if (e.type === "mouseenter") editBtn.classList.remove("opacity-0");
    else editBtn.classList.add("opacity-0");
  }

  displayProjects() {
    // to prevent error if the selected tab was a project (switch to default [All])
    // Future solution: add IDs to projects (+ desc)
    const defaultTab = document.querySelector(".default-tab");
    this.styleSelectedTab(defaultTab);

    // removes all projects from dropdown
    const projectDropdown = document.getElementById("project");
    projectDropdown.innerHTML = "";

    // removes all projects from sidebar
    const projectNav = document.getElementById("projectTabs");
    projectNav.innerHTML = "";

    const projectList = this.controller.controlGetProjects();
    projectList.forEach((project) => {
      // displays projects in dialog dropdown
      const option = document.createElement("option");
      option.textContent = project;
      projectDropdown.appendChild(option);

      // skips displaying 'inbox' in sidebar
      if (project.toLowerCase() === "inbox") return;

      // edit todo component
      const editBtn = document.createElement("span");
      editBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h43.92l427.93-427.92-43.93-43.93L200-243.92V-200Zm-40 40v-100.77l527.23-527.77q6.15-5.48 13.57-8.47 7.43-2.99 15.49-2.99t15.62 2.54q7.55 2.54 13.94 9.15l42.69 42.93q6.61 6.38 9.04 14 2.42 7.63 2.42 15.25 0 8.13-2.74 15.56-2.74 7.42-8.72 13.57L260.77-160H160Zm600.77-556.31-44.46-44.46 44.46 44.46ZM649.5-649.5l-21.58-22.35 43.93 43.93-22.35-21.58Z"/></svg>';
      editBtn.addEventListener("click", (e) => this.handleEditProject(e));

      // delete todo component
      const deleteBtn = document.createElement("span");
      deleteBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12Q683-160 655.38-160H304.62ZM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-720ZM392.31-280h40v-360h-40v360Zm135.38 0h40v-360h-40v360ZM280-720v520-520Z"/></svg>';
      deleteBtn.addEventListener("click", (e) => this.handleDeleteProject(e));

      const editDeleteSpan = document.createElement("span");
      editDeleteSpan.classList.add("todo-edit-buttons");
      editDeleteSpan.classList.add("opacity-0");
      editDeleteSpan.appendChild(editBtn);
      editDeleteSpan.appendChild(deleteBtn);

      // displays project in sidebar
      const button = document.createElement("button");
      button.textContent = `# ${project}`;
      projectNav.appendChild(button);

      button.appendChild(editDeleteSpan);

      button.addEventListener("click", (e) => this.handleChangePage(e));

      button.addEventListener("mouseenter", this.handleTodoHover);
      button.addEventListener("mouseleave", this.handleTodoHover);
    });
  }

  handleDeleteProject(e) {
    let projectItem = e.target;
    if (projectItem.nodeName === "path")
      projectItem =
        projectItem.parentElement.parentElement.parentElement.parentElement;
    else if (projectItem.nodeName === "svg")
      projectItem = projectItem.parentElement.parentElement.parentElement;

    const projectName = projectItem.textContent.slice(2);
    this.controller.controlDeleteProject(projectName);

    const todoList = this.controller.controlGetTodos();
    todoList.forEach((todo) => {
      if (todo.project === projectName) {
        todo.project = "Inbox";
        this.controller.controlUpdateTodo(todo.id, todo);
      }
    });
  }

  handleEditProject(e) {
    let projectItem = e.target;
    if (projectItem.nodeName === "path")
      projectItem =
        projectItem.parentElement.parentElement.parentElement.parentElement;
    else if (projectItem.nodeName === "svg")
      projectItem = projectItem.parentElement.parentElement.parentElement;

    projectItem.classList.add("selected-project");
    const submitter = document.querySelector(".project-submit-button");
    submitter.id = "project-update-button";

    const oldName = projectItem.textContent.slice(2);
    this.setProjectFormInput(oldName);
    this.handleOpenDialog(this.addProjectDialog);
  }

  handleOpenDialog(dialog) {
    const submitter = dialog.querySelector(".submit-btn");
    if (submitter) {
      if (submitter.id === "todo-create-button") {
        submitter.textContent = "Add todo";
      } else if (submitter.id === "todo-update-button") {
        submitter.textContent = "Update todo";
      } else if (submitter.id === "project-create-button") {
        submitter.textContent = "Create project";
      } else if (submitter.id === "project-update-button") {
        submitter.textContent = "Update project";
      }
    }
    dialog.showModal();
  }

  handleCloseDialog(dialog) {
    const submitter = dialog.querySelector(".submit-btn");
    if (submitter.id === "todo-update-button") {
      submitter.id = "todo-create-button";
    } else if (submitter.id === "project-update-button") {
      submitter.id = "project-create-button";
    }
    this.clearInputs(dialog);
    dialog.close();
  }

  handleChangeTheme() {
    document.documentElement.classList.toggle("dark");
    document.getElementById("lightModeIcon").classList.toggle("hidden");
    document.getElementById("darkModeIcon").classList.toggle("hidden");
  }

  styleSelectedTab(selectedTab) {
    // remove styling from all unselected tabs
    Array.from(this.pageTabs).forEach((button) => {
      button.classList.remove("selected-tab");
      button.classList.remove("selected");
    });

    Array.from(this.projectTabs).forEach((button) => {
      button.classList.remove("selected-tab");
      button.classList.remove("selected");
    });

    this.finishedTodosBtn.classList.remove("selected-link");
    this.finishedTodosBtn.classList.remove("selected");

    // add styling to selected tab
    selectedTab.classList.add("selected");

    if (selectedTab.classList.contains("link")) {
      selectedTab.classList.add("selected-link");
    } else {
      selectedTab.classList.add("selected-tab");
    }

    const title = document.getElementById("pageTitle");
    title.textContent = selectedTab.textContent.replace("# ", "");
  }

  handleChangePage(e) {
    let clickedTab = e;

    if (e instanceof PointerEvent) {
      clickedTab = e.target;
      if (clickedTab.nodeName === "path")
        clickedTab = clickedTab.parentElement.parentElement;
      else if (clickedTab.nodeName === "svg")
        clickedTab = clickedTab.parentElement;
    }

    if (
      e.target.parentElement.parentElement.classList.contains(
        "todo-edit-buttons",
      ) ||
      e.target.parentElement.parentElement.parentElement.classList.contains(
        "todo-edit-buttons",
      )
    ) {
      return;
    }

    this.styleSelectedTab(clickedTab);

    const todoList = this.controller.controlGetTodos();
    this.displayTodoItems(todoList);
  }

  clearInputs(parentElement) {
    const inputs = Array.from(parentElement.querySelectorAll("input")).concat(
      Array.from(document.querySelectorAll("textarea")),
    );
    inputs.forEach((input) => (input.value = ""));
  }

  autoGrowInput(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }

  handleCollapseProjects() {
    document.getElementById("projectTabs").classList.toggle("hidden");
  }

  handleDeleteAll() {
    this.controller.controlDeleteAll();
  }

  handleRestoreDefaults() {
    this.controller.controlRestoreDefaults();
  }
}
