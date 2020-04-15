import { Request, Response, NextFunction } from 'express';
import Crowller from '../utils/crowller'
import Analyzer from '../utils/Analyzer'
import fs from 'fs';
import path from 'path'
import { getResponseData } from '../utils/util'
import { controller, use, get } from '../decorator/index'

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined;
  }
}

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session ? req.session.login : false);
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, 'Login First'))
  }
}


@controller
class CrowllerController {
  @get('/getData')
  @use(checkLogin)
  getData(req: BodyRequest, res: Response): void {
    const secret = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secet=${secret}`
    const analyzer = Analyzer.getInstance();
    new Crowller(analyzer, url);
    res.json(getResponseData(true))
  }

  @get('/showData')
  @use(checkLogin)
  showData(req: BodyRequest, res: Response): void {
    try {
      const position = path.resolve(__dirname, '../../data/course.json');
      const result = fs.readFileSync(position, 'utf-8');
      res.json(getResponseData(JSON.parse(result)));
    } catch (e) {
      res.json(getResponseData(false, 'data not exists'))
    }
  }
}