export const TODO = (function () {

    function create(name, desc = "", project = Project.get(0), priority = 0, dueDate = "", complete = false) {
        const task = { name, desc, project, priority, dueDate, complete };
    
        addToProject(task.project, task)
    
        return task;
    }

    const addToProject = (project, task) => project.list.push(task);

    const toggleComplete = (task) => task.complete = !task.complete;

    return { create }
})();

export const Project = (function () {
    let projects = [];


    function create(name) {
        let list = [];
        const project = { name, list }
        projects.push(project);
        return project;
    }

    const get = (index) => projects[index];

    return { create, get }
})();