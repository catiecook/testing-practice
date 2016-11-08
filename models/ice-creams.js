function getAll() {
  return new Promise((resolve, reject) => {
    resolve([
      {
        name: "Raisin",
        ingredients: ['milk', 'sugar', 'cream', 'raisons'],
        brand: 'Sweet Cow'
      },
      {
        name: 'Chunky Monkey',
        ingredients: ['milk', 'eggs', 'sugar', 'banana', 'chocolate chips'],
        brand: 'Ben and Jerry\'s'
      }
    ])
  })
}
module.exports = {
  getAll : getAll
}
