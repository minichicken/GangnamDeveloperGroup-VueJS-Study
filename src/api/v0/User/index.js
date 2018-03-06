import express from 'express'
import * as controller from './User.controller'

const router = express.Router()

router.post('/login', controller.loginUser)

router.get('/', controller.findUser)

router.get('/:id', controller.findUserById)

router.post('/', controller.createUser)

router.put('/:id', controller.updateUser)

router.delete('/:id', controller.removeUser)

export default router
