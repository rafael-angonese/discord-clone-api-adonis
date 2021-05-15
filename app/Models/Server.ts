import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Server extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletetAt: DateTime

  @belongsTo(() => User)
  public owner: BelongsTo<typeof User>

}
