const insertToTaskList = newTask => {
  const taskList = document.getElementById("task-list")
  const button = '<button contenteditable="false">x</button>'
  taskList.innerHTML += `<li data-id="${
    newTask.id
  }" contenteditable="true">${newTask.text + button}</li>`
}

let tasks = []
if (sessionStorage.getItem("myTasks") !== null) {
  tasks = JSON.parse(sessionStorage.getItem("myTasks"))
  tasks.forEach(item => insertToTaskList(item))
}

class task {
  constructor(id, text, favorite, date, tags) {
    this.id = id
    this.text = text
    this.favorite = favorite
    this.date = date
    this.tags = tags
  }
}

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

// by default there is page refresh
const submitNewTask = event => {
  event.preventDefault()
  const newTask = getNewTask()
  const newTaskText = newTask.text
  if (newTaskText !== "") {
    insertToTaskList(newTask)
    tasks.push(newTask)
    setNewTaskText("")
    updateTasks()
  }
}

const newTaskForm = document.getElementById("new-task-form")

newTaskForm.addEventListener("submit", submitNewTask)

//function to edit array "tasks"
updateTasks = () => {
  sessionStorage.setItem("myTasks", JSON.stringify(tasks))
}

//event listener for contenteditable change
const taskList = document.getElementById("task-list").getElementsByTagName("li")
for (index = 0; index < taskList.length; index++) {
  taskList[index].addEventListener("input", function() {
    const changedTask = this.innerText
    const idTask = this.dataset.id
    tasks.find(task => task.id == idTask).text = changedTask
    updateTasks()
  })
}

// document.getElementById("new-task-date").valueAsDate = new Date()

//function single task remover
const taskRemoveButtons = document
  .getElementById("task-list")
  .getElementsByTagName("button")
for (index = 0; index < taskRemoveButtons.length; index++) {
  taskRemoveButtons[index].addEventListener("click", function() {
    const deletedTaskID = this.parentNode.dataset.id
    const deletedTaskIndex = tasks.findIndex(task => task.id == deletedTaskID)
    tasks.splice(deletedTaskIndex, 1)
    this.parentNode.remove()
    updateTasks()
  })
}

//configure "remove all" button
const buttonRemoveAll = document.getElementById("button-remove-all")
buttonRemoveAll.onclick = () => {
  const isRemoveAll = confirm(
    "Are you sure to remove all task? You cannot undo this"
  )
  if (isRemoveAll) {
    tasks = []
    sessionStorage.clear()
    document.getElementById("task-list").innerHTML = ""
  }
}

//filter by tags
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

//filter by ...

// bugs to be fixed later:
// - text "x" inside single task remover button will be included when user edit the task text
//  solution: remove the letter "x" and just use css
