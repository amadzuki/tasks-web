const getNewTaskText = () => {
  return document.getElementById("new-task-text").value
}

const newTaskForm = document.getElementById("new-task-form")

const submitNewTask = () => {
  const newTaskText = getNewTaskText()
  alert(newTaskText)
}

newTaskForm.addEventListener("submit", submitNewTask)
