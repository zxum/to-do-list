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
        saveAndRender()
    }
    // console.log(e.target)
})

projectDisplayContainer.addEventListener('click', e => {
    switch (e.target.id) {
        case 'delete-project-btn':

            let projectId = e.target.parentNode.parentNode.parentNode.id
            projects = projects.filter(project => project.id != projectId)
            console.log(projects)

            saveAndRender()
            break
    }
})

// FUCNTIONS 

function findProject(id) {
    let result = projects.find(project => { return project.id === id })
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


function createProject(name) {
    return {
        id: Date.now().toString(),
        name: name,
        selected: false,
        tasks: []
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
    console.log(selectedProjects)
    selectedProjects.forEach(project => {
        let projectTitleBarElement = document.importNode(projectTitleBarTemplate.content, true)
        let projectTitleBar = projectTitleBarElement.querySelector('.project-title')
        let titleElement = projectTitleBarElement.querySelector('.title')

        titleElement.innerText = project.name
        projectTitleBar.id = project.id
        projectDisplayContainer.appendChild(projectTitleBarElement)
    })
}

function saveAndRender() {
    save()
    renderProjectsList()
    renderProjectsBar()
}

renderProjectsList()
renderProjectsBar()