class task {
  constructor(id, text, favorite, date, ...tags) {
    this.id = id
    this.text = text
    this.favorite = favorite
    this.date = date
    this.tags = [...tags]
  }
}

let tasks = []

const getNewTask = () => {
  const newTaskID = () => {
    if (tasks.length === 0) {
      return (id = 0)
    }
    const newID = tasks
      .map(id => this.id)
      .reduce((max, value) => Math.max(max, value))
    return newID
  }
  const newTaskText = document.getElementById("new-task-text").value
  const newTaskFavorite = document.getElementById("new-task-favorite").value
  const newTaskDate = document.getElementById("new-task-date").value
  const newTaskTags = document.getElementById("new-task-tags").value
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
