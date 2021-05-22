import Ws from 'App/Services/WebSocket/Ws'
import ChannelMessagesService from 'App/Services/WebSocket/ChannelMessage/ChannelMessageService'

Ws.boot()

interface ChannelMessageProps {
  message: string
  channel_id: number
  user_id: number
}

// RFC - WebSockets support in AdonisJS #37
// https://github.com/adonisjs/rfcs/pull/37
// https://github.com/thetutlage/rfcs/blob/develop/active-rfcs/0000-websockets.md

// Suport Controllers, Middleware, Working with namespaces, Rooms, CORS
// import Ws from '@ioc:Adonis/Addons/Ws'
// Ws.on('message', 'ChatController.handleMessage')


Ws.io.on('connection', (socket) => {
  const messagesService = new ChannelMessagesService()

  socket.on('sendMessage', (data: ChannelMessageProps) => {
    messagesService.create(data)
  })

  socket.on('disconnect', async () => {
    // console.log(socket.id)
  })
})
