// -----------------------------------------------------------------------------
// Data Storage

let tasks = []

// -----------------------------------------------------------------------------
// Elements

const newTaskForm = document.getElementById("new-task-form")
const taskList = document.getElementById("task-list").getElementsByTagName("li")
const buttonRemoveAll = document.getElementById("button-remove-all")

// -----------------------------------------------------------------------------
// Functions

const addDeleteFunctionality = () => {
  const taskRemoveButtons = document.getElementsByClassName("delete")

  for (let index = 0; index < taskRemoveButtons.length; index++) {
    taskRemoveButtons[index].addEventListener("click", function() {
      const deletedTaskID = this.parentNode.dataset.id
      const deletedTaskIndex = tasks.findIndex(task => task.id == deletedTaskID)
      tasks.splice(deletedTaskIndex, 1)
      this.parentNode.remove()
      syncTasks()
    })
  }
}

const displayTasks = () => {
  const taskList = document.getElementById("task-list")

  tasks.forEach(task => {
    const taskTextElement = `<span>${task.text}</span>`
    const deleteButtonElement = `<button class="delete">x</button>`
    const favoriteToggleElement = `<input type="checkbox" ${
      task.favorite ? "Checked" : ""
    }/>`
    const dueDateElement = `<time datetime="${task.date}">${task.date}</time>`

    taskList.innerHTML += `
      <li data-id="${task.id}">
        ${taskTextElement}
        ${dueDateElement}
        ${favoriteToggleElement}
        ${deleteButtonElement}
      </li>`
  })

  addDeleteFunctionality()
}

const addTask = newTask => {
  const taskList = document.getElementById("task-list")

  const taskTextElement = `<span>${newTask.text}</span>`
  const deleteButtonElement = `<button class="delete">x</button>`
  const favoriteToggleElement = `<input type="checkbox" ${
    newTask.favorite ? "Checked" : ""
  }/>`
  const dueDateElement = `<time datetime="${newTask.date}">${newTask.date}</time>`

  taskList.innerHTML += `
  <li data-id="${newTask.id}">
    ${taskTextElement}
    ${dueDateElement}
    ${favoriteToggleElement}
    ${deleteButtonElement}
  </li>`

  addDeleteFunctionality()
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

const submitNewTask = event => {
  // by default there is page refresh
  event.preventDefault()
  const newTask = getNewTask()
  const newTaskText = newTask.text

  if (newTaskText !== "") {
    addTask(newTask)
    tasks.push(newTask)
    setNewTaskText("")
    syncTasks()
  }
}

// function to run after editing array "tasks"
const syncTasks = () => {
  localStorage.setItem("myTasks", JSON.stringify(tasks))
}

const removeAllTasks = () => {
  const isRemoveAll = confirm(
    "Are you sure to remove all task? You cannot undo this"
  )

  if (isRemoveAll) {
    tasks = []
    localStorage.clear()
    document.getElementById("task-list").innerHTML = ""
  }
}

// -----------------------------------------------------------------------------
// Event Listeners

newTaskForm.addEventListener("submit", submitNewTask)
buttonRemoveAll.addEventListener("click", removeAllTasks)

// -----------------------------------------------------------------------------
// Initialization

if (localStorage.getItem("myTasks") !== null) {
  tasks = JSON.parse(localStorage.getItem("myTasks"))
  tasks.forEach(item => addTask(item))
}
