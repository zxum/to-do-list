import { format, isToday, toDate } from 'date-fns';

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
    if (projectName == null || projectName === '') {
        hideProjectForm()
        return
    }
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
})
projectDisplayContainer.addEventListener('submit', e => {
    e.preventDefault()
})
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

function hideForm(button, form) {
    button.classList.remove('hidden')
    form.classList.remove('expanded')
}

function renderForm(button, form) {
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

        projectDescriptionText.innerText = project.description || "Add a Description here!"

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
            dueDate.innerText = provideDueDate(task)

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

function provideDueDate(task) {

    if (task.completed == true) {
        return "Completed"
    } else {
        if (isToday(task.duedate)) {
            return "Today"
        } else if (task.duedate == "" || task.duedate == null) {
            return ""
        } else {
            let date = toDate(Date.parse(task.duedate))
            return format(date, 'PPP')
        }
    }
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