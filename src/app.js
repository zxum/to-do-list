function findProject(id) {
    let result = projects.find(project => { return project.id === id })
    return result
}

function findTask(taskId, projectId) {
    let project = findProject(projectId)
    let result = project.tasks.find(task => task.id === taskId)
    return result
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

export { findProject, findTask, hideForm, renderForm, createProject, createTask, clearElement, provideDueDate }