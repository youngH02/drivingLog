// @ts-check


//프레임워크 없이 간단한 토이프로젝트 웹서버 만들기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터 베이스로 활용(JSON)
 * - 인증 로직은 넣지 않음
 * - RestfullAPI 사용
 */

const http = require('http')
const { ScriptElementKindModifier } = require('typescript')

const server = http.createServer((req,res) =>{
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/


  console.log(req.url)
  if(req.url ==='/posts'&& req.method ==='GET'){
    res.statusCode = 200
    res.end('OK')
  }
  else if(req.url && POSTS_ID_REGEX.test(req.url)){
    console.log(POSTS_ID_REGEX.exec(req.url))
    res.statusCode = 200
    res.end('input id')
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


