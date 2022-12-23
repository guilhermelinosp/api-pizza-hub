import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { isAuthenticated } from '../../../shared/utils/middlewares/isAuthenticated'
import { isRateLimiter } from '../../../shared/utils/middlewares/isRateLimiter'
import { CategoryController } from '../controllers/CategoryController'

export const CategoryRouter = Router()
const categoryController = new CategoryController()

CategoryRouter.use(isAuthenticated)
CategoryRouter.use(isRateLimiter)

CategoryRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required()
		}
	}),
	categoryController.create
)

CategoryRouter.get('/', categoryController.read)

CategoryRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	categoryController.readbyid
)

CategoryRouter.put(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		},
		[Segments.BODY]: {
			name: Joi.string().required()
		}
	}),
	categoryController.update
)

CategoryRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	categoryController.delete
)
