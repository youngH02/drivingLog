// @ts-check


//프레임워크 없이 간단한 토이프로젝트 웹서버 만들기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터 베이스로 활용(JSON)
 * - 인증 로직은 넣지 않음
 * - RestfullAPI 사용
 */

const http = require('http')
const { createNumericLiteral } = require('typescript')

/**
 * @typedef post
 * @property {String} id
 * @property {String} title
 * @property {String} content
 */

/** @type {post[]} */
const posts = [
  {
    id : 'first_id',
    title : 'post title',
    content : 'hello',
  },
  {
    id : 'send_id',
    title : 'second post title',
    content : 'hhh'
  },
]

const cars = [
{
  carId : '1',
  carNum : '가1234',
  carType : 'Avente',
},
{
  carId : '2',
  carNum : '나1234',
  carType : 'SONATA',
},
{
  carId : '3',
  carNum : '다1234',
  carType : 'Elec',
}
]



const server = http.createServer((req,res) =>{
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/


  console.log(req.url)

  if(req.url === '/carlist' && req.method ==='GET'){

    const allCarList = {     
      totalCount : cars.length,
      cars : cars.map((cars) => ({
      id : cars.carId,
      carNum : cars.carNum,
      carType : cars.carType
    })),
  }

    res.statusCode = 200
    res.setHeader('Content-Type','application/json; encoding=utf-8; charset=utf-8')
    res.end(JSON.stringify(allCarList))

  }

  else if(req.url ==='/posts'&& req.method ==='GET'){
    res.statusCode = 200
    res.end('OK')
  }
  else if(req.url && POSTS_ID_REGEX.test(req.url)){
    const regexResult = POSTS_ID_REGEX.exec(req.url) 
    if (regexResult){
      const postID = regexResult[1]
      console.log(postID)
      res.end('rlawhdals    ')
    } 
    res.statusCode = 200
    //res.end(postID)
  }
  else if(req.url === '/posts' && req.method == 'POST'){

  }
  else{ 
    res.statusCode = 404
    res.end('NOT FOUND')

  }


/**
 * 게시글 확인
 * 
 * GET /posts
 * GET /posts/:id
 * POST /posts 
 */



})

const PORT = 3000

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)

})




/**
 * 게시글 확인
 * 
 * GET /posts
 * GET /posts/:id
 * POST /posts 
 */


