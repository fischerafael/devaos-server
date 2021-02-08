import SessionsController from '../controllers/sessions'
import UserController from '../controllers/users'
import BioController from '../controllers/bio'

import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => res.send('API'))

routes.post('/users', UserController.create)
routes.get('/users', UserController.index)

routes.post('/users/bio/:user_id', BioController.create)
routes.delete('/users/bio/:user_id', BioController.delete)

routes.post('/sessions', SessionsController.create)

export default routes
