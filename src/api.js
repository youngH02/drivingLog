// @ts-check

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {string | Object} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST'} method
 * @property {(matches :string[], body : Object.<string, *> | undefined) => Promise<APIResponse>} callback
 */

/**
 * @typedef Post
 * @property {String} id
 * @property {String} title
 * @property {String} content
 */

/**
 * @typedef cars
 * @property {String} carID
 * @property {String} carNum
 * @property {String} carType
 */

import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import multer from 'multer'

//const spawn = require('child_process');
import {spawn} from 'child_process'

const uploadImg = multer({dest: 'img/'})





//OCR import
//const tesseract = require("node-tesseract-ocr")
import tesseract from 'node-tesseract-ocr'

//1,3 (3, 13) (0,7)
const config = {
  lang: "kor",
  oem: 1, 
  psm: 3, 
}
///Users/jyoung/study/drivingLog/src/numb.jpeg
tesseract.recognize("/Users/jyoung/study/drivingLog/src/numb.jpeg", config)
  .then(text => {
    console.log("Result:", text, "end")
  })
  .catch(error => {
    console.log(error.message)
  })

  //


const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

//  const low = require('lowdb')
//  const FileSync = require('lowdb/adapters/FileSync')
//  const adapter = new FileSync('./src/db.json')
//  const db = low(adapter)                            

//const fs = require('fs')
import fs from "fs"
const DB_JSON_FILENAME = './src/db.json'

 /**@returns {Promise<Post[]>} */
 async function getPost(){
   const json = await fs.promises.readFile(DB_JSON_FILENAME,'utf-8')
   return JSON.parse(json).posts
 }

 /**@returns {Promise<cars[]>} */
async function getCars(){
  const json = await fs.promises.readFile(DB_JSON_FILENAME,'utf-8')
  return JSON.parse(json).cars
}
 /**
  * @parm {Post[]} posts
  */
 async function savePost(posts){
  // const content = {
  //   posts,
  // }
  // return fs.promises.appendFile(DB_JSON_FILENAME, JSON.stringify(content), 'utf-8')
 }

 /**
  * @parm {Post[]} posts
  */
  async function saveHistory (posts){
    const content = {
      "date" : "2022-04-26",
      "start_position" : "마곡",
      "end_position" : "상암",
      "distance" : null,
      "time_minutes" : "",
      "avg_speed" : ""
    }
    return fs.promises.writeFile(DB_JSON_FILENAME, JSON.stringify(content), 'utf-8')
   } 
/**@parm {String}tableNm, {Object} inputdata */
  async function savaDB(tableNm, inputdata){
    await db.read()
    console.log('db read', tableNm)
    db.data.test.push(inputdata)
    await db.write()
    
    console.log('db write')
  }

/**@type {Route[]} */
const routes = [

  {/**http GET localhost:3000/cars **/
    url: /^\/cars$/,
    method: 'GET',
    callback: async () => ({
        statusCode: 200,
        body: await getCars(), 
    }),
    },
  {/**http GET localhost:3000/imgs **/
  url: /^\/imgs$/,
  method: 'GET',
  callback: async (_, body) => {
  console.log("API----------")
  console.log(body)
  uploadImg.single('img')
  
  const result = await tesseract.recognize("/Users/jyoung/study/drivingLog/src/numb.jpeg", config)
  

    
  return {
      statusCode: 200,
      body : result
    


  }},
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'GET',
    callback: async (matches) => {
      const carID = matches[1]
      if(!carID){
        return {
          statusCode :404,
          body : "carID 없음"
        }
      }

      const cars = await getCars()
      const car = cars.find(_car =>_car.carID === carID)
      if(!car){
        return{
          statusCode :404,
          body : "carID 없음222"
        }
      }
      return{
        statusCode :200,
        body : car
      }

    } 
    },
  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async (_, body) => {
      console.log(body)

      if(!body){
        return{
          statusCode :400,
          body:"요청잘못됨"
        }
      }

      /**@type {string} */
      // const newHistory = {
      //   startPosition : body.a,
      //   EndPosition :body.b
      // }
      const title = body.title
      const newPost = {
        id : body.title,
        title,
        content: body.content
      }
      //const cars = await getCars()
      const posts = await getPost()
      //posts.push(newPost)
      //savePost(newPost)
      //const { cars } = db.data
      await db.read()
      db.data.cars.push({
        carID : body.title,
        carNum : "가123",
        carType : body.content
      })
      await db.write()


      /** @typedef CreateHistory
       * @property {string} start_position
       * @property {string} end_position
       */
      return {
        statusCode:200,
        body : "tt"
      }

    }
    },
    {/**http POST localhost:3000/test dis=500 time=10 --print=hHbB */
      url: /^\/test\//,
      method: 'POST',
      callback: async (_, body) => {
        //console.log(body)
        let base64DecodedText
        if(!body){
          return{
            statusCode :400,
            body:"요청잘못됨"
          }
        }
        // 1. child-process모듈의 spawn 취득
        //const spawn = require('child_process').spawn;

        // 2. spawn을 통해 "python 파이썬파일.py" 명령어 실행
        const result = await spawn('python3', ['/Users/jyoung/study/drivingLog/src/recog.py'])

        // 3. stdout의 'data'이벤트리스너로 실행결과를 받는다.
        await result.stdout.on('data', function(data) {
            console.log(data.toString());
        });

        // 4. 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다.
        result.stderr.on('data', function(data) {
            console.log(data.toString());
        });
        
        const img_to_text = await tesseract.recognize("/Users/jyoung/study/drivingLog/src/numb3.jpeg", config)
        console.log('imgtoTXT',img_to_text)
        //console.log('인코딩된 이미지', body.image)
        //base64DecodedText = Buffer.from(body.image, "base64").toString('utf8');
        //console.log("Base64 Decoded Text : ", base64DecodedText);

        const testInput = {
          distance : body.dis,
          time : body.time,
          avg : body.dis/body.time
        }
        
        savaDB("test", testInput)
        console.log('=====')
        return {
          statusCode:200,
          body : testInput, "text" : img_to_text
        }
  
      }
      },

]


// module.exports = {
//   routes,
// }

export default routes