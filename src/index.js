// import { compareAsc } from 'date-fns';

// NAVBAR 
const navbarModule = (function() {
    // cache DOM
    let menuBurger = document.getElementById('menu-burger')
    let sidebar = document.querySelector('.sidebar')

    // event binding
    menuBurger.addEventListener('click', collapseSideBar)

    // functions
    function collapseSideBar() {
        sidebar.classList.toggle('collapse')
        console.log(sidebar)
        console.log('Menu has been clicked')
    }
})();




// Cache DOM
let newProjectButton = document.getElementById('new-project-btn')
let newProjectForm = document.getElementById('new-project-form')
let projectNameInput = document.getElementById('project-name')
let sidebarProjectContainer = document.querySelector('[data-sidebar-project-container]')
let projectDisplayContainer = document.getElementById('project-display-container')
let projectTitleBarTemplate = document.getElementById('project-title-bar-template')
let projectBlockTemplate = document.getElementById('project-block-template')

// Local Storage 
const LOCAL_STORAGE_PROJECT_KEY = 'taskify.project'
const LOCAL_STORAGE_SELECT_PROJECT_ID_KEY = 'taskify.selectedProjectId'

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || []
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECT_PROJECT_ID_KEY)


// Event Binding 
newProjectButton.addEventListener('click', renderProjectForm)

newProjectForm.addEventListener('submit', e => {
    e.preventDefault()
    let projectName = projectNameInput.value
    if (projectName == null || projectName === '') return
    let project = createProject(projectName)
    projectNameInput.value = null
    hideProjectForm()
    projects.push(project)
    saveAndRender()
})



sidebarProjectContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedProjectId = e.target.dataset.listId
        let selectedProject = findProject(selectedProjectId)
        selectedProject.selected = !selectedProject.selected
        selectedProject.expanded = false
        saveAndRender()
    }
    // console.log(e.target)
})

projectDisplayContainer.addEventListener('click', e => {
    if (e.target.id == 'delete-project-btn') {
        let projectId = e.target.parentNode.parentNode.parentNode.id
        projects = projects.filter(project => project.id != projectId)
        console.log(projects)

        saveAndRender()
    } else if (e.target.classList.contains('project-title')) {
        let projectId = e.target.id
        let project = findProject(projectId)
        project.expanded = !project.expanded
        console.log(project)

        saveAndRender()
    } else if (e.target.classList.contains('fa-plus-circle')) {
        let newTaskFormArea = e.target.parentNode
        let newTaskForm = newTaskFormArea.querySelector('[data-new-task-form]')
        let newTaskButton = e.target
        console.log(newTaskButton)

        renderTaskForm(newTaskButton, newTaskForm)
    } else if (e.target.id == 'new-task-form-submit') {

        let newTaskForm = e.target.parentNode
        let projectId = e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.id
        console.log(projectId)
        let taskNameInput = newTaskForm.querySelector('[data-task-name-input]').value
        let taskDescInput = newTaskForm.querySelector('[data-task-desc-input]').value
        let taskDateInput = newTaskForm.querySelector('[data-task-date-input]').value
        if (taskNameInput == null || taskNameInput == "") return
        let project = findProject(projectId)

        let task = createTask(taskNameInput, taskDescInput, taskDateInput)
        project.tasks.push(task)

        saveAndRender()
    } else if (e.target.classList.contains('check-small')) {
        let checkSpan = e.target
        let checkboxInput = checkSpan.previousElementSibling
        let taskId = checkboxInput.id
        let projectId = e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.id
            // console.log(projectId)
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
        console.log(taskId)
        console.log(project)
        saveAndRender()
    } else if (e.target.id = "edit-btn") {
        console.log(e.target)
    }
})

// FUCNTIONS 

function findProject(id) {
    let result = projects.find(project => { return project.id === id })
    return result
}

function findTask(taskId, projectId) {
    let project = findProject(projectId)
    let result = project.tasks.find(task => task.id === taskId)
    return result
}

function renderProjectForm() {
    newProjectButton.classList.add('hidden')
    newProjectForm.classList.add('expanded')
}

function hideProjectForm() {
    newProjectButton.classList.remove('hidden')
    newProjectForm.classList.remove('expanded')
}

function renderTaskForm(button, form) {
    button.classList.add('hidden')
    form.classList.add('expanded')
}

function createProject(name) {
    return {
        id: Date.now().toString(),
        name: name,
        description: "",
        selected: false,
        expanded: false,
        tasks: []
    }
}

function createTask(name, description, duedate) {
    return {
        id: Date.now().toString(),
        name: name,
        description: description,
        duedate: duedate,
        completed: false,
        expanded: false
    }
}



function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects))
}

function renderProjectsList() {
    clearElement(sidebarProjectContainer)

    projects.forEach(project => {
        let projectElement = document.createElement('li')
        projectElement.dataset.listId = project.id
        projectElement.classList.add('big-link', 'clickable')
        projectElement.innerText = project.name

        if (project.selected) {
            projectElement.classList.add('bold')
        }

        sidebarProjectContainer.appendChild(projectElement)
    })
}

function renderProjectsBar() {
    clearElement(projectDisplayContainer)

    let selectedProjects = projects.filter(project => project.selected === true)

    selectedProjects.forEach(project => {
        let projectTitleBarElement = document.importNode(projectTitleBarTemplate.content, true)
        let projectTitleBar = projectTitleBarElement.querySelector('.project-title')
        let titleElement = projectTitleBarElement.querySelector('.title')

        titleElement.innerText = project.name
        projectTitleBar.id = project.id
        projectDisplayContainer.appendChild(projectTitleBarElement)

        let totalTasks = project.tasks.length;
        let completedTasks = project.tasks.filter(task => task.completed === true).length

        let percent = completedTasks / totalTasks * 100

        projectTitleBar.style.background = `linear-gradient(120deg, rgba(97,192,191,1) ${percent}%, rgba(187,222,214,1) ${percent}%)`
    })
}

function renderProjectsBlock() {

    let expandedProjects = projects.filter(project => project.expanded === true)
    expandedProjects.forEach(project => {
        let projectTitleBar = document.getElementById(project.id)
        let projectArticle = projectTitleBar.parentNode
        let projectBlock = document.importNode(projectBlockTemplate.content, true)
        let projectDescriptionText = projectBlock.querySelector('[data-project-description-text]')
        let taskListArea = projectBlock.getElementById('task-list')

        projectDescriptionText.innerText = project.description

        let sortedTasks = project.tasks.sort((a, b) => (a.duedate > b.duedate) ? 1 : -1)
        sortedTasks.forEach(task => {
            let taskTemplate = document.getElementById('task-template')
            let taskWrapper = document.importNode(taskTemplate.content, true)
            let checkbox = taskWrapper.querySelector('input[type="checkbox"]')
            let label = taskWrapper.querySelector(".task-name")
            let dueDate = taskWrapper.querySelector(".due-date")
            let mainTaskWrapper = taskWrapper.querySelector('.task-wrapper')
            let taskDesc = taskWrapper.getElementById('task-description')

            checkbox.checked = task.completed
            mainTaskWrapper.id = task.id
            dueDate.innerText = task.duedate
            label.htmlFor = task.id
            checkbox.id = task.id
            label.innerText = task.name
            taskDesc.innerText = task.description

            if (task.expanded == false) {
                taskDesc.classList.add('hidden')
            }

            if (task.completed == true) {
                label.classList.add('complete')
            }

            taskListArea.appendChild(taskWrapper)
        })




        projectArticle.appendChild(projectBlock)
    })
}






function saveAndRender() {
    save()
    renderProjectsList()
    renderProjectsBar()
    renderProjectsBlock()
}

renderProjectsList()
renderProjectsBar()
renderProjectsBlock()