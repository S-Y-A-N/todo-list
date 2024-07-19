export default class ProjectLogic {
    constructor() {
        this.projectList = ['Inbox', 'Chores', 'Math Study', 'Workout'];
    }

    getProjects() {
        return this.projectList;
    }

    clearProjects() {
        this.projectList = [];
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