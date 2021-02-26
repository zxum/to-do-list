import { format, isToday, toDate } from 'date-fns';
import defaultExport from 'app.js'
import defaultExport from 'render.js'

// NAVBAR 
const navbarModule = (function() {
    // cache DOM
    let menuBurger = document.getElementById('menu-burger')
    let sidebar = document.querySelector('.sidebar')
    let deleteProjectsBtn = document.getElementById('delete-all-projects-btn')

    // event binding
    menuBurger.addEventListener('click', collapseSideBar)
    deleteProjectsBtn.addEventListener('click', deleteAllProjects)

    // functions
    function collapseSideBar() {
        sidebar.classList.toggle('collapse')
    }

    function deleteAllProjects() {
        projects = []
        saveAndRender()
    }
})();



// Cache DOM
let newProjectButton = document.getElementById('new-project-btn')
let newProjectForm = document.getElementById('new-project-form')
let projectNameInput = document.getElementById('project-name')
let sidebarProjectContainer = document.querySelector('[data-sidebar-project-container]')
let projectDisplayContainer = document.getElementById('project-display-container')

// Click event to show New Project Form 
newProjectButton.addEventListener('click', renderForm(newProjectButton, newProjectForm))

// Form submit for New Project Form
newProjectForm.addEventListener('submit', e => {
    e.preventDefault()
    let projectName = projectNameInput.value
    if (projectName == null || projectName === '') {
        hideForm(newProjectButton, newProjectForm)
        return
    }
    let project = createProject(projectName)
    projectNameInput.value = null
    hideForm(newProjectButton, newProjectForm)
    projects.push(project)
    saveAndRender()
})


// Click events in the side bar 
sidebarProjectContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        let selectedProjectId = e.target.dataset.listId
        let selectedProject = findProject(selectedProjectId)
        selectedProject.selected = !selectedProject.selected
        selectedProject.expanded = false
        saveAndRender()
    }
})

// Prevent default form submission inside the main body 
projectDisplayContainer.addEventListener('submit', e => {
    e.preventDefault()
})

// Click events within the main body 
projectDisplayContainer.addEventListener('click', e => {
    if (e.target.id == 'delete-project-btn') {
        let projectId = e.target.parentNode.parentNode.parentNode.id
        projects = projects.filter(project => project.id != projectId)

        saveAndRender()
    } else if (e.target.classList.contains('project-title')) {
        let projectId = e.target.id
        let project = findProject(projectId)
        project.expanded = !project.expanded

        saveAndRender()
    } else if (e.target.classList.contains('fa-plus-circle')) {
        let newTaskFormArea = e.target.parentNode
        let newTaskForm = newTaskFormArea.querySelector('[data-new-task-form]')
        let newTaskButton = e.target

        renderForm(newTaskButton, newTaskForm)
    } else if (e.target.id == 'new-task-form-submit') {
        let newTaskForm = e.target.parentNode
        let newTaskBtn = newTaskForm.parentNode.parentNode.querySelector('#new-task-button')

        let projectId = e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.id
        let taskNameInput = newTaskForm.querySelector('[data-task-name-input]').value
        let taskDescInput = newTaskForm.querySelector('[data-task-desc-input]').value
        let taskDateInput = newTaskForm.querySelector('[data-task-date-input]').value
        let date = taskDateInput == "" ? "" : new Date(taskDateInput + "T00:00")

        if (taskNameInput == null || taskNameInput == "") {
            hideForm(newTaskBtn, newTaskForm)
            return
        }

        let project = findProject(projectId)

        let task = createTask(taskNameInput, taskDescInput, date)
        project.tasks.push(task)

        saveAndRender()
    } else if (e.target.classList.contains('check-small')) {
        let checkSpan = e.target
        let checkboxInput = checkSpan.previousElementSibling
        let taskId = checkboxInput.id
        let projectId = e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.id

        let task = findTask(taskId, projectId)
        task.completed = !task.completed
        checkboxInput.checked = !checkboxInput.checked

        saveAndRender()
    } else if (e.target.classList.contains('task-name')) {
        let taskId = e.target.htmlFor
        let projectId = e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.id

        let task = findTask(taskId, projectId)
        task.expanded = !task.expanded

        saveAndRender()
    } else if (e.target.classList.contains('delete-btn')) {
        let taskId = e.target.parentNode.parentNode.id
        let projectId = e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.id

        let project = findProject(projectId)

        project.tasks = project.tasks.filter(task => task.id != taskId)

        saveAndRender()
    } else if (e.target.id === "edit-btn") {
        let projectTitle = e.target.parentNode.parentNode.previousElementSibling.previousElementSibling
        let projectForm = projectTitle.nextElementSibling

        let projectTitleValue = projectTitle.innerText

        let projectTitleInput = projectForm.querySelector('#new-project-name-input')

        projectTitleInput.value = projectTitleValue
        projectTitleInput.focus()

        renderForm(projectTitle, projectForm)
    } else if (e.target.id === "project-description-text") {
        let projectDesc = e.target
        let flexWrapper = e.target.parentNode
        let prevDesc = e.target.innerText

        let descForm = flexWrapper.querySelector('[data-project-description-form]')
        let descInput = descForm.querySelector('[data-project-description-input]')
        descInput.value = prevDesc
        descInput.focus()

        renderForm(projectDesc, descForm)
    } else if (e.target.id === "project-description-form-submit") {
        let descForm = e.target.parentNode
        let projectId = e.target.parentNode.parentNode.parentNode.previousElementSibling.id
        let descInput = descForm.querySelector('[data-project-description-input]').value
        if (descInput == null || descInput == "") return
        let project = findProject(projectId)

        project.description = descInput
        saveAndRender()
    } else if (e.target.id === "project-name-form-submit") {
        let projectNameFormValue = e.target.parentNode.querySelector('#new-project-name-input').value

        let projectId = e.target.parentNode.parentNode.id
        let project = findProject(projectId)

        project.name = projectNameFormValue
        saveAndRender()
    }
})

function saveAndRender() {
    save()
    renderProjectsList()
    renderProjectsBar()
    renderProjectsBlock()
}

renderProjectsList()
renderProjectsBar()
renderProjectsBlock()