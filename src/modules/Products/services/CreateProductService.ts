import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { ICreateProduct } from '../interfaces/ICreateProduct'
import { IProduct } from '../models/IProduct'

export class CreateProductService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ name, price, category_id }: ICreateProduct): Promise<IProduct> {
		const productCheck = await this.prismaorm.product.findFirst({
			where: {
				name
			}
		})

		if (productCheck != null) {
			throw new InternalApiError('Product already exists.')
		}

		const products = await this.prismaorm.product.create({
			data: {
				name,
				price,
				category_id
			}
		})

		return products
	}
}
