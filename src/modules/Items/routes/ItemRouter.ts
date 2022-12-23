import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { isAuthenticated } from '../../../shared/utils/middlewares/isAuthenticated'
import { ItemController } from '../controllers/ItemController'

export const ItemRouter = Router()
const itemController = new ItemController()

ItemRouter.use(isAuthenticated)

ItemRouter.get('/', itemController.read)

ItemRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			order_id: Joi.string().required(),
			product_id: Joi.string().required(),
			amount: Joi.number().required()
		}
	}),
	itemController.add
)

ItemRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	itemController.delete
)

ItemRouter.get(
	'/readbyorder',
	celebrate({
		[Segments.QUERY]: {
			order_id: Joi.string().uuid().required()
		}
	}),
	itemController.readbyorder
)
