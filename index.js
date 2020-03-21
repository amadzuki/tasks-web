class task {
  constructor(id, text, favorite, date, tags) {
    this.id = id
    this.text = text
    this.favorite = favorite
    this.date = date
    this.tags = tags
  }
}

const tasks = []

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
  const newTask = new task(
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

const insertToTaskList = newTask => {
  const taskList = document.getElementById("task-list")

  taskList.innerHTML += `<li>${newTask}</li>`
}

// by default there is page refresh
const submitNewTask = event => {
  event.preventDefault()
  const newTask = getNewTask()
  const newTaskText = newTask.text
  if (newTaskText !== "") {
    insertToTaskList(newTaskText)
    tasks.push(newTask)
    setNewTaskText("")
  }
}

const newTaskForm = document.getElementById("new-task-form")

newTaskForm.addEventListener("submit", submitNewTask)

// document.getElementById("new-task-date").valueAsDate = new Date()
