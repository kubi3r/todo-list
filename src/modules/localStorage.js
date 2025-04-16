import Project from "./projectClass.js"
import Todo from "./todoClass.js"

export function saveData(data) {
    localStorage.setItem('data', JSON.stringify(data))
}

export function loadData() {
    const data = JSON.parse(localStorage.getItem('data'))
    if (data === null) {
        const projects = {currentProject: null, projectList: []}
    
        const defaultProject = new Project('Default')
        defaultProject.addTodo('Add a todo', '', '2030-01-01', 'Low')
        projects.projectList.push(defaultProject)  
        projects.currentProject = projects.projectList[0]

        return projects
    }

    const addTodo = function(title, description, dueDate, priority) {
        this.todos.push(new Todo(title, description, dueDate, priority, this.idCounter++))
    }
    const removeTodo = function(id) {
        this.todos = this.todos.filter(item => item.id !== parseInt(id))
    }
    const getTodos = function() {
        console.log(this.todos)
        return this.todos
    }
    const markComplete = function(isComplete) {
        this.complete = isComplete
    }

    const updateDescription = function(newDesc) {
        this.description = newDesc
    }

    data.projectList.forEach(project => {
        project.addTodo = addTodo
        project.removeTodo = removeTodo
        project.getTodos = getTodos

        if (project.todos) {
            project.todos.forEach(todo => {
                todo.markComplete = markComplete
                todo.updateDescription = updateDescription
            })
        } else if (Array.isArray(projects.todos)) {
            project.todos = []
        }
    })

    data.currentProject = data.projectList[0]

    return data
}