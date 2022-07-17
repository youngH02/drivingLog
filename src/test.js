const fs = require('fs')

fs.readFile('src/test.js', (err, result) =>{
  if (err) {
    console.error(err)
  }else {
    console.log(result)
  }
})