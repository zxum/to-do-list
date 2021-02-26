let projectTitleBarTemplate = document.getElementById('project-title-bar-template')
let projectBlockTemplate = document.getElementById('project-block-template')

const LOCAL_STORAGE_PROJECT_KEY = 'taskify.project'
const LOCAL_STORAGE_SELECT_PROJECT_ID_KEY = 'taskify.selectedProjectId'

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || []
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECT_PROJECT_ID_KEY)

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

export { save, renderProjectsBar, renderProjectsList, renderProjectsBlock }