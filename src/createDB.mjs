import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)



// Read data from JSON file, this will set db.data content
await db.read()

// // If file.json doesn't exist, db.data will be null
// // Set default data
// Set some defaults (required if your JSON file is empty)
//db.defaults({ posts:[], cars:[] }).write()
// db.data ||= { posts: [] }
db.data = db.data || ({ cars:[] , users:[]}) // for node < v15.x
// db.get('cars').push({
//   carID : "first_id",
//   carNum : "가123",
//   carType : "sonata"
// }).write();


//출처: https://blog.notepads.kr/123 [감각적인 프로그래머]

// // Create and query items using plain JS
// db.data.posts.push('hello world')
// db.data.posts[0]

db.data.users.push({
  userID : "11111",
  userName : "김종민"
})

// // You can also use this syntax if you prefer
const { cars } = db.data
//posts.push('hello world')
cars.push({
   carID : "first_id",
   carNum : "가123",
   carType : "sonata"
 })


// // Write db.data content to db.json
await db.write()

//실행명령어 : 
//npm install lowdb
//node createDB.mjs
