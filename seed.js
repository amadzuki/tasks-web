// -----------------------------------------------------------------------------
// Seed Data

const tasksSeed = [
  {
    id: 1,
    text: "Coding",
    favorite: true,
    date: "2020-03-24",
    tags: ["work", "study"]
  },
  {
    id: 2,
    text: "Running",
    date: "2020-03-24"
  }
]

const seedData = () => {
  tasks = tasksSeed

  syncTasks()
  displayTasks()
}
