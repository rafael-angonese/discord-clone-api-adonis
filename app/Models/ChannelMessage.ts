import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Channel from 'App/Models/Channel'

export default class ChannelMessage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public message: string

  @column()
  public userId: number

  @column()
  public channelId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletetAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Channel)
  public channel: BelongsTo<typeof Channel>

}
