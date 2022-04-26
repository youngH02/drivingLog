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
 * @property {() => Promise<APIResponse>} callback
 */

/**
 * @typedef Post
 * @property {String} id
 * @property {String} title
 * @property {String} content
 */


 const fs = require('fs')
 const DB_JSOIN_FILENAME = 'database.json'

 /**@returns {Promise<Post[]>} */
 async function getPost(){
   const json = await fs.promises.readFile(DB_JSOIN_FILENAME,'utf-8')
   return JSON.parse(json).posts
 }

 /**
  * @parm {Post[]} posts
  */
 async function savePost(posts){
  const content = {
    posts,
  }
  fs.promises.writeFile(DB_JSOIN_FILENAME, JSON.stringify(content))
 }

/**@type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
        statusCode: 200,
        body: await getPost(), 
    }),
    },
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
        statusCode: 200,
        body: {}
    }), 
    },
  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async () => ({
        statusCode: 200,
        body: {}
    }),
    },
    



]


module.exports = {
  routes,
}