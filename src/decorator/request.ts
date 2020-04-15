import 'reflect-metadata'

type Method1 = 'get' | 'post'

function getRequestDecorator(type: Method1) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    }
  }
}

export const get = getRequestDecorator('get')
export const post = getRequestDecorator('post')