import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IUpdateProduct } from '../interfaces'
import { IProduct } from '../models/IProduct'

export class UpdateProductService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ id, name, price, category_id }: IUpdateProduct): Promise<IProduct> {
		const productCheck = await this.prismaorm.product.findUnique({
			where: { id }
		})

		if (productCheck == null) {
			throw new InternalApiError('Product not found')
		}

		if (productCheck.name === name) {
			throw new InternalApiError('There is already one product with this name.')
		}

		const products = await this.prismaorm.product.update({
			where: {
				id
			},
			data: {
				name,
				price,
				category_id
			}
		})

		return products
	}
}
