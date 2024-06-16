let t = 0; // for tasks keys
let p = 0; // for projects keys

export const Task = (function () {

    function create(name, desc = "", project, priority = 0, dueDate = "", complete = false) {
        const key = `t${t}`;
        const task = { key, name, desc, project, priority, dueDate, complete };
        LocalStorage.store(key, task);
        t++;
        return task;
    }

    const toggleComplete = (task) => task.complete = !task.complete;

    return { create }
})();

export const Project = (function () {

    function create(name) {
        const key = `p${p}`;
        const project = { key, name }
        LocalStorage.store(key, project);
        p++;
        return project;
    }

    return { create }
})();

export const LocalStorage = (function () {

    const store = (key, item) => {
        localStorage.setItem(key, JSON.stringify(item));
    }

    const get = (key) => {
        return JSON.parse(localStorage.getItem(key))
    }

    return { store, get }
})();