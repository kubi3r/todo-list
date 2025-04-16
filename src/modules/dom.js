import Project from './projectClass.js'
import { saveData } from './localStorage.js'
import { formatDistance } from 'date-fns'

function displayTodos(projects) {
    saveData(projects)

    const container = document.querySelector('#todos')
    container.textContent = ''
    
    if (projects.currentProject) {
        for (const todo of projects.currentProject.getTodos()) {
            const todoDiv = document.createElement('div')
            todoDiv.classList.add('todo')
            todoDiv.setAttribute('data', todo.id)

            if (todo.priority === 'Low') {
                todoDiv.style.border = '2px solid green'
            } else if (todo.priority === 'Medium') {
                todoDiv.style.border = '2px solid orange'
            } else if (todo.priority === 'High') {
                todoDiv.style.border = '2px solid red'
            }

            const completeCheckbox = document.createElement('input')
            completeCheckbox.type = 'checkbox'
            completeCheckbox.classList.add('todo-check')

            if (todo.complete) {
                completeCheckbox.checked = true
            }

            completeCheckbox.addEventListener('change', () => {
                todo.markComplete(completeCheckbox.checked)
                saveData(projects)
            })
            todoDiv.appendChild(completeCheckbox)

            const todoTitle = document.createElement('div')
            todoTitle.classList.add('todo-title')
            todoTitle.textContent = todo.title
            todoDiv.appendChild(todoTitle)

            const todoDesc = document.createElement('div')
            todoDesc.textContent = todo.description
            todoDesc.classList.add('todo-description')

            todoDesc.contentEditable = 'true'
            todoDesc.addEventListener('input', () => {
                todo.updateDescription(todoDesc.textContent)
                saveData(projects)
            })
            todoDiv.appendChild(todoDesc)

            const dueDate = document.createElement('div')
            dueDate.classList.add('duedate')
            dueDate.textContent = formatDistance(new Date(todo.dueDate), new Date(), { addSuffix: true })
            todoDiv.appendChild(dueDate)

            const dueDateEdit = document.createElement('div')
            const dueDateInput = document.createElement('input')
            dueDateEdit.classList.add('due-date-edit')
            dueDateInput.type = 'date'
            dueDateInput.value = todo.dueDate
            dueDateInput.addEventListener('input', () => {
                todo.dueDate = dueDateInput.value
                dueDate.textContent = dueDateInput.value
                saveData(projects)
            })
            dueDateEdit.appendChild(dueDateInput)
            todoDiv.appendChild(dueDateEdit)

            const priorityEdit = document.createElement('div')
            const priorityInput = document.createElement('select')
            priorityInput.value = todo.priority
            priorityEdit.classList.add('priority-edit')

            const priorityOptionHigh = document.createElement('option')
            priorityOptionHigh.textContent = 'High'
            priorityInput.appendChild(priorityOptionHigh)
            const priorityOptionMedium = document.createElement('option')
            priorityOptionMedium.textContent = 'Medium'
            priorityInput.appendChild(priorityOptionMedium)
            const priorityOptionLow = document.createElement('option')
            priorityOptionLow.textContent = 'Low'
            priorityInput.appendChild(priorityOptionLow)
            priorityInput.value = todo.priority
            priorityInput.addEventListener('input', () => {
                todo.priority = priorityInput.value

                if (priorityInput.value === 'Low') {
                    todoDiv.style.border = '2px solid green'
                } else if (priorityInput.value === 'Medium') {
                    todoDiv.style.border = '2px solid orange'
                } else if (priorityInput.value === 'High') {
                    todoDiv.style.border = '2px solid red'
                }

                saveData(projects)
            })
            priorityEdit.appendChild(priorityInput)
            todoDiv.appendChild(priorityEdit)

            const expandTodoBtn = document.createElement('img')
            expandTodoBtn.classList.add('expand-todo')

            expandTodoBtn.addEventListener('click', () => {
                todoDiv.classList.toggle('expanded')
            })
            todoDiv.appendChild(expandTodoBtn)

            const deleteButton = document.createElement('img')
            deleteButton.classList.add('delete-todo')
            deleteButton.addEventListener('click', (e) => {
                projects.currentProject.removeTodo(e.target.parentElement.getAttribute('data'))
                displayTodos(projects)
            })
            deleteButton.textContent = 'Delete'

            todoDiv.appendChild(deleteButton)

            container.appendChild(todoDiv)
        }

    }
}

function displayProjects(projects) {
    saveData(projects)

    const container = document.querySelector('#projects')
    container.textContent = ''

    for (const project of projects.projectList) {
        const projectDiv = document.createElement('div')
        projectDiv.classList.add('project')

        const projectTitle = document.createElement('div')
        projectTitle.textContent = project.title
        projectTitle.classList.add('project-title')

        if (project === projects.currentProject) {
            projectTitle.style.fontWeight = 700
        }

        projectTitle.addEventListener('click', () => {
            if (projects.currentProject !== project) {
                document.querySelectorAll('.project-title').forEach(el => {
                    el.style.fontWeight = 400
                })

                projects.currentProject = project
                projectTitle.style.fontWeight = 700
                displayTodos(projects)
            }
        })
        projectDiv.appendChild(projectTitle)

        const deleteProject = document.createElement('button')
        deleteProject.classList.add('delete-project')
        deleteProject.textContent = 'Delete'
        deleteProject.addEventListener('click', () => {
            projects.projectList = projects.projectList.filter((item) => item !== project)
            if (projects.currentProject === project) {
                projects.currentProject = null
            }
            displayProjects(projects)
            displayTodos(projects)
        })
        projectDiv.appendChild(deleteProject)

        container.appendChild(projectDiv)
    }
}

function getTodoInputField(projects) {
    const createTodoButton = document.querySelector('#new-todo')
    createTodoButton.style.display = 'none'

    const container = document.createElement('div')
    container.classList.add('todo-creation')

    const titleLabel = document.createElement('label')
    titleLabel.textContent = 'Title:'
    const titleInput = document.createElement('input')
    container.appendChild(titleLabel)
    container.appendChild(titleInput)

    const descLabel = document.createElement('label')
    descLabel.textContent = 'Description:'

    const descInput = document.createElement('input')
    container.appendChild(descLabel)
    container.appendChild(descInput)

    const dueDateLabel = document.createElement('label')
    dueDateLabel.textContent = 'Due date:'

    const dueDateInput = document.createElement('input')
    dueDateInput.type = 'date'
    container.appendChild(dueDateLabel)
    container.appendChild(dueDateInput)

    const priorityLabel = document.createElement('label')
    priorityLabel.textContent = 'Priority:'

    const priorityInput = document.createElement('select')
    const optLow = document.createElement('option')
    optLow.textContent = 'Low'

    const optMedium = document.createElement('option')
    optMedium.textContent = 'Medium'

    const optHigh = document.createElement('option')
    optHigh.textContent = 'High'

    priorityInput.appendChild(optLow)
    priorityInput.appendChild(optMedium)
    priorityInput.appendChild(optHigh)

    container.appendChild(priorityLabel)
    container.appendChild(priorityInput)

    const createButton = document.createElement('button')
    createButton.textContent = 'Create'
    createButton.addEventListener('click', () => {
        if (!(titleInput.value && descInput.value && dueDateInput.value && priorityInput.value) || !(projects.currentProject)) {
            return
        }
        projects.currentProject.addTodo(titleInput.value, descInput.value, dueDateInput.value, priorityInput.value)
        container.remove()
        createTodoButton.style.display = 'block'

        displayTodos(projects)
    })

    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'

    cancelButton.addEventListener('click', () => {
        container.remove()
        createTodoButton.style.display = 'block'
    })

    container.appendChild(createButton)
    container.appendChild(cancelButton)

    return container
}

function getProjectCreationField(projects) {
    const newProjectButton = document.querySelector('#new-project')
    newProjectButton.style.display = 'none'

    const container = document.createElement('div')
    container.classList.add('project-creation')
    

    const titleLabel = document.createElement('label')
    titleLabel.textContent = 'Title:'
    const titleInput = document.createElement('input')
    container.appendChild(titleLabel)
    container.appendChild(titleInput)

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    const createButton = document.createElement('button')
    createButton.classList.add('create-project')
    createButton.textContent = 'Create'
    createButton.addEventListener('click', () => {
        if (!titleInput.value) {
            return
        }
        const newProject = new Project(titleInput.value)
        projects.projectList.push(newProject)
        projects.currentProject = newProject

        container.remove()
        newProjectButton.style.display = 'block'

        displayProjects(projects)
        displayTodos(projects)
    })
    buttonContainer.appendChild(createButton)

    const cancelButton = document.createElement('button')
    cancelButton.classList.add('cancel-project')
    cancelButton.textContent = 'Cancel'

    cancelButton.addEventListener('click', () => {
        container.remove()
        newProjectButton.style.display = 'block'
    })
    buttonContainer.appendChild(cancelButton)

    container.appendChild(buttonContainer)

    return container
}

export { displayTodos, displayProjects, getTodoInputField, getProjectCreationField }