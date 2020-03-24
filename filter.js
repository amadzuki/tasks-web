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
