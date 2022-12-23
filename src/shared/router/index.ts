import { Router } from 'express'
import { CategoryRouter } from '../../modules/Categories/routes/CategoryRouter'
import { OrderRouter } from '../../modules/Orders/routes/OrderRouter'
import { ProductRouter } from '../../modules/Products/routes/ProductRouter'
import { UserRouter } from '../../modules/Users/routes/UserRouter'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../utils/swagger/swagger.json'
import { ItemRouter } from '../../modules/Items/routes/ItemRouter'

export const router = Router()

router.use('/api/v1', UserRouter)
router.use('/api/v1/categories', CategoryRouter)
router.use('/api/v1/products', ProductRouter)
router.use('/api/v1/orders', OrderRouter)
router.use('/api/v1/items', ItemRouter)

router.get('/', (_req, res) => {
	res.send('API is running')
})

router.use('/api/v1/docs', swaggerUi.serve)
router.get('/api/v1/docs', swaggerUi.setup(swaggerDocument))
