import { Router, Request, Response, NextFunction } from 'express';
import Crowller from '../utils/crowller'
import Analyzer from '../utils/Analyzer'
import fs from 'fs';
import path from 'path'
import { getResponseData } from '../utils/util'
import { controller, get, post } from '../decorator/index'
interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined;
  }
}


@controller
class LoginController {

  static isLogin(req: BodyRequest) {
    return !!(req.session ? req.session.login : false)
  }

  @post('/login')
  login(req: BodyRequest, res: Response): void {
    const { password } = req.body
    const isLogin = LoginController.isLogin(req);
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
  }

  @get('/logout')
  logout(req: Request, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData(true))
  }

  @get('/')
  home(req: Request, res: Response): void {
    const isLogin = LoginController.isLogin(req)
    if (isLogin) {
      res.send(`
      <html>
         <body>
          <a href='/getData'>crowller things!</a>
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
  }
}
