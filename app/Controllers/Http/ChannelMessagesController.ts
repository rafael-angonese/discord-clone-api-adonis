import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ChannelMessage from 'App/Models/ChannelMessage'

export default class ChannelMessagesController {
  public async index({ params }: HttpContextContract) {
    const channelMessages = await ChannelMessage.query().where('channel_id', params.channel_id)
    .preload('user', queryBuilder => {
      return queryBuilder.select('id', 'name')
    })

    return channelMessages
  }

  public async store({ request, auth }: HttpContextContract) {
    const user = auth.user

    const newChannelMessageSchema = schema.create({
      message: schema.string(),
      channel_id: schema.number(),
    })

    const payload = await request.validate({
      schema: newChannelMessageSchema,
    })

    const channelMessage = await ChannelMessage.create({
      message: payload.message,
      channelId: payload.channel_id,
      userId: user!.id,
    })

    return channelMessage
  }

  public async show({ params }: HttpContextContract) {
    const channelMessage = await ChannelMessage.findOrFail(params.id)

    return channelMessage
  }

  public async update({ request, params }: HttpContextContract) {
    const channelMessage = await ChannelMessage.findOrFail(params.id)

    const updateChannelSchema = schema.create({
      message: schema.string(),
    })

    const payload = await request.validate({
      schema: updateChannelSchema,
    })

    channelMessage.message = payload.message

    await channelMessage.save()

    return channelMessage
  }

  public async delete({ params }: HttpContextContract) {
    const channelMessage = await ChannelMessage.findOrFail(params.id)
    await channelMessage.delete()
  }
}
