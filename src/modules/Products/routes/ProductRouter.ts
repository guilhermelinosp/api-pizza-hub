import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { isAuthenticated } from '../../../shared/utils/middlewares/isAuthenticated'
import { isRateLimiter } from '../../../shared/utils/middlewares/isRateLimiter'
import { ProductController } from '../controllers/ProductController'

export const ProductRouter = Router()
const productController = new ProductController()

ProductRouter.use(isAuthenticated)
ProductRouter.use(isRateLimiter)

ProductRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			price: Joi.number().required(),
			category_id: Joi.string().required()
		}
	}),
	productController.create
)

ProductRouter.get('/', productController.read)

ProductRouter.get(
	'/readbycategory',
	celebrate({
		[Segments.QUERY]: {
			category_id: Joi.string().required()
		}
	}),
	productController.readbycategory
)

ProductRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	productController.readbyid
)

ProductRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	productController.read
)

ProductRouter.patch(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		},
		[Segments.BODY]: {
			name: Joi.string().optional(),
			price: Joi.number().optional(),
			category_id: Joi.string().optional()
		}
	}),
	productController.update
)

ProductRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required()
		}
	}),
	productController.delete
)
