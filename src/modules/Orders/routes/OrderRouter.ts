import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { isAuthenticated } from '../../../shared/utils/middlewares/isAuthenticated'
import { OrderController } from '../controllers/OrderController'

export const OrderRouter = Router()
const orderController = new OrderController()

OrderRouter.use(isAuthenticated)

OrderRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			table: Joi.number().required()
		}
	}),
	orderController.create
)

OrderRouter.get('/', orderController.read)

OrderRouter.get('/readprogress', orderController.readprogress)

OrderRouter.get('/readfinalized', orderController.readfinalized)

OrderRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	orderController.delete
)

OrderRouter.put(
	'/send/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	orderController.send
)

OrderRouter.put(
	'/finish/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	orderController.finish
)
