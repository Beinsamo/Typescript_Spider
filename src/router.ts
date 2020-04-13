import { Router, Request, Response } from 'express';
import Crowller from './crowller'
import Analyzer from './Analyzer'
import request from 'superagent';


const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send(`
     <html>
        <body>
          <form method='post' action='/getdata' >
          <input type='password' name='password' />
          <button>submit</button>
          </form>
        </body>
     </html>
  `);
})

router.post('/getdata', (req: Request, res: Response) => {
  if (req.body.password === '123') {
    const secret = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secet=${secret}`
    const analyzer = Analyzer.getInstance();
    new Crowller(analyzer, url);
    res.send('getdata sucess')
  } else {
    res.send('password error')
  }


})

export default router;