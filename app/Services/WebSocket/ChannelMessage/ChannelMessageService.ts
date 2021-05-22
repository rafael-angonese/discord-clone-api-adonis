'use strict'
import Ws from 'App/Services/WebSocket/Ws'
import ChannelMessage from 'App/Models/ChannelMessage'

interface ChannelMessageProps {
  message: string
  channel_id: number
  user_id: number
}


export default class ChannelMessagesService {
  constructor() {}

  async create({ message, channel_id, user_id }: ChannelMessageProps) {

    const channelMessage = await ChannelMessage.create({
      message: message,
      channelId: channel_id,
      userId: user_id,
    })

    Ws.io.emit('newMessage', channelMessage)

    return channelMessage
  }
}
