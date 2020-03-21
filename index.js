class task {
  constructor(id, text, favorite, date, ...tags) {
    this.id = id
    this.text = text
    this.favorite = favorite
    this.date = date
    this.tags = [...tags]
  }
}

const tasks = []

const getNewTaskText = () => {
  return document.getElementById("new-task-text").value
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
  const newTaskText = getNewTaskText()
  if (newTaskText !== "") {
    insertToTaskList(newTaskText)
    setNewTaskText("")
  }
}

const newTaskForm = document.getElementById("new-task-form")

newTaskForm.addEventListener("submit", submitNewTask)

document.getElementById("date-picker").valueAsDate = new Date()
