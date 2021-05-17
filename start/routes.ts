/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})


Route.post('register', 'AuthController.register')
Route.post('authenticate', 'AuthController.authenticate')

Route.get('users', 'UsersController.index').middleware('auth')

Route.get('servers', 'ServersController.index').middleware('auth')
Route.post('servers', 'ServersController.store').middleware('auth')
Route.get('servers/:id', 'ServersController.show').middleware('auth')
Route.put('servers/:id', 'ServersController.update').middleware('auth')
Route.delete('servers/:id', 'ServersController.delete').middleware('auth')

Route.get('channels', 'ChannelsController.index').middleware('auth')
Route.post('channels', 'ChannelsController.store').middleware('auth')
Route.get('channels/:id', 'ChannelsController.show').middleware('auth')
Route.put('channels/:id', 'ChannelsController.update').middleware('auth')
Route.delete('channels/:id', 'ChannelsController.delete').middleware('auth')
