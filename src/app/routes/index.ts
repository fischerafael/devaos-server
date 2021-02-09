import UserController from '../controllers/users'
import BioController from '../controllers/bio'
import ExperiencesController from '../controllers/experiences'
import SessionsController from '../controllers/sessions'

import { Router } from 'express'
import SkillsController from '../controllers/skills'

const routes = Router()

routes.get('/', (req, res) => res.send('API'))

routes.post('/users', UserController.create)
routes.get('/users', UserController.index)

routes.post('/users/:user_id/bio', BioController.create)
routes.delete('/users/:user_id/bio', BioController.delete)

routes.post('/users/:user_id/experiences/:type', ExperiencesController.create)
routes.delete(
    '/users/:user_id/experiences/:exp_id',
    ExperiencesController.delete
)

routes.post('/users/:user_id/skills', SkillsController.create)
routes.delete('/users/:user_id/skills/:skill_id', SkillsController.delete)

routes.post('/sessions', SessionsController.create)

export default routes
