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
