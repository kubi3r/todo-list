import Todo from "./todoClass"

export default class Project {
    constructor(title) {
        this.title = title
    }
    
    todos = []
    idCounter = 0

    addTodo(title, description, dueDate, priority) {
        this.todos.push(new Todo(title, description, dueDate, priority, this.idCounter++))
    }
    removeTodo(id) {
        this.todos = this.todos.filter(item => item.id !== parseInt(id))
    }
    getTodos() {
        return this.todos
    }
}