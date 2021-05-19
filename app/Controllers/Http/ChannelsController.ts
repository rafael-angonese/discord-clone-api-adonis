import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Channel from 'App/Models/Channel'

export default class ChannelsController {
  public async index({ params }: HttpContextContract) {
    const channels = await Channel.query().where('server_id', params.server_id)

    return channels
  }

  public async store({ request, auth }: HttpContextContract) {
    const user = auth.user

    const newChannelSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
      server_id: schema.number(),
    })

    const payload = await request.validate({
      schema: newChannelSchema,
    })

    const channel = await Channel.create({
      name: payload.name,
      serverId: payload.server_id,
      userId: user!.id,
    })

    return channel
  }

  public async show({ params }: HttpContextContract) {
    const channel = await Channel.findOrFail(params.id)

    return channel
  }

  public async update({ request, params }: HttpContextContract) {
    const channel = await Channel.findOrFail(params.id)

    const updateChannelSchema = schema.create({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
    })

    const payload = await request.validate({
      schema: updateChannelSchema,
    })

    channel.name = payload.name

    await channel.save()

    return channel
  }

  public async delete({ params }: HttpContextContract) {
    const channel = await Channel.findOrFail(params.id)
    await channel.delete()
  }
}
