import { Router } from 'express'
import UserController from '../controllers/user-controller'

const routes = Router()

routes.get('/', (req, res) => res.send('API'))

routes.post('/users', UserController.create)

export default routes
