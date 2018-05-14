const clone = require('clone')

let db = {}

const defaultData = {
  categories: [
    {
      name: 'react',
      path: 'react'
    },
    {
      name: 'redux',
      path: 'redux'
    },
    {
      name: 'udacity',
      path: 'udacity'
    }
  ]
}

function getData(token) {
  console.log("getData");
  console.log(token);
  //Each token has it's own copy of the DB. The token in this case is like an app id.
  let data = db[token]
  console.log("data");
  console.log(data);
  //This populates the default user data if there isn't any in the db.
  if (!data) {
    console.log("es nulo");
    data = db[token] = clone(defaultData)
  }
  return data
}

function getAll(token) {
  return new Promise((res) => {
    res(getData(token))
  })
}

module.exports = {
  getAll
}
