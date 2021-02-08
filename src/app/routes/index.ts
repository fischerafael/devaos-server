import SessionsController from '../controllers/sessions'
import UserController from '../controllers/users'

import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => res.send('API'))

routes.post('/users', UserController.create)
routes.get('/users', UserController.index)

routes.post('/sessions', SessionsController.create)

export default routes
