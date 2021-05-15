import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Server from 'App/Models/Server'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ServersController {
  public async index() {
    const servers = await Server.all()

    return servers
  }

  public async store({ request, auth }: HttpContextContract) {
    const user = auth.user

    const newServerSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
    })

    const payload = await request.validate({
      schema: newServerSchema,
    })

    const server = await Server.create({
      name: payload.name,
      userId: user!.id,
    })

    return server
  }

  public async show({ params }: HttpContextContract) {
    const server = await Server.findOrFail(params.id)

    return server
  }

  public async update({ request, params }: HttpContextContract) {
    const server = await Server.findOrFail(params.id)

    const updateServerSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
    })

    const payload = await request.validate({
      schema: updateServerSchema,
    })

    server.name = payload.name

    await server.save()

    return server
  }

  public async delete({ params }: HttpContextContract) {
    const server = await Server.findOrFail(params.id)
    await server.delete()
  }
}
