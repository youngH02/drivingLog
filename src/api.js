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
  
  {
    url: /^\/cars$/,
    method: 'GET',
    callback: async () => ({
        statusCode: 200,
        body: await getCars(), 
    }),
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
    {
      url: /^\/test$/,
      method: 'POST',
      callback: async (_, body) => {
        console.log(body)
  
        if(!body){
          return{
            statusCode :400,
            body:"요청잘못됨"
          }
        }
  
        const testInput = {
          distance : body.dis,
          time : body.time,
          avg : body.dis/body.time
        }
        
        savaDB("test", testInput)
        console.log('=====')
        return {
          statusCode:200,
          body : testInput
        }
  
      }
      },

]


// module.exports = {
//   routes,
// }

export default routes