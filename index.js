// -----------------------------------------------------------------------------
// Data Storage

let tasks = []

// -----------------------------------------------------------------------------
// Elements

const newTaskForm = document.getElementById("new-task-form")
const taskList = document.getElementById("task-list").getElementsByTagName("li")
const taskRemoveButtons = document
  .getElementById("task-list")
  .getElementsByTagName("button")
const buttonRemoveAll = document.getElementById("button-remove-all")

// -----------------------------------------------------------------------------
// Functions

const displayTasksToTaskList = newTask => {
  const taskList = document.getElementById("task-list")

  const taskTextElement = `<span>${newTask.text}</span>`
  const closeButtonElement = "<button>x</button>"
  const favoriteToggleElement = `<input type="checkbox" ${
    newTask.favorite ? "Checked" : ""
  }/>`
  const dueDateElement = `<time datetime="${newTask.date}">${newTask.date}</time>`

  taskList.innerHTML += `
  <li data-id="${newTask.id}">
    ${taskTextElement}
    ${dueDateElement}
    ${favoriteToggleElement}
    ${closeButtonElement}
  </li>`

  for (index = 0; index < taskRemoveButtons.length; index++) {
    taskRemoveButtons[index].addEventListener("click", function() {
      const deletedTaskID = this.parentNode.dataset.id
      const deletedTaskIndex = tasks.findIndex(task => task.id == deletedTaskID)
      tasks.splice(deletedTaskIndex, 1)
      this.parentNode.remove()
      updateTasks()
    })
  }
}

// -----------------------------------------------------------------------------

const createTaskItem = (id, text, favorite, date, tags) => {
  return {
    id,
    text,
    favorite,
    date,
    tags
  }
}

// -----------------------------------------------------------------------------

const getNewTask = () => {
  const newID = () => {
    if (tasks.length === 0) {
      firstID = 1
      return firstID
    }
    const lastIDNumber = tasks
      .map(task => task.id)
      .reduce((max, value) => Math.max(max, value))

    const newIDNumber = lastIDNumber + 1
    return newIDNumber
  }

  const newTaskID = newID()
  const newTaskText = document.getElementById("new-task-text").value
  const newTaskFavorite = document.getElementById("new-task-favorite").checked
  const newTaskDate = document.getElementById("new-task-date").value
  const newTaskTags = document
    .getElementById("new-task-tags")
    .value.split(",")
    .map(tag => tag.trim())

  const newTask = createTaskItem(
    newTaskID,
    newTaskText,
    newTaskFavorite,
    newTaskDate,
    newTaskTags
  )

  return newTask
}

const setNewTaskText = text => {
  document.getElementById("new-task-text").value = text
  document.getElementById("new-task-tags").value = text
  document.getElementById("new-task-date").value = text
}

// by default there is page refresh
const submitNewTask = event => {
  event.preventDefault()
  const newTask = getNewTask()
  const newTaskText = newTask.text

  if (newTaskText !== "") {
    displayTasksToTaskList(newTask)
    tasks.push(newTask)
    setNewTaskText("")
    updateTasks()
  }
}

// function to run after editing array "tasks"
const updateTasks = () => {
  localStorage.setItem("myTasks", JSON.stringify(tasks))
}

buttonRemoveAll.onclick = () => {
  const isRemoveAll = confirm(
    "Are you sure to remove all task? You cannot undo this"
  )
  if (isRemoveAll) {
    tasks = []
    localStorage.clear()
    document.getElementById("task-list").innerHTML = ""
  }
}

// filter by tags
const filterByTags = (...tags) => {
  const newFiltered = []
  const meshTags = [...tags]

  for (let iteraTags = 0; iteraTags < meshTags.length; iteraTags++) {
    for (let index = 0; index < tasks.length; index++) {
      const bucket = tasks[index].tags.filter(
        eachTag => eachTag.toLowerCase() === meshTags[iteraTags].toLowerCase()
      )
      if (bucket.length !== 0) {
        newFiltered.push(tasks[index])
      }
    }
  }

  const uniqueFiltered = new Set(newFiltered)
  return Array.from(uniqueFiltered)
}

// -----------------------------------------------------------------------------
// Event Listeners

newTaskForm.addEventListener("submit", submitNewTask)

// -----------------------------------------------------------------------------
// Initialization

if (localStorage.getItem("myTasks") !== null) {
  tasks = JSON.parse(localStorage.getItem("myTasks"))
  tasks.forEach(item => displayTasksToTaskList(item))
}
