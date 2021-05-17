import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ChannelMessages extends BaseSchema {
  protected tableName = 'channel_messages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('message').nullable()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('channel_id').notNullable().unsigned().references('id').inTable('channels').onDelete('CASCADE')
      table.timestamp('deleted_at').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
