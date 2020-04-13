import { Router, Request, Response, NextFunction } from 'express';
import Crowller from './utils/crowller'
import Analyzer from './utils/Analyzer'
import fs from 'fs';
import path from 'path'
import { getResponseData } from './utils/util'

const router = Router()

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined;
  }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, 'Login First'))
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
  res.json(getResponseData(true))
})

router.post('/login', (req: BodyRequest, res: Response) => {
  const { password } = req.body
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.json(getResponseData(false, 'already login'))
  } else {
    if (password === '123' && req.session) {
      if (req.session) {
        req.session.login = true;
        res.json(getResponseData(true))
      }
    } else {
      res.json(getResponseData(false, 'Login failed'))
    }
  }
})

router.get('/crowller', checkLogin, (req: BodyRequest, res: Response) => {
  const secret = 'x3b174jsx'
  const url = `http://www.dell-lee.com/typescript/demo.html?secet=${secret}`
  const analyzer = Analyzer.getInstance();
  new Crowller(analyzer, url);
  res.json(getResponseData(true))
}
)

router.get('/showdata', checkLogin, (req: Request, res: Response) => {
  try {
    const position = path.resolve(__dirname, '../data/course.json');
    const result = fs.readFileSync(position, 'utf-8');
    res.json(getResponseData(JSON.parse(result)));
  } catch (e) {
    res.json(getResponseData(false, 'data not exists'))
  }
})

export default router;