import './styles.css'
import { displayTodos, displayProjects, getTodoInputField, getProjectCreationField } from './modules/dom.js'
import { loadData } from './modules/localStorage.js'

const data = loadData()

displayProjects(data)
displayTodos(data)

const createTodoButton = document.querySelector('#new-todo')
const createProjectButton = document.querySelector('#new-project')

createTodoButton.addEventListener('click', () => {
    if (data.currentProject) {
        createTodoButton.style.display = 'none'
        document.querySelector('#todo-creation-container').appendChild(getTodoInputField(data))
    }

})

createProjectButton.addEventListener('click', () => {
    document.querySelector('#project-creation').appendChild(getProjectCreationField(data))
})