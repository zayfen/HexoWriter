/**
   This is Account router
 */
import * as Koa from 'koa'
import { GET, POST, MIDDLEWARE } from '../../core/decorators'
import { BaseRouter, MiddleWare } from '../../core/types'
import * as AccountData from '../../../data/account.json'

class Account implements BaseRouter {
  prefix: string = '/api/account'

  public classMiddlewares(): Array<MiddleWare | string> {
    return []
  }

  @POST('/login')
  public login (ctx: Koa.Context) {
    console.log("ctx: ", ctx.request.body)

    let userName: string = ctx.request.body.userName
    let passwd: string = ctx.request.body.passwd
    const account: { [key: string]: string } = typeof AccountData === 'string' ? JSON.parse(AccountData) : AccountData
    console.log("account: ", account)
    
    if (!account[userName] || account[userName] !== passwd) {
      console.log("账号或者密码不对")
      // ctx.body = { code: -1, message: '账号或者密码不对' }
      ctx.type = 'json'
      ctx.body = { code: -1, message: '账号或者密码不对' }
    } else {
      console.log("登录成功")
      // write session data
      ctx.session.user = userName
      ctx.type = 'json'
      ctx.body = JSON.stringify({ code: 0, message: 'success' })      
    }
  }

  @POST('/logout')
  public logout (ctx: Koa.Context) {
    // remove session data
    ctx.session = null
    ctx.body = { code: 0, message: 'success' }
  }
}

/**
   export: Index Router
*/

export default Account
