import 'reflect-metadata'
import router from '../router'
import { RequestHandler } from 'express'

type Method1 = 'get' | 'post'

export function controller(target: new (...args: any[]) => any) {
  for (let key in target.prototype) {
    //console.log(Reflect.getMetadata('path', target.prototype, key))
    const method: Method1 = Reflect.getMetadata('method', target.prototype, key)
    const path: string = Reflect.getMetadata('path', target.prototype, key)
    const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key)
    const handler = target.prototype[key]
    if (path && method) {
      if (middleware) {
        router[method](path, middleware, handler)
      } else {
        router[method](path, handler)
      }
    }
  }
}