// @ts-check
console.log('test')

console.log('testtt')

console.log('dsfasf');

const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.end('Hello')
})

const PORT = 4000
server.listen(PORT, () => {
  console.log('The server is listening as port : ${', PORT)
  
  setTimeout(() =>{
    console.log('2')
  })
  console.log('3')

})