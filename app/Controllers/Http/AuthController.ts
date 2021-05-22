import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class AuthController {
  public async register({ request }: HttpContextContract) {

    const data = await request.validate(UserValidator)

    const user = await User.create(data)

    return user.toJSON()
  }

  public async authenticate({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password)
    return token.toJSON()
  }

  public async me({ auth }: HttpContextContract) {
    const user = auth.user

    return user!.toJSON()
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').logout()

    // await Database.from('api_tokens').where('id', tokenId).delete()
  }
}
