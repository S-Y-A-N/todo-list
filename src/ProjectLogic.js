export default class ProjectLogic {
    constructor() {
        this.projectList = ['The Odin Project', 'School', 'Housework'];
    }

    getProjects() {
        return this.projectList;
    }

    clearProjects() {
        this.projectList = [];
    }

    createProject(title) {
        if(!this.projectList.includes(title)) {
            this.projectList.push(title);
        }
    }

    deleteProject(title) {
        const index = this.projectList.findIndex(title);
        this.projectList.splice(index, 1);
    }
}