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
        const index = this.projectList.findIndex(title);
        this.projectList.splice(index, 1);
        this.saveToLocal();
    }

    saveToLocal() {
        localStorage.setItem('projectList', JSON.stringify(this.projectList));
    }
}