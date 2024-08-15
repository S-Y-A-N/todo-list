export default class ProjectLogic {
    constructor() {
        this.projectList = [];
    }

    getProjects() {
        return this.projectList;
    }

    clearProjects() {
        this.projectList = [];
        this.saveToLocal();
    }

    createProject(title) {
        if (!this.projectList.includes(title)) {
            this.projectList.push(title);
            this.saveToLocal();
        }
    }

    deleteProject(title) {
        const index = this.projectList.findIndex((project) => project === title);
        if (index !== -1) {
            this.projectList.splice(index, 1);
            this.saveToLocal();
        }
    }

    updateProject(title, newTitle) {
        const index = this.projectList.findIndex((project) => project === title);
        if (index !== -1) {
            this.projectList[index] = newTitle;
            this.saveToLocal();
        }
    }

    saveToLocal() {
        localStorage.setItem('projectList', JSON.stringify(this.projectList));
    }
}