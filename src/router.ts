import { Router, Request, Response } from 'express';
import Crowller from './crowller'
import Analyzer from './Analyzer'
import fs from 'fs';
import path from 'path'
import request from 'superagent';


const router = Router()

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  }
}

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send(`
    <html>
       <body>
        <a href='/crowller'>crowller things!</a>
        <a href='/showdata'>show crowlled things!</a>
        <a href='/logout'>out</a>
       </body>
    </html>`)
  } else {
    res.send(`
     <html>
        <body>
          <form method='post' action='/login' >
          <input type='password' name='password' />
          <button>login</button>
          </form>
        </body>
     </html>
  `);
  }
})

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.redirect('/')
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send('already login')
  } else {
    if (password === '123' && req.session) {
      if (req.session) {
        req.session.login = true;
        res.send('login sucess')

      }
    } else {
      res.send('password error')
    }
  }
})

router.get('/crowller', (req: RequestWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    const secret = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secet=${secret}`
    const analyzer = Analyzer.getInstance();
    new Crowller(analyzer, url);
    res.send('getdata sucess' + `    <a href='/showdata'>show crowlled things!</a`);

  } else {
    res.send('first login')
  }
}
)

router.get('/showdata', (req: Request, res: Response) => {
  try {
    const position = path.resolve(__dirname, '../data/course.json')
    const result = fs.readFileSync(position, 'utf-8')
    res.json(JSON.parse(result))
  } catch (e) {
    res.send('nothing is crowlled')
  }
})

export default router;