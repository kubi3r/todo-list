export default class Todo {
    constructor(title, description, dueDate, priority, id) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id
        this.complete = false
    };

    markComplete(isComplete) {
        this.complete = isComplete
    }

    updateDescription(newDesc) {
        this.description = newDesc
    }
};