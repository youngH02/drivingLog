// @ts-check


//프레임워크 없이 간단한 토이프로젝트 웹서버 만들기

//const http = require('http')
import http from "http"
//const {  routes } = require('./api.js')
//const {  routes } = require('./createDB.mjs')
import routes from "./api.js"

const server = http.createServer((req, res) => {
  const URL_REGEX = /^\/([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_]+)$/

  async function main() {
    const route = routes.find(_route =>
      req.url &&
      req.method &&
      _route.url.test(req.url) &&
      _route.method === req.method
    )

    if (!req.url || !route) {
      res.statusCode = 404
      res.end('Not Found')
      return
    }

    const regexResult = route.url.exec(req.url)
    if (!regexResult) {
      res.statusCode = 404
      res.end('상세 URL 없음')
      return
    }

    /** @type {Object.<string,*> | undefined} */
    const reqbody = req.headers['content-type'] === 'application/json' && await new Promise(resolve => {
      req.setEncoding('utf-8')
      req.on('data', data => {
        try{
          resolve(JSON.parse(data))
        }catch{
          console.log("Error!!!")
         // rejects(new Error("Ill-formed json"))
        }
        
      })
    }) || undefined

    const result = await route.callback(regexResult, reqbody)
    //res.statusCode = result.statusCode

    if (typeof result.body === 'string') {
      res.end(result.body)
    } else {
      res.setHeader('Content-Type', 'application/json; encoding=utf-8;')
      res.end(JSON.stringify(result.body))
    }

  }
  main()

})


// const server = http.createServer((req,res) =>{
//   const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/


//   console.log(req.url)

//   if(req.url === '/carlist' && req.method ==='GET'){

//     const allCarList = {     
//       totalCount : cars.length,
//       cars : cars.map((cars) => ({
//       id : cars.carId,
//       carNum : cars.carNum,
//       carType : cars.carType
//     })),
//   }

//     res.statusCode = 200
//     res.setHeader('Content-Type','application/json; encoding=utf-8;')
//     res.end(JSON.stringify(allCarList))

//   }

//   else if(req.url === '/result' && req.method ==='POST'){
//     req.setEncoding('utf-8')

//     req.on('data', (data) =>{

//       /**
//        * @typedef createCar
//        * @property {string} carId
//        * @property {string} carNum
//        * @property {String} carType        
//        */

//       /**@type {createCar} */
//       const body = JSON.parse(data)
//       cars.push({
//         carId : body.carId.toLowerCase().replace(/\s/g,'_'),
//         carNum : body.carNum,
//         carType : body.carType

//       })
//     res.statusCode = 200
//     res.setHeader('Content-Type','application/json; encoding=utf-8;')
//     res.end(JSON.stringify(cars))
//     console.log(cars)
//     })
//    // setTimeout(() => { console.log(cars)}, 3000);

//     //console.log(cars)



//   }

//   else if(req.url ==='/posts'&& req.method ==='GET'){
//     res.statusCode = 200
//     res.end('OK')
//   }
//   else if(req.url && POSTS_ID_REGEX.test(req.url)){
//     const regexResult = POSTS_ID_REGEX.exec(req.url) 
//     if (regexResult){
//       const postID = regexResult[1]
//       console.log(postID)
//       res.end('rlawhdals    ')
//     } 
//     res.statusCode = 200
//     //res.end(postID)
//   }
//   else if(req.url === '/posts' && req.method == 'POST'){

//   }
//   else{ 
//     res.statusCode = 404
//     res.end('NOT FOUND')

//   }


// })

const PORT = 3000

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)

})